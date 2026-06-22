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
exports.QuotationProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const prisma_service_1 = require("../../prisma/prisma.service");
let QuotationProcessor = class QuotationProcessor extends bullmq_1.WorkerHost {
    constructor(prisma) {
        super();
        this.prisma = prisma;
    }
    async process(job) {
        switch (job.name) {
            case 'checkExpiry':
                return this.handleCheckExpiry(job);
            default:
                throw new Error(`Unknown job name: ${job.name}`);
        }
    }
    async handleCheckExpiry(job) {
        const expiredQuotes = await this.prisma.quotation.findMany({
            where: {
                status: 'SENT',
                expires_at: { lt: new Date() }
            }
        });
        for (const quote of expiredQuotes) {
            await this.prisma.quotation.update({
                where: { quotation_id: quote.quotation_id },
                data: { status: 'EXPIRED' }
            });
            console.log(`[Job] Marked quotation Q-${quote.quotation_id} as EXPIRED`);
        }
        return { expiredCount: expiredQuotes.length };
    }
};
exports.QuotationProcessor = QuotationProcessor;
exports.QuotationProcessor = QuotationProcessor = __decorate([
    (0, bullmq_1.Processor)('quotations'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QuotationProcessor);
//# sourceMappingURL=quotation.processor.js.map