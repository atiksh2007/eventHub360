import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Files, LayoutTemplate, CheckSquare, Users, 
  Settings, HelpCircle, Bell, History as HistoryIcon, Eye, Mail, MessageCircle, 
  MessageSquare, X, Paperclip, Bold, Clock, Send, Plus, CheckCircle2, FileType2, Download
} from 'lucide-react';

const CommunicationCenter = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Email');

  const sidebarNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: FileText, label: 'Quotations', path: '/quotations', active: true },
    { icon: Files, label: 'Proposals', path: '/proposals' },
    { icon: FileText, label: 'Price Book', path: '/price-book' },
    { icon: LayoutTemplate, label: 'Templates', path: '/templates' },
    { icon: CheckSquare, label: 'Approvals', path: '/approvals' },
    { icon: Users, label: 'Client Portal', path: '/client-portal' },
  ];

  const templates = [
    {
      title: 'First Draft Proposal',
      desc: 'A professional introduction to the initial quotation...',
      selected: false
    },
    {
      title: 'Revised Quote',
      desc: 'Updates based on our most recent meeting and feedback...',
      selected: true
    },
    {
      title: 'Follow-up Reminder',
      desc: "A gentle nudge for clients who haven't responded yet...",
      selected: false
    },
    {
      title: 'Limited Time Offer',
      desc: 'Urgency-focused template for seasonal discounts...',
      selected: false
    }
  ];

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans">
      
      {/* ========================================== */}
      {/* LEFT SIDEBAR */}
      {/* ========================================== */}
      <div className="w-[260px] bg-white h-screen fixed left-0 top-0 flex flex-col border-r border-[#ECECF1] z-10 shadow-[2px_0_8px_rgba(0,0,0,0.02)] hidden lg:flex">
        {/* Logo Section */}
        <div className="p-6 pb-8 border-b border-[#ECECF1]">
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            <span className="text-red-700">Event</span>Hub360
          </h1>
          <p className="text-[10px] text-gray-500 font-bold mt-1 uppercase tracking-widest">Enterprise Concierge</p>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {sidebarNavItems.map((item: any, index: any) => {
            const Icon = item.icon;
            const isActive = item.active;

            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center h-12 px-4 rounded-[14px] transition-all duration-200 group relative ${
                  isActive 
                    ? 'bg-[#F8F5FF] text-red-700 font-semibold' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'
                }`}
              >
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-red-700' : 'text-gray-400 group-hover:text-gray-600'}`} />
                <span className="text-[15px]">{item.label}</span>
                {isActive && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-red-700 rounded-l-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="p-6 pt-4 border-t border-[#ECECF1] space-y-4">
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
              {['All Quotes', 'Drafts', 'Pending Approval'].map((tab: any, idx: any) => (
                <button
                  key={idx}
                  className={`h-full flex items-center relative text-[15px] font-semibold transition-colors ${
                    tab === 'All Quotes' ? 'text-red-700' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                  {tab === 'All Quotes' && (
                    <div className="absolute bottom-0 left-0 w-full h-[3px] bg-red-700 rounded-t-full" />
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
              <HistoryIcon className="w-[22px] h-[22px]" />
            </button>
            <div className="w-px h-8 bg-gray-200 mx-2"></div>
            <div className="flex items-center gap-3 cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* SCROLLABLE MAIN */}
        <main className="flex-1 overflow-y-auto p-10 pb-24">
          <div className="max-w-[1200px] mx-auto">
            
            {/* PAGE HEADER */}
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <p className="text-[11px] font-bold text-red-700 uppercase tracking-[0.15em] mb-2">Quotation #QT-2024-089</p>
                <h1 className="text-[36px] font-bold text-gray-900 tracking-tight leading-tight mb-2">
                  Communication Center
                </h1>
                <p className="text-[15px] font-medium text-gray-600">
                  Review and dispatch your proposal to <span className="font-bold text-gray-900">Grand Plaza Hotel & Spa</span>.
                </p>
              </div>
              <button className="h-11 px-6 flex items-center gap-2 bg-white border border-[#ECECF1] text-gray-700 rounded-full font-bold text-[14px] hover:bg-gray-50 transition-colors shadow-sm self-start md:self-auto shrink-0">
                <Eye className="w-4 h-4" />
                Preview PDF
              </button>
            </div>

            {/* TWO COLUMNS LAYOUT */}
            <div className="flex flex-col xl:flex-row gap-8">
              
              {/* ========================================== */}
              {/* LEFT COLUMN: MAIN COMMUNICATION CARD */}
              {/* ========================================== */}
              <div className="flex-1">
                <div className="bg-white rounded-[32px] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#ECECF1] flex flex-col">
                  
                  {/* CHANNEL TABS */}
                  <div className="flex items-center gap-8 border-b border-[#ECECF1] mb-8">
                    {[
                      { id: 'Email', icon: Mail },
                      { id: 'WhatsApp', icon: MessageCircle },
                      { id: 'SMS', icon: MessageSquare }
                    ].map((tab: any) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-4 flex items-center gap-2 text-[15px] font-bold transition-colors relative ${
                          activeTab === tab.id ? 'text-red-700' : 'text-gray-500 hover:text-gray-900'
                        }`}
                      >
                        <tab.icon className="w-5 h-5" />
                        {tab.id}
                        {activeTab === tab.id && (
                          <div className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-red-700 rounded-t-full" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* EMAIL FORM */}
                  <div className="space-y-6 flex-1 flex flex-col">
                    
                    {/* TO FIELD */}
                    <div className="flex items-center gap-4">
                      <span className="w-16 text-[15px] font-semibold text-gray-900">To:</span>
                      <div className="flex-1 bg-[#F8F9FC] border border-[#ECECF1] rounded-[16px] p-2 flex items-center">
                        <div className="flex items-center gap-2 bg-white border border-[#E5E7EB] rounded-full px-4 py-1.5 shadow-sm">
                          <span className="text-[14px] font-medium text-gray-700">marcus.chen@grandplaza.com</span>
                          <button className="text-gray-400 hover:text-gray-600 transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* SUBJECT FIELD */}
                    <div className="flex items-center gap-4">
                      <span className="w-16 text-[15px] font-semibold text-gray-900">Subject:</span>
                      <div className="flex-1">
                        <input 
                          type="text" 
                          defaultValue="Quotation for Summer Corporate Gala 2024 – EventHub360"
                          className="w-full bg-[#F8F9FC] border border-[#ECECF1] rounded-[16px] px-5 py-3.5 text-[15px] font-medium text-gray-900 focus:outline-none focus:border-red-300 focus:ring-1 focus:ring-red-100 transition-all"
                        />
                      </div>
                    </div>

                    {/* MESSAGE EDITOR */}
                    <div className="flex-1 bg-[#F8F5FF] rounded-[20px] p-6 border border-[#ECECF1] flex flex-col gap-6 relative min-h-[300px]">
                      <textarea 
                        className="w-full flex-1 bg-transparent border-none resize-none text-[15px] text-gray-800 leading-relaxed focus:outline-none"
                        defaultValue={`Dear Marcus,\n\nIt was a pleasure discussing the Summer Corporate Gala with your team earlier this week. Following our conversation, I am delighted to present the revised quotation for the EventHub360 full-service package.\n\nWe have incorporated the additional AV requirements and the premium catering options we discussed. You will find the detailed breakdown in the attached PDF proposal.`}
                      ></textarea>
                      
                      {/* ATTACHMENT CARD */}
                      <div className="bg-white border border-[#ECECF1] rounded-[18px] p-4 flex items-center justify-between shadow-sm self-start w-full md:w-auto min-w-[320px]">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-[14px] bg-red-50 flex items-center justify-center text-red-600">
                            <FileType2 className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-[14px] font-bold text-gray-900 mb-0.5">Summer_Gala_Proposal_v2.pdf</p>
                            <p className="text-[12px] font-medium text-gray-500">2.4 MB • PDF Document</p>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-900 transition-colors p-2">
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* MESSAGE TOOLBAR */}
                  <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#ECECF1]">
                    <div className="flex items-center gap-3">
                      <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
                        <Bold className="w-5 h-5" />
                      </button>
                      <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
                        <Paperclip className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <button className="h-12 px-6 flex items-center gap-2 bg-[#F3F5F9] text-gray-700 rounded-full font-bold text-[15px] hover:bg-gray-200 transition-colors">
                        <Clock className="w-5 h-5" />
                        Schedule for Later
                      </button>
                      <button className="h-12 px-8 flex items-center gap-2 bg-gradient-to-r from-red-700 to-orange-400 text-white rounded-full font-bold text-[15px] hover:from-red-800 hover:to-orange-500 transition-colors shadow-[0_8px_20px_rgba(220,38,38,0.2)] hover:shadow-[0_10px_25px_rgba(220,38,38,0.3)]">
                        Send Now
                        <Send className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              {/* ========================================== */}
              {/* RIGHT SIDEBAR: TEMPLATES & READINESS */}
              {/* ========================================== */}
              <div className="xl:w-[340px] flex flex-col gap-6 shrink-0">
                
                {/* TEMPLATE LIBRARY CARD */}
                <div className="bg-white rounded-[28px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#ECECF1]">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-[18px] font-bold text-gray-900">Templates</h3>
                    <button className="text-red-700 hover:text-red-800 transition-colors">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-[13px] font-medium text-gray-500 mb-6">Select a pre-written message</p>

                  <div className="space-y-3">
                    {templates.map((template: any, idx: any) => (
                      <div 
                        key={idx}
                        className={`p-4 rounded-[20px] border cursor-pointer transition-all ${
                          template.selected 
                            ? 'bg-[#F8F5FF] border-red-200' 
                            : 'bg-white border-[#ECECF1] hover:border-gray-300 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <h4 className={`text-[15px] font-bold ${template.selected ? 'text-gray-900' : 'text-gray-900'}`}>
                            {template.title}
                          </h4>
                          {template.selected && (
                            <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0" />
                          )}
                        </div>
                        <p className="text-[13px] font-medium text-gray-500 leading-snug">
                          {template.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SEND READINESS CARD */}
                <div className="bg-[#B2262E] rounded-[28px] p-8 text-white shadow-[0_8px_20px_rgba(178,38,46,0.2)]">
                  <h3 className="text-[12px] font-bold text-red-200 uppercase tracking-widest mb-6">Send Readiness</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between">
                      <span className="text-[15px] font-bold">Quote Status</span>
                      <span className="px-3 py-1 bg-white/20 text-white text-[11px] font-bold rounded-md uppercase tracking-wider">
                        READY
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[15px] font-bold">Attachment Check</span>
                      <CheckCircle2 className="w-5 h-5 text-red-200" />
                    </div>
                  </div>

                  <div className="h-px bg-red-800/50 mb-6 w-full" />

                  <p className="text-[14px] font-medium text-red-100 leading-relaxed">
                    The PDF was generated 12 minutes ago.<br/>
                    All line items are currently locked for sending.
                  </p>
                </div>

              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CommunicationCenter;
