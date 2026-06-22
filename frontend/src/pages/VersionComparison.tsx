import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Files, LayoutTemplate, CheckSquare, Users, 
  Settings, HelpCircle, Bell, Printer, ChevronRight, Download, CheckCircle,
  RotateCcw, MinusCircle, PlusCircle, History as ActivityIcon
} from 'lucide-react';

const VersionComparison = () => {
  const navigate = useNavigate();

  const sidebarNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: FileText, label: 'Quotations', path: '/quotations', active: true },
    { icon: Files, label: 'Proposals', path: '/proposals' },
    { icon: FileText, label: 'Price Book', path: '/price-book' },
    { icon: LayoutTemplate, label: 'Templates', path: '/templates' },
    { icon: CheckSquare, label: 'Approvals', path: '/approvals' },
    { icon: Users, label: 'Client Portal', path: '/client-portal' },
  ];

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
            const isActive = item.active;

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
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-700 to-orange-400 text-white h-12 rounded-[14px] font-bold text-[15px] shadow-[0_4px_12px_rgba(220,38,38,0.2)] hover:shadow-[0_6px_16px_rgba(220,38,38,0.3)] transition-all mb-4"
          >
            <PlusCircle className="w-5 h-5" />
            <span className="text-[15px]">New Quotation</span>
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
              {['All Quotes', 'Drafts', 'History', 'Pending Approval'].map((tab: any, idx: any) => (
                <button
                  key={idx}
                  className={`h-full flex items-center relative text-[15px] font-semibold transition-colors ${
                    tab === 'History' ? 'text-red-700' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                  {tab === 'History' && (
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
              <Printer className="w-[22px] h-[22px]" />
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
          <div className="max-w-[1400px] mx-auto">
            
            {/* BREADCRUMB */}
            <div className="flex items-center gap-2 text-[14px] font-semibold text-gray-500 mb-6">
              <span className="hover:text-gray-900 cursor-pointer transition-colors">Quotes</span>
              <ChevronRight className="w-4 h-4" />
              <span className="hover:text-gray-900 cursor-pointer transition-colors">QT-88291</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-red-700">Version History</span>
            </div>

            {/* PAGE HEADER */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <h1 className="text-[48px] font-bold text-gray-900 tracking-tight leading-none">
                Version Comparison
              </h1>
              <div className="flex items-center gap-4">
                <button className="h-12 px-6 flex items-center gap-2 bg-white border border-[#ECECF1] text-red-700 rounded-full font-bold text-[15px] hover:bg-red-50 transition-colors shadow-sm">
                  <Download className="w-5 h-5" />
                  Export Comparison
                </button>
                <button className="h-12 px-6 flex items-center gap-2 bg-gradient-to-r from-red-700 to-orange-400 text-white rounded-full font-bold text-[15px] hover:from-red-800 hover:to-orange-500 transition-colors shadow-md">
                  <CheckCircle className="w-5 h-5" />
                  Approve Latest
                </button>
              </div>
            </div>

            {/* MAIN COMPARISON LAYOUT */}
            <div className="flex flex-col xl:flex-row gap-6">
              
              {/* ========================================== */}
              {/* LEFT PANEL: ARCHIVED VERSION */}
              {/* ========================================== */}
              <div className="flex-1 bg-white rounded-[32px] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#ECECF1]">
                
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-[12px] font-bold rounded-full uppercase tracking-wider mb-4">
                      Archived
                    </span>
                    <h2 className="text-[28px] font-bold text-gray-900 mb-1">Version 1.2</h2>
                    <p className="text-[14px] font-medium text-gray-500">Modified on Oct 14, 2023 by Sarah J.</p>
                  </div>
                  <button className="h-10 px-4 flex items-center gap-2 border border-[#ECECF1] text-gray-700 rounded-[12px] font-semibold text-[14px] hover:bg-gray-50 transition-colors">
                    <RotateCcw className="w-4 h-4 text-gray-500" />
                    Restore
                  </button>
                </div>

                {/* KPI Cards */}
                <div className="flex gap-4 mb-10">
                  <div className="flex-1 border border-[#ECECF1] rounded-[16px] p-4 flex flex-col justify-center">
                    <p className="text-[12px] font-bold text-gray-500 mb-1">Total Price</p>
                    <p className="text-[24px] font-bold text-gray-900">$42,500.00</p>
                  </div>
                  <div className="flex-1 border border-[#ECECF1] rounded-[16px] p-4 flex flex-col justify-center">
                    <p className="text-[12px] font-bold text-gray-500 mb-1">Net Margin</p>
                    <p className="text-[24px] font-bold text-gray-900">24%</p>
                  </div>
                </div>

                {/* Line Items */}
                <div className="mb-10">
                  <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-4">Line Items</h3>
                  <div className="space-y-3">
                    
                    {/* Item 1 */}
                    <div className="border border-[#ECECF1] rounded-[16px] p-5 flex items-center justify-between">
                      <div>
                        <p className="text-[15px] font-bold text-gray-900 mb-0.5">Grand Ballroom Rental</p>
                        <p className="text-[13px] font-medium text-gray-500">Full Day - Corporate Rate</p>
                      </div>
                      <p className="text-[16px] font-bold text-gray-900">$12,000</p>
                    </div>

                    {/* Item 2 */}
                    <div className="border border-[#ECECF1] rounded-[16px] p-5 flex items-center justify-between">
                      <div>
                        <p className="text-[15px] font-bold text-gray-900 mb-0.5">Premium AV Package</p>
                        <p className="text-[13px] font-medium text-gray-500">Projectors, Audio, Live-stream</p>
                      </div>
                      <p className="text-[16px] font-bold text-gray-900">$8,500</p>
                    </div>

                    {/* REMOVED ITEM */}
                    <div className="bg-[#FFF5F5] border border-red-100 rounded-[16px] p-5 flex items-center justify-between relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-400"></div>
                      <div>
                        <p className="text-[15px] font-bold text-gray-900 mb-0.5">Standard Stage Setup</p>
                        <p className="text-[13px] font-medium text-red-500 flex items-center gap-1">
                          4×4 Risers (Removed)
                        </p>
                      </div>
                      <p className="text-[16px] font-bold text-gray-900">$2,000</p>
                    </div>

                    {/* Item 4 */}
                    <div className="border border-[#ECECF1] rounded-[16px] p-5 flex items-center justify-between">
                      <div>
                        <p className="text-[15px] font-bold text-gray-900 mb-0.5">Catering – Gold Tier</p>
                        <p className="text-[13px] font-medium text-gray-500">150 Guests • $133/pp</p>
                      </div>
                      <p className="text-[16px] font-bold text-gray-900">$20,000</p>
                    </div>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div>
                  <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-4">Terms & Conditions</h3>
                  <div className="bg-[#F8F5FF] rounded-[18px] p-6 border border-[#F3E8FF]">
                    <ul className="space-y-3 text-[14px] font-medium text-gray-700 list-disc pl-4">
                      <li>50% deposit required upon signing.</li>
                      <li className="text-gray-400 line-through decoration-red-400 decoration-2">Cancellation within 30 days forfeit 100% deposit.</li>
                      <li>Liability insurance must be provided by client.</li>
                    </ul>
                  </div>
                </div>

              </div>

              {/* ========================================== */}
              {/* RIGHT PANEL: CURRENT VERSION */}
              {/* ========================================== */}
              <div className="flex-1 bg-[#FFFDFD] rounded-[32px] p-8 shadow-[0_8px_30px_rgba(220,38,38,0.06)] border border-red-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 to-orange-400"></div>

                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <span className="inline-block px-3 py-1 bg-red-600 text-white text-[12px] font-bold rounded-full uppercase tracking-wider mb-4 shadow-sm">
                      Current Latest
                    </span>
                    <h2 className="text-[28px] font-bold text-gray-900 mb-1">Version 1.3</h2>
                    <p className="text-[14px] font-medium text-gray-500">Modified Today, 10:45 AM by Admin</p>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-700 to-orange-400 text-white rounded-[12px] font-bold text-[14px] shadow-sm">
                    <CheckCircle className="w-4 h-4" />
                    Currently Active
                  </div>
                </div>

                {/* KPI Cards */}
                <div className="flex gap-4 mb-10">
                  <div className="flex-1 bg-white border border-[#ECECF1] rounded-[16px] p-4 flex flex-col justify-center shadow-sm">
                    <p className="text-[12px] font-bold text-gray-500 mb-1">Total Price</p>
                    <div className="flex items-center gap-2">
                      <p className="text-[24px] font-bold text-emerald-600">$48,200.00</p>
                      <span className="text-[12px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">+13.4%</span>
                    </div>
                  </div>
                  <div className="flex-1 bg-white border border-[#ECECF1] rounded-[16px] p-4 flex flex-col justify-center shadow-sm">
                    <p className="text-[12px] font-bold text-gray-500 mb-1">Net Margin</p>
                    <div className="flex items-center gap-2">
                      <p className="text-[24px] font-bold text-emerald-600">28%</p>
                      <span className="text-[12px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">+4%</span>
                    </div>
                  </div>
                </div>

                {/* Line Items */}
                <div className="mb-10">
                  <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-4">Line Items</h3>
                  <div className="space-y-3">
                    
                    {/* Item 1 */}
                    <div className="bg-white border border-[#ECECF1] rounded-[16px] p-5 flex items-center justify-between shadow-sm">
                      <div>
                        <p className="text-[15px] font-bold text-gray-900 mb-0.5">Grand Ballroom Rental</p>
                        <p className="text-[13px] font-medium text-gray-500">Full Day - Corporate Rate</p>
                      </div>
                      <p className="text-[16px] font-bold text-gray-900">$12,000</p>
                    </div>

                    {/* Item 2 */}
                    <div className="bg-white border border-[#ECECF1] rounded-[16px] p-5 flex items-center justify-between shadow-sm">
                      <div>
                        <p className="text-[15px] font-bold text-gray-900 mb-0.5">Premium AV Package</p>
                        <p className="text-[13px] font-medium text-gray-500">Projectors, Audio, Live-stream</p>
                      </div>
                      <p className="text-[16px] font-bold text-gray-900">$8,500</p>
                    </div>

                    {/* NEW ITEM 1 */}
                    <div className="bg-[#F0FDF4] border border-emerald-100 rounded-[16px] p-5 flex items-center justify-between relative overflow-hidden shadow-sm">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-400"></div>
                      <div>
                        <p className="text-[15px] font-bold text-emerald-700 mb-0.5">Signature Floral Arch</p>
                        <p className="text-[13px] font-medium text-emerald-600 flex items-center gap-1">
                          Entrance Installation (New Item)
                        </p>
                      </div>
                      <p className="text-[16px] font-bold text-gray-900">$3,200</p>
                    </div>

                    {/* NEW ITEM 2 */}
                    <div className="bg-[#F0FDF4] border border-emerald-100 rounded-[16px] p-5 flex items-center justify-between relative overflow-hidden shadow-sm">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-400"></div>
                      <div>
                        <p className="text-[15px] font-bold text-emerald-700 mb-0.5">Custom Stage Branding</p>
                        <p className="text-[13px] font-medium text-emerald-600 flex items-center gap-1">
                          Backdrop & Floor Vinyl (New Item)
                        </p>
                      </div>
                      <p className="text-[16px] font-bold text-gray-900">$4,500</p>
                    </div>

                    {/* Item 5 */}
                    <div className="bg-white border border-[#ECECF1] rounded-[16px] p-5 flex items-center justify-between shadow-sm">
                      <div>
                        <p className="text-[15px] font-bold text-gray-900 mb-0.5">Catering – Gold Tier</p>
                        <p className="text-[13px] font-medium text-gray-500">150 Guests • $133/pp</p>
                      </div>
                      <p className="text-[16px] font-bold text-gray-900">$20,000</p>
                    </div>

                  </div>
                </div>

                {/* Terms & Conditions */}
                <div>
                  <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-4">Terms & Conditions</h3>
                  <div className="bg-[#F8F5FF] rounded-[18px] p-6 border border-[#F3E8FF] shadow-sm">
                    <ul className="space-y-3 text-[14px] font-medium text-gray-700 list-disc pl-4">
                      <li>50% deposit required upon signing.</li>
                      <li className="relative">
                        Cancellation within 14 days forfeit 100% deposit.
                        <div className="mt-1 text-[13px] font-bold text-emerald-500 bg-emerald-50 inline-block px-2 py-0.5 rounded-md">
                          (Relaxed from 30d)
                        </div>
                      </li>
                      <li>Liability insurance must be provided by client.</li>
                    </ul>
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

export default VersionComparison;
