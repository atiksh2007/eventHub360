export declare class ProposalService {
    getProposalById(id: string): Promise<{
        id: string;
        message: string;
    }>;
}
