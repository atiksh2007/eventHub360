import { Module } from '@nestjs/common';
import { PricingService } from '../services/pricing.service';
//import { PricingService } from './services/pricing.service';
// Remove the controller import since the file doesn't exist

@Module({
  // No controllers array here
  providers: [PricingService],
  exports: [PricingService], // This is the important part
})
export class PricingModule {}