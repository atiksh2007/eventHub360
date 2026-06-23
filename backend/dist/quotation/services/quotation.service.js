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
exports.QuotationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const bullmq_1 = require("bullmq");
const bullmq_2 = require("@nestjs/bullmq");
const pricing_service_1 = require("../../pricing/services/pricing.service");
const approval_service_1 = require("../../approval/services/approval.service");
function serializeBigInt(obj) {
    if (obj === null || obj === undefined)
        return obj;
    if (typeof obj === 'bigint')
        return obj.toString();
    if (Array.isArray(obj))
        return obj.map(serializeBigInt);
    if (typeof obj === 'object') {
        const serialized = {};
        for (const key of Object.keys(obj)) {
            serialized[key] = serializeBigInt(obj[key]);
        }
        return serialized;
    }
    return obj;
}
const audit_log_service_1 = require("../../audit-log/services/audit-log.service");
let QuotationService = class QuotationService {
    constructor(pricingService, approvalService, prisma, quotationQueue, auditLogService) {
        this.pricingService = pricingService;
        this.approvalService = approvalService;
        this.prisma = prisma;
        this.quotationQueue = quotationQueue;
        this.auditLogService = auditLogService;
        this.mockVenues = [
            { id: "1", title: "Grand Sapphire Ballroom", tag: "Premium Venue", capacityDetails: "Capacity: up to 500 guests. Features 360-degree mapping and dual staircases.", basePricing: "$12,500", pricingUnit: "day", adjustmentLabel: "+15% Service", adjustmentSubtext: "Estimated Total", estimatedTotal: "$14,375", imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
            { id: "2", title: "Horizon Vista Terrace", tag: "Sky Deck", capacityDetails: "Rooftop access with panoramic city views. Features fire pits and glass railings.", basePricing: "$5,200", pricingUnit: "session", adjustmentLabel: "+10% Service", adjustmentSubtext: "Estimated Total", estimatedTotal: "$5,720", imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
            { id: "3", title: "Innovation Tech Hub", tag: "Conference", capacityDetails: "Theater-style seating for 200. HD projectors, live-streaming ready.", basePricing: "$8,900", pricingUnit: "day", adjustmentLabel: "Included Service", adjustmentSubtext: "Flat Rate", estimatedTotal: "$8,900", imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
            { id: "4", title: "The Verdant Atrium", tag: "Eco-Lounge", capacityDetails: "Indoor garden setting with sustainable climate control and living walls.", basePricing: "$4,500", pricingUnit: "day", adjustmentLabel: "+20% Seasonal", adjustmentSubtext: "Estimated Total", estimatedTotal: "$5,400", imageUrl: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
            { id: "5", title: "The Reserve Cellar", tag: "Private Reserve", capacityDetails: "Intimate underground tasting room. Private barrel backdrop.", basePricing: "$2,800", pricingUnit: "night", adjustmentLabel: "Sommelier Incl.", adjustmentSubtext: "Exclusive Access", estimatedTotal: "$2,800", imageUrl: "https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
            { id: "6", title: "Manor Estate Tent", tag: "Estate Grounds", capacityDetails: "All-weather luxury marquee on estate lawn. Floor-to-ceiling windows.", basePricing: "$15,000", pricingUnit: "event", adjustmentLabel: "+5% Logistics", adjustmentSubtext: "Setup Included", estimatedTotal: "$15,750", imageUrl: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
            { id: "7", title: "Industrial Loft 402", tag: "Urban Chic", capacityDetails: "Flexible studio space for product launches and creative workshops.", basePricing: "$3,200", pricingUnit: "day", adjustmentLabel: "Standard Rate", adjustmentSubtext: "No Surcharge", estimatedTotal: "$3,200", imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }
        ];
    }
    async onModuleInit() {
        await this.quotationQueue.add('checkExpiry', {}, {
            repeat: {
                pattern: '0 */12 * * *'
            }
        });
    }
    async deleteQuote(id) {
        const qid = BigInt(id);
        const quote = await this.prisma.quotation.findUnique({ where: { quotation_id: qid } });
        if (!quote)
            throw new common_1.NotFoundException('Quote not found');
        await this.prisma.quotation.delete({ where: { quotation_id: qid } });
        return { success: true, message: `Quotation ${id} deleted successfully.` };
    }
    async getLiveQuotations(statusFilter, page = 1, limit = 10) {
        const itemsPerPage = limit;
        const skip = (page - 1) * itemsPerPage;
        const whereCondition = { is_active: true };
        if (statusFilter && statusFilter !== 'all') {
            whereCondition.status = { equals: statusFilter, mode: 'insensitive' };
        }
        const [dbQuotes, totalRecords] = await this.prisma.$transaction([
            this.prisma.quotation.findMany({
                where: whereCondition,
                skip: skip,
                take: itemsPerPage,
                orderBy: { created_at: 'desc' },
            }),
            this.prisma.quotation.count({ where: whereCondition })
        ]);
        const rows = dbQuotes.map(q => {
            const totalNum = Number(q.total);
            const marginNum = Number(q.margin);
            const marginCalculated = totalNum > 0 ? ((marginNum / totalNum) * 100).toFixed(1) : "0.0";
            return {
                quoteNumber: `Q-${q.quotation_id.toString()}`,
                clientName: q.title ? q.title.split(' for ')[1] || "Client" : "Client",
                clientInitials: "CL",
                eventType: q.title ? q.title.split(' for ')[0] || "Event" : "Event Plan",
                eventDate: q.event_date || "TBD",
                totalAmount: `$${totalNum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                marginPct: `${marginCalculated}%`,
                status: (q.status.charAt(0).toUpperCase() + q.status.slice(1).toLowerCase())
            };
        });
        return {
            rows: rows,
            totalRecords: totalRecords,
            currentPage: page,
            totalPages: Math.ceil(totalRecords / itemsPerPage) || 1,
            summaryMetrics: {
                totalPipeline: "$2,840,000",
                conversionRate: "68.2%",
                avgTurnaround: "1.4 Days"
            }
        };
    }
    async getQuotationDetails(quoteId) {
        const idVal = quoteId.replace(/\D/g, '');
        if (!idVal) {
            throw new common_1.BadRequestException(`Invalid quote ID format: ${quoteId}`);
        }
        const qId = BigInt(idVal);
        const quotation = await this.prisma.quotation.findUnique({
            where: { quotation_id: qId },
            include: { lines: true }
        });
        if (!quotation) {
            throw new common_1.NotFoundException(`Quotation workspace target #${quoteId} not found.`);
        }
        const categorizedSections = {
            "Venue Selection": [],
            "Floral & Decoration": [],
            "Gourmet Catering": [],
            "Entertainment & Sound": []
        };
        quotation.lines.forEach((item) => {
            const category = item.item_type || 'Custom Requirements';
            const rateNum = Number(item.rate);
            const amountNum = Number(item.amount);
            const mappedLine = {
                id: item.line_id.toString(),
                description: item.description,
                qty: Number(item.qty),
                price: rateNum,
                discount: Number(item.discount_pct || 0),
                total: `$${amountNum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            };
            if (!categorizedSections[category]) {
                categorizedSections[category] = [];
            }
            categorizedSections[category].push(mappedLine);
        });
        const sections = Object.keys(categorizedSections).map(key => ({
            categoryName: key,
            items: categorizedSections[key]
        }));
        const subtotalNum = Number(quotation.subtotal);
        const taxTotalNum = Number(quotation.tax_total);
        const totalNum = Number(quotation.total);
        const marginNum = Number(quotation.margin);
        const marginCalculated = totalNum > 0 ? ((marginNum / totalNum) * 100).toFixed(1) : "0.0";
        const meta = typeof quotation.metadata === 'object' ? quotation.metadata : {};
        return {
            quoteId: `Q-${quotation.quotation_id.toString()}`,
            title: quotation.title || `Event Plan Quote for Lead #${quotation.lead_id.toString()}`,
            clientName: meta?.clientName || (quotation.title ? quotation.title.split(' for ')[1] : undefined),
            eventType: meta?.eventType || (quotation.title ? quotation.title.split(' for ')[0] : undefined),
            eventDate: quotation.event_date || 'TBD',
            expectedGuests: quotation.expected_guests || 'TBD',
            status: quotation.status,
            clientTier: quotation.client_tier || 'NEW CLIENT',
            lastEdited: quotation.updated_at.toLocaleDateString(),
            metadata: meta || {},
            sections: sections,
            summary: {
                subtotal: `$${subtotalNum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                taxes: `$${taxTotalNum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                serviceCharge: `$${Number(quotation.charge_service).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
                totalQuoteValue: `$${totalNum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                netProfitMarginPct: `${marginCalculated}%`
            }
        };
    }
    async updateQuote(id, dto) {
        try {
            const qid = BigInt(id.replace(/\D/g, ''));
            const quote = await this.prisma.quotation.findUnique({ where: { quotation_id: qid } });
            if (!quote)
                throw new common_1.NotFoundException('Quote not found');
            const titleStr = `${dto.eventType || 'Event'} for ${dto.clientName || 'Unknown Client'}`;
            const mergedMetadata = {
                ...(typeof quote.metadata === 'object' ? quote.metadata : {}),
                ...(typeof dto.metadata === 'object' ? dto.metadata : {}),
                clientName: dto.clientName || quote.metadata?.clientName,
                eventType: dto.eventType || quote.metadata?.eventType,
            };
            await this.prisma.quotation.update({
                where: { quotation_id: qid },
                data: {
                    title: titleStr,
                    event_date: dto.eventDate || quote.event_date,
                    expected_guests: dto.expectedGuests ? dto.expectedGuests : quote.expected_guests,
                    metadata: mergedMetadata
                }
            });
            return { success: true, message: `Quotation ${id} updated.` };
        }
        catch (error) {
            console.error('Error in updateQuote:', error);
            throw new common_1.InternalServerErrorException(`Update failed: ${error.message}`);
        }
    }
    async createNewQuotation(dto) {
        try {
            const expiresAt = new Date();
            expiresAt.setMonth(expiresAt.getMonth() + 1);
            const titleStr = `${dto.eventType || 'Event'} for ${dto.clientName || 'Unknown Client'}`;
            const mergedMetadata = {
                ...(typeof dto.metadata === 'object' ? dto.metadata : {}),
                clientName: dto.clientName,
                eventType: dto.eventType,
            };
            const createdQuote = await this.prisma.quotation.create({
                data: {
                    company_id: BigInt(1),
                    lead_id: BigInt(Math.floor(100 + Math.random() * 900)),
                    version: 1,
                    currency: 'USD',
                    title: titleStr,
                    client_tier: 'NEW CLIENT',
                    event_date: dto.eventDate || null,
                    expected_guests: dto.expectedGuests || null,
                    subtotal: 0,
                    tax_total: 0,
                    total: 0,
                    cost_total: 0,
                    margin: 0,
                    status: 'DRAFT',
                    expires_at: expiresAt,
                    tenant_id: 'system_default',
                    metadata: mergedMetadata
                }
            });
            const quoteNum = `Q-${createdQuote.quotation_id.toString()}`;
            await this.auditLogService.createLog('Quote Created', 'quotation', quoteNum, 'System User', 'system_default');
            return await this.getQuotationDetails(quoteNum);
        }
        catch (error) {
            console.error('Error in createNewQuotation:', error);
            throw new common_1.InternalServerErrorException(`Create failed: ${error.message}`);
        }
    }
    async addItemToQuotation(quoteId, itemDto) {
        const idVal = quoteId.replace(/\D/g, '');
        const qId = BigInt(idVal);
        const quotation = await this.prisma.quotation.findUnique({
            where: { quotation_id: qId }
        });
        if (!quotation) {
            throw new common_1.NotFoundException(`Quotation #${quoteId} not found.`);
        }
        if (quotation.status.toUpperCase() === 'PENDING_APPROVAL') {
            await this.prisma.quotation.update({
                where: { quotation_id: qId },
                data: { status: 'DRAFT' }
            });
            this.approvalService.cancelApprovalWorkflow(`Q-${qId.toString()}`);
        }
        const qty = itemDto?.qty !== undefined ? Number(itemDto.qty) : (itemDto?.quantity !== undefined ? Number(itemDto.quantity) : 1);
        const cost = itemDto?.costUnit !== undefined ? Number(itemDto.costUnit) : (itemDto?.price !== undefined ? Number(itemDto.price) * 0.7 : 0);
        const markup = itemDto?.markupPct !== undefined ? Number(itemDto.markupPct) : 0;
        const discount = itemDto?.discount !== undefined ? Number(itemDto.discount) : (itemDto?.discountPct !== undefined ? Number(itemDto.discountPct) : 0);
        const taxRate = itemDto?.taxRatePct !== undefined ? Number(itemDto.taxRatePct) : 18;
        const priceBase = cost * (1 + markup / 100);
        const priceNet = priceBase * qty * (1 - discount / 100);
        const cgst = priceNet * 0.09;
        const sgst = priceNet * 0.09;
        await this.prisma.quotationLine.create({
            data: {
                quotation_id: qId,
                item_type: itemDto?.categoryName || itemDto?.item_type || "Custom Requirements",
                description: itemDto?.description || "Selected Service Package",
                qty: qty,
                rate: priceBase,
                amount: priceNet,
                cost: cost,
                tax_rule_id: 1n,
                markup_pct: markup,
                discount_pct: discount,
                tax_rate_pct: taxRate,
                cgst: cgst,
                sgst: sgst,
                igst: 0,
                tenant_id: 'system_default'
            }
        });
        await this.recalculateQuoteTotals(qId);
        return this.getQuotationDetails(quoteId);
    }
    async recalculateQuoteTotals(quotationId) {
        const lines = await this.prisma.quotationLine.findMany({
            where: { quotation_id: quotationId }
        });
        const quotation = await this.prisma.quotation.findUnique({
            where: { quotation_id: quotationId }
        });
        if (!quotation)
            return;
        let subtotal = 0;
        let taxTotal = 0;
        let costTotal = 0;
        lines.forEach((l) => {
            const lineAmount = Number(l.amount || 0);
            const lineCost = Number(l.cost || 0);
            subtotal += lineAmount;
            taxTotal += lineAmount * (Number(l.tax_rate_pct || 18) / 100);
            costTotal += lineCost * Number(l.qty || 0);
        });
        const discGlobal = Number(quotation.discount_global || 0);
        const serviceCharge = Number(quotation.charge_service || 0);
        const finalTotal = (subtotal - discGlobal) + taxTotal + serviceCharge;
        const margin = subtotal - costTotal;
        await this.prisma.quotation.update({
            where: { quotation_id: quotationId },
            data: {
                subtotal: subtotal,
                tax_total: taxTotal,
                total: finalTotal,
                cost_total: costTotal,
                margin: margin
            }
        });
    }
    async createBlankQuote(dto) {
        return this.createNewQuotation(dto);
    }
    async appendItemsToVersion(quoteId, vid, itemDtos) {
        for (const item of itemDtos) {
            await this.addItemToQuotation(quoteId, item);
        }
        return this.getQuotationDetails(quoteId);
    }
    async syncItems(quoteId, itemDtos) {
        const qId = BigInt(quoteId.replace(/\D/g, ''));
        const quotation = await this.prisma.quotation.findUnique({
            where: { quotation_id: qId }
        });
        if (!quotation) {
            throw new common_1.NotFoundException(`Quotation #${quoteId} not found.`);
        }
        if (quotation.status.toUpperCase() === 'PENDING_APPROVAL') {
            await this.prisma.quotation.update({
                where: { quotation_id: qId },
                data: { status: 'DRAFT' }
            });
            this.approvalService.cancelApprovalWorkflow(`Q-${qId.toString()}`);
        }
        await this.prisma.quotationLine.deleteMany({
            where: { quotation_id: qId }
        });
        for (const item of itemDtos) {
            const qty = item?.qty !== undefined ? Number(item.qty) : (item?.quantity !== undefined ? Number(item.quantity) : 1);
            const cost = item?.costUnit !== undefined ? Number(item.costUnit) : (item?.price !== undefined ? Number(item.price) * 0.7 : 0);
            const markup = item?.markupPct !== undefined ? Number(item.markupPct) : 0;
            const discount = item?.discount !== undefined ? Number(item.discount) : (item?.discountPct !== undefined ? Number(item.discountPct) : 0);
            const taxRate = item?.taxRatePct !== undefined ? Number(item.taxRatePct) : 18;
            const priceBase = item?.price !== undefined ? Number(item.price) : cost * (1 + markup / 100);
            const priceNet = priceBase * qty * (1 - discount / 100);
            const cgst = priceNet * 0.09;
            const sgst = priceNet * 0.09;
            try {
                await this.prisma.quotationLine.create({
                    data: {
                        quotation_id: qId,
                        item_type: item?.categoryName || item?.item_type || "Custom Requirements",
                        description: item?.description || "Selected Service Package",
                        qty: qty,
                        rate: priceBase,
                        amount: priceNet,
                        cost: cost,
                        tax_rule_id: 1n,
                        markup_pct: markup,
                        discount_pct: discount,
                        tax_rate_pct: taxRate,
                        cgst: cgst,
                        sgst: sgst,
                        igst: 0,
                        tenant_id: 'system_default'
                    }
                });
            }
            catch (err) {
                console.error("Prisma error inserting line item:", err);
                throw err;
            }
        }
        await this.recalculateQuoteTotals(qId);
        return this.getQuotationDetails(quoteId);
    }
    async forceCalculation(quoteId, calcDto) {
        const qId = BigInt(quoteId.replace(/\D/g, ''));
        const quotation = await this.prisma.quotation.findUnique({
            where: { quotation_id: qId }
        });
        if (!quotation) {
            throw new common_1.NotFoundException(`Quotation #${quoteId} not found.`);
        }
        if (quotation.status.toUpperCase() === 'PENDING_APPROVAL') {
            await this.prisma.quotation.update({
                where: { quotation_id: qId },
                data: { status: 'DRAFT' }
            });
            this.approvalService.cancelApprovalWorkflow(`Q-${qId.toString()}`);
        }
        await this.prisma.quotation.update({
            where: { quotation_id: qId },
            data: {
                discount_global: calcDto.discountGlobal !== undefined ? Number(calcDto.discountGlobal) : undefined,
                charge_service: calcDto.chargeService !== undefined ? Number(calcDto.chargeService) : undefined
            }
        });
        await this.recalculateQuoteTotals(qId);
        return this.getQuotationDetails(quoteId);
    }
    async createApprovalRequest(quoteId, approvalDto) {
        try {
            const qId = BigInt(quoteId.replace(/\D/g, ''));
            const quotation = await this.prisma.quotation.findUnique({
                where: { quotation_id: qId },
                include: { lines: true }
            });
            if (!quotation) {
                throw new common_1.NotFoundException(`Quotation not found.`);
            }
            let sumCost = 0;
            let sumBase = 0;
            let sumNet = 0;
            quotation.lines.forEach((l) => {
                const qty = Number(l.qty);
                const cost = Number(l.cost);
                const markup = Number(l.markup_pct || 0);
                const disc = Number(l.discount_pct || 0);
                const base = cost * (1 + markup / 100);
                const net = base * qty * (1 - disc / 100);
                sumCost += cost * qty;
                sumBase += base * qty;
                sumNet += net;
            });
            const marginPct = sumNet > 0 ? ((sumNet - sumCost) / sumNet) * 100 : 0;
            const discountPct = sumBase > 0 ? ((sumBase - sumNet) / sumBase) * 100 : 0;
            let tier = '';
            let statusUpdate = '';
            let activeStepName = '';
            let autoPriority = approvalDto.priority || 'STANDARD';
            if (discountPct <= 5 && marginPct >= 20) {
                tier = 'Tier 1 (Auto-Approve)';
                statusUpdate = 'SENT';
                activeStepName = 'Draft';
                autoPriority = 'LOW';
            }
            else if ((discountPct >= 6 && discountPct <= 15) || (marginPct >= 10 && marginPct <= 19)) {
                tier = 'Tier 2 (Sales Manager)';
                statusUpdate = 'PENDING_APPROVAL';
                activeStepName = 'Manager Review';
                autoPriority = 'STANDARD';
            }
            else {
                tier = 'Tier 3 (Company Owner Exception)';
                statusUpdate = 'PENDING_APPROVAL';
                activeStepName = 'Owner Review';
                autoPriority = 'HIGH';
            }
            await this.prisma.quotation.update({
                where: { quotation_id: qId },
                data: { status: statusUpdate }
            });
            return await this.approvalService.initializeApprovalTrack({
                quoteNumber: quoteId,
                eventName: quotation.title || "Custom Event Package",
                totalValue: quotation.total.toString(),
                priority: autoPriority,
                requester: approvalDto.requester,
                executiveSummary: approvalDto.executiveSummary || `Approval request for ${quotation.title} with discount ${discountPct.toFixed(1)}% and margin ${marginPct.toFixed(1)}%.`,
                activeStepName,
                tier
            });
        }
        catch (err) {
            console.error("Error creating approval request:", err);
            throw err;
        }
    }
    async publishProposal(quoteId) {
        const qId = BigInt(quoteId.replace(/\D/g, ''));
        await this.prisma.quotation.update({
            where: { quotation_id: qId },
            data: { status: 'SENT' }
        });
        return { quoteId, status: "PUBLISHED_EXTERNAL", publishedAt: new Date().toISOString() };
    }
    async getQuotationHistoryPriceBook(category) {
        return {
            category: category || "venues",
            totalItems: this.mockVenues.length,
            avgRateLabel: "Avg. Venue Rate",
            avgRateValue: "$7,440",
            items: this.mockVenues
        };
    }
    async createPriceBookRate(dto) {
        const newVenue = {
            id: "VNU-" + Date.now(),
            title: dto.title,
            tag: dto.tag || "VENUE",
            capacityDetails: dto.capacityDetails || "",
            basePricing: dto.basePricing || "$0",
            pricingUnit: dto.pricingUnit || "/day",
            adjustmentLabel: dto.adjustmentLabel || "",
            adjustmentSubtext: dto.adjustmentSubtext || "",
            estimatedTotal: dto.estimatedTotal || "",
            imageUrl: dto.imageUrl || ""
        };
        this.mockVenues.push(newVenue);
        return newVenue;
    }
};
exports.QuotationService = QuotationService;
exports.QuotationService = QuotationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => pricing_service_1.PricingService))),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => approval_service_1.ApprovalService))),
    __param(3, (0, bullmq_2.InjectQueue)('quotations')),
    __metadata("design:paramtypes", [pricing_service_1.PricingService,
        approval_service_1.ApprovalService,
        prisma_service_1.PrismaService,
        bullmq_1.Queue,
        audit_log_service_1.AuditLogService])
], QuotationService);
//# sourceMappingURL=quotation.service.js.map