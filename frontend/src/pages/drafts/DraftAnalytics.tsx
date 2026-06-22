import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import TopHeader from '../../components/TopHeader';
import { 
  ArrowLeft, BarChart3, TrendingUp, Clock, AlertTriangle, Users, DollarSign
} from 'lucide-react';

const DraftAnalytics = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans">
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        <TopHeader />
        
        <main className="flex-1 overflow-y-auto p-8 pb-32">
          <div className="max-w-[1200px] mx-auto space-y-6">
            
            <div className="flex items-center gap-4 mb-8">
              <button 
                onClick={() => navigate('/quotations/drafts')}
                className="w-10 h-10 bg-white border border-[#ECECF1] rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Draft Analytics</h1>
                <p className="text-[15px] text-gray-500 mt-1">Analyze quotation creation efficiency, completion rates, and pipeline health.</p>
              </div>
            </div>

            {/* Top KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1]">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-1">Completion Rate</p>
                <div className="flex items-end gap-3">
                  <h3 className="text-[28px] font-bold text-gray-900">74%</h3>
                  <span className="text-[13px] font-bold text-emerald-600 mb-1.5">+2.4% vs last mo</span>
                </div>
              </div>
              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1]">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-1">Avg Completion Time</p>
                <div className="flex items-end gap-3">
                  <h3 className="text-[28px] font-bold text-gray-900">1.2 Days</h3>
                  <span className="text-[13px] font-bold text-emerald-600 mb-1.5">-4 hrs vs last mo</span>
                </div>
              </div>
              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1]">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-1">Abandoned Drafts</p>
                <div className="flex items-end gap-3">
                  <h3 className="text-[28px] font-bold text-gray-900">12</h3>
                  <span className="text-[13px] font-bold text-red-600 mb-1.5">+3 vs last mo</span>
                </div>
              </div>
              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1]">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                  <DollarSign className="w-5 h-5" />
                </div>
                <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-1">Draft Revenue Pipeline</p>
                <div className="flex items-end gap-3">
                  <h3 className="text-[28px] font-bold text-gray-900">$1.2M</h3>
                  <span className="text-[13px] font-bold text-gray-500 mb-1.5">Across 45 drafts</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Funnel/Drop-off Chart Placeholder */}
              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1] h-[400px] flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[18px] font-bold text-gray-900">Draft Drop-off Analysis</h2>
                  <select className="px-3 py-1.5 border border-[#ECECF1] rounded-lg text-[12px] font-bold text-gray-600 focus:outline-none">
                    <option>Last 30 Days</option>
                    <option>This Quarter</option>
                  </select>
                </div>
                <div className="flex-1 flex items-center justify-center bg-[#F8F9FC] rounded-xl border border-[#ECECF1] border-dashed">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-[14px] font-bold text-gray-500">Step Drop-off Visualization</p>
                    <p className="text-[12px] text-gray-400 mt-1">Highest drop-off occurs at Step 5 (Pricing)</p>
                  </div>
                </div>
              </div>

              {/* Team Performance Placeholder */}
              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1] h-[400px] flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[18px] font-bold text-gray-900">Creation Time by User</h2>
                </div>
                <div className="flex-1 flex flex-col justify-center space-y-6">
                  
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <div className="flex items-center gap-2">
                        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" className="w-6 h-6 rounded-full" alt=""/>
                        <span className="text-[13px] font-bold text-gray-900">Alex Sterling</span>
                      </div>
                      <span className="text-[13px] font-bold text-gray-600">0.8 Days avg</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full w-[40%]"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <div className="flex items-center gap-2">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" className="w-6 h-6 rounded-full" alt=""/>
                        <span className="text-[13px] font-bold text-gray-900">Sarah Jenkins</span>
                      </div>
                      <span className="text-[13px] font-bold text-gray-600">1.5 Days avg</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-400 rounded-full w-[70%]"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <div className="flex items-center gap-2">
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" className="w-6 h-6 rounded-full" alt=""/>
                        <span className="text-[13px] font-bold text-gray-900">Emma Watson</span>
                      </div>
                      <span className="text-[13px] font-bold text-gray-600">2.1 Days avg</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full w-[90%]"></div>
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

export default DraftAnalytics;
