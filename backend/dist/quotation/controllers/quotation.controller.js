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
exports.QuotationController = void 0;
const common_1 = require("@nestjs/common");
const quotation_service_1 = require("../services/quotation.service");
const create_quote_dto_1 = require("../dto/create-quote.dto");
const add_item_dto_1 = require("../dto/add-item.dto");
const calculate_quote_dto_1 = require("../../pricing/dto/calculate-quote.dto");
const create_approval_dto_1 = require("../../approval/dto/create-approval.dto");
const create_rate_card_dto_1 = require("../../pricing/dto/create-rate-card.dto");
const approval_service_1 = require("../../approval/services/approval.service");
let QuotationController = class QuotationController {
    constructor(qtnService, approvalService) {
        this.qtnService = qtnService;
        this.approvalService = approvalService;
    }
    verifyTenantId(tenantId) {
        if (!tenantId || tenantId.trim() === '') {
            throw new common_1.BadRequestException('Tenant ID claim is required for authentication and resource isolation.');
        }
    }
    async createQuote(dto, tenantId) {
        this.verifyTenantId(tenantId);
        return await this.qtnService.createBlankQuote(dto);
    }
    async updateQuote(id, dto, tenantId) {
        this.verifyTenantId(tenantId);
        return await this.qtnService.updateQuote(id, dto);
    }
    async appendItems(id, vid, dto, tenantId) {
        this.verifyTenantId(tenantId);
        return await this.qtnService.appendItemsToVersion(id, vid, dto.items);
    }
    async syncItems(id, dto, tenantId) {
        this.verifyTenantId(tenantId);
        return await this.qtnService.syncItems(id, dto.items);
    }
    async calculateQuote(id, dto, tenantId) {
        this.verifyTenantId(tenantId);
        return await this.qtnService.forceCalculation(id, dto);
    }
    async requestApproval(id, dto, tenantId) {
        this.verifyTenantId(tenantId);
        return await this.qtnService.createApprovalRequest(id, dto);
    }
    async publishProposal(id, tenantId) {
        this.verifyTenantId(tenantId);
        return await this.qtnService.publishProposal(id);
    }
    async deleteQuote(id, tenantId) {
        this.verifyTenantId(tenantId);
        return await this.qtnService.deleteQuote(id);
    }
    async getHistoryPriceBook(category, tenantId) {
        this.verifyTenantId(tenantId);
        return await this.qtnService.getQuotationHistoryPriceBook(category);
    }
    async createNewRateCard(createRateDto, tenantId) {
        this.verifyTenantId(tenantId);
        return await this.qtnService.createPriceBookRate(createRateDto);
    }
    async getLiveList(status, page, limit, tenantId) {
        this.verifyTenantId(tenantId);
        const pageNum = page ? parseInt(page, 10) : 1;
        const limitNum = limit ? parseInt(limit, 10) : 10;
        return await this.qtnService.getLiveQuotations(status, pageNum, limitNum);
    }
    async getDetails(id, tenantId) {
        this.verifyTenantId(tenantId);
        return await this.qtnService.getQuotationDetails(id);
    }
    async getWorkflowTrack(id, tenantId) {
        this.verifyTenantId(tenantId);
        return await this.approvalService.getApprovalDetails(id);
    }
    async handleWorkflowAction(id, action, feedback, tenantId) {
        this.verifyTenantId(tenantId);
        const allowedActions = ['APPROVE', 'REJECT', 'DRAFT'];
        if (!action || !allowedActions.includes(action.toUpperCase())) {
            throw new common_1.BadRequestException('Action must be one of: APPROVE, REJECT, DRAFT');
        }
        return await this.approvalService.processWorkflowAction(id, action.toUpperCase(), feedback);
    }
};
exports.QuotationController = QuotationController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_quote_dto_1.CreateQuoteDto, String]),
    __metadata("design:returntype", Promise)
], QuotationController.prototype, "createQuote", null);
__decorate([
    (0, common_1.Post)(':id/update'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_quote_dto_1.CreateQuoteDto, String]),
    __metadata("design:returntype", Promise)
], QuotationController.prototype, "updateQuote", null);
__decorate([
    (0, common_1.Post)(':id/versions/:vid/items'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('vid')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, add_item_dto_1.AddLineItemsDto, String]),
    __metadata("design:returntype", Promise)
], QuotationController.prototype, "appendItems", null);
__decorate([
    (0, common_1.Post)(':id/sync-items'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], QuotationController.prototype, "syncItems", null);
__decorate([
    (0, common_1.Post)(':id/calculate'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, calculate_quote_dto_1.CalculateQuoteDto, String]),
    __metadata("design:returntype", Promise)
], QuotationController.prototype, "calculateQuote", null);
__decorate([
    (0, common_1.Post)(':id/approvals'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_approval_dto_1.CreateApprovalDto, String]),
    __metadata("design:returntype", Promise)
], QuotationController.prototype, "requestApproval", null);
__decorate([
    (0, common_1.Post)(':id/publish'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], QuotationController.prototype, "publishProposal", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], QuotationController.prototype, "deleteQuote", null);
__decorate([
    (0, common_1.Get)('history-pricebook'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)('category')),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], QuotationController.prototype, "getHistoryPriceBook", null);
__decorate([
    (0, common_1.Post)('history-pricebook/create'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rate_card_dto_1.CreateRateCardDto, String]),
    __metadata("design:returntype", Promise)
], QuotationController.prototype, "createNewRateCard", null);
__decorate([
    (0, common_1.Get)('live-list'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], QuotationController.prototype, "getLiveList", null);
__decorate([
    (0, common_1.Get)('details/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], QuotationController.prototype, "getDetails", null);
__decorate([
    (0, common_1.Get)(':id/workflow-track'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], QuotationController.prototype, "getWorkflowTrack", null);
__decorate([
    (0, common_1.Post)(':id/workflow-action'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('action')),
    __param(2, (0, common_1.Body)('feedback')),
    __param(3, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], QuotationController.prototype, "handleWorkflowAction", null);
exports.QuotationController = QuotationController = __decorate([
    (0, common_1.Controller)('quotes'),
    __metadata("design:paramtypes", [quotation_service_1.QuotationService,
        approval_service_1.ApprovalService])
], QuotationController);
//# sourceMappingURL=quotation.controller.js.map