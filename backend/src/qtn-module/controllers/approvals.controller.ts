import { Controller, Get, Patch, Body, HttpCode, HttpStatus, Param, Headers, BadRequestException } from '@nestjs/common';
import { ApprovalService } from '../services/approval.service';
import { UpdateApprovalDto } from '../dto/update-approval.dto';

@Controller('approvals')
export class ApprovalController {
  constructor(private readonly approvalService: ApprovalService) {}

  private verifyTenantId(tenantId?: string): void {
    if (!tenantId || tenantId.trim() === '') {
      throw new BadRequestException('Tenant ID claim is required for resource isolation.');
    }
  }

  /**
   * GET /api/v1/approvals/:id
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getApprovalWorkspaceDetails(
    @Param('id') id: string,
    @Headers('x-tenant-id') tenantId: string
  ) {
    this.verifyTenantId(tenantId);
    return await this.approvalService.getApprovalDetails(id);
  }

  /**
   * PATCH /api/v1/approvals/:app_id -> Process operational state adjustments (APPROVE/REJECT/DRAFT)
   */
  @Patch(':app_id')
  @HttpCode(HttpStatus.OK)
  async updateApprovalState(
    @Param('app_id') appId: string,
    @Body() body: UpdateApprovalDto,
    @Headers('x-tenant-id') tenantId: string
  ) {
    this.verifyTenantId(tenantId);
    return await this.approvalService.processWorkflowAction(appId, body.action, body.feedback);
  }
}