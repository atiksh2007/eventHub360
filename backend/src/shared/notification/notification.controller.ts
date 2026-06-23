import { Controller, Get, Patch, Param, Headers, Req } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  async getMyNotifications(@Req() req: any) {
    const userId = req.user.userId;
    const tenantId = req.tenantContext.tenant_id;
    const notifications = await this.notificationService.getNotifications(userId, tenantId);
    
    // Convert BigInt to strings for JSON serialization
    return notifications.map(n => ({
      ...n,
      notification_id: n.notification_id.toString(),
      user_id: n.user_id.toString(),
      reference_id: n.reference_id?.toString()
    }));
  }

  @Patch('read-all')
  async markAllRead(@Req() req: any) {
    const userId = req.user.userId;
    const tenantId = req.tenantContext.tenant_id;
    await this.notificationService.markAllAsRead(userId, tenantId);
    return { success: true };
  }

  @Patch(':id/read')
  async markAsRead(@Param('id') id: string, @Req() req: any) {
    const tenantId = req.tenantContext.tenant_id;
    await this.notificationService.markAsRead(Number(id), tenantId);
    return { success: true };
  }
}
