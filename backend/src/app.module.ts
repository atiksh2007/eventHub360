// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

// Import your new modular contexts
import { QuotationModule } from './quotation/quotation.module';
import { PricingModule } from './pricing/pricing.module';
import { ApprovalModule } from './approval/approval.module';
import { ProposalModule } from './proposal/proposal.module';
import { BullModule } from '@nestjs/bullmq';
import { AuthModule } from './shared/auth/auth.module';

@Module({
  imports: [
    // Global config setup
    ConfigModule.forRoot({ isGlobal: true }),
    
    // Core database layer
    PrismaModule,

    // Background Jobs Queue (Redis)
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: parseInt(process.env.REDIS_PORT || '6379'),
      },
    }),
    
    // Shared Services
    AuthModule,
    
    // Domain-Driven Design (DDD) Bounded Contexts
    QuotationModule,
    PricingModule,
    ApprovalModule,
    ProposalModule,
  ],
})
export class AppModule {}