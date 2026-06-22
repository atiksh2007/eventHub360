import { PrismaService } from '../../prisma/prisma.service';
import { LiveQuotationsResponse, QuotationDetailResponse, PriceBookResponse, RateCardItem } from '../interfaces/quotation.interface';
import { CreateQuoteDto } from '../dto/create-quote.dto';
import { CreateRateCardDto } from '../../pricing/dto/create-rate-card.dto';
import { PricingService } from '../../pricing/services/pricing.service';
import { ApprovalService } from '../../approval/services/approval.service';
export declare class QuotationService {
    private readonly pricingService;
    private readonly approvalService;
    private readonly prisma;
    constructor(pricingService: PricingService, approvalService: ApprovalService, prisma: PrismaService);
    getLiveQuotations(statusFilter?: string, page?: number): Promise<LiveQuotationsResponse>;
    getQuotationDetails(quoteId: string): Promise<QuotationDetailResponse>;
    createNewQuotation(dto: CreateQuoteDto): Promise<QuotationDetailResponse>;
    addItemToQuotation(quoteId: string, itemDto: any): Promise<QuotationDetailResponse>;
    private recalculateQuoteTotals;
    createBlankQuote(dto: CreateQuoteDto): Promise<QuotationDetailResponse>;
    appendItemsToVersion(quoteId: string, vid: string, itemDtos: any[]): Promise<QuotationDetailResponse>;
    syncItems(quoteId: string, itemDtos: any[]): Promise<QuotationDetailResponse>;
    forceCalculation(quoteId: string, calcDto: any): Promise<any>;
    createApprovalRequest(quoteId: string, approvalDto: any): Promise<any>;
    publishProposal(quoteId: string): Promise<any>;
    getQuotationHistoryPriceBook(category?: string): Promise<PriceBookResponse>;
    createPriceBookRate(dto: CreateRateCardDto): Promise<RateCardItem>;
}
