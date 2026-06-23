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

import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { RolesGuard } from './shared/auth/roles.guard';
import { TenantInterceptor } from './shared/interceptors/tenant.interceptor';
import { JwtAuthGuard } from './shared/auth/jwt-auth.guard';

import { NotificationModule } from './shared/notification/notification.module';
import { CommentModule } from './shared/comment/comment.module';

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
    NotificationModule,
    CommentModule,
    
    // Domain-Driven Design (DDD) Bounded Contexts
    QuotationModule,
    PricingModule,
    ApprovalModule,
    ProposalModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // Apply JWT Auth globally by default
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // Apply Role-based access globally
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TenantInterceptor, // Apply Multi-Tenant injection globally
    }
  ]
})
export class AppModule {}