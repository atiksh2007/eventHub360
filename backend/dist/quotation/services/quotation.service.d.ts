import { OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Queue } from 'bullmq';
import { LiveQuotationsResponse, QuotationDetailResponse, PriceBookResponse, RateCardItem } from '../interfaces/quotation.interface';
import { CreateQuoteDto } from '../dto/create-quote.dto';
import { CreateRateCardDto } from '../../pricing/dto/create-rate-card.dto';
import { PricingService } from '../../pricing/services/pricing.service';
import { ApprovalService } from '../../approval/services/approval.service';
import { AuditLogService } from '../../audit-log/services/audit-log.service';
export declare class QuotationService implements OnModuleInit {
    private readonly pricingService;
    private readonly approvalService;
    private readonly prisma;
    private readonly quotationQueue;
    private readonly auditLogService;
    constructor(pricingService: PricingService, approvalService: ApprovalService, prisma: PrismaService, quotationQueue: Queue, auditLogService: AuditLogService);
    onModuleInit(): Promise<void>;
    deleteQuote(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getLiveQuotations(statusFilter?: string, page?: number, limit?: number): Promise<LiveQuotationsResponse>;
    getQuotationDetails(quoteId: string): Promise<QuotationDetailResponse>;
    updateQuote(id: string, dto: CreateQuoteDto): Promise<{
        success: boolean;
        message: string;
    }>;
    createNewQuotation(dto: CreateQuoteDto): Promise<QuotationDetailResponse>;
    addItemToQuotation(quoteId: string, itemDto: any): Promise<QuotationDetailResponse>;
    private recalculateQuoteTotals;
    createBlankQuote(dto: CreateQuoteDto): Promise<QuotationDetailResponse>;
    appendItemsToVersion(quoteId: string, vid: string, itemDtos: any[]): Promise<QuotationDetailResponse>;
    syncItems(quoteId: string, itemDtos: any[]): Promise<QuotationDetailResponse>;
    forceCalculation(quoteId: string, calcDto: any): Promise<any>;
    createApprovalRequest(quoteId: string, approvalDto: any): Promise<any>;
    publishProposal(quoteId: string): Promise<any>;
    private mockVenues;
    getQuotationHistoryPriceBook(category?: string): Promise<PriceBookResponse>;
    createPriceBookRate(dto: CreateRateCardDto): Promise<RateCardItem>;
}
