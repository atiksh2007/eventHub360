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
exports.QuotationDashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let QuotationDashboardService = class QuotationDashboardService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDashboardSummary() {
        const [drafts, sent, accepted, expired, pendingApproval, allQuotes] = await this.prisma.$transaction([
            this.prisma.quotation.count({ where: { status: { equals: 'Draft', mode: 'insensitive' } } }),
            this.prisma.quotation.count({ where: { status: { equals: 'Sent', mode: 'insensitive' } } }),
            this.prisma.quotation.count({ where: { status: { equals: 'Accepted', mode: 'insensitive' } } }),
            this.prisma.quotation.count({ where: { status: { equals: 'Expired', mode: 'insensitive' } } }),
            this.prisma.quotation.count({ where: { status: { equals: 'PENDING_APPROVAL', mode: 'insensitive' } } }),
            this.prisma.quotation.findMany({ select: { total: true } })
        ]);
        let totalPipelineSum = 0;
        allQuotes.forEach(q => {
            totalPipelineSum += Number(q.total);
        });
        const totalQuotesCount = allQuotes.length;
        const avgQuoteVal = totalQuotesCount > 0 ? totalPipelineSum / totalQuotesCount : 0;
        return {
            kpiCards: {
                totalQuotations: {
                    amount: `$${(totalPipelineSum / 1_000_000).toFixed(1)}M`,
                    trendPct: "+12.4%"
                },
                revenuePipeline: {
                    amount: `$${((totalPipelineSum * 0.65) / 1_000_000).toFixed(1)}M`,
                    trendPct: "+5.2%"
                },
                avgQuoteValue: {
                    amount: `$${(avgQuoteVal / 1000).toFixed(0)}k`,
                    trendPct: "-2.1%"
                },
                conversionRate: {
                    percentage: totalQuotesCount > 0 ? `${Math.round((accepted / totalQuotesCount) * 100)}%` : "0%",
                    trendPct: "+8.0%"
                }
            },
            statusCounters: { drafts, sent, accepted, expired, pendingApproval },
            conversionFunnel: {
                leadsQualified: 1240,
                quotesCreated: totalQuotesCount,
                quotesSent: sent + accepted,
                contractsSigned: accepted,
                quoteSentPct: totalQuotesCount > 0 ? `${((sent / totalQuotesCount) * 100).toFixed(1)}%` : "0.0%",
                closingRatePct: totalQuotesCount > 0 ? `${((accepted / totalQuotesCount) * 100).toFixed(1)}%` : "0.0%"
            }
        };
    }
    async getRecentQuotations() {
        const dbRecent = await this.prisma.quotation.findMany({
            take: 3,
            orderBy: { created_at: 'desc' }
        });
        return dbRecent.map(q => {
            const amtNum = Number(q.total);
            return {
                quoteId: `#QT-${q.quotation_id.toString()}`,
                client: `Lead Client Workspace (ID: ${q.lead_id.toString()})`,
                amount: `$${amtNum.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
                status: q.status
            };
        });
    }
    async getPendingApprovals() {
        const dbPending = await this.prisma.quotation.findMany({
            where: { status: { equals: 'PENDING_APPROVAL', mode: 'insensitive' } },
            take: 3
        });
        if (dbPending.length === 0) {
            return [
                { title: "Grand Ballroom Wedding Gala", creator: "Created by Sarah Miller • 2h ago", amount: "$45,200", badgeType: "HIGH PRIORITY" },
                { title: "Tech Summit 2026 - 3 Day Event", creator: "Created by Marcus Chen • 5h ago", amount: "$128,500", badgeType: "STANDARD" }
            ];
        }
        return dbPending.map(q => {
            const totalAmt = Number(q.total);
            const margin = Number(q.margin);
            let badgeType = 'STANDARD';
            const marginPct = totalAmt > 0 ? (margin / totalAmt) * 100 : 0;
            if (marginPct < 10) {
                badgeType = 'ESCALATED';
            }
            else if (marginPct <= 19) {
                badgeType = 'HIGH PRIORITY';
            }
            else {
                badgeType = 'STANDARD';
            }
            return {
                quoteId: `QT-${q.quotation_id.toString()}`,
                title: q.title || `Event Plan Package for Lead #${q.lead_id.toString()}`,
                creator: `Assigned Account Executive Manager`,
                amount: `$${totalAmt.toLocaleString('en-US', { minimumFractionDigits: 0 })}`,
                badgeType
            };
        });
    }
    async getTopSalesExecutives() {
        return [
            { rank: 1, name: "Sarah Miller", revenue: "$3.2M" },
            { rank: 2, name: "David Brooks", revenue: "$2.8M" },
            { rank: 3, name: "Elena Rossi", revenue: "$2.4M" }
        ];
    }
    async getLiveQuotations(statusFilter, page = 1) {
        const itemsPerPage = 10;
        const skip = (page - 1) * itemsPerPage;
        const whereCondition = {};
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
                quoteNumber: `#QT-${q.quotation_id.toString()}`,
                clientName: `Lead DB Client (ID: ${q.lead_id.toString()})`,
                clientInitials: "CL",
                eventType: "Managed Event Package",
                eventDate: q.expires_at ? q.expires_at.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : "TBD",
                totalAmount: `$${totalNum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                marginPct: `${marginCalculated}%`,
                status: q.status
            };
        });
        return {
            rows: rows,
            totalRecords: totalRecords,
            currentPage: page,
            totalPages: Math.ceil(totalRecords / itemsPerPage) || 1,
            summaryMetrics: {
                totalPipeline: `$${(rows.reduce((sum, r) => sum + Number(r.totalAmount.replace(/[^0-9.-]+/g, "")), 0)).toLocaleString()}`,
                conversionRate: "68.2%",
                avgTurnaround: "1.4 Days"
            }
        };
    }
};
exports.QuotationDashboardService = QuotationDashboardService;
exports.QuotationDashboardService = QuotationDashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QuotationDashboardService);
//# sourceMappingURL=quotation-dashboard.service.js.map