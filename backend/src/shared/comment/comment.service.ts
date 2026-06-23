import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class CommentService {
  constructor(
    private prisma: PrismaService,
    private notificationService: NotificationService
  ) {}

  async getComments(quotationId: number, tenantId: string) {
    return this.prisma.quotationComment.findMany({
      where: {
        quotation_id: BigInt(quotationId),
        tenant_id: tenantId,
      },
      orderBy: {
        created_at: 'asc'
      }
    });
  }

  async addComment(data: {
    quotationId: number;
    userId?: number;
    clientEmail?: string;
    content: string;
    isPrivate: boolean;
    tenantId: string;
  }) {
    const comment = await this.prisma.quotationComment.create({
      data: {
        quotation_id: BigInt(data.quotationId),
        user_id: data.userId ? BigInt(data.userId) : null,
        client_email: data.clientEmail,
        content: data.content,
        is_private: data.isPrivate,
        tenant_id: data.tenantId,
      }
    });

    // Mention Parser Engine
    const mentionRegex = /@(\w+)/g;
    const mentions = [...data.content.matchAll(mentionRegex)].map(m => m[1]);
    
    if (mentions.length > 0) {
      // For demonstration, we'll assign the mention notification to user_id: 1 (the default test user)
      // In production, we would query the identity provider or local DB for the mentioned username to get their ID.
      for (const mention of mentions) {
        await this.notificationService.createNotification({
          userId: 1, 
          title: 'Mentioned You',
          description: `You were mentioned in a discussion by ${data.clientEmail || 'a colleague'}: "${data.content.substring(0, 50)}..."`,
          type: 'mention',
          referenceId: data.quotationId,
          tenantId: data.tenantId
        });
      }
    }

    return comment;
  }
}
