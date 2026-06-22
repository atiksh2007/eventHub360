export interface KpiCard {
  amount: string;
  trendPct: string;
}

export interface StatusCounters {
  drafts: number;
  sent: number;
  accepted: number;
  expired: number;
}

export interface FunnelMetrics {
  leadsQualified: number;
  quotesCreated: number;
  quotesSent: number;
  contractsSigned: number;
  quoteSentPct: string;
  closingRatePct: string;
}

export interface DashboardSummaryResponse {
  kpiCards: {
    totalQuotations: KpiCard;
    revenuePipeline: KpiCard;
    avgQuoteValue: KpiCard;
    conversionRate: { percentage: string; trendPct: string };
  };
  statusCounters: StatusCounters;
  conversionFunnel: FunnelMetrics;
}

export interface RecentQuotationRow {
  quoteId: string;
  client: string;
  amount: string;
  status: 'Accepted' | 'Sent' | 'Draft' | 'Expired';
}

export interface PendingApprovalRow {
  title: string;
  creator: string;
  amount: string;
  badgeType: 'HIGH PRIORITY' | 'STANDARD' | 'ESCALATED';
}
export interface SalesExecutiveRow {
  rank: number;
  name: string;
  revenue: string;
}