import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import KPICard from '../components/KPICard';
import SummaryCard from '../components/SummaryCard';
import MonthlyQuotationChart from '../components/MonthlyQuotationChart';
import QuoteStatusChart from '../components/QuoteStatusChart';
import ConversionFunnel from '../components/ConversionFunnel';
import PendingApprovalList from '../components/PendingApprovalList';
import RecentQuotationTable from '../components/RecentQuotationTable';
import TopSalesExecutives from '../components/TopSalesExecutives';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

import { 
  FileText, 
  Banknote, 
  Target,
  FileEdit,
  Send,
  CheckCircle,
  Clock,
  PlusCircle,
  X
} from 'lucide-react';

const QuotationDashboard = () => {
  const navigate = useNavigate();
  const [quotations, setQuotations] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>({
    drafts: 0,
    sent: 0,
    accepted: 0,
    expired: 0,
    totalPipeline: "$0",
    avgQuoteValue: "$0",
    conversionRate: "0%"
  });

  // Create Quote Modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createForm, setCreateForm] = useState({
    clientName: '',
    eventType: 'wedding',
    eventDate: '',
    expectedGuests: '',
  });

  const handleCreateQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const result = await api.createQuote(createForm);
      setShowCreateModal(false);
      setCreateForm({ clientName: '', eventType: 'wedding', eventDate: '', expectedGuests: '' });
      // Navigate into the builder with the new quote id
      navigate(`/quotation-builder?id=${result.id || result.quoteId}`);
    } catch (err: any) {
      console.error('Failed to create quote:', err.message);
      alert(`Failed to create quote: ${err.message}\n(Make sure you restarted your frontend dev server!)`);
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    // Load live list of quotes
    api.getLiveList('all')
      .then(res => {
        if (res && res.rows) {
          setQuotations(res.rows);
          const counts = { drafts: 0, sent: 0, accepted: 0, expired: 0 };
          res.rows.forEach((q: any) => {
            const statusLower = q.status.toLowerCase();
            if (statusLower.includes('draft')) counts.drafts++;
            else if (statusLower.includes('sent')) counts.sent++;
            else if (statusLower.includes('accept')) counts.accepted++;
            else if (statusLower.includes('expire')) counts.expired++;
          });
          setSummary({
            drafts: counts.drafts,
            sent: counts.sent,
            accepted: counts.accepted,
            expired: counts.expired,
            totalPipeline: res.summaryMetrics?.totalPipeline || "$2.8M",
            avgQuoteValue: "$145k",
            conversionRate: res.summaryMetrics?.conversionRate || "48%"
          });
        }
      })
      .catch(err => {
        console.error("Failed to connect frontend to NestJS backend: ", err);
      });
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans">
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        <TopHeader />
        
        {/* Scrollable Area */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1400px] mx-auto space-y-6">
            
            {/* PAGE HEADING */}
            <div className="flex items-center justify-between mb-2">
              <div>
                <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Quotation Dashboard</h1>
                <p className="text-[14px] font-medium text-gray-500 mt-0.5">Live overview of your quoting pipeline</p>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-red-600 to-orange-400 text-white rounded-[14px] font-bold text-[15px] shadow-[0_4px_12px_rgba(220,38,38,0.25)] hover:shadow-[0_6px_18px_rgba(220,38,38,0.35)] transition-all"
              >
                <PlusCircle className="w-5 h-5" />
                New Quote
              </button>
            </div>

            {/* CREATE QUOTE MODAL */}
            {showCreateModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowCreateModal(false)} />
                <div className="relative z-10 bg-white rounded-[28px] p-8 w-full max-w-[480px] shadow-[0_24px_80px_rgba(0,0,0,0.18)] border border-[#ECECF1]">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[22px] font-bold text-gray-900">Create New Quotation</h2>
                    <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <form onSubmit={handleCreateQuote} className="space-y-5">
                    <div>
                      <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Client Name *</label>
                      <input
                        required
                        type="text"
                        value={createForm.clientName}
                        onChange={e => setCreateForm(f => ({ ...f, clientName: e.target.value }))}
                        placeholder="e.g. Priya & Rohan Wedding"
                        className="w-full h-11 px-4 bg-[#F8F9FC] border border-[#E5E7EB] rounded-[12px] text-[14px] font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Event Type *</label>
                      <select
                        required
                        value={createForm.eventType}
                        onChange={e => setCreateForm(f => ({ ...f, eventType: e.target.value }))}
                        className="w-full h-11 px-4 bg-[#F8F9FC] border border-[#E5E7EB] rounded-[12px] text-[14px] font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 transition-all"
                      >
                        <option value="wedding">Wedding</option>
                        <option value="corporate">Corporate</option>
                        <option value="birthday">Birthday</option>
                        <option value="conference">Conference</option>
                        <option value="gala">Gala / Award Night</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Event Date</label>
                        <input
                          type="date"
                          value={createForm.eventDate}
                          onChange={e => setCreateForm(f => ({ ...f, eventDate: e.target.value }))}
                          className="w-full h-11 px-4 bg-[#F8F9FC] border border-[#E5E7EB] rounded-[12px] text-[14px] font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Est. Guests</label>
                        <input
                          type="number"
                          min="1"
                          value={createForm.expectedGuests}
                          onChange={e => setCreateForm(f => ({ ...f, expectedGuests: e.target.value }))}
                          placeholder="e.g. 250"
                          className="w-full h-11 px-4 bg-[#F8F9FC] border border-[#E5E7EB] rounded-[12px] text-[14px] font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 transition-all"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={creating}
                      className="w-full h-12 flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-orange-400 text-white rounded-[14px] font-bold text-[15px] shadow-sm hover:shadow-md transition-all disabled:opacity-60 mt-2"
                    >
                      <PlusCircle className="w-5 h-5" />
                      {creating ? 'Creating...' : 'Create & Open Builder'}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* ROW 1: KPI CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <KPICard 
                title="Pending Quotes" 
                value={summary.drafts + summary.sent} 
                trend="up" 
                trendValue={12.0} 
                icon={FileText} 
                iconBg="bg-red-50" 
                iconColor="text-red-600"
                onClick={() => navigate('/quotations/pending')}
              />
              <KPICard 
                title="Revenue Forecast" 
                value={summary.totalPipeline} 
                trend="up" 
                trendValue={5.4} 
                icon={Banknote} 
                iconBg="bg-amber-50" 
                iconColor="text-amber-600"
                onClick={() => navigate('/quotations/forecast')}
              />
              <KPICard 
                title="Total Approved" 
                value={summary.accepted} 
                trend="up" 
                trendValue={0} 
                icon={CheckCircle} 
                iconBg="bg-emerald-50" 
                iconColor="text-emerald-600"
                onClick={() => navigate('/quotations/approved-center')}
              />
              <KPICard 
                title="Conversion Rate" 
                value={summary.conversionRate} 
                trend="up" 
                trendValue={8.0} 
                icon={Target} 
                iconBg="bg-emerald-50" 
                iconColor="text-emerald-600" 
                onClick={() => {}}
              />
            </div>

            {/* ROW 2: SUMMARY CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <SummaryCard icon={FileEdit} value={summary.drafts} label="Drafts" iconBg="bg-gray-100" iconColor="text-gray-600" onClick={() => navigate('/quotations/drafts')} />
              <SummaryCard icon={Send} value={summary.sent} label="Sent" iconBg="bg-blue-50" iconColor="text-blue-600" onClick={() => navigate('/quotations/master')} />
              <SummaryCard icon={CheckCircle} value={summary.accepted} label="Accepted" iconBg="bg-emerald-50" iconColor="text-emerald-600" onClick={() => navigate('/quotations/approved-center')} />
              <SummaryCard icon={Clock} value={summary.expired} label="Expired" iconBg="bg-rose-50" iconColor="text-rose-600" onClick={() => navigate('/quotations/history-center')} />
            </div>

            {/* ROW 3: CHARTS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[340px]">
              <div className="lg:col-span-8 h-full">
                <MonthlyQuotationChart />
              </div>
              <div className="lg:col-span-4 h-full">
                <QuoteStatusChart />
              </div>
            </div>

            {/* ROW 4: FUNNEL & APPROVALS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[400px]">
              <div className="h-full">
                <ConversionFunnel />
              </div>
              <div className="h-full">
                <PendingApprovalList />
              </div>
            </div>

            {/* ROW 5: TABLE & EXECUTIVES */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[400px]">
              <div className="lg:col-span-8 h-full">
                <RecentQuotationTable quotations={quotations} />
              </div>
              <div className="lg:col-span-4 h-full">
                <TopSalesExecutives />
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default QuotationDashboard;
