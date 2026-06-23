import { PrismaService } from '../../prisma/prisma.service';
import { NotificationService } from '../../shared/notification/notification.service';
import { AuditLogService } from '../../audit-log/services/audit-log.service';
export declare class ApprovalService {
    private readonly prisma;
    private readonly notificationService;
    private readonly auditLogService;
    constructor(prisma: PrismaService, notificationService: NotificationService, auditLogService: AuditLogService);
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
