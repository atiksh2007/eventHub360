import { PrismaService } from '../../prisma/prisma.service';
export declare class ApprovalService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private serializeBigInt;
    getApprovalDetails(quoteId: string): Promise<any>;
    initializeApprovalTrack(params: {
        quoteNumber: string;
        eventName: string;
        totalValue: string;
        priority: string;
        requester: string;
        executiveSummary: string;
        activeStepName: string;
        tier: string;
    }): Promise<any>;
    cancelApprovalWorkflow(quoteNumber: string): Promise<void>;
    processWorkflowAction(quoteId: string, action: string, feedback?: string): Promise<any>;
}
