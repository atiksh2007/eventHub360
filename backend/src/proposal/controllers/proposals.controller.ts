import { Controller, Get, Param } from '@nestjs/common';
import { ProposalService } from '../services/proposal-integration.service';

@Controller('proposals')
export class ProposalsController {
  constructor(private readonly proposalService: ProposalService) {}

  @Get(':id')
  async getProposal(@Param('id') id: string) {
    return await this.proposalService.getProposalById(id);
  }
}