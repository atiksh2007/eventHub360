import { LiveQuotationsResponse, QuotationDetailResponse, PriceBookResponse, RateCardItem } from '../interfaces/quotation.interface';
import { CreateQuotationDto } from '../dto/create-quotation.dto';
import { CreateRateCardDto } from '../dto/create-rate-card.dto';
import { PricingService } from './pricing.service';
export declare class QuotationService {
    private readonly pricingService;
    private quotationCache;
    private approvalCache;
    constructor(pricingService: PricingService);
    setCacheQuote(quoteId: string, quote: any): void;
    getRawQuote(quoteId: string): any;
    getLiveQuotations(statusFilter?: string, page?: number): Promise<LiveQuotationsResponse>;
    getQuotationDetails(quoteId: string): Promise<QuotationDetailResponse>;
    addItemToQuotation(quoteId: string, itemDto: any): Promise<QuotationDetailResponse>;
    createNewQuotation(dto: CreateQuotationDto): Promise<QuotationDetailResponse>;
    createBlankQuote(dto: any): Promise<any>;
    appendItemsToVersion(quoteId: string, vid: string, itemDtos: any[]): Promise<QuotationDetailResponse>;
    forceCalculation(quoteId: string, calcDto: any): Promise<any>;
    createApprovalRequest(quoteId: string, approvalDto: any): Promise<any>;
    publishProposal(quoteId: string): Promise<any>;
    getQuotationHistoryPriceBook(category?: string): Promise<PriceBookResponse>;
    createPriceBookRate(dto: CreateRateCardDto): Promise<RateCardItem>;
}
