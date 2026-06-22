import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import QuotationDashboard from './pages/QuotationDashboard';
import QuotationListPage from './pages/QuotationListPage';
import CreateQuotationStep1 from './pages/CreateQuotationStep1';
import QuotationBuilder from './pages/QuotationBuilder';
import ProposalStudio from './pages/ProposalStudio';
import GlobalPriceBook from './pages/GlobalPriceBook';
import Templates from './pages/Templates';
import Approvals from './pages/Approvals';
import ClientPortal from './pages/ClientPortal';
import VersionComparison from './pages/VersionComparison';
import QuoteAcceptedDashboard from './pages/QuoteAcceptedDashboard';
import CommunicationCenter from './pages/CommunicationCenter';
import TemplateDetails from './pages/TemplateDetails';
import CategoryDetail from './pages/CategoryDetail';
import TemplateAnalytics from './pages/TemplateAnalytics';
import TemplateApplicationWizard from './pages/TemplateApplicationWizard';
import CreateTemplateWizard from './pages/CreateTemplateWizard';
import FullTemplateBuilder from './pages/FullTemplateBuilder';
import BlankTemplateBuilder from './pages/BlankTemplateBuilder';
import FullProposalPreview from './pages/FullProposalPreview';
import { ShareTemplateScreen, ExportCenterScreen, DuplicateTemplateScreen, ArchiveTemplateScreen, RenameTemplateScreen, MoveCategoryScreen, DeleteTemplateScreen } from './pages/TemplateActionScreens';
import AITemplateGenerator from './pages/AITemplateGenerator';
import TemplateVersionHistory from './pages/TemplateVersionHistory';
import TemplateApprovalWorkflow from './pages/TemplateApprovalWorkflow';
import PendingQuotationsCenter from './pages/PendingQuotationsCenter';
import ApprovedQuotationsDashboard from './pages/ApprovedQuotationsDashboard';
import RevenueForecastCenter from './pages/RevenueForecastCenter';
import QuotationsMasterList from './pages/QuotationsMasterList';
import DraftManagementCenter from './pages/DraftManagementCenter';
import ContinueEditingWizard from './pages/drafts/ContinueEditingWizard';
import DraftDetails from './pages/drafts/DraftDetails';
import NewDraftCreation from './pages/drafts/NewDraftCreation';
import DraftVersionHistory from './pages/drafts/DraftVersionHistory';
import DraftCollaboration from './pages/drafts/DraftCollaboration';
import DraftAssignmentCenter from './pages/drafts/DraftAssignmentCenter';
import DraftApprovalReadiness from './pages/drafts/DraftApprovalReadiness';
import DraftAnalytics from './pages/drafts/DraftAnalytics';
import DraftSearchFilter from './pages/drafts/DraftSearchFilter';
import DraftArchive from './pages/drafts/DraftArchive';
import DraftExport from './pages/drafts/DraftExport';
import ApprovalWorkbench from './pages/ApprovalWorkbench';
import QuotationHistoryCenter from './pages/QuotationHistoryCenter';
import NotificationCenter from './pages/NotificationCenter';
import ActivityTimeline from './pages/ActivityTimeline';
import UserProfile from './pages/UserProfile';
import SystemSettings from './pages/SystemSettings';
import AutomatedNumbering from './pages/settings/AutomatedNumbering';
import ApprovalRuleWizard from './pages/settings/ApprovalRuleWizard';
import CurrencyManagement from './pages/settings/CurrencyManagement';
import TaxConfiguration from './pages/settings/TaxConfiguration';
import ServiceChargeConfig from './pages/settings/ServiceChargeConfig';
import BusinessRulesCenter from './pages/settings/BusinessRulesCenter';
import NotificationPreferences from './pages/settings/NotificationPreferences';
import UserPermissions from './pages/settings/UserPermissions';
import SettingsAuditLogs from './pages/settings/SettingsAuditLogs';
import SupportCenter from './pages/SupportCenter';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QuotationDashboard />} />
          <Route path="/quotations" element={<QuotationListPage />} />
          <Route path="/quotations/pending" element={<PendingQuotationsCenter />} />
          <Route path="/quotations/approved-center" element={<ApprovedQuotationsDashboard />} />
          <Route path="/quotations/forecast" element={<RevenueForecastCenter />} />
          <Route path="/quotations/master" element={<QuotationsMasterList />} />
          
          {/* Drafts Module Routes */}
          <Route path="/quotations/drafts" element={<DraftManagementCenter />} />
          <Route path="/quotations/drafts/continue" element={<ContinueEditingWizard />} />
          <Route path="/quotations/drafts/details" element={<DraftDetails />} />
          <Route path="/quotations/drafts/new" element={<NewDraftCreation />} />
          <Route path="/quotations/drafts/history" element={<DraftVersionHistory />} />
          <Route path="/quotations/drafts/collaboration" element={<DraftCollaboration />} />
          <Route path="/quotations/drafts/assignment" element={<DraftAssignmentCenter />} />
          <Route path="/quotations/drafts/approval-readiness" element={<DraftApprovalReadiness />} />
          <Route path="/quotations/drafts/analytics" element={<DraftAnalytics />} />
          <Route path="/quotations/drafts/search-filter" element={<DraftSearchFilter />} />
          <Route path="/quotations/drafts/archive" element={<DraftArchive />} />
          <Route path="/quotations/drafts/export" element={<DraftExport />} />
          <Route path="/quotations/drafts/duplicate" element={<Navigate to="/quotations/drafts/new" replace />} />
          
          <Route path="/quotations/approval-workbench" element={<ApprovalWorkbench />} />
          <Route path="/quotations/history-center" element={<QuotationHistoryCenter />} />
          <Route path="/notifications" element={<NotificationCenter />} />
          <Route path="/activity-timeline" element={<ActivityTimeline />} />
          <Route path="/profile" element={<UserProfile />} />
          
          {/* Settings Routes */}
          <Route path="/settings" element={<SystemSettings />} />
          <Route path="/settings/automated-numbering" element={<AutomatedNumbering />} />
          <Route path="/settings/approval-rule-wizard" element={<ApprovalRuleWizard />} />
          <Route path="/settings/currency" element={<CurrencyManagement />} />
          <Route path="/settings/tax-configuration" element={<TaxConfiguration />} />
          <Route path="/settings/service-charge" element={<ServiceChargeConfig />} />
          <Route path="/settings/business-rules" element={<BusinessRulesCenter />} />
          <Route path="/settings/notifications" element={<NotificationPreferences />} />
          <Route path="/settings/permissions" element={<UserPermissions />} />
          <Route path="/settings/audit-logs" element={<SettingsAuditLogs />} />
          
          <Route path="/support" element={<SupportCenter />} />

          <Route path="/quotations/new" element={<CreateQuotationStep1 />} />
          <Route path="/quotation-builder" element={<QuotationBuilder />} />
          <Route path="/quotations/history" element={<VersionComparison />} />
          <Route path="/quotations/accepted" element={<QuoteAcceptedDashboard />} />
          <Route path="/quotations/communication" element={<CommunicationCenter />} />
          
          {/* Templates Module Routes */}
          <Route path="/templates/new" element={<CreateTemplateWizard />} />
          <Route path="/templates/custom" element={<BlankTemplateBuilder />} />
          <Route path="/templates/:id/edit" element={<FullTemplateBuilder />} />
          <Route path="/templates/:id/preview" element={<FullProposalPreview />} />
          <Route path="/templates/:id/use" element={<TemplateApplicationWizard />} />
          <Route path="/templates/:id/share" element={<ShareTemplateScreen />} />
          <Route path="/templates/:id/export" element={<ExportCenterScreen />} />
          <Route path="/templates/:id/duplicate" element={<DuplicateTemplateScreen />} />
          <Route path="/templates/:id/archive" element={<ArchiveTemplateScreen />} />
          <Route path="/templates/:id/rename" element={<RenameTemplateScreen />} />
          <Route path="/templates/:id/move" element={<MoveCategoryScreen />} />
          <Route path="/templates/:id/delete" element={<DeleteTemplateScreen />} />
          <Route path="/templates/:id/history" element={<TemplateVersionHistory />} />
          <Route path="/templates/:id/approve" element={<TemplateApprovalWorkflow />} />
          <Route path="/templates/ai-generator" element={<AITemplateGenerator />} />
          <Route path="/templates/:id" element={<TemplateDetails />} />
          <Route path="/templates/category/:category" element={<CategoryDetail />} />
          <Route path="/templates/analytics" element={<TemplateAnalytics />} />
          <Route path="/proposals" element={<ProposalStudio />} />
          <Route path="/price-book" element={<GlobalPriceBook />} />
          
          {/* Added placeholders for requested missing pages */}
          <Route path="/templates" element={<Templates />} />
          <Route path="/approvals" element={<Approvals />} />
          <Route path="/client-portal" element={<ClientPortal />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
