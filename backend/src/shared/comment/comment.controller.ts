import { Controller, Get, Post, Param, Body, Req } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Public } from '../auth/public.decorator';

@Controller('quotes/:id/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getComments(@Param('id') quotationId: string, @Req() req: any) {
    const tenantId = req.tenantContext?.tenant_id || 'default-tenant-hub'; // Fallback for public links if needed
    const comments = await this.commentService.getComments(Number(quotationId), tenantId);
    
    return comments.map(c => ({
      ...c,
      comment_id: c.comment_id.toString(),
      quotation_id: c.quotation_id.toString(),
      user_id: c.user_id?.toString()
    }));
  }

  // @Public() allows clients to post comments via the public proposal link
  @Public()
  @Post()
  async addComment(
    @Param('id') quotationId: string,
    @Body('content') content: string,
    @Body('isPrivate') isPrivate: boolean,
    @Body('clientEmail') clientEmail: string,
    @Req() req: any
  ) {
    // If JWT exists, use it. Otherwise, it's a client.
    const userId = req.user?.userId;
    const tenantId = req.tenantContext?.tenant_id || req.headers['x-tenant-id'] || 'default-tenant-hub';

    const comment = await this.commentService.addComment({
      quotationId: Number(quotationId),
      userId,
      clientEmail,
      content,
      isPrivate: isPrivate ?? true,
      tenantId
    });

    return {
      ...comment,
      comment_id: comment.comment_id.toString(),
      quotation_id: comment.quotation_id.toString(),
      user_id: comment.user_id?.toString()
    };
  }
}
