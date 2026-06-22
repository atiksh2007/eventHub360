"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProposalModule = void 0;
const common_1 = require("@nestjs/common");
const proposal_integration_service_1 = require("./services/proposal-integration.service");
const proposals_controller_1 = require("./controllers/proposals.controller");
const quotation_module_1 = require("../quotation/quotation.module");
let ProposalModule = class ProposalModule {
};
exports.ProposalModule = ProposalModule;
exports.ProposalModule = ProposalModule = __decorate([
    (0, common_1.Module)({
        imports: [quotation_module_1.QuotationModule],
        controllers: [proposals_controller_1.ProposalsController],
        providers: [proposal_integration_service_1.ProposalService],
        exports: [proposal_integration_service_1.ProposalService],
    })
], ProposalModule);
//# sourceMappingURL=proposal.module.js.map