import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ApprovalService {
  constructor(private readonly prisma: PrismaService) {}

  // Helper to convert BigInts to Strings recursively
  private serializeBigInt(obj: any): any {
    return JSON.parse(JSON.stringify(obj, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    ));
  }

  async getApprovalDetails(quoteId: string): Promise<any> {
    const qId = BigInt(quoteId.replace(/\D/g, ''));
    
    const approvalRecord = await this.prisma.quoteApproval.findFirst({
      where: { quotation_id: qId },
      orderBy: { created_at: 'desc' },
      include: { quotation: true }
    });

    if (!approvalRecord) {
      throw new NotFoundException(`Approval track for ${quoteId} not found.`);
    }

    return this.serializeBigInt(approvalRecord);
  }

  async initializeApprovalTrack(params: {
    quoteNumber: string;
    eventName: string;
    totalValue: string;
    priority: string;
    requester: string;
    executiveSummary: string;
    activeStepName: string;
    tier: string;
  }): Promise<any> {
    const qId = BigInt(params.quoteNumber.replace(/\D/g, ''));
    
    // Cancel any existing pending approval first
    await this.cancelApprovalWorkflow(params.quoteNumber);

    const approval = await this.prisma.quoteApproval.create({
      data: {
        quotation_id: qId,
        status: 'pending',
        tenant_id: 'system_default'
      }
    });

    return this.serializeBigInt(approval);
  }

  async cancelApprovalWorkflow(quoteNumber: string): Promise<void> {
    const qId = BigInt(quoteNumber.replace(/\D/g, ''));
    await this.prisma.quoteApproval.deleteMany({
      where: { quotation_id: qId, status: 'pending' }
    });
  }

  async processWorkflowAction(
    quoteId: string, 
    action: string, 
    feedback?: string
  ): Promise<any> {
    try {
      const qId = BigInt(quoteId.replace(/\D/g, ''));
      const statusMap: Record<string, string> = { 
        'APPROVE': 'approved', 
        'REJECT': 'rejected', 
        'DRAFT': 'pending',
        'approve': 'approved',
        'reject': 'rejected',
        'draft': 'pending'
      };

      const actionUpper = action.toUpperCase();

      return await this.prisma.$transaction(async (tx) => {
        await tx.quoteApproval.updateMany({
          where: { quotation_id: qId, status: 'pending' },
          data: { status: statusMap[actionUpper] || 'approved', decided_at: new Date() }
        });

        const quoteStatus = actionUpper === 'APPROVE' ? 'SENT' : 'DRAFT';
        const updatedQuote = await tx.quotation.update({
          where: { quotation_id: qId },
          data: { status: quoteStatus }
        });

        return this.serializeBigInt({ 
          success: true, 
          newStatus: quoteStatus, 
          quotation_id: updatedQuote.quotation_id 
        });
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Quotation or Approval for ID ${quoteId} not found.`);
      }
      throw error;
    }
  }
}