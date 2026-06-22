import { Module, forwardRef } from '@nestjs/common';
import { QuotationController } from './controllers/quotation.controller';
import { DashboardController } from './controllers/dashboard.controller';
import { QuotationService } from './services/quotation.service';
import { QuotationDashboardService } from './services/quotation-dashboard.service';
import { PricingModule } from '../pricing/pricing.module';
import { ApprovalModule } from '../approval/approval.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule, 
    PricingModule, 
    forwardRef(() => ApprovalModule)
  ],
  controllers: [QuotationController, DashboardController],
  providers: [QuotationService, QuotationDashboardService],
  exports: [QuotationService],
})
export class QuotationModule {}