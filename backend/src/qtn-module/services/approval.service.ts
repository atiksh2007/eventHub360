import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { QuotationApprovalDetail, WorkflowStep, WorkflowHistoryLog } from '../interfaces/quotation.interface';
import { QuotationService } from './quotation.service';

@Injectable()
export class ApprovalService implements OnModuleInit {
  
  // 💾 In-memory tracking cache for active workflow instances
  private approvalCache: Record<string, QuotationApprovalDetail> = {};
  private qtnService: QuotationService;

  constructor(private readonly moduleRef: ModuleRef) {
    // Seed default workflow tracker matching seed quote
    this.approvalCache['Q-8829'] = {
      quoteNumber: "Q-8829",
      eventName: "Royal Wedding Gala",
      packageType: "Luxury Hospitality Package",
      priority: "High",
      requester: "Julianne Devis",
      requesterInitials: "JD",
      totalValue: "$20,022.00",
      dateCreated: "October 12, 2023",
      regionCategory: "North America - Hospitality",
      executiveSummary: "Royal Wedding Gala initial proposal.",
      estimatedApprovalTime: "~4.5 Hours",
      venueName: "Ritz-Carlton Grand Hall",
      venueImageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600",
      workflowSteps: [
        { name: "Draft", status: "completed", dateLabel: "Oct 12, 10:45 AM" },
        { name: "Manager Review", status: "current", dateLabel: "In Progress" },
        { name: "Finance Review", status: "upcoming" },
        { name: "Approved Awaiting", status: "upcoming" }
      ],
      discussion: [
        {
          author: "Marcus Avery",
          role: "Project Lead",
          initials: "MA",
          time: "10:45 AM",
          text: "Double checking pricing before proceeding.",
          isPrivate: false
        }
      ],
      history: [
        { action: "Quotation Created & Submitted", subtext: "Initiated by Julianne Devis (Regional Manager)", timestamp: "Oct 12, 2023 • 09:20 AM", iconType: "submit" }
      ]
    };
  }

  onModuleInit() {
    this.qtnService = this.moduleRef.get(QuotationService, { strict: false });
  }

  async getApprovalDetails(quoteNumber: string): Promise<QuotationApprovalDetail> {
    const data = this.approvalCache[quoteNumber];
    if (!data) {
      throw new NotFoundException(`Approval track for ${quoteNumber} not found.`);
    }
    return data;
  }

  /**
   * Initializes approval wrapper data when request is submitted
   */
  initializeApprovalTrack(params: {
    quoteNumber: string;
    eventName: string;
    totalValue: string;
    priority: 'High' | 'Medium' | 'Low';
    requester: string;
    executiveSummary: string;
    activeStepName: string;
    tier: string;
  }): QuotationApprovalDetail {
    const initials = params.requester.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) || 'RQ';
    const formattedDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const formattedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const workflowSteps: WorkflowStep[] = [
      { name: "Draft", status: "completed", dateLabel: `${formattedDate} • ${formattedTime}` }
    ];

    if (params.activeStepName === 'Draft') {
      // Auto-approved instantly
      workflowSteps.push(
        { name: "Approved Awaiting", status: "completed", dateLabel: "Auto-Approved" }
      );
    } else if (params.activeStepName === 'Manager Review') {
      workflowSteps.push(
        { name: "Manager Review", status: "current", dateLabel: "In Progress" },
        { name: "Finance Review", status: "upcoming" },
        { name: "Approved Awaiting", status: "upcoming" }
      );
    } else {
      // Owner review/exception
      workflowSteps.push(
        { name: "Owner Review Exception", status: "current", dateLabel: "In Progress" },
        { name: "Finance Review", status: "upcoming" },
        { name: "Approved Awaiting", status: "upcoming" }
      );
    }

    const newApproval: QuotationApprovalDetail = {
      quoteNumber: params.quoteNumber,
      eventName: params.eventName,
      packageType: "Custom Selected Services",
      priority: params.priority,
      requester: params.requester,
      requesterInitials: initials,
      totalValue: params.totalValue,
      dateCreated: formattedDate,
      regionCategory: "General Operational Branch",
      executiveSummary: params.executiveSummary,
      estimatedApprovalTime: params.activeStepName === 'Draft' ? "0 Mins" : "~3.5 Hours",
      venueName: "Custom Selected Venues",
      venueImageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600",
      workflowSteps,
      discussion: [],
      history: [
        {
          action: "Quotation Submitted for Approval",
          subtext: `Workflow tracking initiated for ${params.tier}.`,
          timestamp: `${formattedDate} • ${formattedTime}`,
          iconType: "submit"
        }
      ]
    };

    this.approvalCache[params.quoteNumber] = newApproval;
    return newApproval;
  }

  /**
   * Safety Lock: Cancels active approval tracking and reverts workflow to draft
   */
  cancelApprovalWorkflow(quoteNumber: string): void {
    const data = this.approvalCache[quoteNumber];
    if (data) {
      const formattedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      data.workflowSteps.forEach(step => {
        if (step.name !== 'Draft') {
          step.status = 'upcoming';
          step.dateLabel = undefined;
        } else {
          step.status = 'current';
          step.dateLabel = 'Returned to Draft';
        }
      });
      data.history.push({
        action: "Approval Canceled",
        subtext: "Quotation workspace modified during active approval. Workflow returned to Draft.",
        timestamp: `Just Now • ${formattedTime}`,
        iconType: "return"
      });
    }
  }

  /**
   * State Machine Routing for Action Updates on approvals
   */
  async processWorkflowAction(
    quoteNumber: string, 
    action: string, 
    feedback?: string
  ): Promise<QuotationApprovalDetail> {
    const data = this.approvalCache[quoteNumber];
    if (!data) {
      throw new NotFoundException(`Approval track for ${quoteNumber} not found.`);
    }

    const rawQuote = this.qtnService.getRawQuote(quoteNumber);
    if (!rawQuote) {
      throw new NotFoundException(`Linked Quotation workspace ${quoteNumber} not found.`);
    }

    const formattedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const fullTimestamp = `Today • ${formattedTime}`;

    if (feedback && feedback.trim() !== "") {
      data.discussion.push({
        author: "Auditor Workflow",
        role: "System Reviewer",
        initials: "SR",
        time: formattedTime,
        text: feedback,
        isPrivate: false
      });
    }

    const normalizedAction = action.toUpperCase();

    if (normalizedAction === 'APPROVE') {
      // Find current step, advance to next
      const currentStepIndex = data.workflowSteps.findIndex(s => s.status === 'current');
      if (currentStepIndex !== -1) {
        data.workflowSteps[currentStepIndex].status = 'completed';
        data.workflowSteps[currentStepIndex].dateLabel = `Approved at ${formattedTime}`;
        
        if (currentStepIndex + 1 < data.workflowSteps.length) {
          data.workflowSteps[currentStepIndex + 1].status = 'current';
          data.workflowSteps[currentStepIndex + 1].dateLabel = 'In Progress';
        } else {
          // All steps completed, update quotation status to SENT or ACCEPTED
          rawQuote.status = 'SENT';
          rawQuote.lastEdited = "Fully Approved by workflow team";
        }
      } else {
        // Fallback
        rawQuote.status = 'SENT';
      }

      data.history.push({
        action: "Milestone Step Approved",
        subtext: feedback || "Approval step processed successfully.",
        timestamp: fullTimestamp,
        iconType: "approve"
      });

    } else if (normalizedAction === 'REJECT') {
      // Update visual steps to halted status
      data.workflowSteps.forEach(step => {
        if (step.status === 'current') {
          step.status = 'upcoming';
          step.dateLabel = 'Halted';
        }
      });

      rawQuote.status = 'DRAFT';
      rawQuote.lastEdited = "Rejected by reviewer";

      data.history.push({
        action: "Quotation Action Rejected",
        subtext: feedback || "Reviewer rejected current proposal milestone.",
        timestamp: fullTimestamp,
        iconType: "reject"
      });

    } else if (normalizedAction === 'DRAFT') {
      // Revert completely to Draft
      data.workflowSteps.forEach(step => {
        if (step.name !== 'Draft') {
          step.status = 'upcoming';
          step.dateLabel = undefined;
        } else {
          step.status = 'current';
          step.dateLabel = `Returned ${formattedTime}`;
        }
      });

      rawQuote.status = 'DRAFT';
      rawQuote.lastEdited = "Sent back to Draft status";

      data.history.push({
        action: "Returned to Draft Milestone",
        subtext: feedback || "Returned to draft state for modifications.",
        timestamp: fullTimestamp,
        iconType: "return"
      });
    }
    

    return data;
  }
}