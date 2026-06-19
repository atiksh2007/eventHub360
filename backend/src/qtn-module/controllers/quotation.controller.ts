import { Controller, Get, Post, Body, HttpCode, HttpStatus, Query, Param, Headers, BadRequestException } from '@nestjs/common';
import { QuotationService } from '../services/quotation.service';
import { CreateQuoteDto } from '../dto/create-quote.dto';
import { AddLineItemsDto } from '../dto/add-item.dto';
import { CalculateQuoteDto } from '../dto/calculate-quote.dto';
import { CreateApprovalDto } from '../dto/create-approval.dto';
import { CreateRateCardDto } from '../dto/create-rate-card.dto';
import { LiveQuotationsResponse, QuotationDetailResponse, PriceBookResponse, RateCardItem } from '../interfaces/quotation.interface';
import { ApprovalService } from '../services/approval.service';

@Controller('quotes')
export class QuotationController {
  constructor(
    private readonly qtnService: QuotationService,
    private readonly approvalService: ApprovalService
  ) {}

  // Enforces Tenant ID Claim check on endpoints
  private verifyTenantId(tenantId?: string): void {
    if (!tenantId || tenantId.trim() === '') {
      throw new BadRequestException('Tenant ID claim is required for authentication and resource isolation.');
    }
  }

  /**
   * POST /api/v1/quotes -> Initialize a blank structured quote workspace
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createQuote(
    @Body() dto: CreateQuoteDto,
    @Headers('x-tenant-id') tenantId: string
  ): Promise<QuotationDetailResponse> {
    this.verifyTenantId(tenantId);
    return await this.qtnService.createBlankQuote(dto);
  }

  /**
   * POST /api/v1/quotes/:id/versions/:vid/items -> Validate state lock conditions and append array elements safely
   */
  @Post(':id/versions/:vid/items')
  @HttpCode(HttpStatus.OK)
  async appendItems(
    @Param('id') id: string,
    @Param('vid') vid: string,
    @Body() dto: AddLineItemsDto,
    @Headers('x-tenant-id') tenantId: string
  ): Promise<QuotationDetailResponse> {
    this.verifyTenantId(tenantId);
    return await this.qtnService.appendItemsToVersion(id, vid, dto.items);
  }

  /**
   * POST /api/v1/quotes/:id/calculate -> Force manual execution loop of pricing calculations
   */
  @Post(':id/calculate')
  @HttpCode(HttpStatus.OK)
  async calculateQuote(
    @Param('id') id: string,
    @Body() dto: CalculateQuoteDto,
    @Headers('x-tenant-id') tenantId: string
  ) {
    this.verifyTenantId(tenantId);
    return await this.qtnService.forceCalculation(id, dto);
  }

  /**
   * POST /api/v1/quotes/:id/approvals -> Create approval request wrapper
   */
  @Post(':id/approvals')
  @HttpCode(HttpStatus.CREATED)
  async requestApproval(
    @Param('id') id: string,
    @Body() dto: CreateApprovalDto,
    @Headers('x-tenant-id') tenantId: string
  ) {
    this.verifyTenantId(tenantId);
    return await this.qtnService.createApprovalRequest(id, dto);
  }

  /**
   * POST /api/v1/quotes/:id/publish -> Simulate proposal payload lock
   */
  @Post(':id/publish')
  @HttpCode(HttpStatus.OK)
  async publishProposal(
    @Param('id') id: string,
    @Headers('x-tenant-id') tenantId: string
  ) {
    this.verifyTenantId(tenantId);
    return await this.qtnService.publishProposal(id);
  }

  // ==========================================
  // HISTORICAL & UTILITY PATHS
  // ==========================================
  
  @Get('history-pricebook')
  @HttpCode(HttpStatus.OK)
  async getHistoryPriceBook(
    @Query('category') category: string,
    @Headers('x-tenant-id') tenantId: string
  ): Promise<PriceBookResponse> {
    this.verifyTenantId(tenantId);
    return await this.qtnService.getQuotationHistoryPriceBook(category);
  }

  @Post('history-pricebook/create')
  @HttpCode(HttpStatus.CREATED)
  async createNewRateCard(
    @Body() createRateDto: CreateRateCardDto,
    @Headers('x-tenant-id') tenantId: string
  ): Promise<RateCardItem> {
    this.verifyTenantId(tenantId);
    return await this.qtnService.createPriceBookRate(createRateDto);
  }

  @Get('live-list')
  @HttpCode(HttpStatus.OK)
  async getLiveList(
    @Query('status') status: string,
    @Query('page') page: string,
    @Headers('x-tenant-id') tenantId: string
  ): Promise<LiveQuotationsResponse> {
    this.verifyTenantId(tenantId);
    const pageNum = page ? parseInt(page, 10) : 1;
    return await this.qtnService.getLiveQuotations(status, pageNum);
  }

  @Get('details/:id')
  @HttpCode(HttpStatus.OK)
  async getDetails(
    @Param('id') id: string,
    @Headers('x-tenant-id') tenantId: string
  ): Promise<QuotationDetailResponse> {
    this.verifyTenantId(tenantId);
    return await this.qtnService.getQuotationDetails(id);
  }




  // ==========================================
  // WORKFLOW & APPROVALS LAYER
  // ==========================================

  /**
   * GET /quotes/:id/workflow-track -> Fetch real-time visual status steps and logs
   */
  @Get(':id/workflow-track')
  @HttpCode(HttpStatus.OK)
  async getWorkflowTrack(
    @Param('id') id: string,
    @Headers('x-tenant-id') tenantId: string
  ) {
    this.verifyTenantId(tenantId);
    return await this.approvalService.getApprovalDetails(id);
  }

  /**
   * POST /quotes/:id/workflow-action -> Process workflow triggers (APPROVE / REJECT / DRAFT)
   */
  @Post(':id/workflow-action')
  @HttpCode(HttpStatus.OK)
  async handleWorkflowAction(
    @Param('id') id: string,
    @Body('action') action: string,
    @Body('feedback') feedback: string,
    @Headers('x-tenant-id') tenantId: string
  ) {
    this.verifyTenantId(tenantId);
    
    if (!action) {
      throw new BadRequestException('Action field (APPROVE, REJECT, or DRAFT) is required.');
    }
    
    return await this.approvalService.processWorkflowAction(id, action, feedback);
  }



}