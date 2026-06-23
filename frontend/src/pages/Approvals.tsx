import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import { 
  LayoutDashboard, FileText, Files, LayoutTemplate, CheckSquare, Users, 
  Settings, HelpCircle, Search, Bell, History as ActivityIcon, Printer,
  CheckCircle, XCircle, Info, MessageSquare, Plus, Clock, Eye, Send, MapPin
} from 'lucide-react';

const Approvals = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [approvalId, setApprovalId] = useState(searchParams.get('id') || '');
  const [pendingList, setPendingList] = useState<any[]>([]);
  const [feedback, setFeedback] = useState('');
  const [processing, setProcessing] = useState(false);
  const [actionResult, setActionResult] = useState<string | null>(null);

  React.useEffect(() => {
    api.getPendingApprovals().then((data: any) => {
      setPendingList(data || []);
      if (!approvalId) {
        if (data && data.length > 0 && data[0].quoteId) {
          setApprovalId(data[0].quoteId);
        } else {
          setApprovalId('NONE_AVAILABLE');
        }
      }
    }).catch((err: any) => {
      console.error("Failed to load pending approvals", err);
      if (!approvalId) setApprovalId('NONE_AVAILABLE');
    });
  }, []); // Only run once on mount

  // Also update approvalId if the URL param changes
  React.useEffect(() => {
    const id = searchParams.get('id');
    if (id) setApprovalId(id);
  }, [searchParams]);

  const handleApprovalAction = async (action: 'APPROVE' | 'REJECT' | 'DRAFT') => {
    setProcessing(true);
    setActionResult(null);
    try {
      await api.updateApprovalState(approvalId, action, feedback);
      const messages: Record<string, string> = {
        APPROVE: '✅ Quotation approved and moved to next stage.',
        REJECT: '❌ Quotation rejected. Status set to Draft.',
        DRAFT: '📋 Quotation returned to Draft status.',
      };
      setActionResult(messages[action] || 'Action processed.');
      setFeedback('');
    } catch (err: any) {
      setActionResult('⚠️ Failed to process action. Check backend connection.');
      console.error(err.message);
    } finally {
      setProcessing(false);
    }
  };

  const sidebarNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: FileText, label: 'Quotations', path: '/quotations' },
    { icon: Files, label: 'Proposals', path: '/proposals' },
    { icon: FileText, label: 'Price Book', path: '/price-book' },
    { icon: LayoutTemplate, label: 'Templates', path: '/templates' },
    { icon: CheckSquare, label: 'Approvals', path: '/approvals' },
    { icon: Users, label: 'Client Portal', path: '/client-portal' },
  ];

  const selectedQuote = pendingList.find(p => (p.quoteId || p.title) === approvalId) || pendingList[0] || {};
  const quoteTitle = selectedQuote.title || 'Event Package';
  const priorityBadge = selectedQuote.badgeType || 'STANDARD';
  const totalValue = selectedQuote.amount || '$0.00';
  
  let requesterName = 'Unknown Requester';
  let initials = 'UN';
  if (selectedQuote.creator) {
    if (selectedQuote.creator.includes('Created by')) {
      const match = selectedQuote.creator.match(/Created by ([A-Za-z\s]+)/);
      if (match && match[1]) {
        requesterName = match[1].trim();
        const parts = requesterName.split(' ');
        initials = parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : parts[0].substring(0, 2).toUpperCase();
      }
    } else {
      requesterName = selectedQuote.creator;
      initials = requesterName.substring(0, 2).toUpperCase();
    }
  }

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans">
      
      {/* ========================================== */}
      {/* LEFT SIDEBAR */}
      {/* ========================================== */}
      <div className="w-[260px] bg-white h-screen fixed left-0 top-0 flex flex-col border-r border-[#ECECF1] z-10 shadow-[2px_0_8px_rgba(0,0,0,0.02)] hidden lg:flex">
        {/* Logo Section */}
        <div className="p-6 pb-8">
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            <span className="text-red-600">Event</span>Hub360
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-1 uppercase tracking-wider">Enterprise Concierge</p>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-4 space-y-2 overflow-y-auto">
          {sidebarNavItems.map((item: any, index: any) => {
            const Icon = item.icon;
            const isActive = item.path === '/approvals';

            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center h-12 px-4 rounded-[14px] transition-all duration-200 group relative ${
                  isActive 
                    ? 'bg-purple-50 text-red-600 font-semibold' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'
                }`}
              >
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-red-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                <span className="text-[15px]">{item.label}</span>
                {isActive && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-red-600 rounded-l-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="p-6 pt-4 border-t border-[#ECECF1] space-y-4">
          <button 
            onClick={() => navigate('/quotations/new')}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-orange-400 text-white h-12 rounded-[14px] font-bold text-[15px] shadow-[0_4px_12px_rgba(220,38,38,0.2)] hover:shadow-[0_6px_16px_rgba(220,38,38,0.3)] transition-all mb-4"
          >
            <span className="text-[15px]">+ New Quotation</span>
          </button>
          
          <div className="space-y-1">
            <button className="w-full flex items-center h-10 px-4 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors font-medium">
              <Settings className="w-5 h-5 mr-3 text-gray-400" />
              <span className="text-[15px]">Settings</span>
            </button>
            <button className="w-full flex items-center h-10 px-4 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors font-medium">
              <HelpCircle className="w-5 h-5 mr-3 text-gray-400" />
              <span className="text-[15px]">Support</span>
            </button>
          </div>

          <div className="mt-4 flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-[14px] transition-colors">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Admin User"
              className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm"
            />
            <div>
              <p className="text-sm font-bold text-gray-900 leading-tight">Admin Workflow</p>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Manager</p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* MAIN CONTENT AREA */}
      {/* ========================================== */}
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        
        {/* TOP HEADER */}
        <div className="h-[72px] bg-white border-b border-[#ECECF1] px-8 flex items-center justify-between shrink-0">
          <div className="w-[200px]">
            <h2 className="text-[20px] font-bold text-red-700 tracking-tight leading-tight">
              Quotation<br/>Management
            </h2>
          </div>

          {/* Center Tabs */}
          <div className="flex-1 flex items-center justify-center gap-8 h-full">
            <div className="flex items-center h-full gap-6">
              {['All Quotes', 'Drafts', 'Pending Approval', 'History'].map((tab: any, idx: any) => (
                <button
                  key={idx}
                  className={`h-full flex items-center relative text-[15px] font-semibold transition-colors ${
                    tab === 'Pending Approval' ? 'text-red-700' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                  {tab === 'Pending Approval' && (
                    <div className="absolute bottom-0 left-0 w-full h-[3px] bg-red-600 rounded-t-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-5">
            <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
              <Bell className="w-[22px] h-[22px]" />
            </button>
            <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
              <ActivityIcon className="w-[22px] h-[22px]" />
            </button>
            <div className="w-px h-8 bg-gray-200 mx-2"></div>
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900 leading-tight">Admin Workflow</p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Admin"
                className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* SCROLLABLE MAIN */}
        <main className="flex-1 overflow-y-auto p-8 pb-24">
          <div className="max-w-[1200px] mx-auto space-y-6">
            
            {/* WORKFLOW PROGRESS TRACKER */}
            <div className="bg-white rounded-[28px] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#ECECF1]">
              <div className="flex items-center justify-between relative">
                {/* Connecting Line Base */}
                <div className="absolute left-[10%] right-[10%] top-[24px] h-[3px] bg-gray-100 -z-10 rounded-full"></div>
                {/* Active Connecting Line */}
                <div className="absolute left-[10%] right-[50%] top-[24px] h-[3px] bg-gradient-to-r from-emerald-400 to-red-400 -z-10 rounded-full"></div>

                {/* Step 1: Draft */}
                <div className="flex flex-col items-center gap-3 w-1/4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-sm ring-4 ring-white">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div className="text-center">
                    <p className="text-[14px] font-bold text-gray-900">Draft</p>
                    <p className="text-[12px] font-medium text-gray-500">Oct 12, 10:45 AM</p>
                  </div>
                </div>

                {/* Step 2: Manager Review */}
                <div className="flex flex-col items-center gap-3 w-1/4">
                  <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 shadow-sm ring-4 ring-white border-2 border-red-200">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div className="text-center">
                    <p className="text-[14px] font-bold text-red-700">Manager Review</p>
                    <p className="text-[12px] font-medium text-gray-500">In Progress</p>
                  </div>
                </div>

                {/* Step 3: Finance Review */}
                <div className="flex flex-col items-center gap-3 w-1/4">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 shadow-sm ring-4 ring-white">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="text-center">
                    <p className="text-[14px] font-semibold text-gray-400">Finance Review</p>
                    <p className="text-[12px] font-medium text-gray-400">Upcoming</p>
                  </div>
                </div>

                {/* Step 4: Approved */}
                <div className="flex flex-col items-center gap-3 w-1/4">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 shadow-sm ring-4 ring-white">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div className="text-center">
                    <p className="text-[14px] font-semibold text-gray-400">Approved</p>
                    <p className="text-[12px] font-medium text-gray-400">Awaiting</p>
                  </div>
                </div>
              </div>
            </div>

            {/* TWO COLUMNS LAYOUT */}
            <div className="flex flex-col lg:flex-row gap-6">
              
              {/* LEFT COLUMN (70%) */}
              <div className="flex-1 lg:w-[70%] space-y-6">
                
                {/* SELECT APPROVAL DROPDOWN */}
                <div className="bg-white rounded-[28px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#ECECF1] flex items-center justify-between">
                  <div>
                    <h3 className="text-[16px] font-bold text-gray-900">Select Pending Approval</h3>
                    <p className="text-[13px] text-gray-500">Choose a quote to review from the queue.</p>
                  </div>
                  <select 
                    className="w-[300px] h-11 bg-[#F8F9FC] border border-[#ECECF1] rounded-[12px] px-4 text-[14px] font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-100"
                    value={approvalId}
                    onChange={(e) => {
                      setApprovalId(e.target.value);
                      navigate(`/approvals?id=${e.target.value}`, { replace: true });
                    }}
                  >
                    {pendingList.length === 0 ? (
                      <option value="NONE_AVAILABLE">No Pending Approvals</option>
                    ) : (
                      pendingList.map((p, idx) => (
                        <option key={idx} value={p.quoteId || `QT-${idx}`}>
                          {p.quoteId} - {p.title}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                {/* APPROVAL DETAILS CARD */}
                <div className="bg-white rounded-[28px] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#ECECF1]">
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <p className="text-[14px] font-bold text-gray-900 mb-1">Quote #{approvalId !== 'NONE_AVAILABLE' ? approvalId : '---'}</p>
                      <h3 className="text-[20px] font-medium text-gray-600">{quoteTitle}</h3>
                    </div>
                    <span className={`px-4 py-1.5 text-[13px] font-bold rounded-full ${
                      priorityBadge === 'HIGH PRIORITY' || priorityBadge === 'ESCALATED' 
                        ? 'bg-[#FEF3C7] text-[#92400E]' 
                        : 'bg-blue-50 text-blue-700'
                    }`}>
                      {priorityBadge}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-y-8 gap-x-4 mb-8">
                    <div>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Requester</p>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs font-bold">
                          {initials}
                        </div>
                        <span className="text-[15px] font-semibold text-gray-900">{requesterName}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Total Value</p>
                      <p className="text-[18px] font-bold text-red-700">{totalValue}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Date Created</p>
                      <p className="text-[15px] font-semibold text-gray-900">Just now</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Region</p>
                      <p className="text-[15px] font-semibold text-gray-900">Global - Default</p>
                    </div>
                  </div>

                  {/* EXECUTIVE SUMMARY PANEL */}
                  <div className="bg-[#F8F5FF] rounded-[20px] p-6 flex gap-4 border border-[#F3E8FF]">
                    <div className="mt-0.5 shrink-0">
                      <Info className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-bold text-gray-900 mb-2">Executive Summary</h4>
                      <p className="text-[14px] font-medium text-gray-700 leading-relaxed">
                        This quotation covers the full-service management of the Global Leadership Summit, including premium lounge setup, Michelin-star catering for 250 executives, and advanced AV technical support for 3 days. The client has requested a 15% loyalty discount which has been applied under special terms.
                      </p>
                    </div>
                  </div>
                </div>

                {/* REVIEWER DISCUSSION CARD */}
                <div className="bg-white rounded-[28px] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#ECECF1]">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-[18px] font-bold text-gray-900">Reviewer Discussion</h3>
                    <button className="flex items-center gap-2 text-red-600 font-semibold text-[14px] hover:text-red-700 transition-colors px-4 py-2 rounded-[12px] border border-red-100 hover:bg-red-50">
                      <Plus className="w-4 h-4" />
                      Add Private Note
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Comment 1 */}
                    <div className="flex gap-4">
                      <img 
                        src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                        alt="Marcus Avery" 
                        className="w-10 h-10 rounded-full object-cover shrink-0 border border-gray-200"
                      />
                      <div className="bg-[#F3F5FC] rounded-[20px] rounded-tl-sm p-5 flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-[14px] font-bold text-gray-900">Marcus Avery <span className="font-medium text-gray-500">(Project Lead)</span></p>
                          <span className="text-[12px] font-medium text-gray-400">10:45 AM</span>
                        </div>
                        <p className="text-[14px] font-medium text-gray-700 leading-relaxed">
                          "The discount applied is slightly above our standard 10% threshold. Julianne, can we confirm the ROI projection for this client's multi-year contract?"
                        </p>
                      </div>
                    </div>

                    {/* Comment 2 */}
                    <div className="flex gap-4 flex-row-reverse">
                      <div className="w-10 h-10 rounded-full bg-red-800 text-white flex items-center justify-center text-xs font-bold shrink-0">
                        JD
                      </div>
                      <div className="bg-[#FFF5F5] rounded-[20px] rounded-tr-sm p-5 flex-1 border border-red-50">
                        <div className="flex items-center justify-between flex-row-reverse mb-2">
                          <p className="text-[14px] font-bold text-red-900">Julianne Devis <span className="font-medium text-red-700/60">(Requester)</span></p>
                          <span className="text-[12px] font-medium text-gray-400">11:15 AM</span>
                        </div>
                        <p className="text-[14px] font-medium text-red-900 leading-relaxed text-right">
                          "Yes Marcus, they've signed an LOI for three additional regional summits if this one goes well. The 15% is a strategic investment."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* WORKFLOW HISTORY CARD */}
                <div className="bg-white rounded-[28px] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#ECECF1]">
                  <h3 className="text-[18px] font-bold text-gray-900 flex items-center gap-2 mb-8">
                    <ActivityIcon className="w-5 h-5 text-gray-400" />
                    Workflow History
                  </h3>

                  <div className="relative pl-6 border-l-2 border-gray-100 space-y-8">
                    {/* Item 1 */}
                    <div className="relative">
                      <div className="absolute -left-[33px] w-6 h-6 rounded-full bg-emerald-50 border-2 border-white flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                      </div>
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-[14px] font-bold text-gray-900">Quotation Created & Submitted</p>
                          <p className="text-[13px] font-medium text-gray-500">Initiated by Julianne Devis (Regional Manager)</p>
                        </div>
                        <span className="text-[13px] font-medium text-gray-400">Oct 12, 2023 • 09:20 AM</span>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="relative">
                      <div className="absolute -left-[33px] w-6 h-6 rounded-full bg-amber-50 border-2 border-white flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                      </div>
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-[14px] font-bold text-gray-900">Project Lead Review Started</p>
                          <p className="text-[13px] font-medium text-gray-500">Marcus Avery opened the request</p>
                        </div>
                        <span className="text-[13px] font-medium text-gray-400">Oct 12, 2023 • 10:45 AM</span>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="relative">
                      <div className="absolute -left-[33px] w-6 h-6 rounded-full bg-red-50 border-2 border-white flex items-center justify-center">
                        <MessageSquare className="w-3 h-3 text-red-500" />
                      </div>
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-[14px] font-bold text-gray-900">Internal Discussion Thread</p>
                          <p className="text-[13px] font-medium text-gray-500">2 new comments added regarding strategic investment</p>
                        </div>
                        <span className="text-[13px] font-medium text-gray-400">Oct 12, 2023 • 11:15 AM</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN (30%) */}
              <div className="lg:w-[30%]">
                <div className="sticky top-[24px] space-y-6">
                  
                  {/* TAKE ACTION CARD */}
                  <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#ECECF1]">
                    <h3 className="text-[16px] font-bold text-gray-900 mb-6">Take Action</h3>
                    
                    {actionResult && (
                      <div className={`mb-4 px-4 py-3 rounded-xl text-[13px] font-semibold ${
                        actionResult.startsWith('✅') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        actionResult.startsWith('❌') ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                        actionResult.startsWith('📋') ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                        'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {actionResult}
                      </div>
                    )}

                    <div className="space-y-3 mb-8">
                      <button 
                        onClick={() => handleApprovalAction('APPROVE')}
                        disabled={processing || !approvalId || approvalId === 'NONE_AVAILABLE'}
                        className="w-full h-12 flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-orange-400 text-white rounded-[14px] font-bold text-[15px] shadow-sm hover:shadow-md transition-all disabled:opacity-50"
                      >
                        <CheckCircle className="w-5 h-5" />
                        {processing ? 'Processing...' : 'Approve Request'}
                      </button>
                      <button 
                        onClick={() => handleApprovalAction('REJECT')}
                        disabled={processing || !approvalId || approvalId === 'NONE_AVAILABLE'}
                        className="w-full h-12 flex items-center justify-center gap-2 bg-[#F3F5F9] text-gray-600 rounded-[14px] font-bold text-[15px] hover:bg-gray-200 transition-colors disabled:opacity-50"
                      >
                        <XCircle className="w-5 h-5" />
                        Reject
                      </button>
                    </div>

                    <div className="border-t border-[#ECECF1] pt-6">
                      <h4 className="text-[14px] font-semibold text-gray-700 mb-3">Request Changes</h4>
                      <textarea 
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="w-full h-[120px] bg-[#F8F9FC] border border-[#E5E7EB] rounded-[16px] p-4 text-[14px] font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 transition-all resize-none mb-4"
                        placeholder="Add feedback for the requester..."
                      ></textarea>
                      <button 
                        onClick={() => handleApprovalAction('DRAFT')}
                        disabled={processing || !approvalId || approvalId === 'NONE_AVAILABLE'}
                        className="w-full h-11 flex items-center justify-center gap-2 border border-red-200 text-red-600 rounded-[12px] font-bold text-[14px] hover:bg-red-50 transition-colors disabled:opacity-50"
                      >
                        <Send className="w-4 h-4" />
                        Send Back to Draft
                      </button>
                    </div>

                    {/* APPROVAL METRICS */}
                    <div className="mt-8">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[13px] font-semibold text-gray-500">Estimated Approval Time</span>
                        <span className="text-[14px] font-bold text-gray-900">~4.5 Hours</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[75%] rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* VENUE PREVIEW CARD */}
                  <div className="relative h-[180px] rounded-[24px] overflow-hidden group cursor-pointer shadow-sm">
                    <img 
                      src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                      alt="Venue Preview" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5">
                      <p className="text-white text-[14px] font-bold flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-orange-300" />
                        Venue: Ritz-Carlton Grand Hall
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Approvals;
