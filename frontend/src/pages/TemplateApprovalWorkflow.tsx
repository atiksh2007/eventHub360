import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Files, LayoutTemplate, CheckSquare, Users, 
  Settings, HelpCircle, Bell, ArrowLeft, CheckCircle2, XCircle, 
  MessageSquare, Clock, FileEdit
} from 'lucide-react';

const TemplateApprovalWorkflow = () => {
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
      {/* SIDEBAR */}
      <div className="w-[260px] bg-white h-screen fixed left-0 top-0 flex flex-col border-r border-[#ECECF1] z-10 hidden lg:flex">
        <div className="p-6 pb-8 border-b border-[#ECECF1]">
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            <span className="text-red-700">Event</span>Hub360
          </h1>
          <p className="text-[10px] text-gray-500 font-bold mt-1 uppercase tracking-widest">Enterprise Concierge</p>
        </div>
        <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {sidebarNavItems.map((item: any, index: any) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center h-12 px-4 rounded-[14px] transition-all group relative ${
                  item.active ? 'bg-[#F8F5FF] text-red-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className={`w-5 h-5 mr-3 ${item.active ? 'text-red-700' : 'text-gray-400 group-hover:text-gray-600'}`} />
                <span className="text-[15px]">{item.label}</span>
                {item.active && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-red-700 rounded-l-full" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        
        {/* HEADER */}
        <div className="h-[72px] bg-white border-b border-[#ECECF1] px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-[20px] font-bold text-gray-900">Template Approval Workflow</h2>
          </div>
          <div className="flex items-center gap-5">
            <button className="relative text-gray-500 hover:text-gray-700">
              <Bell className="w-[22px] h-[22px]" />
            </button>
            <div className="w-px h-8 bg-gray-200 mx-2"></div>
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Avatar" className="w-10 h-10 rounded-full object-cover shadow-sm" />
          </div>
        </div>

        <main className="flex-1 overflow-y-auto p-10 flex gap-8">
          
          <div className="flex-1 max-w-[800px]">
            <div className="mb-8">
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-[11px] font-bold uppercase tracking-wider rounded-full mb-4 inline-block">Pending Review</span>
              <h1 className="text-[32px] font-bold text-gray-900 leading-none mb-3">Review: Boutique Escapes</h1>
              <p className="text-[15px] font-medium text-gray-500">
                Submitted by Sarah Jenkins on Oct 24, 2023 at 11:30 AM
              </p>
            </div>

            <div className="bg-white rounded-[24px] shadow-sm border border-[#ECECF1] overflow-hidden mb-8">
              <div className="p-6 border-b border-[#ECECF1] flex items-center justify-between bg-gray-50">
                <div className="flex items-center gap-3">
                  <FileEdit className="w-5 h-5 text-gray-400" />
                  <h3 className="text-[16px] font-bold text-gray-900">Changes Summary</h3>
                </div>
                <button onClick={() => navigate('/templates/3/preview')} className="text-red-600 font-bold text-[13px] hover:text-red-700">View Full Template →</button>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 mt-0.5"><Clock className="w-3 h-3" /></div>
                    <div>
                      <p className="text-[14px] font-bold text-gray-900">Updated Pricing Tiers</p>
                      <p className="text-[13px] text-gray-500">Adjusted margins for the Platinum tier from 25% to 30%.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5"><CheckCircle2 className="w-3 h-3" /></div>
                    <div>
                      <p className="text-[14px] font-bold text-gray-900">Added New Legal Clause</p>
                      <p className="text-[13px] text-gray-500">Included the updated force majeure section from Legal.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[16px] font-bold text-gray-900">Leave a Comment</h3>
              <textarea 
                rows={4} 
                placeholder="Add your review notes here..."
                className="w-full bg-white border border-[#ECECF1] rounded-[16px] p-4 text-[14px] focus:outline-none focus:border-red-300 shadow-sm resize-none"
              ></textarea>
            </div>
          </div>

          <div className="w-[320px] shrink-0">
            <div className="bg-white rounded-[24px] shadow-sm border border-[#ECECF1] p-6 sticky top-0">
              <h3 className="text-[14px] font-bold text-gray-900 uppercase tracking-widest mb-6">Approval Actions</h3>
              
              <div className="space-y-3">
                <button onClick={() => navigate('/templates')} className="w-full py-3.5 bg-emerald-600 text-white rounded-xl font-bold text-[14px] hover:bg-emerald-700 transition-colors shadow-sm flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5" /> Approve Template
                </button>
                <button onClick={() => navigate('/templates')} className="w-full py-3.5 bg-white border border-[#ECECF1] text-orange-600 rounded-xl font-bold text-[14px] hover:bg-orange-50 transition-colors flex items-center justify-center gap-2">
                  <MessageSquare className="w-5 h-5" /> Request Changes
                </button>
                <button onClick={() => navigate('/templates')} className="w-full py-3.5 bg-white border border-red-200 text-red-600 rounded-xl font-bold text-[14px] hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
                  <XCircle className="w-5 h-5" /> Reject
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-[#ECECF1]">
                <h4 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-4">Reviewers</h4>
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                      <CheckCircle2 className="w-2 h-2 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-gray-900">Alex Chen</p>
                    <p className="text-[11px] text-emerald-600 font-bold">Approved</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-[12px]">SJ</div>
                  <div>
                    <p className="text-[13px] font-bold text-gray-900">Sarah Jenkins</p>
                    <p className="text-[11px] text-orange-500 font-bold">Pending Review</p>
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

export default TemplateApprovalWorkflow;
