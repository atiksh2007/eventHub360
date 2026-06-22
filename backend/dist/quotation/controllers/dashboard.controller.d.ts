import { QuotationDashboardService } from '../services/quotation-dashboard.service';
import { DashboardSummaryResponse, RecentQuotationRow, PendingApprovalRow, SalesExecutiveRow } from '../interfaces/dashboard.interface';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: QuotationDashboardService);
    getSummary(): Promise<DashboardSummaryResponse>;
    getRecent(): Promise<RecentQuotationRow[]>;
    getApprovals(): Promise<PendingApprovalRow[]>;
    getTopExecutives(): Promise<SalesExecutiveRow[]>;
}
