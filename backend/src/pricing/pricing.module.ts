import { Module } from '@nestjs/common';
import { PricingService } from './services/pricing.service';
import {  } from './controllers/pricing.controller';

@Module({
  controllers: [],
  providers: [PricingService],
  exports: [PricingService],
})
export class PricingModule {}