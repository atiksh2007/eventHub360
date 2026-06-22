import { QuotationService } from '../services/quotation.service';
import { CreateQuoteDto } from '../dto/create-quote.dto';
import { AddLineItemsDto } from '../dto/add-item.dto';
import { CalculateQuoteDto } from '../../pricing/dto/calculate-quote.dto';
import { CreateApprovalDto } from '../../approval/dto/create-approval.dto';
import { CreateRateCardDto } from '../../pricing/dto/create-rate-card.dto';
import { LiveQuotationsResponse, QuotationDetailResponse, PriceBookResponse, RateCardItem } from '../interfaces/quotation.interface';
import { ApprovalService } from '../../approval/services/approval.service';
export declare class QuotationController {
    private readonly qtnService;
    private readonly approvalService;
    constructor(qtnService: QuotationService, approvalService: ApprovalService);
    private verifyTenantId;
    createQuote(dto: CreateQuoteDto, tenantId: string): Promise<QuotationDetailResponse>;
    appendItems(id: string, vid: string, dto: AddLineItemsDto, tenantId: string): Promise<QuotationDetailResponse>;
    syncItems(id: string, dto: {
        items: any[];
    }, tenantId: string): Promise<QuotationDetailResponse>;
    calculateQuote(id: string, dto: CalculateQuoteDto, tenantId: string): Promise<any>;
    requestApproval(id: string, dto: CreateApprovalDto, tenantId: string): Promise<any>;
    publishProposal(id: string, tenantId: string): Promise<any>;
    getHistoryPriceBook(category: string, tenantId: string): Promise<PriceBookResponse>;
    createNewRateCard(createRateDto: CreateRateCardDto, tenantId: string): Promise<RateCardItem>;
    getLiveList(status: string, page: string, tenantId: string): Promise<LiveQuotationsResponse>;
    getDetails(id: string, tenantId: string): Promise<QuotationDetailResponse>;
    getWorkflowTrack(id: string, tenantId: string): Promise<any>;
    handleWorkflowAction(id: string, action: string, feedback: string, tenantId: string): Promise<any>;
}
