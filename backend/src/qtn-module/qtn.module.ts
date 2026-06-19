import { Module } from '@nestjs/common';
import { QuotationController } from './controllers/quotation.controller';
import { DashboardController } from './controllers/dashboard.controller';
import { ApprovalController } from './controllers/approvals.controller'; 

import { QuotationDashboardService } from './services/quotation-dashboard.service';
import { QuotationService } from './services/quotation.service';
import { ApprovalService } from './services/approval.service';
import { PricingService } from './services/pricing.service';

@Module({
  controllers: [
    QuotationController, 
    DashboardController, 
    ApprovalController
  ],
  providers: [
    // 1st: Leaf node dependencies (Zero internal structural injections)
    PricingService,
    
    // 2nd: Base operational domain layers
    QuotationService, 
    
    // 3rd: Aggregator & tracking state-machines running forwardRef contexts
    ApprovalService,
    QuotationDashboardService
  ],
  exports: [QuotationDashboardService], 
})
export class QtnModule {}