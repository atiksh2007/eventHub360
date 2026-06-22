import { Module, forwardRef } from '@nestjs/common';
import { ApprovalService } from './services/approval.service';
import { ApprovalController } from './controllers/approvals.controller';
import { QuotationModule } from '../quotation/quotation.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, forwardRef(() => QuotationModule)],
  controllers: [ApprovalController],
  providers: [ApprovalService],
  exports: [ApprovalService],
})
export class ApprovalModule {}