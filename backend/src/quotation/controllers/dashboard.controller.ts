import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { QuotationDashboardService } from '../services/quotation-dashboard.service';
import { 
  DashboardSummaryResponse, 
  RecentQuotationRow, 
  PendingApprovalRow, 
  SalesExecutiveRow 
} from '../interfaces/dashboard.interface'; // Importing interfaces!

@Controller('dashboard') // All routes below will automatically start with /api/dashboard
export class DashboardController {
  constructor(private readonly dashboardService: QuotationDashboardService) {}

  /**
   * GET /api/dashboard/dashboard-summary
   * Serves top metric summary cards
   */
  @Get('dashboard-summary')
  @HttpCode(HttpStatus.OK)
  async getSummary(): Promise<DashboardSummaryResponse> {
    return await this.dashboardService.getDashboardSummary();
  }

  /**
   * GET /api/dashboard/recent
   * Serves the recent activity table rows
   */
  @Get('recent')
  @HttpCode(HttpStatus.OK)
  async getRecent(): Promise<RecentQuotationRow[]> {
    return await this.dashboardService.getRecentQuotations();
  }

  /**
   * GET /api/dashboard/pending-approvals
   * Serves the middle pending grid panel
   */
  @Get('pending-approvals')
  @HttpCode(HttpStatus.OK)
  async getApprovals(): Promise<PendingApprovalRow[]> {
    return await this.dashboardService.getPendingApprovals();
  }

  /**
   * GET /api/dashboard/top-executives
   * Serves the list of high-performing sales employees displayed at the bottom right
   */
  @Get('top-executives')
  @HttpCode(HttpStatus.OK)
  async getTopExecutives(): Promise<SalesExecutiveRow[]> {
    return await this.dashboardService.getTopSalesExecutives();
  }
}