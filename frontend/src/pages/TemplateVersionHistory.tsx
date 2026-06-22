import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Files, LayoutTemplate, CheckSquare, Users, 
  Settings, HelpCircle, Bell, ArrowLeft, History, RotateCcw, 
  CheckCircle2, Eye
} from 'lucide-react';

const TemplateVersionHistory = () => {
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

  const versions = [
    {
      id: 'v2.4',
      date: 'Today, 10:42 AM',
      author: 'Alex Chen',
      changes: ['Updated cover page hero image', 'Revised gastronomy pricing section'],
      status: 'Current Version'
    },
    {
      id: 'v2.3',
      date: 'Oct 12, 2023, 2:15 PM',
      author: 'Sarah Jenkins',
      changes: ['Added new floral arrangements block', 'Fixed typography spacing'],
      status: 'Previous'
    },
    {
      id: 'v2.2',
      date: 'Sep 28, 2023, 9:00 AM',
      author: 'Alex Chen',
      changes: ['Initial luxury layout applied', 'Added 3 moodboard variations'],
      status: 'Previous'
    }
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
            <h2 className="text-[20px] font-bold text-gray-900">Version History</h2>
          </div>
          <div className="flex items-center gap-5">
            <button className="relative text-gray-500 hover:text-gray-700">
              <Bell className="w-[22px] h-[22px]" />
            </button>
            <div className="w-px h-8 bg-gray-200 mx-2"></div>
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Avatar" className="w-10 h-10 rounded-full object-cover shadow-sm" />
          </div>
        </div>

        <main className="flex-1 overflow-y-auto p-10">
          <div className="max-w-[800px] mx-auto">
            
            <div className="mb-10">
              <h1 className="text-[32px] font-bold text-gray-900 leading-none mb-3">The Eternal Grandeur</h1>
              <p className="text-[15px] font-medium text-gray-500">
                Track changes, review past iterations, and restore previous versions of this template.
              </p>
            </div>

            <div className="bg-white rounded-[24px] shadow-sm border border-[#ECECF1] overflow-hidden">
              {versions.map((version: any, index: any) => (
                <div key={index} className={`p-6 border-b border-[#ECECF1] last:border-0 ${version.status === 'Current Version' ? 'bg-[#F8F5FF]' : ''}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${version.status === 'Current Version' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
                        {version.status === 'Current Version' ? <CheckCircle2 className="w-5 h-5" /> : <History className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[16px] font-bold text-gray-900">{version.id}</span>
                          {version.status === 'Current Version' && (
                            <span className="px-2 py-0.5 bg-red-600 text-white text-[10px] font-bold uppercase rounded-full tracking-wide">Current</span>
                          )}
                        </div>
                        <p className="text-[13px] text-gray-500">{version.date} • by <span className="font-semibold text-gray-700">{version.author}</span></p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-4 py-2 bg-white border border-[#ECECF1] rounded-full text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm">
                        <Eye className="w-4 h-4" /> Preview
                      </button>
                      {version.status !== 'Current Version' && (
                        <button className="px-4 py-2 bg-white border border-[#ECECF1] rounded-full text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm">
                          <RotateCcw className="w-4 h-4" /> Restore
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="pl-13 ml-13">
                    <ul className="list-disc list-inside text-[14px] text-gray-600 space-y-1">
                      {version.changes.map((change: any, i: any) => (
                        <li key={i}>{change}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default TemplateVersionHistory;
