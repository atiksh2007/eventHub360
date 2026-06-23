import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import { api } from '../services/api';
import * as XLSX from 'xlsx';
import { 
  Search, Filter, Download, MoreVertical, 
  ChevronRight, CheckSquare, Settings, CheckCircle2,
  ChevronLeft, Loader2
} from 'lucide-react';

const QuotationsMasterList = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const tabs = [
    { id: 'all', label: 'All Quotes', apiStatus: 'all' },
    { id: 'draft', label: 'Drafts', apiStatus: 'DRAFT' },
    { id: 'pending', label: 'Pending Approval', apiStatus: 'PENDING_APPROVAL' },
    { id: 'sent', label: 'Sent', apiStatus: 'SENT' },
    { id: 'accepted', label: 'Accepted', apiStatus: 'ACCEPTED' },
    { id: 'rejected', label: 'Rejected', apiStatus: 'REJECTED' },
  ];

  useEffect(() => {
    fetchQuotes();
  }, [activeTab, page]);

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const currentTab = tabs.find(t => t.id === activeTab);
      const apiStatus = currentTab?.apiStatus || 'all';
      const res = await api.getLiveList(apiStatus, page, itemsPerPage);
      
      if (res && res.rows) {
        const mapped = res.rows.map((row: any) => ({
          id: row.quoteNumber,
          client: row.clientName,
          event: row.eventType || 'Corporate Event',
          value: row.totalAmount,
          margin: row.marginPct || '0%',
          status: row.status,
          executive: 'Assigned Executive',
          date: new Date(row.createdAt).toLocaleDateString()
        }));
        setQuotes(mapped);
        setTotalPages(res.totalPages || 1);
      } else {
        setQuotes([]);
        setTotalPages(1);
      }
    } catch (err) {
      console.error('Failed to load quotes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    const exportData = quotes.map((q: any) => ({
      'Quote ID': q.id,
      'Client': q.client,
      'Event': q.event,
      'Value': q.value,
      'Status': q.status,
      'Executive': q.executive,
      'Created Date': q.date
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Master_List");
    XLSX.writeFile(workbook, `Quotations_${activeTab}_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  // Local filtering for search (if backend search isn't available)
  const filteredQuotes = quotes.filter(q => 
    (q.id && q.id.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (q.client && q.client.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (q.event && q.event.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (q.status && q.status.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
                <button 
                  onClick={handleExport}
                  className="px-5 py-2.5 bg-gray-900 text-white rounded-full font-bold text-[14px] hover:bg-gray-800 transition-colors shadow-sm flex items-center gap-2"
                >
                  <Download className="w-4 h-4" /> Export All
                </button>
              </div>
            </div>

            <div className="bg-white rounded-[24px] shadow-sm border border-[#ECECF1] overflow-hidden flex flex-col min-h-[700px]">
              
              {/* Toolbar & Tabs */}
              <div className="p-6 border-b border-[#ECECF1] space-y-6 shrink-0">
                
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {tabs.map((tab: any) => (
                    <button
                      key={tab.id}
                      onClick={() => { setActiveTab(tab.id); setPage(1); }}
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
                      <input 
                        type="text" 
                        placeholder="Global search quotes, clients, events..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] focus:outline-none focus:border-red-300 transition-all" 
                      />
                    </div>
                    <button className="p-2.5 border border-[#ECECF1] rounded-xl text-gray-600 hover:bg-gray-50 flex items-center gap-2 font-semibold text-[14px] transition-colors">
                      <Filter className="w-4 h-4" /> Filters
                    </button>
                  </div>
                </div>

              </div>

              {/* Table Area */}
              <div className="flex-1 overflow-auto">
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-full p-12 text-gray-400">
                    <Loader2 className="w-8 h-8 animate-spin mb-4" />
                    <p className="font-medium">Loading quotations...</p>
                  </div>
                ) : filteredQuotes.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full p-12 text-gray-400">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                      <Search className="w-8 h-8 text-gray-300" />
                    </div>
                    <h3 className="text-[18px] font-bold text-gray-900 mb-1">No Quotations Found</h3>
                    <p className="text-[14px]">Try adjusting your search filters or viewing a different tab.</p>
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead className="sticky top-0 bg-[#F8F9FC] border-b border-[#ECECF1] z-10">
                      <tr>
                        <th className="py-4 px-6"><input type="checkbox" className="rounded text-red-600 focus:ring-red-500 w-4 h-4" /></th>
                        <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Quote ID</th>
                        <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Client & Event</th>
                        <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Value</th>
                        <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Created</th>
                        <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredQuotes.map((quote: any) => (
                        <tr key={quote.id} className="border-b border-[#ECECF1] hover:bg-gray-50 transition-colors cursor-pointer group" onClick={() => navigate(quote.status === 'DRAFT' || quote.status === 'PENDING_APPROVAL' ? `/quotations/drafts/continue?id=${quote.id}` : `/quotation-builder?id=${quote.id}`)}>
                          <td className="py-4 px-6" onClick={e => e.stopPropagation()}><input type="checkbox" className="rounded text-red-600 focus:ring-red-500 w-4 h-4 cursor-pointer" /></td>
                          <td className="py-4 px-6 text-[14px] font-bold text-gray-900 group-hover:text-red-600 transition-colors">{quote.id}</td>
                          <td className="py-4 px-6">
                            <p className="text-[14px] font-bold text-gray-900">{quote.client}</p>
                            <p className="text-[12px] text-gray-500">{quote.event}</p>
                          </td>
                          <td className="py-4 px-6 text-[14px] font-bold text-gray-900">{quote.value}</td>
                          <td className="py-4 px-6">
                            <span className={`px-2.5 py-1 text-[11px] font-bold uppercase rounded-md ${
                              quote.status === 'ACCEPTED' ? 'bg-emerald-50 text-emerald-700' :
                              quote.status === 'SENT' ? 'bg-amber-50 text-amber-700' :
                              quote.status === 'DRAFT' ? 'bg-purple-50 text-purple-700' :
                              quote.status === 'PENDING_APPROVAL' ? 'bg-blue-50 text-blue-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {quote.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-[13px] font-semibold text-gray-500">{quote.date}</td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button className="p-2 text-gray-400 hover:text-red-600 transition-colors" onClick={(e) => { e.stopPropagation(); navigate(quote.status === 'DRAFT' || quote.status === 'PENDING_APPROVAL' ? `/quotations/drafts/continue?id=${quote.id}` : `/quotation-builder?id=${quote.id}`); }}>
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
                )}
              </div>

              {/* Pagination controls */}
              {totalPages > 0 && quotes.length > 0 && (
                <div className="p-4 flex items-center justify-between border-t border-[#ECECF1] bg-gray-50/50 shrink-0">
                  <span className="text-[13px] font-medium text-gray-500">
                    Showing Page <span className="font-bold text-gray-900">{page}</span> of <span className="font-bold text-gray-900">{totalPages}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <button 
                      disabled={page === 1}
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      className="p-1.5 rounded-lg border border-gray-200 text-gray-500 disabled:opacity-50 hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                      disabled={page === totalPages}
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      className="p-1.5 rounded-lg border border-gray-200 text-gray-500 disabled:opacity-50 hover:bg-white transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default QuotationsMasterList;
