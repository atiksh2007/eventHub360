import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import { api } from '../services/api';
import { 
  History, Download, Search, Filter, SplitSquareHorizontal, 
  RotateCcw, FileText, User, CheckCircle2, FileEdit, Send
} from 'lucide-react';

const getLogIcon = (action: string) => {
  if (action.includes('Approved')) return { icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' };
  if (action.includes('Generated')) return { icon: Send, color: 'text-purple-600 bg-purple-50' };
  if (action.includes('Rejected')) return { icon: RotateCcw, color: 'text-red-600 bg-red-50' };
  if (action.includes('Requested')) return { icon: FileEdit, color: 'text-orange-600 bg-orange-50' };
  if (action.includes('Created')) return { icon: FileText, color: 'text-blue-600 bg-blue-50' };
  return { icon: History, color: 'text-gray-600 bg-gray-50' };
};

const QuotationHistoryCenter = () => {
  const navigate = useNavigate();
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAuditLogs().then((data: any) => {
      setAuditLogs(data || []);
      setLoading(false);
    }).catch((err: any) => {
      console.error('Failed to load audit logs:', err);
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans">
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        <TopHeader />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1400px] mx-auto space-y-6">
            
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">History & Audit Center</h1>
                <p className="text-[15px] text-gray-500 mt-1">Track quotation versions, audit user actions, and compare historical data.</p>
              </div>
              <div className="flex gap-3">
                <button className="px-5 py-2.5 bg-white border border-[#ECECF1] text-gray-700 rounded-full font-bold text-[14px] hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
                  <SplitSquareHorizontal className="w-4 h-4" /> Compare Versions
                </button>
                <button className="px-5 py-2.5 bg-gray-900 text-white rounded-full font-bold text-[14px] hover:bg-gray-800 transition-colors shadow-sm flex items-center gap-2">
                  <Download className="w-4 h-4" /> Export History
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Timeline / Audit Log */}
              <div className="lg:col-span-2 bg-white rounded-[24px] shadow-sm border border-[#ECECF1] overflow-hidden flex flex-col h-[700px]">
                <div className="p-6 border-b border-[#ECECF1] flex items-center justify-between bg-gray-50">
                  <h3 className="text-[16px] font-bold text-gray-900 flex items-center gap-2">
                    <History className="w-5 h-5 text-gray-400" /> Global Audit Log
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="text" placeholder="Search logs..." className="pl-9 pr-4 py-2 bg-white border border-[#ECECF1] rounded-full text-[13px] focus:outline-none focus:border-red-300 w-[200px]" />
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6">
                  {loading ? (
                    <div className="flex justify-center items-center h-full">
                      <span className="text-gray-400 text-sm font-semibold">Loading logs...</span>
                    </div>
                  ) : auditLogs.length === 0 ? (
                    <div className="flex justify-center items-center h-full">
                      <span className="text-gray-400 text-sm font-semibold">No history events recorded yet.</span>
                    </div>
                  ) : (
                    <div className="relative border-l-2 border-[#ECECF1] ml-4 space-y-8 pb-8">
                      {auditLogs.map((log: any) => {
                        const style = getLogIcon(log.action);
                        const Icon = style.icon;
                        const date = new Date(log.createdAt);
                        const timeString = isNaN(date.getTime()) ? 'Unknown Time' : date.toLocaleString();
                        
                        return (
                          <div key={log.id} className="relative pl-8">
                            <div className={`absolute -left-[17px] top-0 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center ${style.color}`}>
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="bg-[#F8F9FC] rounded-[16px] p-4 border border-[#ECECF1]">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <p className="text-[14px] font-bold text-gray-900">{log.action}</p>
                                  <p className="text-[12px] font-medium text-gray-500">
                                    Quote: <span 
                                      className="text-red-600 font-bold cursor-pointer hover:underline"
                                      onClick={() => navigate(`/quotations/drafts/continue?id=${log.entityId}`)}
                                    >
                                      {log.entityId}
                                    </span>
                                  </p>
                                </div>
                                <span className="text-[12px] text-gray-400 font-semibold">{timeString}</span>
                              </div>
                              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#ECECF1]">
                                <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                  <User className="w-3 h-3 text-gray-500" />
                                </div>
                                <span className="text-[12px] font-semibold text-gray-700">{log.userName || 'System'}</span>
                                {log.details && Object.keys(log.details).length > 0 && (
                                  <span className="ml-2 px-2 py-0.5 bg-white border border-gray-200 rounded text-[10px] text-gray-400 font-mono">
                                    {JSON.stringify(log.details)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Filters Sidebar */}
              <div className="bg-white rounded-[24px] shadow-sm border border-[#ECECF1] p-6 h-max">
                <div className="flex items-center gap-2 mb-6 text-gray-900 font-bold">
                  <Filter className="w-5 h-5" /> Filters
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-[12px] font-bold text-gray-400 uppercase tracking-widest block mb-2">User</label>
                    <select className="w-full px-4 py-2.5 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] focus:outline-none focus:border-red-300">
                      <option>All Users</option>
                      <option>Alex Chen</option>
                      <option>Sarah Jenkins</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[12px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Action Type</label>
                    <div className="space-y-2">
                      {['Creation', 'Edits', 'Approvals', 'Restores', 'Client Views'].map((type: any, idx: any) => (
                        <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                          <input type="checkbox" className="w-4 h-4 rounded text-red-600 border-gray-300 focus:ring-red-500" defaultChecked={idx < 3} />
                          <span className="text-[14px] font-semibold text-gray-700 group-hover:text-gray-900">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[12px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Date Range</label>
                    <select className="w-full px-4 py-2.5 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] focus:outline-none focus:border-red-300">
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                      <option>This Quarter</option>
                      <option>Custom Range</option>
                    </select>
                  </div>
                </div>
                
                <button className="w-full mt-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold text-[14px] hover:bg-gray-200 transition-colors">
                  Reset Filters
                </button>
              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default QuotationHistoryCenter;

