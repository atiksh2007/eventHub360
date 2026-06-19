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

    // Apply serialization fix here
    return this.serializeBigInt(approvalRecord);
  }

  async processWorkflowAction(
    quoteId: string, 
    action: 'APPROVE' | 'REJECT' | 'DRAFT', 
    feedback?: string
  ): Promise<any> {
    const qId = BigInt(quoteId.replace(/\D/g, ''));
    const statusMap = { 'APPROVE': 'approved', 'REJECT': 'rejected', 'DRAFT': 'pending' };

    return await this.prisma.$transaction(async (tx) => {
      await tx.quoteApproval.updateMany({
        where: { quotation_id: qId, status: 'pending' },
        data: { status: statusMap[action], decided_at: new Date() }
      });

      const quoteStatus = action === 'APPROVE' ? 'ACCEPTED' : 'DRAFT';
      const updatedQuote = await tx.quotation.update({
        where: { quotation_id: qId },
        data: { status: quoteStatus }
      });

      // Apply serialization fix here as well
      return this.serializeBigInt({ 
        success: true, 
        newStatus: quoteStatus, 
        quotation_id: updatedQuote.quotation_id 
      });
    });
  }
}