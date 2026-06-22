import { PrismaService } from '../../prisma/prisma.service';
import { DashboardSummaryResponse, RecentQuotationRow, PendingApprovalRow, SalesExecutiveRow } from '../interfaces/dashboard.interface';
import { LiveQuotationsResponse } from '../interfaces/quotation.interface';
export declare class QuotationDashboardService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getDashboardSummary(): Promise<DashboardSummaryResponse>;
    getRecentQuotations(): Promise<RecentQuotationRow[]>;
    getPendingApprovals(): Promise<PendingApprovalRow[]>;
    getTopSalesExecutives(): Promise<SalesExecutiveRow[]>;
    getLiveQuotations(statusFilter?: string, page?: number): Promise<LiveQuotationsResponse>;
}
