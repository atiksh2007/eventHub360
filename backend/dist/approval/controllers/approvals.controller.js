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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../shared/auth/jwt-auth.guard");
const approval_service_1 = require("../services/approval.service");
const update_approval_dto_1 = require("../dto/update-approval.dto");
let ApprovalController = class ApprovalController {
    constructor(approvalService) {
        this.approvalService = approvalService;
    }
    verifyTenantId(tenantId) {
        if (!tenantId || tenantId.trim() === '') {
            throw new common_1.BadRequestException('Tenant ID claim is required for resource isolation.');
        }
    }
    async getApprovalWorkspaceDetails(id, tenantId) {
        this.verifyTenantId(tenantId);
        return await this.approvalService.getApprovalDetails(id);
    }
    async updateApprovalState(appId, body, tenantId) {
        this.verifyTenantId(tenantId);
        const normalizedAction = body.action.toUpperCase();
        return await this.approvalService.processWorkflowAction(appId, normalizedAction, body.feedback);
    }
};
exports.ApprovalController = ApprovalController;
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ApprovalController.prototype, "getApprovalWorkspaceDetails", null);
__decorate([
    (0, common_1.Patch)(':app_id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('app_id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_approval_dto_1.UpdateApprovalDto, String]),
    __metadata("design:returntype", Promise)
], ApprovalController.prototype, "updateApprovalState", null);
exports.ApprovalController = ApprovalController = __decorate([
    (0, common_1.Controller)('approvals'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [approval_service_1.ApprovalService])
], ApprovalController);
//# sourceMappingURL=approvals.controller.js.map