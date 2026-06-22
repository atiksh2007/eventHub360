export interface WorkflowStep {
  name: string; // "Draft", "Manager Review", etc.
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