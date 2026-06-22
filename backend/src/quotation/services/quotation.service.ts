import { Injectable, NotFoundException, BadRequestException, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
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

@Injectable()
export class QuotationService {
  
  constructor(
    @Inject(forwardRef(() => PricingService))
    private readonly pricingService: PricingService,
    @Inject(forwardRef(() => ApprovalService))
    private readonly approvalService: ApprovalService,
    private readonly prisma: PrismaService 
  ) {}

  /**
   * Serves the Live Quotations data list view directly from PostgreSQL
   */
  async getLiveQuotations(statusFilter?: string, page: number = 1): Promise<LiveQuotationsResponse> {
    const itemsPerPage = 10;
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

    return {
      quoteId: `Q-${quotation.quotation_id.toString()}`,
      title: quotation.title || `Event Plan Quote for Lead #${quotation.lead_id.toString()}`,
      status: quotation.status,
      clientTier: quotation.client_tier || "NEW CLIENT",
      lastEdited: "Synchronized with Database",
      eventDate: quotation.event_date || "TBD",
      expectedGuests: quotation.expected_guests || "TBD",
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
   * POST Action: Instantiates an initial quote document record directly into Postgres
   */
  async createNewQuotation(dto: CreateQuoteDto): Promise<QuotationDetailResponse> {
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + 1);

    const createdQuote = await this.prisma.quotation.create({
      data: {
        company_id: BigInt(1), 
        lead_id: BigInt(Math.floor(100 + Math.random() * 900)), 
        version: 1,
        currency: 'USD',
        title: dto.clientName ? `${dto.eventType} for ${dto.clientName}` : "Untitled Event Plan",
        client_tier: "NEW CLIENT",
        event_date: dto.eventDate || "TBD",
        expected_guests: dto.expectedGuests || "TBD",
        discount_global: 0,
        charge_service: 0,
        subtotal: 0,
        tax_total: 0,
        total: 0,
        cost_total: 0,
        margin: 0,
        status: 'DRAFT',
        tenant_id: 'system_default',
        expires_at: expiresAt,
      }
    });

    return this.getQuotationDetails(`Q-${createdQuote.quotation_id.toString()}`);
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

    // Safety Lock Rule: Reset approval if modified in PENDING_APPROVAL
    if (quotation.status === 'PENDING_APPROVAL') {
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
    // Profit Margin %
    const margin = subtotal - costTotal;

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
    if (quotation && quotation.status === 'PENDING_APPROVAL') {
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

      const priceBase = cost * (1 + markup / 100);
      const priceNet = priceBase * qty * (1 - discount / 100);

      const cgst = priceNet * 0.09;
      const sgst = priceNet * 0.09;

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
    }

    await this.recalculateQuoteTotals(qId);
    return this.getQuotationDetails(quoteId);
  }

  async forceCalculation(quoteId: string, calcDto: any): Promise<any> {
    const qId = BigInt(quoteId.replace(/\D/g, ''));
    
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

    if (discountPct <= 5 && marginPct >= 20) {
      tier = 'Tier 1 (Auto-Approve)';
      statusUpdate = 'SENT';
      activeStepName = 'Draft';
    } else if ((discountPct >= 6 && discountPct <= 15) || (marginPct >= 10 && marginPct <= 19)) {
      tier = 'Tier 2 (Sales Manager)';
      statusUpdate = 'PENDING_APPROVAL';
      activeStepName = 'Manager Review';
    } else {
      tier = 'Tier 3 (Company Owner Exception)';
      statusUpdate = 'PENDING_APPROVAL';
      activeStepName = 'Owner Review';
    }

    await this.prisma.quotation.update({
      where: { quotation_id: qId },
      data: { status: statusUpdate }
    });

    return this.approvalService.initializeApprovalTrack({
      quoteNumber: quoteId,
      eventName: quotation.title || "Custom Event Package",
      totalValue: `$${Number(quotation.total).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      priority: approvalDto.priority || 'Medium',
      requester: approvalDto.requester,
      executiveSummary: approvalDto.executiveSummary || `Approval request for ${quotation.title} with discount ${discountPct.toFixed(1)}% and margin ${marginPct.toFixed(1)}%.`,
      activeStepName,
      tier
    });
  }

  async publishProposal(quoteId: string): Promise<any> {
    const qId = BigInt(quoteId.replace(/\D/g, ''));
    await this.prisma.quotation.update({
      where: { quotation_id: qId },
      data: { status: 'SENT' }
    });
    return { quoteId, status: "PUBLISHED_EXTERNAL", publishedAt: new Date().toISOString() };
  }

  async getQuotationHistoryPriceBook(category?: string): Promise<PriceBookResponse> {
    return {
      category: category || "venues",
      totalItems: 1,
      avgRateLabel: "Avg. Venue Rate",
      avgRateValue: "$12,500",
      items: [{ id: "VNU-001", title: "Grand Sapphire Ballroom", tag: "PREMIUM", capacityDetails: "500 guests", basePricing: "$12,500", pricingUnit: "/day", adjustmentLabel: "+15%", adjustmentSubtext: "Total", estimatedTotal: "$14,375", imageUrl: "" }]
    };
  }

  async createPriceBookRate(dto: CreateRateCardDto): Promise<RateCardItem> {
    return { id: "VNU-999", title: dto.title, tag: "VENUE", capacityDetails: "", basePricing: "$0", pricingUnit: "/day", adjustmentLabel: "", adjustmentSubtext: "", estimatedTotal: "", imageUrl: "" };
  }
}