// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QtnModule } from './qtn-module/qtn.module';
import { PrismaModule } from './prisma/prisma.module';
//import { QuotationModule } from './modules/quotation/quotation.module';
@Module({
  imports: [
    // Ingests local configuration keys from your .env file securely
    ConfigModule.forRoot({ isGlobal: true }),
    QtnModule,
    PrismaModule
    //QuotationModule,
  ],
})
export class AppModule {}