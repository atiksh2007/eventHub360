import { ApprovalService } from '../services/approval.service';
import { UpdateApprovalDto } from '../dto/update-approval.dto';
export declare class ApprovalController {
    private readonly approvalService;
    constructor(approvalService: ApprovalService);
    private verifyTenantId;
    getApprovalWorkspaceDetails(id: string, tenantId: string): Promise<import("../interfaces/quotation.interface").QuotationApprovalDetail>;
    updateApprovalState(appId: string, body: UpdateApprovalDto, tenantId: string): Promise<import("../interfaces/quotation.interface").QuotationApprovalDetail>;
}
