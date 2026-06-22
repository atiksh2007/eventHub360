import { Module } from '@nestjs/common';
import { QuotationController } from '../quotation/controllers/quotation.controller';
import { DashboardController } from '../quotation/controllers/dashboard.controller';
import { ApprovalController } from '../approval/controllers/approvals.controller'; 

import { QuotationDashboardService } from '../quotation/services/quotation-dashboard.service';
import { QuotationService } from '../quotation/services/quotation.service';
import { ApprovalService } from '../approval/services/approval.service';
import { PricingService } from '../pricing/services/pricing.service';

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