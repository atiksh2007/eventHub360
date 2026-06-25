import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException, Inject, forwardRef, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { 
  LiveQuotationRow, 
  LiveQuotationsResponse, 
  QuotationDetailResponse, 
  PriceBookResponse, 
  RateCardItem 
} from '../interfaces/quotation.interface';
import { CreateQuoteDto } from '../dto/create-quote.dto';
import { CreateRateCardDto } from '../../pricing/dto/create-rate-card.dto';
import { PricingService } from '../../pricing/services/pricing.service';
import { ApprovalService } from '../../approval/services/approval.service';

function serializeBigInt(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === 'bigint') return obj.toString();
  if (Array.isArray(obj)) return obj.map(serializeBigInt);
  if (typeof obj === 'object') {
    const serialized: any = {};
    for (const key of Object.keys(obj)) {
      serialized[key] = serializeBigInt(obj[key]);
    }
    return serialized;
  }
  return obj;
}

import { AuditLogService } from '../../audit-log/services/audit-log.service';

@Injectable()
export class QuotationService implements OnModuleInit {
  
  constructor(
    @Inject(forwardRef(() => PricingService))
    private readonly pricingService: PricingService,
    @Inject(forwardRef(() => ApprovalService))
    private readonly approvalService: ApprovalService,
    private readonly prisma: PrismaService,
    @InjectQueue('quotations') private readonly quotationQueue: Queue,
    private readonly auditLogService: AuditLogService
  ) {}

  async onModuleInit() {
    // Schedule a repeatable job to check for expired quotes every 12 hours
    await this.quotationQueue.add('checkExpiry', {}, {
      repeat: {
        pattern: '0 */12 * * *'
      }
    });
  }

  /**
   * Delete a quote and all associated versions/items
   */
  async deleteQuote(id: string): Promise<{ success: boolean; message: string }> {
    const qid = BigInt(id);
    
    // Check if it exists
    const quote = await this.prisma.quotation.findUnique({ where: { quotation_id: qid } });
    if (!quote) throw new NotFoundException('Quote not found');

    // We rely on Prisma cascading deletes or delete manually if cascade isn't set up.
    // For safety, let's just delete the quotation (assuming onDelete: Cascade is configured)
    await this.prisma.quotation.delete({ where: { quotation_id: qid } });

    return { success: true, message: `Quotation ${id} deleted successfully.` };
  }

  /**
   * Serves the Live Quotations data list view directly from PostgreSQL
   */
  async getLiveQuotations(statusFilter?: string, page: number = 1, limit: number = 10): Promise<LiveQuotationsResponse> {
    const itemsPerPage = limit;
    const skip = (page - 1) * itemsPerPage;

    const whereCondition: any = { is_active: true };
    if (statusFilter && statusFilter !== 'all') {
      whereCondition.status = { equals: statusFilter, mode: 'insensitive' };
    }

    const [dbQuotes, totalRecords] = await this.prisma.$transaction([
      this.prisma.quotation.findMany({
        where: whereCondition,
        skip: skip,
        take: itemsPerPage,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.quotation.count({ where: whereCondition })
    ]);

    const rows: LiveQuotationRow[] = dbQuotes.map(q => {
      const totalNum = Number(q.total);                      
      const marginNum = Number(q.margin);                    
      const marginCalculated = totalNum > 0 ? ((marginNum / totalNum) * 100).toFixed(1) : "0.0";
      
      return {
        quoteNumber: `Q-${q.quotation_id.toString()}`, 
        clientName: q.title ? q.title.split(' for ')[1] || "Client" : "Client",
        clientInitials: "CL",
        eventType: q.title ? q.title.split(' for ')[0] || "Event" : "Event Plan",
        eventDate: q.event_date || "TBD",
        totalAmount: `$${totalNum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        marginPct: `${marginCalculated}%`,
        status: (q.status.charAt(0).toUpperCase() + q.status.slice(1).toLowerCase()) as any
      };
    });

    return {
      rows: rows,
      totalRecords: totalRecords,
      currentPage: page,
      totalPages: Math.ceil(totalRecords / itemsPerPage) || 1,
      summaryMetrics: {
        totalPipeline: "$2,840,000",
        conversionRate: "68.2%",
        avgTurnaround: "1.4 Days"
      }
    };
  }

  /**
   * GET Action: Reads rows matching the exact quote identity and joins line item models
   */
  async getQuotationDetails(quoteId: string): Promise<QuotationDetailResponse> {
    const idVal = quoteId.replace(/\D/g, '');
    if (!idVal) {
      throw new BadRequestException(`Invalid quote ID format: ${quoteId}`);
    }
    const qId = BigInt(idVal);
    
    const quotation = await this.prisma.quotation.findUnique({
      where: { quotation_id: qId },
      include: { lines: true }
    });

    if (!quotation) {
      throw new NotFoundException(`Quotation workspace target #${quoteId} not found.`);
    }

    const categorizedSections: Record<string, any[]> = {
      "Venue Selection": [],
      "Floral & Decoration": [],
      "Gourmet Catering": [],
      "Entertainment & Sound": []
    };

    quotation.lines.forEach((item: any) => {
      const category = item.item_type || 'Custom Requirements';
      const rateNum = Number(item.rate); 
      const amountNum = Number(item.amount); 

      const mappedLine = {
        id: item.line_id.toString(),
        description: item.description,
        qty: Number(item.qty),
        price: rateNum,
        cost: Number(item.cost || 0),
        discount: Number(item.discount_pct || 0),
        total: `$${amountNum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      };

      if (!categorizedSections[category]) {
        categorizedSections[category] = [];
      }
      categorizedSections[category].push(mappedLine);
    });

    const sections = Object.keys(categorizedSections).map(key => ({
      categoryName: key,
      items: categorizedSections[key]
    }));

    const subtotalNum = Number(quotation.subtotal);
    const taxTotalNum = Number(quotation.tax_total);
    const totalNum = Number(quotation.total);
    const marginNum = Number(quotation.margin);
    const marginCalculated = totalNum > 0 ? ((marginNum / totalNum) * 100).toFixed(1) : "0.0";

    const meta: any = typeof quotation.metadata === 'object' ? quotation.metadata : {};
    return {
      quoteId: `Q-${quotation.quotation_id.toString()}`,
      title: quotation.title || `Event Plan Quote for Lead #${quotation.lead_id.toString()}`,
      clientName: meta?.clientName || (quotation.title ? quotation.title.split(' for ')[1] : undefined),
      eventType: meta?.eventType || (quotation.title ? quotation.title.split(' for ')[0] : undefined),
      eventDate: quotation.event_date || 'TBD',
      expectedGuests: quotation.expected_guests || 'TBD',
      status: quotation.status,
      clientTier: quotation.client_tier || 'NEW CLIENT',
      lastEdited: quotation.updated_at.toLocaleDateString(),
      metadata: meta || {},
      sections: sections,
      summary: {
        subtotal: `$${subtotalNum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        taxes: `$${taxTotalNum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        serviceCharge: `$${Number(quotation.charge_service).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
        totalQuoteValue: `$${totalNum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        netProfitMarginPct: `${marginCalculated}%`
      }
    };
  }

  /**
   * Updates basic metadata of an existing quotation
   */
  async updateQuote(id: string, dto: CreateQuoteDto): Promise<{ success: boolean; message: string }> {
    try {
      const qid = BigInt(id.replace(/\D/g, ''));
      const quote = await this.prisma.quotation.findUnique({ where: { quotation_id: qid } });
      if (!quote) throw new NotFoundException('Quote not found');

      const titleStr = `${dto.eventType || 'Event'} for ${dto.clientName || 'Unknown Client'}`;
      const mergedMetadata = {
        ...(typeof quote.metadata === 'object' ? quote.metadata : {}),
        ...(typeof dto.metadata === 'object' ? dto.metadata : {}),
        clientName: dto.clientName || (quote.metadata as any)?.clientName,
        eventType: dto.eventType || (quote.metadata as any)?.eventType,
      };
      
      await this.prisma.quotation.update({
        where: { quotation_id: qid },
        data: {
          title: titleStr,
          event_date: dto.eventDate || quote.event_date,
          expected_guests: dto.expectedGuests ? dto.expectedGuests : quote.expected_guests,
          metadata: mergedMetadata
        }
      });

      return { success: true, message: `Quotation ${id} updated.` };
    } catch (error) {
      console.error('Error in updateQuote:', error);
      throw new InternalServerErrorException(`Update failed: ${error.message}`);
    }
  }

  /**
   * POST Action: Instantiates an initial quote document record directly into Postgres
   */
  async createNewQuotation(dto: CreateQuoteDto): Promise<QuotationDetailResponse> {
    try {
      const expiresAt = new Date();
      expiresAt.setMonth(expiresAt.getMonth() + 1);
      const titleStr = `${dto.eventType || 'Event'} for ${dto.clientName || 'Unknown Client'}`;
      const mergedMetadata = {
        ...(typeof dto.metadata === 'object' ? dto.metadata : {}),
        clientName: dto.clientName,
        eventType: dto.eventType,
      };

      const createdQuote = await this.prisma.quotation.create({
        data: {
          company_id: BigInt(1), 
          lead_id: BigInt(Math.floor(100 + Math.random() * 900)), 
          version: 1,
          currency: 'USD',
          title: titleStr,
          client_tier: 'NEW CLIENT',
          event_date: dto.eventDate || null,
          expected_guests: dto.expectedGuests || null,
          subtotal: 0,
          tax_total: 0,
          total: 0,
          cost_total: 0,
          margin: 0,
          status: 'DRAFT',
          expires_at: expiresAt,
          tenant_id: 'system_default',
          metadata: mergedMetadata
        }
      });

      const quoteNum = `Q-${createdQuote.quotation_id.toString()}`;
      
      // Log creation
      await this.auditLogService.createLog(
        'Quote Created',
        'quotation',
        quoteNum,
        'System User', // Mocked user
        'system_default'
      );

      return await this.getQuotationDetails(quoteNum);
    } catch (error) {
      console.error('Error in createNewQuotation:', error);
      throw new InternalServerErrorException(`Create failed: ${error.message}`);
    }
  }

  /**
   * POST Action: Commits line items securely straight to your line item database model tables
   */
  async addItemToQuotation(quoteId: string, itemDto: any): Promise<QuotationDetailResponse> {
    const idVal = quoteId.replace(/\D/g, '');
    const qId = BigInt(idVal);

    const quotation = await this.prisma.quotation.findUnique({
      where: { quotation_id: qId }
    });

    if (!quotation) {
      throw new NotFoundException(`Quotation #${quoteId} not found.`);
    }

    // [Temporarily disabled for demo]
    // if (!['DRAFT', 'PENDING_APPROVAL'].includes(quotation.status.toUpperCase())) {
    //   throw new BadRequestException('Quote is locked — create a new version to edit');
    // }

    // Safety Lock Rule: Reset approval if modified in PENDING_APPROVAL
    if (quotation.status.toUpperCase() === 'PENDING_APPROVAL') {
      await this.prisma.quotation.update({
        where: { quotation_id: qId },
        data: { status: 'DRAFT' }
      });
      this.approvalService.cancelApprovalWorkflow(`Q-${qId.toString()}`);
    }
    
    const qty = itemDto?.qty !== undefined ? Number(itemDto.qty) : (itemDto?.quantity !== undefined ? Number(itemDto.quantity) : 1);
    const cost = itemDto?.costUnit !== undefined ? Number(itemDto.costUnit) : (itemDto?.price !== undefined ? Number(itemDto.price) * 0.7 : 0);
    const markup = itemDto?.markupPct !== undefined ? Number(itemDto.markupPct) : 0;
    const discount = itemDto?.discount !== undefined ? Number(itemDto.discount) : (itemDto?.discountPct !== undefined ? Number(itemDto.discountPct) : 0);
    const taxRate = itemDto?.taxRatePct !== undefined ? Number(itemDto.taxRatePct) : 18;

    // Base Price: Cost_unit * (1 + Markup%)
    const priceBase = cost * (1 + markup / 100);
    // Net Line Price: Price_net = Price_base * Quantity * (1 - Discount%_line)
    const priceNet = priceBase * qty * (1 - discount / 100);

    const cgst = priceNet * 0.09;
    const sgst = priceNet * 0.09;

    await this.prisma.quotationLine.create({
      data: {
        quotation_id: qId,
        item_type: itemDto?.categoryName || itemDto?.item_type || "Custom Requirements",
        description: itemDto?.description || "Selected Service Package",
        qty: qty,
        rate: priceBase,
        amount: priceNet,
        cost: cost,
        tax_rule_id: 1n,
        markup_pct: markup,
        discount_pct: discount,
        tax_rate_pct: taxRate,
        cgst: cgst,
        sgst: sgst,
        igst: 0,
        tenant_id: 'system_default'
      }
    });

    await this.recalculateQuoteTotals(qId);
    return this.getQuotationDetails(quoteId);
  }

  /**
   * Utility Engine: Automatically recalculates summary aggregates when lines mutate
   */
  private async recalculateQuoteTotals(quotationId: bigint): Promise<void> {
    const lines = await this.prisma.quotationLine.findMany({
      where: { quotation_id: quotationId }
    });

    const quotation = await this.prisma.quotation.findUnique({
      where: { quotation_id: quotationId }
    });

    if (!quotation) return;

    let subtotal = 0;
    let taxTotal = 0;
    let costTotal = 0;

    lines.forEach((l: any) => {
      const lineAmount = Number(l.amount || 0); 
      const lineCost = Number(l.cost || 0);

      subtotal += lineAmount;
      taxTotal += lineAmount * (Number(l.tax_rate_pct || 18) / 100);
      costTotal += lineCost * Number(l.qty || 0);
    });

    const discGlobal = Number(quotation.discount_global || 0);
    const serviceCharge = Number(quotation.charge_service || 0);

    // Grand Total: (Sum(Price_net) - Discount_global) + Tax_total + Charge_service
    const finalTotal = (subtotal - discGlobal) + taxTotal + serviceCharge;
    
    // Profit Margin: Subtotal Revenue - Global Discount + Service Charge - Cost
    const margin = (subtotal - discGlobal + serviceCharge) - costTotal;

    await this.prisma.quotation.update({
      where: { quotation_id: quotationId },
      data: {
        subtotal: subtotal,
        tax_total: taxTotal,
        total: finalTotal,
        cost_total: costTotal,
        margin: margin
      }
    });
  }

  async createBlankQuote(dto: CreateQuoteDto): Promise<QuotationDetailResponse> {
    return this.createNewQuotation(dto);
  }

  async appendItemsToVersion(quoteId: string, vid: string, itemDtos: any[]): Promise<QuotationDetailResponse> {
    for (const item of itemDtos) {
      await this.addItemToQuotation(quoteId, item);
    }
    return this.getQuotationDetails(quoteId);
  }

  async syncItems(quoteId: string, itemDtos: any[]): Promise<QuotationDetailResponse> {
    const qId = BigInt(quoteId.replace(/\D/g, ''));
    
    // Safety Lock Rule check: Reset approval if modified
    const quotation = await this.prisma.quotation.findUnique({
      where: { quotation_id: qId }
    });
    if (!quotation) {
      throw new NotFoundException(`Quotation #${quoteId} not found.`);
    }

    // [Temporarily disabled for demo: allow recalculation]
    // if (!['DRAFT', 'PENDING_APPROVAL'].includes(quotation.status.toUpperCase())) {
    //   throw new BadRequestException('Quote is locked — create a new version to edit');
    // }

    if (quotation.status.toUpperCase() === 'PENDING_APPROVAL') {
      await this.prisma.quotation.update({
        where: { quotation_id: qId },
        data: { status: 'DRAFT' }
      });
      this.approvalService.cancelApprovalWorkflow(`Q-${qId.toString()}`);
    }

    // Delete existing lines
    await this.prisma.quotationLine.deleteMany({
      where: { quotation_id: qId }
    });

    // Bulk append
    for (const item of itemDtos) {
      const qty = item?.qty !== undefined ? Number(item.qty) : (item?.quantity !== undefined ? Number(item.quantity) : 1);
      const cost = item?.costUnit !== undefined ? Number(item.costUnit) : (item?.price !== undefined ? Number(item.price) * 0.7 : 0);
      const markup = item?.markupPct !== undefined ? Number(item.markupPct) : 0;
      const discount = item?.discount !== undefined ? Number(item.discount) : (item?.discountPct !== undefined ? Number(item.discountPct) : 0);
      const taxRate = item?.taxRatePct !== undefined ? Number(item.taxRatePct) : 18;

      const priceBase = item?.price !== undefined ? Number(item.price) : cost * (1 + markup / 100);
      const priceNet = priceBase * qty * (1 - discount / 100);

      const cgst = priceNet * 0.09;
      const sgst = priceNet * 0.09;

      try {
        await this.prisma.quotationLine.create({
          data: {
            quotation_id: qId,
            item_type: item?.categoryName || item?.item_type || "Custom Requirements",
          description: item?.description || "Selected Service Package",
          qty: qty,
          rate: priceBase,
          amount: priceNet,
          cost: cost,
          tax_rule_id: 1n,
          markup_pct: markup,
          discount_pct: discount,
          tax_rate_pct: taxRate,
          cgst: cgst,
          sgst: sgst,
          igst: 0,
          tenant_id: 'system_default'
        }
      });
      } catch (err) {
        console.error("Prisma error inserting line item:", err);
        throw err;
      }
    }

    await this.recalculateQuoteTotals(qId);
    return this.getQuotationDetails(quoteId);
  }

  async forceCalculation(quoteId: string, calcDto: any): Promise<any> {
    const qId = BigInt(quoteId.replace(/\D/g, ''));
    
    const quotation = await this.prisma.quotation.findUnique({
      where: { quotation_id: qId }
    });
    if (!quotation) {
      throw new NotFoundException(`Quotation #${quoteId} not found.`);
    }

    // [Temporarily disabled for demo: allow recalculation]
    // if (!['DRAFT', 'PENDING_APPROVAL'].includes(quotation.status.toUpperCase())) {
    //   throw new BadRequestException('Quote is locked — create a new version to edit');
    // }

    if (quotation.status.toUpperCase() === 'PENDING_APPROVAL') {
      await this.prisma.quotation.update({
        where: { quotation_id: qId },
        data: { status: 'DRAFT' }
      });
      this.approvalService.cancelApprovalWorkflow(`Q-${qId.toString()}`);
    }

    await this.prisma.quotation.update({
      where: { quotation_id: qId },
      data: {
        discount_global: calcDto.discountGlobal !== undefined ? Number(calcDto.discountGlobal) : undefined,
        charge_service: calcDto.chargeService !== undefined ? Number(calcDto.chargeService) : undefined
      }
    });

    await this.recalculateQuoteTotals(qId);
    return this.getQuotationDetails(quoteId);
  }

  async createApprovalRequest(quoteId: string, approvalDto: any): Promise<any> {
    try {
      const qId = BigInt(quoteId.replace(/\D/g, ''));
      
      const quotation = await this.prisma.quotation.findUnique({
        where: { quotation_id: qId },
        include: { lines: true }
      });

    if (!quotation) {
      throw new NotFoundException(`Quotation not found.`);
    }

    let sumCost = 0;
    let sumBase = 0;
    let sumNet = 0;

    quotation.lines.forEach((l: any) => {
      const qty = Number(l.qty);
      const cost = Number(l.cost);
      const markup = Number(l.markup_pct || 0);
      const disc = Number(l.discount_pct || 0);

      const base = cost * (1 + markup/100);
      const net = base * qty * (1 - disc/100);

      sumCost += cost * qty;
      sumBase += base * qty;
      sumNet += net;
    });

    const marginPct = sumNet > 0 ? ((sumNet - sumCost) / sumNet) * 100 : 0;
    const discountPct = sumBase > 0 ? ((sumBase - sumNet) / sumBase) * 100 : 0;

    let tier = '';
    let statusUpdate = '';
    let activeStepName = '';
    let autoPriority = approvalDto.priority || 'STANDARD';

    if (discountPct <= 5 && marginPct >= 20) {
      tier = 'Tier 1 (Auto-Approve)';
      statusUpdate = 'SENT';
      activeStepName = 'Draft';
      autoPriority = 'LOW';
    } else if ((discountPct >= 6 && discountPct <= 15) || (marginPct >= 10 && marginPct <= 19)) {
      tier = 'Tier 2 (Sales Manager)';
      statusUpdate = 'PENDING_APPROVAL';
      activeStepName = 'Manager Review';
      autoPriority = 'STANDARD';
    } else {
      tier = 'Tier 3 (Company Owner Exception)';
      statusUpdate = 'PENDING_APPROVAL';
      activeStepName = 'Owner Review';
      autoPriority = 'HIGH';
    }

    await this.prisma.quotation.update({
      where: { quotation_id: qId },
      data: { status: statusUpdate }
    });

      return await this.approvalService.initializeApprovalTrack({
        quoteNumber: quoteId,
        eventName: quotation.title || "Custom Event Package",
        totalValue: quotation.total.toString(),
        priority: autoPriority,
        requester: approvalDto.requester,
        executiveSummary: approvalDto.executiveSummary || `Approval request for ${quotation.title} with discount ${discountPct.toFixed(1)}% and margin ${marginPct.toFixed(1)}%.`,
        activeStepName,
        tier
      });
    } catch (err) {
      console.error("Error creating approval request:", err);
      throw err;
    }
  }

  async publishProposal(quoteId: string): Promise<any> {
    const qId = BigInt(quoteId.replace(/\D/g, ''));
    await this.prisma.quotation.update({
      where: { quotation_id: qId },
      data: { status: 'SENT' }
    });
    return { quoteId, status: "PUBLISHED_EXTERNAL", publishedAt: new Date().toISOString() };
  }

  private mockVenues = [
    { id: "1", title: "Grand Sapphire Ballroom", tag: "Premium Venue", capacityDetails: "Capacity: up to 500 guests. Features 360-degree mapping and dual staircases.", basePricing: "$12,500", pricingUnit: "day", adjustmentLabel: "+15% Service", adjustmentSubtext: "Estimated Total", estimatedTotal: "$14,375", imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    { id: "2", title: "Horizon Vista Terrace", tag: "Sky Deck", capacityDetails: "Rooftop access with panoramic city views. Features fire pits and glass railings.", basePricing: "$5,200", pricingUnit: "session", adjustmentLabel: "+10% Service", adjustmentSubtext: "Estimated Total", estimatedTotal: "$5,720", imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    { id: "3", title: "Innovation Tech Hub", tag: "Conference", capacityDetails: "Theater-style seating for 200. HD projectors, live-streaming ready.", basePricing: "$8,900", pricingUnit: "day", adjustmentLabel: "Included Service", adjustmentSubtext: "Flat Rate", estimatedTotal: "$8,900", imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    { id: "4", title: "The Verdant Atrium", tag: "Eco-Lounge", capacityDetails: "Indoor garden setting with sustainable climate control and living walls.", basePricing: "$4,500", pricingUnit: "day", adjustmentLabel: "+20% Seasonal", adjustmentSubtext: "Estimated Total", estimatedTotal: "$5,400", imageUrl: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    { id: "5", title: "The Reserve Cellar", tag: "Private Reserve", capacityDetails: "Intimate underground tasting room. Private barrel backdrop.", basePricing: "$2,800", pricingUnit: "night", adjustmentLabel: "Sommelier Incl.", adjustmentSubtext: "Exclusive Access", estimatedTotal: "$2,800", imageUrl: "https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    { id: "6", title: "Manor Estate Tent", tag: "Estate Grounds", capacityDetails: "All-weather luxury marquee on estate lawn. Floor-to-ceiling windows.", basePricing: "$15,000", pricingUnit: "event", adjustmentLabel: "+5% Logistics", adjustmentSubtext: "Setup Included", estimatedTotal: "$15,750", imageUrl: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    { id: "7", title: "Industrial Loft 402", tag: "Urban Chic", capacityDetails: "Flexible studio space for product launches and creative workshops.", basePricing: "$3,200", pricingUnit: "day", adjustmentLabel: "Standard Rate", adjustmentSubtext: "No Surcharge", estimatedTotal: "$3,200", imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    // Template Additions
    { id: "t1_v1", title: "Grand Ballroom Venue", tag: "Luxury Venue", capacityDetails: "Massive ballroom suitable for grand luxury weddings. Max 300 guests.", basePricing: "$15,000", pricingUnit: "event", adjustmentLabel: "Standard", adjustmentSubtext: "Flat Rate", estimatedTotal: "$15,000", imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    { id: "t2_v1", title: "Main Conference Hall", tag: "Corporate Venue", capacityDetails: "Auditorium style seating. Max 1,000 attendees. Built-in screens.", basePricing: "$12,000", pricingUnit: "day", adjustmentLabel: "Standard", adjustmentSubtext: "Flat Rate", estimatedTotal: "$12,000", imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    { id: "t3_v1", title: "Penthouse Suite (3 nights)", tag: "Boutique Venue", capacityDetails: "Exclusive penthouse suite for private dinners and stays. Max 30 guests.", basePricing: "$4,000", pricingUnit: "stay", adjustmentLabel: "Standard", adjustmentSubtext: "Flat Rate", estimatedTotal: "$4,000", imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    { id: "t4_v1", title: "Garden Venue Hire", tag: "Outdoor Venue", capacityDetails: "Beautiful botanical garden open space. Max 200 guests.", basePricing: "$6,000", pricingUnit: "day", adjustmentLabel: "Standard", adjustmentSubtext: "Flat Rate", estimatedTotal: "$6,000", imageUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    { id: "t5_v1", title: "Luxury Ballroom Rental", tag: "Luxury Gala Venue", capacityDetails: "Iconic high-ceiling luxury ballroom for prestigious galas. Max 400 guests.", basePricing: "$25,000", pricingUnit: "event", adjustmentLabel: "Standard", adjustmentSubtext: "Flat Rate", estimatedTotal: "$25,000", imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }
  ];

  private mockCatering = [
    { id: "c1", title: "Gourmet Catering Standard", tag: "Gourmet Services", capacityDetails: "Premium 3-course plated meal including appetizers, main course, and artisan desserts.", basePricing: "$120", pricingUnit: "person", adjustmentLabel: "+18% Gratuity", adjustmentSubtext: "Service Fee", estimatedTotal: "$141", imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    { id: "c2", title: "Gourmet Buffet Station", tag: "Gourmet Services", capacityDetails: "Global cuisine stations with live carving, pasta bar, and sushi.", basePricing: "$85", pricingUnit: "person", adjustmentLabel: "+18% Gratuity", adjustmentSubtext: "Service Fee", estimatedTotal: "$100", imageUrl: "https://images.unsplash.com/photo-1533777324565-a040b3f8d4e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    // Template Additions
    { id: "t1_c1", title: "Gourmet 5-Course Dinner", tag: "Gourmet Services", capacityDetails: "Luxurious 5-course meal curated by a head chef.", basePricing: "$180", pricingUnit: "person", adjustmentLabel: "Standard", adjustmentSubtext: "Flat Rate", estimatedTotal: "$180", imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    { id: "t2_c1", title: "Networking Lunch Catering", tag: "Corporate Catering", capacityDetails: "Light, healthy networking buffet suitable for professionals.", basePricing: "$45", pricingUnit: "person", adjustmentLabel: "Standard", adjustmentSubtext: "Flat Rate", estimatedTotal: "$45", imageUrl: "https://images.unsplash.com/photo-1533777324565-a040b3f8d4e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    { id: "t3_c1", title: "Private Chef Dinner", tag: "Private Dining", capacityDetails: "Exclusive private dining experience prepared on-site by a personal chef.", basePricing: "$220", pricingUnit: "person", adjustmentLabel: "Standard", adjustmentSubtext: "Flat Rate", estimatedTotal: "$220", imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    { id: "t4_c1", title: "BBQ & Buffet Catering", tag: "Outdoor Catering", capacityDetails: "Gourmet outdoor BBQ station and fresh buffet spread.", basePricing: "$85", pricingUnit: "person", adjustmentLabel: "Standard", adjustmentSubtext: "Flat Rate", estimatedTotal: "$85", imageUrl: "https://images.unsplash.com/photo-1533777324565-a040b3f8d4e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    { id: "t5_c1", title: "Michelin-Grade Dinner Service", tag: "Gourmet Services", capacityDetails: "The ultimate dining experience for VIP galas.", basePricing: "$280", pricingUnit: "person", adjustmentLabel: "Standard", adjustmentSubtext: "Flat Rate", estimatedTotal: "$280", imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }
  ];

  private mockEntertainment = [
    { id: "e1", title: "Elite Live Band", tag: "Entertainment", capacityDetails: "5-piece live band covering jazz, pop, and classical music for 4 hours.", basePricing: "$4,500", pricingUnit: "event", adjustmentLabel: "Standard Setup", adjustmentSubtext: "Included", estimatedTotal: "$4,500", imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    { id: "e2", title: "DJ & Lighting Package", tag: "Music Services", capacityDetails: "Professional DJ with full club-style intelligent lighting and PA system.", basePricing: "$2,200", pricingUnit: "event", adjustmentLabel: "+$200 Travel", adjustmentSubtext: "Out of city limit", estimatedTotal: "$2,400", imageUrl: "https://images.unsplash.com/photo-1516280440502-85f5e71444fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    { id: "e3", title: "Acoustic String Quartet", tag: "Music Services", capacityDetails: "Classical strings ensemble perfect for elegant dinners and cocktail hours.", basePricing: "$1,800", pricingUnit: "2-hours", adjustmentLabel: "No Surcharge", adjustmentSubtext: "Flat Rate", estimatedTotal: "$1,800", imageUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    // Template Additions
    { id: "t1_e1", title: "Live Orchestra (4 hrs)", tag: "Music Services", capacityDetails: "Full 12-piece live orchestra providing elegant background and dance music.", basePricing: "$8,000", pricingUnit: "event", adjustmentLabel: "Standard", adjustmentSubtext: "Flat Rate", estimatedTotal: "$8,000", imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    { id: "t2_e1", title: "Full AV & Stage Production", tag: "AV Services", capacityDetails: "Complete stage buildup, lighting, microphones, and screens for conferences.", basePricing: "$18,000", pricingUnit: "event", adjustmentLabel: "Standard", adjustmentSubtext: "Flat Rate", estimatedTotal: "$18,000", imageUrl: "https://images.unsplash.com/photo-1516280440502-85f5e71444fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    { id: "t2_e2", title: "Keynote Speaker Package", tag: "Speaker", capacityDetails: "Professional keynote speaker sourcing and management.", basePricing: "$10,000", pricingUnit: "event", adjustmentLabel: "Standard", adjustmentSubtext: "Flat Rate", estimatedTotal: "$10,000", imageUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    { id: "t3_e1", title: "Spa & Wellness Package", tag: "Wellness Services", capacityDetails: "Exclusive hotel spa buy-out for up to 50 guests.", basePricing: "$350", pricingUnit: "person", adjustmentLabel: "Standard", adjustmentSubtext: "Flat Rate", estimatedTotal: "$350", imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    { id: "t5_e1", title: "Celebrity Entertainment", tag: "Entertainment", capacityDetails: "Top-tier celebrity performer booking and green room management.", basePricing: "$20,000", pricingUnit: "event", adjustmentLabel: "Standard", adjustmentSubtext: "Flat Rate", estimatedTotal: "$20,000", imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }
  ];

  private mockFloral = [
    { id: "f1", title: "Premium Grand Centerpiece", tag: "Floral", capacityDetails: "Large floral arrangement with seasonal premium blooms and orchids.", basePricing: "$450", pricingUnit: "table", adjustmentLabel: "+10% Setup", adjustmentSubtext: "Installation", estimatedTotal: "$495", imageUrl: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=80" },
    { id: "f2", title: "Aisle Runner Petals", tag: "Decoration", capacityDetails: "Thick layer of fresh rose petals along the entire ceremony aisle.", basePricing: "$850", pricingUnit: "event", adjustmentLabel: "Standard", adjustmentSubtext: "Flat Rate", estimatedTotal: "$850", imageUrl: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80" },
    { id: "f3", title: "Archway Floral Cascade", tag: "Floral", capacityDetails: "Full coverage floral arch for ceremony or entrance.", basePricing: "$1,200", pricingUnit: "event", adjustmentLabel: "+$150 Teardown", adjustmentSubtext: "Post-event", estimatedTotal: "$1,350", imageUrl: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80" },
    // Template Additions
    { id: "t1_f1", title: "Premium Floral Arrangements", tag: "Floral", capacityDetails: "Opulent floral arrangements for tables, walkways, and stages.", basePricing: "$5,000", pricingUnit: "event", adjustmentLabel: "Standard", adjustmentSubtext: "Flat Rate", estimatedTotal: "$5,000", imageUrl: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=80" },
    { id: "t4_f1", title: "Rustic Floral Decor", tag: "Floral", capacityDetails: "Beautiful organic rustic floral elements tailored for garden environments.", basePricing: "$2,800", pricingUnit: "event", adjustmentLabel: "Standard", adjustmentSubtext: "Flat Rate", estimatedTotal: "$2,800", imageUrl: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80" },
    { id: "t4_f2", title: "Tent & Marquee Setup", tag: "Decoration", capacityDetails: "Elegant outdoor canopy with clear ceilings and draped fabric.", basePricing: "$4,500", pricingUnit: "event", adjustmentLabel: "Standard", adjustmentSubtext: "Flat Rate", estimatedTotal: "$4,500", imageUrl: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80" },
    { id: "t5_f1", title: "Premium Decor & Lighting", tag: "Decoration", capacityDetails: "High-end luxury drapery, candelabras, and intelligent ambient lighting.", basePricing: "$12,000", pricingUnit: "event", adjustmentLabel: "Standard", adjustmentSubtext: "Flat Rate", estimatedTotal: "$12,000", imageUrl: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=80" },
    { id: "t3_f1", title: "Terrace Event Setup", tag: "Decoration", capacityDetails: "Boutique outdoor terrace staging with bespoke furniture.", basePricing: "$3,000", pricingUnit: "event", adjustmentLabel: "Standard", adjustmentSubtext: "Flat Rate", estimatedTotal: "$3,000", imageUrl: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80" }
  ];

  async getQuotationHistoryPriceBook(category?: string): Promise<PriceBookResponse> {
    const lowerCat = category?.toLowerCase() || 'venues';
    
    let data: any[] = [];
    let avgRateLabel = '';
    let avgRateValue = '';

    if (lowerCat === 'catering') {
      data = this.mockCatering;
      avgRateLabel = 'Avg. Catering Rate';
      avgRateValue = '$102';
    } else if (lowerCat === 'entertainment') {
      data = this.mockEntertainment;
      avgRateLabel = 'Avg. Entertainment Rate';
      avgRateValue = '$2,833';
    } else if (lowerCat === 'floral') {
      data = this.mockFloral;
      avgRateLabel = 'Avg. Floral Rate';
      avgRateValue = '$833';
    } else if (lowerCat === 'services') {
      // Keep services as a fallback containing both
      data = [...this.mockCatering, ...this.mockEntertainment, ...this.mockFloral];
      avgRateLabel = 'Avg. Service Rate';
      avgRateValue = '$1,720';
    } else {
      data = this.mockVenues;
      avgRateLabel = 'Avg. Venue Rate';
      avgRateValue = '$7,440';
    }
    
    return {
      category: lowerCat,
      totalItems: data.length,
      avgRateLabel,
      avgRateValue,
      items: data
    };
  }

  async createPriceBookRate(dto: CreateRateCardDto): Promise<RateCardItem> {
    const newVenue = {
      id: (dto.category || "VNU").substring(0,3).toUpperCase() + "-" + Date.now(),
      title: dto.title,
      tag: dto.tag || "VENUE",
      capacityDetails: dto.capacityDetails || "",
      basePricing: dto.basePricing || "$0",
      pricingUnit: dto.pricingUnit || "/day",
      adjustmentLabel: dto.adjustmentLabel || "",
      adjustmentSubtext: dto.adjustmentSubtext || "",
      estimatedTotal: dto.estimatedTotal || "",
      imageUrl: dto.imageUrl || ""
    };

    const cat = dto.category?.toLowerCase() || 'venues';
    if (cat === 'catering') {
      this.mockCatering.push(newVenue);
    } else if (cat === 'entertainment') {
      this.mockEntertainment.push(newVenue);
    } else if (cat === 'floral') {
      this.mockFloral.push(newVenue);
    } else {
      this.mockVenues.push(newVenue);
    }

    return newVenue;
  }
}