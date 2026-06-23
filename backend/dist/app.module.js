"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("./prisma/prisma.module");
const quotation_module_1 = require("./quotation/quotation.module");
const pricing_module_1 = require("./pricing/pricing.module");
const approval_module_1 = require("./approval/approval.module");
const proposal_module_1 = require("./proposal/proposal.module");
const bullmq_1 = require("@nestjs/bullmq");
const auth_module_1 = require("./shared/auth/auth.module");
const core_1 = require("@nestjs/core");
const roles_guard_1 = require("./shared/auth/roles.guard");
const tenant_interceptor_1 = require("./shared/interceptors/tenant.interceptor");
const jwt_auth_guard_1 = require("./shared/auth/jwt-auth.guard");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            prisma_module_1.PrismaModule,
            bullmq_1.BullModule.forRoot({
                connection: {
                    host: process.env.REDIS_HOST || '127.0.0.1',
                    port: parseInt(process.env.REDIS_PORT || '6379'),
                },
            }),
            auth_module_1.AuthModule,
            quotation_module_1.QuotationModule,
            pricing_module_1.PricingModule,
            approval_module_1.ApprovalModule,
            proposal_module_1.ProposalModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: tenant_interceptor_1.TenantInterceptor,
            }
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map