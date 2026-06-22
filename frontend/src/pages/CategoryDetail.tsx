import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Files, LayoutTemplate, CheckSquare, Users, 
  Settings, HelpCircle, Bell, ArrowLeft, TrendingUp, BarChart, 
  Star, Plus
} from 'lucide-react';

const CategoryDetail = () => {
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
            <button onClick={() => navigate('/templates')} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-[20px] font-bold text-gray-900">Category Overview</h2>
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
          <div className="max-w-[1200px] mx-auto">
            
            <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <h1 className="text-[42px] font-bold text-gray-900 leading-none mb-3">Luxury Weddings</h1>
                <p className="text-[16px] font-medium text-gray-500">
                  Premium proposal templates designed specifically for high-end wedding curation.
                </p>
              </div>
              <button onClick={() => navigate('/templates/new')} className="h-12 px-6 bg-gradient-to-r from-red-700 to-orange-400 text-white rounded-full font-bold shadow-md hover:shadow-lg flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Create New Template
              </button>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1]">
                <p className="text-[12px] font-bold text-gray-400 uppercase mb-2">Total Templates</p>
                <p className="text-[32px] font-black text-gray-900">14</p>
              </div>
              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1]">
                <p className="text-[12px] font-bold text-gray-400 uppercase mb-2">Revenue Generated (YTD)</p>
                <div className="flex items-center gap-3">
                  <p className="text-[32px] font-black text-gray-900">$2.4M</p>
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                </div>
              </div>
              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1] cursor-pointer hover:bg-gray-50" onClick={() => navigate('/templates/analytics')}>
                <div className="flex justify-between items-start mb-2">
                  <p className="text-[12px] font-bold text-gray-400 uppercase">Avg Conversion Rate</p>
                  <BarChart className="w-5 h-5 text-red-600" />
                </div>
                <p className="text-[32px] font-black text-emerald-600">62%</p>
                <p className="text-[12px] font-medium text-gray-500 mt-1">View full analytics →</p>
              </div>
            </div>

            {/* MOST USED */}
            <h3 className="text-[18px] font-bold text-gray-900 mb-6">Popular in Luxury Weddings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-white rounded-[24px] shadow-sm border border-[#ECECF1] overflow-hidden hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/templates/1')}>
                <div className="h-[200px] bg-[#F8F5FF] flex items-center justify-center p-6 relative">
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white text-red-700 text-[11px] font-bold rounded-full shadow-sm">#1 Most Used</span>
                  <div className="w-[80%] h-[120px] bg-white shadow-sm border border-gray-100 rounded-md"></div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-[18px] font-bold text-gray-900">The Eternal Grandeur</h4>
                    <span className="flex items-center text-[13px] font-bold text-gray-500">
                      <Star className="w-4 h-4 text-orange-400 fill-orange-400 mr-1" />
                      4.9
                    </span>
                  </div>
                  <p className="text-[13px] text-gray-500 mb-4 line-clamp-2">A sophisticated, high-conversion proposal design tailored for premium luxury weddings.</p>
                  <div className="flex gap-2">
                    <button onClick={(e) => { e.stopPropagation(); navigate('/templates/1/use'); }} className="flex-1 bg-red-600 text-white py-2 rounded-lg font-bold text-[14px]">Use</button>
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

export default CategoryDetail;
