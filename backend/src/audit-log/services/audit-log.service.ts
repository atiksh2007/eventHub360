import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuditLogService {
  constructor(private prisma: PrismaService) {}

  /**
   * Log an event securely to the database.
   */
  async createLog(
    action: string,
    entityType: string,
    entityId: string,
    userName: string,
    tenantId: string,
    details?: any
  ) {
    try {
      await this.prisma.auditLog.create({
        data: {
          action,
          entity_type: entityType,
          entity_id: entityId,
          user_name: userName,
          tenant_id: tenantId,
          details: details ? details : undefined,
        }
      });
    } catch (e) {
      console.error('Failed to write audit log:', e);
    }
  }

  /**
   * Fetch global logs, optionally filtered by quote, user, or action.
   */
  async getGlobalLogs(tenantId: string, filters?: any) {
    const logs = await this.prisma.auditLog.findMany({
      where: { tenant_id: tenantId },
      orderBy: { created_at: 'desc' },
      take: 100, // Limit to recent 100 logs
    });

    return logs.map(log => ({
      id: log.log_id.toString(),
      action: log.action,
      entityType: log.entity_type,
      entityId: log.entity_id,
      userName: log.user_name,
      createdAt: log.created_at,
      details: log.details,
    }));
  }
}
