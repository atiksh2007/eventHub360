import { PrismaService } from '../../prisma/prisma.service';
import { AuditLogService } from '../../audit-log/services/audit-log.service';
export declare class ProposalService {
    private prisma;
    private readonly auditLogService;
    private s3;
    constructor(prisma: PrismaService, auditLogService: AuditLogService);
    getProposalById(id: string): Promise<{
        id: string;
        message: string;
    }>;
    generatePdf(data: any): Promise<{
        success: boolean;
        url: string;
        documentId: string;
    }>;
}
