import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import { 
  History, Download, Search, Filter, SplitSquareHorizontal, 
  RotateCcw, FileText, User, CheckCircle2, FileEdit, Send
} from 'lucide-react';

const QuotationHistoryCenter = () => {
  const navigate = useNavigate();

  const auditLogs = [
    { id: 1, action: 'Quote Approved', quote: 'QT-2023-145', user: 'Director Smith', time: '10 mins ago', type: 'approval', icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
    { id: 2, action: 'Version v2.3 Created', quote: 'QT-2023-148', user: 'Alex Chen', time: '1 hour ago', type: 'version', icon: FileEdit, color: 'text-blue-600 bg-blue-50' },
    { id: 3, action: 'Sent to Client', quote: 'QT-2023-142', user: 'Sarah Jenkins', time: '3 hours ago', type: 'send', icon: Send, color: 'text-purple-600 bg-purple-50' },
    { id: 4, action: 'Restored Version v1.1', quote: 'QT-2023-130', user: 'Michael Chang', time: '1 day ago', type: 'restore', icon: RotateCcw, color: 'text-orange-600 bg-orange-50' },
  ];

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
                  <div className="relative border-l-2 border-[#ECECF1] ml-4 space-y-8 pb-8">
                    {auditLogs.map((log: any) => (
                      <div key={log.id} className="relative pl-8">
                        <div className={`absolute -left-[17px] top-0 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center ${log.color}`}>
                          <log.icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="bg-[#F8F9FC] rounded-[16px] p-4 border border-[#ECECF1]">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="text-[14px] font-bold text-gray-900">{log.action}</p>
                              <p className="text-[12px] font-medium text-gray-500">Quote: <span className="text-red-600 font-bold cursor-pointer hover:underline">{log.quote}</span></p>
                            </div>
                            <span className="text-[12px] text-gray-400 font-semibold">{log.time}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#ECECF1]">
                            <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                              <User className="w-3 h-3 text-gray-500" />
                            </div>
                            <span className="text-[12px] font-semibold text-gray-700">{log.user}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
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
