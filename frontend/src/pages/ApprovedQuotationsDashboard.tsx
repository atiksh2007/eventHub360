import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import { 
  CheckCircle2, TrendingUp, Search, Filter, Printer, 
  Download, FileText, MoreVertical, Eye
} from 'lucide-react';

const ApprovedQuotationsDashboard = () => {
  const navigate = useNavigate();

  const metrics = [
    { title: 'Total Approved Value', value: '$4.2M', trend: '+12.5%', isPositive: true },
    { title: 'Approved Count', value: '142', trend: '+5.2%', isPositive: true },
    { title: 'Approval Trend', value: '8.4 Days', trend: '-1.2 Days', isPositive: true },
    { title: 'Revenue Generated', value: '$3.8M', trend: '+15.4%', isPositive: true }
  ];

  const [approvedQuotes, setApprovedQuotes] = React.useState<any[]>([]);

  React.useEffect(() => {
    import('../services/api').then(({ api }) => {
      // Fetch both SENT (internally approved) and ACCEPTED (client approved)
      Promise.all([
        api.getLiveList('SENT', 1, 50),
        api.getLiveList('ACCEPTED', 1, 50)
      ]).then(([sentData, acceptedData]: any[]) => {
        const rows = [...(sentData?.rows || []), ...(acceptedData?.rows || [])];
        setApprovedQuotes(rows.map((row: any) => ({
          id: row.quoteNumber,
          client: row.clientName,
          event: row.eventType,
          date: new Date(row.eventDate || Date.now()).toLocaleDateString(),
          value: row.totalAmount,
          status: row.status
        })));
      }).catch(err => console.error("Failed to load approved quotes:", err));
    });
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans">
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        <TopHeader />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1400px] mx-auto space-y-6">
            
            <div className="mb-8">
              <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Approved Quotations</h1>
              <p className="text-[15px] text-gray-500 mt-1">Review successfully approved quotations ready for proposal generation.</p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {metrics.map((metric: any, idx: any) => (
                <div key={idx} className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1]">
                  <p className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-2">{metric.title}</p>
                  <div className="flex items-end gap-3">
                    <h3 className="text-[32px] font-black text-gray-900 leading-none">{metric.value}</h3>
                    <div className="flex items-center gap-1 mb-1">
                      <TrendingUp className={`w-4 h-4 ${metric.isPositive ? 'text-emerald-500' : 'text-red-500'}`} />
                      <span className={`text-[13px] font-bold ${metric.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>{metric.trend}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Approved Table */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h3 className="text-[18px] font-bold text-gray-900">Approved History</h3>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search approved..." className="pl-9 pr-4 py-2 bg-[#F8F9FC] border border-[#ECECF1] rounded-full text-[13px] focus:outline-none focus:border-red-300 w-[250px]" />
                  </div>
                  <button className="p-2 border border-[#ECECF1] rounded-full text-gray-600 hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                  </button>
                  <button className="p-2 border border-[#ECECF1] rounded-full text-gray-600 hover:bg-gray-50">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#ECECF1]">
                      <th className="pb-3 px-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider font-sans">Quote Number</th>
                      <th className="pb-3 px-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider font-sans">Client</th>
                      <th className="pb-3 px-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider font-sans">Event</th>
                      <th className="pb-3 px-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider font-sans">Approval Date</th>
                      <th className="pb-3 px-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider font-sans">Value</th>
                      <th className="pb-3 px-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider font-sans">Status</th>
                      <th className="pb-3 px-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider font-sans text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvedQuotes.map((quote: any) => (
                      <tr key={quote.id} className="border-b border-[#ECECF1] last:border-0 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4 text-[14px] font-bold text-gray-900">{quote.id}</td>
                        <td className="py-4 px-4 text-[14px] font-bold text-gray-900">{quote.client}</td>
                        <td className="py-4 px-4 text-[14px] text-gray-500 font-medium">{quote.event}</td>
                        <td className="py-4 px-4 text-[14px] text-gray-500 font-medium">{quote.date}</td>
                        <td className="py-4 px-4 text-[14px] font-black text-gray-900">{quote.value}</td>
                        <td className="py-4 px-4">
                          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase tracking-wider rounded-full flex items-center w-max gap-1">
                            <CheckCircle2 className="w-3 h-3" /> {quote.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="View">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors" title="Print">
                              <Printer className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors" title="Export">
                              <Download className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => navigate('/proposals')}
                              className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-[12px] font-bold hover:bg-red-100 transition-colors ml-2"
                            >
                              Generate Proposal
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

export default ApprovedQuotationsDashboard;
