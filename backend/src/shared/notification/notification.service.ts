import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async getNotifications(userId: number, tenantId: string) {
    return this.prisma.notification.findMany({
      where: {
        user_id: BigInt(userId),
        tenant_id: tenantId,
      },
      orderBy: {
        created_at: 'desc'
      },
      take: 50 // Limit to 50 most recent
    });
  }

  async markAsRead(notificationId: number, tenantId: string) {
    return this.prisma.notification.updateMany({
      where: {
        notification_id: BigInt(notificationId),
        tenant_id: tenantId
      },
      data: {
        is_read: true
      }
    });
  }

  async markAllAsRead(userId: number, tenantId: string) {
    return this.prisma.notification.updateMany({
      where: {
        user_id: BigInt(userId),
        tenant_id: tenantId,
        is_read: false
      },
      data: {
        is_read: true
      }
    });
  }

  async createNotification(data: {
    userId: number;
    title: string;
    description: string;
    type: string;
    referenceId?: number;
    tenantId: string;
  }) {
    return this.prisma.notification.create({
      data: {
        user_id: BigInt(data.userId),
        title: data.title,
        description: data.description,
        type: data.type,
        reference_id: data.referenceId ? BigInt(data.referenceId) : null,
        tenant_id: data.tenantId,
        is_read: false
      }
    });
  }
}
