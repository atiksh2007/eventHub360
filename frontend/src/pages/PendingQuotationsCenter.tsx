import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import { 
  Search, Filter, ArrowUpDown, MoreVertical, 
  PhoneCall, Mail, MessageCircle, AlertCircle,
  Clock, Calendar, CheckCircle2, ChevronRight
} from 'lucide-react';

const PendingQuotationsCenter = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const agingData = [
    { label: '0–7 Days', count: 12, value: '$345k', risk: 'Low', color: 'bg-emerald-100 text-emerald-700' },
    { label: '8–15 Days', count: 8, value: '$180k', risk: 'Medium', color: 'bg-yellow-100 text-yellow-700' },
    { label: '16–30 Days', count: 3, value: '$95k', risk: 'High', color: 'bg-orange-100 text-orange-700' },
    { label: '30+ Days', count: 1, value: '$45k', risk: 'Critical', color: 'bg-red-100 text-red-700' }
  ];

  const followUps = [
    { id: 1, client: 'Sarah Jenkins', type: 'Call', time: 'Overdue by 2 hours', status: 'overdue', icon: PhoneCall },
    { id: 2, client: 'TechCorp Gala', type: 'Email', time: 'Today, 2:00 PM', status: 'upcoming', icon: Mail },
    { id: 3, client: 'Marriott Partners', type: 'WhatsApp', time: 'Tomorrow, 10:00 AM', status: 'scheduled', icon: MessageCircle }
  ];

  const [pendingQuotes, setPendingQuotes] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  React.useEffect(() => {
    import('../services/api').then(({ api }) => {
      Promise.all([
        api.getLiveList('DRAFT', 1, 50),
        api.getLiveList('PENDING_APPROVAL', 1, 50)
      ]).then(([draftData, pendingData]: any[]) => {
        const rows = [...(draftData?.rows || []), ...(pendingData?.rows || [])];
        setPendingQuotes(rows.map((row: any) => ({
          id: row.quoteNumber,
          client: row.clientName,
          event: row.eventType,
          value: row.totalAmount,
          stage: row.status,
          executive: 'Unassigned', // Backend doesn't have executive yet
          lastActivity: 'Recent'
        })));
      }).catch(err => console.error("Failed to load active quotes:", err));
    });
  }, []);

  const filteredQuotes = pendingQuotes.filter(q => 
    (q.id && q.id.toLowerCase().includes(searchQuery.toLowerCase())) || 
    (q.client && q.client.toLowerCase().includes(searchQuery.toLowerCase())) || 
    (q.event && q.event.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (q.stage && q.stage.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans">
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        <TopHeader />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1400px] mx-auto space-y-6">
            
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Pending Quotations Center</h1>
                <p className="text-[15px] text-gray-500 mt-1">Manage, track, and follow up on all active quotations.</p>
              </div>
              <button 
                onClick={() => navigate('/quotations/new')}
                className="px-6 py-2.5 bg-gradient-to-r from-red-700 to-orange-400 text-white rounded-full font-bold text-[14px] shadow-sm hover:shadow-md transition-all"
              >
                Create New Quote
              </button>
            </div>

            {/* Quote Aging Report & Follow-Up Queue */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              
              {/* Aging Report */}
              <div className="xl:col-span-2 bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1]">
                <h3 className="text-[16px] font-bold text-gray-900 mb-6">Quote Aging Report</h3>
                <div className="grid grid-cols-4 gap-4">
                  {agingData.map((item: any, idx: any) => (
                    <div key={idx} className="p-4 rounded-[16px] bg-[#F8F9FC] border border-[#ECECF1]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[13px] font-bold text-gray-500">{item.label}</span>
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${item.color}`}>{item.risk}</span>
                      </div>
                      <p className="text-[24px] font-black text-gray-900 mb-1">{item.count} <span className="text-[14px] font-medium text-gray-400">quotes</span></p>
                      <p className="text-[14px] font-bold text-red-700">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Follow-Up Queue */}
              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1] flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[16px] font-bold text-gray-900">Follow-Up Queue</h3>
                  <button className="text-[13px] font-bold text-red-600 hover:text-red-700">View All</button>
                </div>
                <div className="space-y-4 flex-1">
                  {followUps.map((task: any) => (
                    <div key={task.id} className="flex items-start gap-3 p-3 rounded-[12px] hover:bg-gray-50 border border-transparent hover:border-[#ECECF1] transition-colors cursor-pointer">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${task.status === 'overdue' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                        <task.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-bold text-gray-900 truncate">{task.client}</p>
                        <p className={`text-[12px] font-medium ${task.status === 'overdue' ? 'text-red-600' : 'text-gray-500'}`}>{task.time}</p>
                      </div>
                      <button className="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-400 transition-colors">
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Active Quotations Table */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h3 className="text-[16px] font-bold text-gray-900">Active Quotations</h3>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search quotes..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-4 py-2 bg-[#F8F9FC] border border-[#ECECF1] rounded-full text-[13px] focus:outline-none focus:border-red-300 w-[250px]" 
                    />
                  </div>
                  <button className="p-2 border border-[#ECECF1] rounded-full text-gray-600 hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#ECECF1]">
                      <th className="pb-3 px-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider font-sans">Quote ID</th>
                      <th className="pb-3 px-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider font-sans">Client & Event</th>
                      <th className="pb-3 px-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider font-sans">Value</th>
                      <th className="pb-3 px-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider font-sans">Stage</th>
                      <th className="pb-3 px-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider font-sans">Executive</th>
                      <th className="pb-3 px-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider font-sans">Last Activity</th>
                      <th className="pb-3 px-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider font-sans text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredQuotes.map((quote: any) => (
                      <tr key={quote.id} className="border-b border-[#ECECF1] last:border-0 hover:bg-gray-50 transition-colors group cursor-pointer" onClick={() => navigate(`/quotations/drafts/continue?id=${quote.id}`)}>
                        <td className="py-4 px-4 text-[14px] font-bold text-gray-900">{quote.id}</td>
                        <td className="py-4 px-4">
                          <p className="text-[14px] font-bold text-gray-900">{quote.client}</p>
                          <p className="text-[12px] text-gray-500">{quote.event}</p>
                        </td>
                        <td className="py-4 px-4 text-[14px] font-bold text-gray-900">{quote.value}</td>
                        <td className="py-4 px-4">
                          <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[11px] font-bold uppercase rounded-full">{quote.stage}</span>
                        </td>
                        <td className="py-4 px-4 text-[13px] font-semibold text-gray-700">{quote.executive}</td>
                        <td className="py-4 px-4 text-[13px] text-gray-500">{quote.lastActivity}</td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-gray-400 hover:text-red-600 transition-colors" onClick={(e) => { e.stopPropagation(); navigate(`/quotations/${quote.id}/edit`); }}>
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

export default PendingQuotationsCenter;
