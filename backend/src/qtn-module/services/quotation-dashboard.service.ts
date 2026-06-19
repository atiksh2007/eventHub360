import { Injectable } from '@nestjs/common';
import { 
  DashboardSummaryResponse, 
  RecentQuotationRow, 
  PendingApprovalRow, 
  SalesExecutiveRow
} from '../interfaces/dashboard.interface';

import { 
  LiveQuotationsResponse, 
  LiveQuotationRow 
} from '../interfaces/quotation.interface'

@Injectable()
export class QuotationDashboardService {

  async getDashboardSummary(): Promise<DashboardSummaryResponse> {
    return {
      kpiCards: {
        totalQuotations: { amount: "$12.4M", trendPct: "+12.4%" },
        revenuePipeline: { amount: "$8.2M", trendPct: "+5.2%" },
        avgQuoteValue: { amount: "$145k", trendPct: "-2.1%" },
        conversionRate: { percentage: "48%", trendPct: "+8.0%" }
      },
      statusCounters: { drafts: 24, sent: 85, accepted: 42, expired: 12 },
      conversionFunnel: {
        leadsQualified: 1240,
        quotesCreated: 482,
        quotesSent: 163,
        contractsSigned: 42,
        quoteSentPct: "33.8%",
        closingRatePct: "25.7%"
      }
    };
  }

  async getRecentQuotations(): Promise<RecentQuotationRow[]> {
    return [
      { quoteId: "#QUO-8921", client: "Skyline Ventures", amount: "$24,500", status: "Accepted" },
      { quoteId: "#QUO-8919", client: "Prism Logistics", amount: "$18,200", status: "Sent" },
      { quoteId: "#QUO-8918", client: "NexGen Media", amount: "$115,000", status: "Draft" }
    ];
  }

  async getPendingApprovals(): Promise<PendingApprovalRow[]> {
    return [
      { title: "Grand Ballroom Wedding Gala", creator: "Created by Sarah Miller • 2h ago", amount: "$45,200", badgeType: "HIGH PRIORITY" },
      { title: "Tech Summit 2024 - 3 Day Event", creator: "Created by Marcus Chen • 5h ago", amount: "$128,500", badgeType: "STANDARD" },
      { title: "Global Finance Round Table", creator: "Created by Elena Rossi • Yesterday", amount: "$12,800", badgeType: "ESCALATED" }
    ];
  }
  // Supplies ranking arrays matching the Top Sales Executives panel exactly
  async getTopSalesExecutives(): Promise<SalesExecutiveRow[]> {
    return [
      { rank: 1, name: "Sarah Miller", revenue: "$3.2M" },
      { rank: 2, name: "David Brooks", revenue: "$2.8M" },
      { rank: 3, name: "Elena Rossi", revenue: "$2.4M" }
    ];
  }


async getLiveQuotations(statusFilter?: string, page: number = 1): Promise<LiveQuotationsResponse> {
    const allRows: LiveQuotationRow[] = [
      {
        quoteNumber: "#QT-2024-8841",
        clientName: "Alpha Solutions Inc.",
        clientInitials: "AS",
        eventType: "Corporate Gala",
        eventDate: "Nov 12, 2024",
        totalAmount: "$124,500.00",
        marginPct: "24.5%",
        status: "Accepted"
      },
      {
        quoteNumber: "#QT-2024-8842",
        clientName: "BlueTech Ventures",
        clientInitials: "BT",
        eventType: "Product Launch",
        eventDate: "Dec 05, 2024",
        totalAmount: "$45,200.00",
        marginPct: "18.2%",
        status: "Sent"
      },
      {
        quoteNumber: "#QT-2024-8845",
        clientName: "Echelon Luxury",
        clientInitials: "EL",
        eventType: "VIP Retreat",
        eventDate: "Jan 18, 2025",
        totalAmount: "$12,800.00",
        marginPct: "32.0%",
        status: "Draft"
      },
      {
        quoteNumber: "#QT-2024-8830",
        clientName: "Urban Media",
        clientInitials: "UM",
        eventType: "Street Festival",
        eventDate: "Oct 20, 2024",
        totalAmount: "$68,000.00",
        marginPct: "15.5%",
        status: "Expired"
      }
    ];

    const filteredRows = statusFilter && statusFilter !== 'all'
      ? allRows.filter(row => row.status.toLowerCase() === statusFilter.toLowerCase())
      : allRows;

    return {
      rows: filteredRows,
      totalRecords: 124,
      currentPage: page,
      totalPages: 3,
      summaryMetrics: {
        totalPipeline: "$2,840,000",
        conversionRate: "68.2%",
        avgTurnaround: "1.4 Days"
      }
    };
  }

}