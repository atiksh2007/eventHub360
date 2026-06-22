// src/proposal/proposal.module.ts

import { Module } from '@nestjs/common';
// FIX 1: Change to 'proposal.service' (matches your filename)
import { ProposalService } from './services/proposal-integration.service'; 
// FIX 2: Change to 'proposals.controller' (matches your filename)
import { ProposalsController } from './controllers/proposals.controller'; 
import { QuotationModule } from '../quotation/quotation.module';

@Module({
  imports: [QuotationModule],
  controllers: [ProposalsController],
  providers: [ProposalService],
  exports: [ProposalService],
})
export class ProposalModule {}