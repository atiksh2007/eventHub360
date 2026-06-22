import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Files, LayoutTemplate, CheckSquare, Users, 
  Settings, HelpCircle, Bell, ArrowLeft, TrendingUp, TrendingDown,
  BarChart2, DollarSign, Target, Award
} from 'lucide-react';

const TemplateAnalytics = () => {
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
            <h2 className="text-[20px] font-bold text-gray-900">Template Analytics</h2>
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
            
            <div className="mb-10 flex items-center justify-between">
              <div>
                <h1 className="text-[42px] font-bold text-gray-900 leading-none mb-3">Performance Dashboard</h1>
                <p className="text-[16px] font-medium text-gray-500">
                  Track template usage, conversion rates, and revenue impact across all categories.
                </p>
              </div>
              <select className="px-4 py-2 bg-white border border-[#ECECF1] rounded-lg font-semibold text-gray-700 shadow-sm focus:outline-none">
                <option>Last 30 Days</option>
                <option>This Quarter</option>
                <option>Year to Date</option>
              </select>
            </div>

            {/* METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1]">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <BarChart2 className="w-5 h-5" />
                </div>
                <p className="text-[12px] font-bold text-gray-400 uppercase mb-1">Total Uses</p>
                <div className="flex items-center gap-2">
                  <p className="text-[28px] font-black text-gray-900">1,284</p>
                  <span className="text-[12px] font-bold text-emerald-600 flex items-center"><TrendingUp className="w-3 h-3 mr-0.5" /> 12%</span>
                </div>
              </div>

              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1]">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <Target className="w-5 h-5" />
                </div>
                <p className="text-[12px] font-bold text-gray-400 uppercase mb-1">Acceptance Rate</p>
                <div className="flex items-center gap-2">
                  <p className="text-[28px] font-black text-gray-900">68.4%</p>
                  <span className="text-[12px] font-bold text-emerald-600 flex items-center"><TrendingUp className="w-3 h-3 mr-0.5" /> 4.2%</span>
                </div>
              </div>

              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1]">
                <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
                  <DollarSign className="w-5 h-5" />
                </div>
                <p className="text-[12px] font-bold text-gray-400 uppercase mb-1">Revenue Generated</p>
                <div className="flex items-center gap-2">
                  <p className="text-[28px] font-black text-gray-900">$8.4M</p>
                  <span className="text-[12px] font-bold text-emerald-600 flex items-center"><TrendingUp className="w-3 h-3 mr-0.5" /> 18%</span>
                </div>
              </div>

              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1]">
                <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                  <Award className="w-5 h-5" />
                </div>
                <p className="text-[12px] font-bold text-gray-400 uppercase mb-1">Top Category</p>
                <div className="flex items-center gap-2">
                  <p className="text-[20px] font-black text-gray-900">Luxury Weddings</p>
                </div>
              </div>
            </div>

            {/* CHARTS PLACEHOLDER */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-[24px] p-8 shadow-sm border border-[#ECECF1]">
                <h3 className="text-[18px] font-bold text-gray-900 mb-6">Monthly Usage Trend</h3>
                <div className="h-[240px] flex items-end justify-between gap-4">
                  {[40, 55, 45, 70, 65, 85].map((h: any, i: any) => (
                    <div key={i} className="w-full bg-red-100 rounded-t-md relative group hover:bg-red-200 transition-colors" style={{ height: `${h}%` }}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {h * 12} Uses
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-[13px] font-semibold text-gray-400">
                  <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                </div>
              </div>

              <div className="bg-white rounded-[24px] p-8 shadow-sm border border-[#ECECF1]">
                <h3 className="text-[18px] font-bold text-gray-900 mb-6">Top Performing Templates</h3>
                <div className="space-y-6">
                  {['The Eternal Grandeur', 'Tech-Nexus Summit', 'Boutique Escapes'].map((t: any, i: any) => (
                    <div key={i}>
                      <div className="flex justify-between text-[14px] font-bold mb-2 cursor-pointer hover:text-red-600" onClick={() => navigate(`/templates/${i+1}`)}>
                        <span className="text-gray-900">{t}</span>
                        <span className="text-emerald-600">{72 - (i * 8)}% Conversion</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-red-500 to-orange-400" style={{ width: `${80 - (i * 15)}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default TemplateAnalytics;
