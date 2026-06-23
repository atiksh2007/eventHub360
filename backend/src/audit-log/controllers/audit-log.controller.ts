import { Controller, Get, Headers, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { AuditLogService } from '../services/audit-log.service';

@Controller('audit-logs')
export class AuditLogController {
  constructor(private readonly auditLogService: AuditLogService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getGlobalLogs(
    @Headers('x-tenant-id') tenantId: string,
    @Query('status') status?: string
  ) {
    // Map default-tenant-hub to system_default since backend hardcodes system_default
    if (!tenantId || tenantId === 'default-tenant-hub') {
      tenantId = 'system_default';
    }
    return await this.auditLogService.getGlobalLogs(tenantId);
  }
}
