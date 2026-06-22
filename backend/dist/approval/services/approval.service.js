"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ApprovalService = class ApprovalService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    serializeBigInt(obj) {
        return JSON.parse(JSON.stringify(obj, (key, value) => typeof value === 'bigint' ? value.toString() : value));
    }
    async getApprovalDetails(quoteId) {
        const qId = BigInt(quoteId.replace(/\D/g, ''));
        const approvalRecord = await this.prisma.quoteApproval.findFirst({
            where: { quotation_id: qId },
            orderBy: { created_at: 'desc' },
            include: { quotation: true }
        });
        if (!approvalRecord) {
            throw new common_1.NotFoundException(`Approval track for ${quoteId} not found.`);
        }
        return this.serializeBigInt(approvalRecord);
    }
    async initializeApprovalTrack(params) {
        const qId = BigInt(params.quoteNumber.replace(/\D/g, ''));
        await this.cancelApprovalWorkflow(params.quoteNumber);
        const approval = await this.prisma.quoteApproval.create({
            data: {
                quotation_id: qId,
                status: 'pending',
                tenant_id: 'system_default'
            }
        });
        return this.serializeBigInt(approval);
    }
    async cancelApprovalWorkflow(quoteNumber) {
        const qId = BigInt(quoteNumber.replace(/\D/g, ''));
        await this.prisma.quoteApproval.deleteMany({
            where: { quotation_id: qId, status: 'pending' }
        });
    }
    async processWorkflowAction(quoteId, action, feedback) {
        try {
            const qId = BigInt(quoteId.replace(/\D/g, ''));
            const statusMap = {
                'APPROVE': 'approved',
                'REJECT': 'rejected',
                'DRAFT': 'pending',
                'approve': 'approved',
                'reject': 'rejected',
                'draft': 'pending'
            };
            const actionUpper = action.toUpperCase();
            return await this.prisma.$transaction(async (tx) => {
                await tx.quoteApproval.updateMany({
                    where: { quotation_id: qId, status: 'pending' },
                    data: { status: statusMap[actionUpper] || 'approved', decided_at: new Date() }
                });
                const quoteStatus = actionUpper === 'APPROVE' ? 'SENT' : 'DRAFT';
                const updatedQuote = await tx.quotation.update({
                    where: { quotation_id: qId },
                    data: { status: quoteStatus }
                });
                return this.serializeBigInt({
                    success: true,
                    newStatus: quoteStatus,
                    quotation_id: updatedQuote.quotation_id
                });
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`Quotation or Approval for ID ${quoteId} not found.`);
            }
            throw error;
        }
    }
};
exports.ApprovalService = ApprovalService;
exports.ApprovalService = ApprovalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ApprovalService);
//# sourceMappingURL=approval.service.js.map