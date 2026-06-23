import { Controller, Get, Param, Post, Body, Req } from '@nestjs/common';
import { ProposalService } from '../services/proposal-integration.service';

@Controller('proposals')
export class ProposalsController {
  constructor(private readonly proposalService: ProposalService) {}

  @Get(':id')
  async getProposal(@Param('id') id: string) {
    return await this.proposalService.getProposalById(id);
  }

  @Post('generate')
  async generateProposal(@Body() body: any, @Req() req: any) {
    const tenantId = req.tenantContext?.tenant_id || 'system_default';
    return await this.proposalService.generatePdf({
      ...body,
      tenantId
    });
  }
}