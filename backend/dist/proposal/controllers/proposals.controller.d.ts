import { ProposalService } from '../services/proposal-integration.service';
export declare class ProposalsController {
    private readonly proposalService;
    constructor(proposalService: ProposalService);
    getProposal(id: string): Promise<{
        id: string;
        message: string;
    }>;
    generateProposal(body: any, req: any): Promise<{
        success: boolean;
        url: string;
        documentId: string;
    }>;
}
