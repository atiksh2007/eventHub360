import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import { 
  Search, Filter, Download, MoreVertical, 
  ChevronRight, CheckSquare, Settings
} from 'lucide-react';

const QuotationsMasterList = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');

  const tabs = [
    { id: 'active', label: 'Active' },
    { id: 'draft', label: 'Draft' },
    { id: 'sent', label: 'Sent' },
    { id: 'accepted', label: 'Accepted' },
    { id: 'rejected', label: 'Rejected' },
    { id: 'expired', label: 'Expired' }
  ];

  const quotes = [
    { id: 'QT-2023-145', client: 'Stark Industries', event: 'Tech Summit', value: '$120,000', status: 'Active', executive: 'Sarah Jenkins', date: 'Oct 24, 2023' },
    { id: 'QT-2023-146', client: 'Wayne Enterprises', event: 'Charity Ball', value: '$85,000', status: 'Active', executive: 'Michael Chang', date: 'Oct 23, 2023' },
    { id: 'QT-2023-147', client: 'Daily Planet', event: 'Awards Night', value: '$45,000', status: 'Active', executive: 'Alex Chen', date: 'Oct 22, 2023' },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans">
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        <TopHeader />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1400px] mx-auto space-y-6">
            
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Quotations Master List</h1>
                <p className="text-[15px] text-gray-500 mt-1">Comprehensive view of all quotes across the entire lifecycle.</p>
              </div>
              <div className="flex gap-3">
                <button className="px-5 py-2.5 bg-white border border-[#ECECF1] text-gray-700 rounded-full font-bold text-[14px] hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
                  <Settings className="w-4 h-4" /> Bulk Actions
                </button>
                <button className="px-5 py-2.5 bg-gray-900 text-white rounded-full font-bold text-[14px] hover:bg-gray-800 transition-colors shadow-sm flex items-center gap-2">
                  <Download className="w-4 h-4" /> Export All
                </button>
              </div>
            </div>

            <div className="bg-white rounded-[24px] shadow-sm border border-[#ECECF1] overflow-hidden flex flex-col h-[700px]">
              
              {/* Toolbar & Tabs */}
              <div className="p-6 border-b border-[#ECECF1] space-y-6 shrink-0">
                
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {tabs.map((tab: any) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-5 py-2 rounded-full text-[14px] font-bold whitespace-nowrap transition-colors ${
                        activeTab === tab.id 
                          ? 'bg-red-50 text-red-700 border border-red-200' 
                          : 'bg-[#F8F9FC] text-gray-600 border border-[#ECECF1] hover:bg-gray-50'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1 max-w-2xl">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="text" placeholder="Global search quotes, clients, events..." className="w-full pl-9 pr-4 py-2.5 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] focus:outline-none focus:border-red-300" />
                    </div>
                    <button className="p-2.5 border border-[#ECECF1] rounded-xl text-gray-600 hover:bg-gray-50 flex items-center gap-2 font-semibold text-[14px]">
                      <Filter className="w-4 h-4" /> Filters
                    </button>
                  </div>
                </div>

              </div>

              {/* Table Area */}
              <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead className="sticky top-0 bg-[#F8F9FC] border-b border-[#ECECF1] z-10">
                    <tr>
                      <th className="py-4 px-6"><input type="checkbox" className="rounded text-red-600 focus:ring-red-500 w-4 h-4" /></th>
                      <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Quote ID</th>
                      <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Client & Event</th>
                      <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Value</th>
                      <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Executive</th>
                      <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Created</th>
                      <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotes.map((quote: any) => (
                      <tr key={quote.id} className="border-b border-[#ECECF1] hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => navigate(`/quotations/${quote.id}`)}>
                        <td className="py-4 px-6" onClick={e => e.stopPropagation()}><input type="checkbox" className="rounded text-red-600 focus:ring-red-500 w-4 h-4" /></td>
                        <td className="py-4 px-6 text-[14px] font-bold text-gray-900">{quote.id}</td>
                        <td className="py-4 px-6">
                          <p className="text-[14px] font-bold text-gray-900">{quote.client}</p>
                          <p className="text-[12px] text-gray-500">{quote.event}</p>
                        </td>
                        <td className="py-4 px-6 text-[14px] font-bold text-gray-900">{quote.value}</td>
                        <td className="py-4 px-6 text-[13px] font-semibold text-gray-700">{quote.executive}</td>
                        <td className="py-4 px-6 text-[13px] text-gray-500">{quote.date}</td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-gray-400 hover:text-red-600 transition-colors" onClick={(e) => { e.stopPropagation(); navigate(`/quotations/${quote.id}`); }}>
                              <ChevronRight className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors" onClick={(e) => e.stopPropagation()}>
                              <MoreVertical className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default QuotationsMasterList;
