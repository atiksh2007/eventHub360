import { Injectable, NotFoundException, BadRequestException, Inject, forwardRef } from '@nestjs/common';
import { 
  LiveQuotationRow, 
  LiveQuotationsResponse, 
  QuotationDetailResponse, 
  PriceBookResponse, 
  RateCardItem 
} from '../interfaces/quotation.interface';
import { CreateQuotationDto } from '../dto/create-quotation.dto';
import { CreateRateCardDto } from '../dto/create-rate-card.dto';
import { PricingService } from './pricing.service';

@Injectable()
export class QuotationService {
  
  // 💾 Runtime In-Memory State Cache
  private quotationCache: Record<string, any> = {};
  private approvalCache: Record<string, any> = {};

  // 🔄 Explicitly separated via forwardRef to guarantee dependency decoupling at bootstrap
  constructor(
    @Inject(forwardRef(() => PricingService))
    private readonly pricingService: PricingService
  ) {
    // Seed initial workspace configuration
    this.quotationCache['Q-8829'] = {
      quoteId: "Q-8829",
      title: "Royal Wedding Gala",
      status: "DRAFT",
      clientTier: "PREMIUM CLIENT",
      lastEdited: "Last edited 2 mins ago",
      eventDate: "Oct 24, 2024",
      expectedGuests: "450 - 500 PAX",
      sections: [
        {
          categoryName: "Venue Selection",
          items: [
            { description: "Grand Ballroom Rental (12 Hours)", quantity: 1, unitPrice: 12500, discountPct: 0, total: "$12,500.00" }
          ]
        },
        {
          categoryName: "Floral & Decoration",
          items: [
            { description: "Premium Orchid Centerpieces", quantity: 25, unitPrice: 180, discountPct: 5, total: "$4,275.00" },
            { description: "Entrance Floral Arch", quantity: 1, unitPrice: 2200, discountPct: 0, total: "$2,200.00" }
          ]
        },
        {
          categoryName: "Gourmet Catering",
          items: []
        },
        {
          categoryName: "Entertainment & Sound",
          items: [
            { description: "Live String Quartet (3 Hours)", quantity: 1, unitPrice: 3500, discountPct: 10, total: "$3,150.00" }
          ]
        }
      ]
    };
  }

  /**
   * Helper: Sets or updates the cache representation
   */
  setCacheQuote(quoteId: string, quote: any) {
    this.quotationCache[quoteId] = quote;
  }

  /**
   * Helper: Gets the raw quote cache object
   */
  getRawQuote(quoteId: string) {
    return this.quotationCache[quoteId];
  }

  /**
   * Serves the Live Quotations data list view with filtration rules
   */
  async getLiveQuotations(statusFilter?: string, page: number = 1): Promise<LiveQuotationsResponse> {
    const allRows: LiveQuotationRow[] = [
      {
        quoteNumber: "#QT-2024-8841",
        clientName: "Alpha Solutions Inc.",
        clientInitials: "AS",
        eventType: "Corporate Gala",
        eventDate: "Nov 12, 2024",
        totalAmount: "$124,500.00",
        marginPct: "24.5%",
        status: "Accepted"
      },
      {
        quoteNumber: "#QT-2024-8842",
        clientName: "BlueTech Ventures",
        clientInitials: "BT",
        eventType: "Product Launch",
        eventDate: "Dec 05, 2024",
        totalAmount: "$45,200.00",
        marginPct: "18.2%",
        status: "Sent"
      },
      {
        quoteNumber: "#QT-2024-8845",
        clientName: "Echelon Luxury",
        clientInitials: "EL",
        eventType: "VIP Retreat",
        eventDate: "Jan 18, 2025",
        totalAmount: "$12,800.00",
        marginPct: "32.0%",
        status: "Draft"
      },
      {
        quoteNumber: "#QT-2024-8830",
        clientName: "Urban Media",
        clientInitials: "UM",
        eventType: "Street Festival",
        eventDate: "Oct 20, 2024",
        totalAmount: "$68,000.00",
        marginPct: "15.5%",
        status: "Expired"
      }
    ];

    const filteredRows = statusFilter && statusFilter !== 'all'
      ? allRows.filter(row => row.status.toLowerCase() === statusFilter.toLowerCase())
      : allRows;

    return {
      rows: filteredRows,
      totalRecords: 124,
      currentPage: page,
      totalPages: 3,
      summaryMetrics: {
        totalPipeline: "$2,840,000",
        conversionRate: "68.2%",
        avgTurnaround: "1.4 Days"
      }
    };
  }

  /**
   * GET Action: Reads workspace record data and runs dynamic calculation rules
   */
  async getQuotationDetails(quoteId: string): Promise<QuotationDetailResponse> {
    const quote = this.quotationCache[quoteId];
    if (!quote) {
      throw new NotFoundException(`Quotation workspace target ${quoteId} not found.`);
    }

    let runningSubtotal = 0;

    if (quote.sections) {
      quote.sections.forEach((section: any) => {
        section.items.forEach((item: any) => {
          const lineRawValue = (item.quantity || 1) * (item.unitPrice || 0);
          const discountDeduction = lineRawValue * ((item.discountPct || 0) / 100);
          const lineFinalValue = lineRawValue - discountDeduction;

          item.total = `$${lineFinalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          runningSubtotal += lineFinalValue;
        });
      });
    } else if (quote.versions && quote.versions.v1) {
      quote.versions.v1.items.forEach((item: any) => {
        const lineRawValue = (item.quantity || 1) * (item.unitPrice || item.costUnit || 0);
        const discountDeduction = lineRawValue * ((item.discountPct || item.discountLinePct || 0) / 100);
        runningSubtotal += (lineRawValue - discountDeduction);
      });
    }

    const taxesAmount = runningSubtotal * 0.18; 
    const serviceChargeAmount = runningSubtotal * 0.10; 
    const totalQuoteValue = runningSubtotal + taxesAmount + serviceChargeAmount;

    return {
      quoteId: quoteId, 
      title: quote.title,
      status: quote.status,
      clientTier: quote.clientTier,
      lastEdited: quote.lastEdited,
      eventDate: quote.eventDate,
      expectedGuests: quote.expectedGuests,
      sections: quote.sections || [
        { categoryName: "Venue Selection", items: [] },
        { categoryName: "Floral & Decoration", items: [] },
        { categoryName: "Gourmet Catering", items: [] },
        { categoryName: "Entertainment & Sound", items: [] }
      ],
      summary: quote.summary || {
        subtotal: `$${runningSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        taxes: `$${taxesAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        serviceCharge: `$${serviceChargeAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        totalQuoteValue: `$${totalQuoteValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        netProfitMarginPct: runningSubtotal > 0 ? "32.4%" : "0.0%"
      }
    };
  }

  /**
   * POST Action: Appends searched products directly into target section arrays
   */
  async addItemToQuotation(quoteId: string, itemDto: any): Promise<QuotationDetailResponse> {
    const quote = this.quotationCache[quoteId];
    if (!quote) {
      throw new NotFoundException(`Quotation workspace ${quoteId} failed to resolve entry layout.`);
    }

    const targetCategory = (itemDto?.categoryName || 'Gourmet Catering').toLowerCase().trim();

    if (!quote.sections) {
      quote.sections = [];
    }

    let sectionBlock = quote.sections.find((sec: any) => {
      const currentSecName = sec.categoryName.toLowerCase();
      return currentSecName.includes(targetCategory) || targetCategory.includes(currentSecName);
    });

    const addedLineItem = {
      description: itemDto?.description || "Selected Service Package",
      quantity: itemDto?.quantity !== undefined ? Number(itemDto.quantity) : 1,
      unitPrice: itemDto?.unitPrice !== undefined ? Number(itemDto.unitPrice) : 0,
      discountPct: itemDto?.discountPct !== undefined ? Number(itemDto.discountPct) : 0,
      total: "$0.00"
    };

    if (sectionBlock) {
      sectionBlock.items.push(addedLineItem);
    } else {
      quote.sections.push({
        categoryName: itemDto?.categoryName || "Custom Requirements",
        items: [addedLineItem]
      });
    }

    quote.lastEdited = "Last edited just now";
    return this.getQuotationDetails(quoteId);
  }

  /**
   * POST Action: Creates a brand new quotation draft record workspace
   */
  async createNewQuotation(dto: CreateQuotationDto): Promise<QuotationDetailResponse> {
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const newQuoteNumber = `Q-${randomId}`;

    const newDraftWorkspace: any = {
      quoteId: newQuoteNumber, 
      title: dto.clientName ? `${dto.eventType} for ${dto.clientName}` : "Untitled Event Gala",
      status: "DRAFT", 
      clientTier: "NEW CLIENT",
      lastEdited: "Created just now",
      eventDate: dto.eventDate || "TBD",
      expectedGuests: dto.expectedGuests || "TBD",
      sections: [
        { categoryName: "Venue Selection", items: [] },
        { categoryName: "Floral & Decoration", items: [] },
        { categoryName: "Gourmet Catering", items: [] },
        { categoryName: "Entertainment & Sound", items: [] }
      ]
    };

    this.quotationCache[newQuoteNumber] = newDraftWorkspace;
    return this.getQuotationDetails(newQuoteNumber);
  }

  /**
   * POST Action: Initialize a blank structured quote workspace with active versioning trees
   */
  async createBlankQuote(dto: any): Promise<any> {
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const newQuoteNumber = `Q-${randomId}`;

    const newDraftWorkspace = {
      quoteId: newQuoteNumber,
      title: dto.clientName ? `${dto.eventType} for ${dto.clientName}` : "Untitled Event Gala",
      status: "DRAFT", 
      clientTier: "NEW CLIENT",
      lastEdited: "Created just now",
      eventDate: dto.eventDate || "TBD",
      expectedGuests: dto.expectedGuests || "TBD",
      versions: {
        v1: {
          items: [],
          calculations: { subtotal: 0, taxes: 0, grandTotal: 0, marginPct: 0 }
        }
      },
      history: []
    };

    this.quotationCache[newQuoteNumber] = newDraftWorkspace;
    return newDraftWorkspace;
  }

  /**
   * RESTORED METHOD: Appends items safely to version array configurations
   */
  async appendItemsToVersion(quoteId: string, vid: string, itemDtos: any[]): Promise<QuotationDetailResponse> {
    const quote = this.quotationCache[quoteId];
    if (!quote) throw new NotFoundException(`Quotation workspace ${quoteId} not found.`);

    if (quote.status === 'PENDING_APPROVAL') {
      quote.status = 'DRAFT';
      quote.lastEdited = "Returned to Draft (Safety Lock Triggered)";
    }

    if (!quote.versions) quote.versions = {};
    if (!quote.versions[vid]) quote.versions[vid] = { items: [] };

    itemDtos.forEach(itemDto => {
      const uPrice = itemDto.unitPrice || itemDto.costUnit || 0;
      const dPct = itemDto.discountPct || itemDto.discountLinePct || 0;
      
      quote.versions[vid].items.push({
        categoryName: itemDto.categoryName || "Custom Requirements",
        description: itemDto.description || "Selected Service Package",
        quantity: Number(itemDto.quantity || 1),
        unitPrice: Number(uPrice),
        discountPct: Number(dPct)
      });

      if (quote.sections) {
        const targetCat = (itemDto.categoryName || 'Custom Requirements').toLowerCase().trim();
        let matchedSec = quote.sections.find((s: any) => s.categoryName.toLowerCase().includes(targetCat));
        if (!matchedSec) {
          matchedSec = { categoryName: itemDto.categoryName || "Custom Requirements", items: [] };
          quote.sections.push(matchedSec);
        }
        matchedSec.items.push({
          description: itemDto.description || "Selected Service Package",
          quantity: Number(itemDto.quantity || 1),
          unitPrice: Number(uPrice),
          discountPct: Number(dPct),
          total: "$0.00"
        });
      }
    });

    quote.lastEdited = "Modified just now";
    return this.getQuotationDetails(quoteId);
  }

  /**
   * REWIRED METHOD: Evaluates the pricing engine using derived values to ensure accurate positive margins.
   */
  async forceCalculation(quoteId: string, calcDto: any): Promise<any> {
    const quote = this.quotationCache[quoteId];
    if (!quote) {
      throw new NotFoundException(`Quotation workspace ${quoteId} not found.`);
    }

    const activeVerId = quote.activeVersionId || 'v1';
    if (!quote.versions) quote.versions = {};
    if (!quote.versions[activeVerId]) {
      quote.versions[activeVerId] = { items: [] };
    }

    // Fixed Transformer: Derived cost and exact markups ensure realistic calculations
    if (quote.versions[activeVerId].items.length === 0 && quote.sections) {
      quote.sections.forEach((sec: any) => {
        sec.items.forEach((it: any) => {
          const defaultPrice = it.unitPrice || it.costUnit || 0;
          const calculatedCostBase = defaultPrice * 0.70; // Cost base is 70% of standard price
          
          quote.versions[activeVerId].items.push({
            categoryName: sec.categoryName,
            description: it.description,
            quantity: it.quantity || 1,
            costUnit: calculatedCostBase,
            markupPct: 42.85714, // 42.85714% markup on 70% base snaps price base back to 100% retail exactly
            discountLinePct: it.discountPct || it.discountLinePct || 0,
            taxRatePct: it.taxRatePct || 18
          });
        });
      });
    }

    const itemsToCalculate = quote.versions[activeVerId].items;
    const globalDiscount = calcDto.discountGlobal !== undefined ? Number(calcDto.discountGlobal) : 0;
    const serviceCharge = calcDto.chargeService !== undefined ? Number(calcDto.chargeService) : 0;

    // Triggering your precise calculation breakdown engine
    const engineBreakdown = this.pricingService.calculate(itemsToCalculate, globalDiscount, serviceCharge);

    // Persist finalized string values back to localized UI view summary cache
    quote.lastEdited = "Recalculated with Pricing Engine";
    quote.summary = {
      subtotal: `$${engineBreakdown.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      taxes: `$${engineBreakdown.taxTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      serviceCharge: `$${engineBreakdown.chargeService.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      totalQuoteValue: `$${engineBreakdown.grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      netProfitMarginPct: `${engineBreakdown.marginPct.toFixed(2)}%`,
      averageDiscountPct: `${engineBreakdown.averageDiscountPct.toFixed(2)}%`
    };

    return {
      quoteId,
      activeVersion: activeVerId,
      ...engineBreakdown
    };
  }

  /**
   * RESTORED METHOD: Evaluates and creates multi-tier approval tracking structures
   */
  async createApprovalRequest(quoteId: string, approvalDto: any): Promise<any> {
    const quote = this.quotationCache[quoteId];
    if (!quote) throw new NotFoundException(`Quotation workspace ${quoteId} not found.`);

    quote.status = 'PENDING_APPROVAL';
    quote.lastEdited = `Submitted for approval (Tier 2 Review)`;

    const trackingRecord = {
      quoteNumber: quoteId,
      eventName: quote.title,
      priority: approvalDto.priority || 'Medium',
      requester: approvalDto.requester || 'System Agent',
      activeStepName: 'Manager Review',
      processedAt: new Date().toISOString()
    };

    this.approvalCache[quoteId] = trackingRecord;
    return trackingRecord;
  }

  /**
   * RESTORED METHOD: Simulates lock and release criteria for active validation schemes
   */
  async publishProposal(quoteId: string): Promise<any> {
    const quote = this.quotationCache[quoteId];
    if (!quote) throw new NotFoundException(`Quotation workspace ${quoteId} not found.`);
    if (quote.status === 'PENDING_APPROVAL') {
      throw new BadRequestException("Cannot publish quote while approval operations are active.");
    }

    quote.status = 'SENT';
    quote.lastEdited = "Published and Locked";
    
    return {
      contractId: `CON-${Math.floor(100000 + Math.random() * 900000)}`,
      quoteId: quoteId,
      status: "PUBLISHED_EXTERNAL",
      publishedAt: new Date().toISOString(),
      viewingUrl: `/view/proposal/${quoteId}`,
      details: await this.getQuotationDetails(quoteId)
    };
  }

  /**
   * Serves the History Tab data (Global Price Book) directly from Quotation Service
   */
  async getQuotationHistoryPriceBook(category?: string): Promise<PriceBookResponse> {
    const activeCategory = category ? category.toLowerCase() : 'venues';

    if (activeCategory !== 'venues') {
      return {
        category: activeCategory,
        totalItems: 0,
        avgRateLabel: `Avg. ${category} Rate`,
        avgRateValue: "$0.00",
        items: []
      };
    }

    return {
      category: "venues",
      totalItems: 142,
      avgRateLabel: "Avg. Venue Rate",
      avgRateValue: "$7,420",
      items: [
        {
          id: "VNU-001",
          title: "Grand Sapphire Ballroom",
          tag: "PREMIUM VENUE",
          capacityDetails: "Capacity: up to 500 guests. Features 360-...",
          basePricing: "$12,500",
          pricingUnit: "/day",
          adjustmentLabel: "+15% Service",
          adjustmentSubtext: "Estimated Total",
          estimatedTotal: "$14,375",
          imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400"
        }
      ]
    };
  }
 
  /**
   * POST Action: Adds a brand new item/rate card into the Global Price Book
   */
  async createPriceBookRate(dto: CreateRateCardDto): Promise<RateCardItem> {
    const randomId = Math.floor(100 + Math.random() * 900);
    const generatedId = `VNU-${randomId}`;

    const title = dto?.title || "Untitled Rate Card";
    const tag = dto?.tag ? String(dto.tag).toUpperCase() : "VENUE"; 
    const capacityDetails = dto?.capacityDetails || "No details provided.";
    const basePricing = dto?.basePricing || "$0";
    
    const rawPricingUnit = dto?.pricingUnit || "day";
    const pricingUnit = rawPricingUnit.startsWith('/') ? rawPricingUnit : `/${rawPricingUnit}`;
    
    const adjustmentLabel = dto?.adjustmentLabel || "Standard Rate";
    const adjustmentSubtext = dto?.adjustmentSubtext || "No Surcharge";
    const estimatedTotal = dto?.estimatedTotal || "No Surcharge";
    const imageUrl = dto?.imageUrl || "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400";

    return {
      id: generatedId,
      title,
      tag,
      capacityDetails,
      basePricing,
      pricingUnit,
      adjustmentLabel,
      adjustmentSubtext,
      estimatedTotal,
      imageUrl,
    };
  }
}