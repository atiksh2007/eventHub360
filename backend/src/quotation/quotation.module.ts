import { Module, forwardRef } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { QuotationController } from './controllers/quotation.controller';
import { DashboardController } from './controllers/dashboard.controller';
import { QuotationService } from './services/quotation.service';
import { QuotationDashboardService } from './services/quotation-dashboard.service';
import { PricingModule } from '../pricing/pricing.module';
import { ApprovalModule } from '../approval/approval.module';
import { PrismaModule } from '../prisma/prisma.module';
import { QuotationProcessor } from './jobs/quotation.processor';

@Module({
  imports: [
    PrismaModule, 
    PricingModule, 
    forwardRef(() => ApprovalModule),
    BullModule.registerQueue({
      name: 'quotations',
    }),
  ],
  controllers: [QuotationController, DashboardController],
  providers: [QuotationService, QuotationDashboardService, QuotationProcessor],
  exports: [QuotationService],
})
export class QuotationModule {}