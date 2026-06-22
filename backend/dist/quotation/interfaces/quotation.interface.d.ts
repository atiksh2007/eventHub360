export interface LiveQuotationRow {
    quoteNumber: string;
    clientName: string;
    clientInitials: string;
    eventType: string;
    eventDate: string;
    totalAmount: string;
    marginPct: string;
    status: 'Accepted' | 'Sent' | 'Draft' | 'Expired';
    ownerAvatarUrl?: string;
}
export interface LiveQuotationsResponse {
    rows: LiveQuotationRow[];
    totalRecords: number;
    currentPage: number;
    totalPages: number;
    summaryMetrics: {
        totalPipeline: string;
        conversionRate: string;
        avgTurnaround: string;
    };
}
export interface LineItem {
    id?: string;
    description: string;
    quantity: number;
    unitPrice: number;
    discountPct: number;
    total: string;
}
export interface QuotationSection {
    categoryName: string;
    items: LineItem[];
}
export interface QuotationDetailResponse {
    quoteId: string;
    title: string;
    clientName?: string;
    eventType?: string;
    status: string;
    clientTier: string;
    lastEdited: string;
    eventDate: string;
    expectedGuests: string;
    metadata?: any;
    sections: QuotationSection[];
    summary: {
        subtotal: string;
        taxes: string;
        serviceCharge: string;
        totalQuoteValue: string;
        netProfitMarginPct: string;
    };
}
export interface RateCardItem {
    id: string;
    title: string;
    tag: string;
    capacityDetails: string;
    basePricing: string;
    pricingUnit: string;
    adjustmentLabel: string;
    adjustmentSubtext: string;
    estimatedTotal: string;
    imageUrl: string;
}
export interface PriceBookResponse {
    category: string;
    totalItems: number;
    avgRateLabel: string;
    avgRateValue: string;
    items: RateCardItem[];
}
export interface AddLineItemDto {
    categoryName: string;
    description: string;
    quantity: number;
    unitPrice: number;
    discountPct: number;
}
export interface WorkflowStep {
    name: string;
    status: 'completed' | 'current' | 'upcoming';
    dateLabel?: string;
}
export interface DiscussionComment {
    author: string;
    role: string;
    avatarUrl?: string;
    initials: string;
    time: string;
    text: string;
    isPrivate: boolean;
}
export interface WorkflowHistoryLog {
    action: string;
    subtext: string;
    timestamp: string;
    iconType: string;
}
export interface QuotationApprovalDetail {
    quoteNumber: string;
    eventName: string;
    packageType: string;
    priority: 'High' | 'Medium' | 'Low';
    requester: string;
    requesterInitials: string;
    totalValue: string;
    dateCreated: string;
    regionCategory: string;
    executiveSummary: string;
    estimatedApprovalTime: string;
    venueImageUrl: string;
    venueName: string;
    workflowSteps: WorkflowStep[];
    discussion: DiscussionComment[];
    history: WorkflowHistoryLog[];
}
