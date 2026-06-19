import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { QuotationApprovalDetail } from '../interfaces/quotation.interface';
export declare class ApprovalService implements OnModuleInit {
    private readonly moduleRef;
    private approvalCache;
    private qtnService;
    constructor(moduleRef: ModuleRef);
    onModuleInit(): void;
    getApprovalDetails(quoteNumber: string): Promise<QuotationApprovalDetail>;
    initializeApprovalTrack(params: {
        quoteNumber: string;
        eventName: string;
        totalValue: string;
        priority: 'High' | 'Medium' | 'Low';
        requester: string;
        executiveSummary: string;
        activeStepName: string;
        tier: string;
    }): QuotationApprovalDetail;
    cancelApprovalWorkflow(quoteNumber: string): void;
    processWorkflowAction(quoteNumber: string, action: string, feedback?: string): Promise<QuotationApprovalDetail>;
}
