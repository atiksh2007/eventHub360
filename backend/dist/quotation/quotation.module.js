"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotationModule = void 0;
const common_1 = require("@nestjs/common");
const bullmq_1 = require("@nestjs/bullmq");
const quotation_controller_1 = require("./controllers/quotation.controller");
const dashboard_controller_1 = require("./controllers/dashboard.controller");
const quotation_service_1 = require("./services/quotation.service");
const quotation_dashboard_service_1 = require("./services/quotation-dashboard.service");
const pricing_module_1 = require("../pricing/pricing.module");
const approval_module_1 = require("../approval/approval.module");
const prisma_module_1 = require("../prisma/prisma.module");
const quotation_processor_1 = require("./jobs/quotation.processor");
let QuotationModule = class QuotationModule {
};
exports.QuotationModule = QuotationModule;
exports.QuotationModule = QuotationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            pricing_module_1.PricingModule,
            (0, common_1.forwardRef)(() => approval_module_1.ApprovalModule),
            bullmq_1.BullModule.registerQueue({
                name: 'quotations',
            }),
        ],
        controllers: [quotation_controller_1.QuotationController, dashboard_controller_1.DashboardController],
        providers: [quotation_service_1.QuotationService, quotation_dashboard_service_1.QuotationDashboardService, quotation_processor_1.QuotationProcessor],
        exports: [quotation_service_1.QuotationService],
    })
], QuotationModule);
//# sourceMappingURL=quotation.module.js.map