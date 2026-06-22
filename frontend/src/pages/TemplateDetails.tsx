import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Files, LayoutTemplate, CheckSquare, Users, 
  Settings, HelpCircle, Bell, ArrowLeft, Star, Clock, User, Download, 
  Copy, Trash2, Share2, Edit3, Eye, BarChart2, CheckCircle2, ChevronRight,
  Type, History, Archive
} from 'lucide-react';

const TemplateDetails = () => {
  const navigate = useNavigate();

  const sidebarNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: FileText, label: 'Quotations', path: '/quotations' },
    { icon: Files, label: 'Proposals', path: '/proposals' },
    { icon: FileText, label: 'Price Book', path: '/price-book' },
    { icon: LayoutTemplate, label: 'Templates', path: '/templates', active: true },
    { icon: CheckSquare, label: 'Approvals', path: '/approvals' },
    { icon: Users, label: 'Client Portal', path: '/client-portal' },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans">
      
      {/* ========================================== */}
      {/* LEFT SIDEBAR */}
      {/* ========================================== */}
      <div className="w-[260px] bg-white h-screen fixed left-0 top-0 flex flex-col border-r border-[#ECECF1] z-10 shadow-[2px_0_8px_rgba(0,0,0,0.02)] hidden lg:flex">
        <div className="p-6 pb-8 border-b border-[#ECECF1]">
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            <span className="text-red-700">Event</span>Hub360
          </h1>
          <p className="text-[10px] text-gray-500 font-bold mt-1 uppercase tracking-widest">Enterprise Concierge</p>
        </div>
        <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {sidebarNavItems.map((item: any, index: any) => {
            const Icon = item.icon;
            const isActive = item.active;
            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center h-12 px-4 rounded-[14px] transition-all duration-200 group relative ${
                  isActive ? 'bg-[#F8F5FF] text-red-700 font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'
                }`}
              >
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-red-700' : 'text-gray-400 group-hover:text-gray-600'}`} />
                <span className="text-[15px]">{item.label}</span>
                {isActive && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-red-700 rounded-l-full" />}
              </button>
            );
          })}
        </div>
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
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/templates')}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-[20px] font-bold text-gray-900 tracking-tight">Template Details</h2>
          </div>
          <div className="flex items-center gap-5">
            <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
              <Bell className="w-[22px] h-[22px]" />
            </button>
            <div className="w-px h-8 bg-gray-200 mx-2"></div>
            <div className="flex items-center gap-3 cursor-pointer">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Avatar" className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm" />
            </div>
          </div>
        </div>

        {/* SCROLLABLE MAIN */}
        <main className="flex-1 overflow-y-auto p-10 pb-24">
          <div className="max-w-[1200px] mx-auto">
            
            {/* PAGE HEADER */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-[#F8F5FF] text-red-700 text-[12px] font-bold rounded-full uppercase tracking-wider border border-red-100">
                    Luxury Wedding
                  </span>
                  <span className="flex items-center gap-1 text-[13px] font-bold text-gray-500">
                    <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                    4.9 Rating
                  </span>
                </div>
                <h1 className="text-[42px] font-bold text-gray-900 tracking-tight leading-none mb-2">
                  The Eternal Grandeur
                </h1>
                <p className="text-[16px] font-medium text-gray-500">
                  A sophisticated, high-conversion proposal design tailored for premium luxury weddings.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button 
                  onClick={() => navigate('/templates/1/preview')}
                  className="h-12 px-6 flex items-center gap-2 bg-white border border-[#ECECF1] text-gray-700 rounded-full font-bold text-[14px] hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
                <button 
                  onClick={() => navigate('/templates/1/use')}
                  className="h-12 px-8 flex items-center gap-2 bg-gradient-to-r from-red-700 to-orange-400 text-white rounded-full font-bold text-[15px] hover:from-red-800 hover:to-orange-500 transition-colors shadow-md"
                >
                  Use Template
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* TWO COLUMNS LAYOUT */}
            <div className="flex flex-col xl:flex-row gap-8">
              
              {/* LEFT COLUMN: PREVIEW & SECTIONS */}
              <div className="flex-1 space-y-8">
                
                {/* PREVIEW CARD */}
                <div className="bg-white rounded-[32px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#ECECF1]">
                  <div className="bg-[#F8F9FC] rounded-[24px] aspect-[4/3] flex items-center justify-center overflow-hidden relative group">
                    <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80" alt="Cover Preview" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                      <p className="text-white font-bold text-[20px]">Cover Page Preview</p>
                    </div>
                  </div>
                </div>

                {/* SECTIONS INCLUDED */}
                <div className="bg-white rounded-[32px] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#ECECF1]">
                  <h3 className="text-[18px] font-bold text-gray-900 mb-6">Sections Included (8 Pages)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['Cover Page', 'Welcome Message', 'Event Vision & Moodboard', 'Venue Selection', 'Catering & Gastronomy', 'Pricing Breakdown', 'Terms & Conditions', 'Digital Signature'].map((section: any, idx: any) => (
                      <div key={idx} className="flex items-center gap-3 p-4 rounded-[16px] border border-[#ECECF1] bg-[#F8F9FC]">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span className="text-[14px] font-semibold text-gray-700">{section}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* RIGHT SIDEBAR: METADATA & ACTIONS */}
              <div className="xl:w-[360px] flex flex-col gap-8 shrink-0">
                
                {/* METADATA CARD */}
                <div className="bg-white rounded-[32px] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#ECECF1]">
                  <h3 className="text-[14px] font-bold text-gray-400 uppercase tracking-widest mb-6">Template Info</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-gray-500">
                        <User className="w-5 h-5" />
                        <span className="text-[14px] font-medium">Created By</span>
                      </div>
                      <span className="text-[14px] font-bold text-gray-900">EventHub Team</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-gray-500">
                        <Clock className="w-5 h-5" />
                        <span className="text-[14px] font-medium">Last Modified</span>
                      </div>
                      <span className="text-[14px] font-bold text-gray-900">Oct 12, 2023</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-gray-500">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="text-[14px] font-medium">Status</span>
                      </div>
                      <span className="text-[12px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md uppercase tracking-wider">Active</span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-[#ECECF1]">
                      <div>
                        <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-1">Uses</p>
                        <p className="text-[24px] font-black text-gray-900">412</p>
                      </div>
                      <div>
                        <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-1">Conversion</p>
                        <p className="text-[24px] font-black text-emerald-600">68%</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ACTIONS CARD */}
                <div className="bg-white rounded-[32px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#ECECF1]">
                  <h3 className="text-[14px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">Quick Actions</h3>
                  <div className="space-y-2">
                    <button onClick={() => navigate('/templates/1/edit')} className="w-full flex items-center justify-between px-4 py-3.5 rounded-[16px] hover:bg-gray-50 transition-colors group">
                      <div className="flex items-center gap-3 text-gray-700 group-hover:text-gray-900">
                        <Edit3 className="w-5 h-5" />
                        <span className="text-[15px] font-semibold">Edit Template Layout</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500" />
                    </button>
                    
                    <button onClick={() => navigate('/templates/1/duplicate')} className="w-full flex items-center justify-between px-4 py-3.5 rounded-[16px] hover:bg-gray-50 transition-colors group">
                      <div className="flex items-center gap-3 text-gray-700 group-hover:text-gray-900">
                        <Copy className="w-5 h-5" />
                        <span className="text-[15px] font-semibold">Duplicate Template</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500" />
                    </button>
                    
                    <button onClick={() => navigate('/templates/1/share')} className="w-full flex items-center justify-between px-4 py-3.5 rounded-[16px] hover:bg-gray-50 transition-colors group">
                      <div className="flex items-center gap-3 text-gray-700 group-hover:text-blue-600">
                        <Share2 className="w-5 h-5" />
                        <span className="text-[15px] font-semibold">Share with Team</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600" />
                    </button>

                    <button onClick={() => navigate('/templates/1/export')} className="w-full flex items-center justify-between px-4 py-3.5 rounded-[16px] hover:bg-gray-50 transition-colors group">
                      <div className="flex items-center gap-3 text-gray-700 group-hover:text-purple-600">
                        <Download className="w-5 h-5" />
                        <span className="text-[15px] font-semibold">Export Center</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-purple-600" />
                    </button>

                    <button onClick={() => navigate('/templates/1/rename')} className="w-full flex items-center justify-between px-4 py-3.5 rounded-[16px] hover:bg-gray-50 transition-colors group">
                      <div className="flex items-center gap-3 text-gray-700 group-hover:text-gray-900">
                        <Type className="w-5 h-5" />
                        <span className="text-[15px] font-semibold">Rename Template</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500" />
                    </button>

                    <button onClick={() => navigate('/templates/1/move')} className="w-full flex items-center justify-between px-4 py-3.5 rounded-[16px] hover:bg-gray-50 transition-colors group">
                      <div className="flex items-center gap-3 text-gray-700 group-hover:text-orange-600">
                        <LayoutTemplate className="w-5 h-5" />
                        <span className="text-[15px] font-semibold">Move Category</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-orange-600" />
                    </button>

                    <button onClick={() => navigate('/templates/1/history')} className="w-full flex items-center justify-between px-4 py-3.5 rounded-[16px] hover:bg-gray-50 transition-colors group">
                      <div className="flex items-center gap-3 text-gray-700 group-hover:text-blue-600">
                        <History className="w-5 h-5" />
                        <span className="text-[15px] font-semibold">Version History</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600" />
                    </button>

                    <button onClick={() => navigate('/templates/1/approve')} className="w-full flex items-center justify-between px-4 py-3.5 rounded-[16px] hover:bg-gray-50 transition-colors group">
                      <div className="flex items-center gap-3 text-gray-700 group-hover:text-emerald-600">
                        <CheckSquare className="w-5 h-5" />
                        <span className="text-[15px] font-semibold">Approval Workflow</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-600" />
                    </button>

                    <button onClick={() => navigate('/templates/analytics')} className="w-full flex items-center justify-between px-4 py-3.5 rounded-[16px] hover:bg-gray-50 transition-colors group">
                      <div className="flex items-center gap-3 text-gray-700 group-hover:text-orange-600">
                        <BarChart2 className="w-5 h-5" />
                        <span className="text-[15px] font-semibold">View Analytics</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-orange-600" />
                    </button>

                    <div className="h-px bg-[#ECECF1] my-2 mx-4"></div>

                    <button onClick={() => navigate('/templates/1/archive')} className="w-full flex items-center justify-between px-4 py-3.5 rounded-[16px] hover:bg-red-50 transition-colors group">
                      <div className="flex items-center gap-3 text-gray-600 group-hover:text-red-600">
                        <Archive className="w-5 h-5" />
                        <span className="text-[15px] font-semibold">Archive Template</span>
                      </div>
                    </button>

                    <button onClick={() => navigate('/templates/1/delete')} className="w-full flex items-center justify-between px-4 py-3.5 rounded-[16px] hover:bg-red-50 transition-colors group">
                      <div className="flex items-center gap-3 text-red-600">
                        <Trash2 className="w-5 h-5" />
                        <span className="text-[15px] font-semibold">Delete Template</span>
                      </div>
                    </button>
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

export default TemplateDetails;
