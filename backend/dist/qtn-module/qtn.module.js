"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QtnModule = void 0;
const common_1 = require("@nestjs/common");
const quotation_controller_1 = require("./controllers/quotation.controller");
const dashboard_controller_1 = require("./controllers/dashboard.controller");
const approvals_controller_1 = require("./controllers/approvals.controller");
const quotation_dashboard_service_1 = require("./services/quotation-dashboard.service");
const quotation_service_1 = require("./services/quotation.service");
const approval_service_1 = require("./services/approval.service");
const pricing_service_1 = require("./services/pricing.service");
let QtnModule = class QtnModule {
};
exports.QtnModule = QtnModule;
exports.QtnModule = QtnModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            quotation_controller_1.QuotationController,
            dashboard_controller_1.DashboardController,
            approvals_controller_1.ApprovalController
        ],
        providers: [
            pricing_service_1.PricingService,
            quotation_service_1.QuotationService,
            approval_service_1.ApprovalService,
            quotation_dashboard_service_1.QuotationDashboardService
        ],
        exports: [quotation_dashboard_service_1.QuotationDashboardService],
    })
], QtnModule);
//# sourceMappingURL=qtn.module.js.map