import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PrismaService } from '../../prisma/prisma.service';
export declare class QuotationProcessor extends WorkerHost {
    private readonly prisma;
    constructor(prisma: PrismaService);
    process(job: Job<any, any, string>): Promise<any>;
    handleCheckExpiry(job: Job): Promise<{
        expiredCount: number;
    }>;
}
