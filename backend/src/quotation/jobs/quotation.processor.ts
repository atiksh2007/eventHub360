import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PrismaService } from '../../prisma/prisma.service';

@Processor('quotations')
export class QuotationProcessor extends WorkerHost {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    switch (job.name) {
      case 'checkExpiry':
        return this.handleCheckExpiry(job);
      default:
        throw new Error(`Unknown job name: ${job.name}`);
    }
  }

  async handleCheckExpiry(job: Job) {
    // Find quotations that have expired but are still in SENT status
    const expiredQuotes = await this.prisma.quotation.findMany({
      where: {
        status: 'SENT',
        expires_at: { lt: new Date() }
      }
    });

    for (const quote of expiredQuotes) {
      await this.prisma.quotation.update({
        where: { quotation_id: quote.quotation_id },
        data: { status: 'EXPIRED' }
      });
      console.log(`[Job] Marked quotation Q-${quote.quotation_id} as EXPIRED`);
    }

    return { expiredCount: expiredQuotes.length };
  }
}
