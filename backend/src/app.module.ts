// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

// Import your new modular contexts
import { QuotationModule } from './quotation/quotation.module';
import { PricingModule } from './pricing/pricing.module';
import { ApprovalModule } from './approval/approval.module';
import { ProposalModule } from './proposal/proposal.module';

@Module({
  imports: [
    // Global config setup
    ConfigModule.forRoot({ isGlobal: true }),
    
    // Core database layer
    PrismaModule,
    
    // Domain-Driven Design (DDD) Bounded Contexts
    QuotationModule,
    PricingModule,
    ApprovalModule,
    ProposalModule,
  ],
})
export class AppModule {}