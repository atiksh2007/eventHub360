import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import QuotationTable from '../components/QuotationTable';
import SummaryMetricCard from '../components/SummaryMetricCard';
import { Filter, Upload, Plus, TrendingUp, CheckCheck, Clock } from 'lucide-react';
import { api } from '../services/api';

const QuotationListPage = () => {
  const navigate = useNavigate();
  const [quotations, setQuotations] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [marginFilter, setMarginFilter] = useState('ALL');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  useEffect(() => {
    api.getLiveList('all', page, 10).then((res: any) => {
      setQuotations(res.rows || []);
      setTotalPages(res.totalPages || 1);
    }).catch(console.error);
  }, [page]);

  const filteredQuotations = quotations.filter((q: any) => {
    if (marginFilter === 'ALL') return true;
    const marginStr = q.marginPct || q.margin || '0%';
    const marginVal = parseFloat(marginStr.replace('%', ''));
    if (marginFilter === 'ESCALATED') return marginVal < 10; // Low Margin
    if (marginFilter === 'HIGH') return marginVal >= 10 && marginVal <= 19; // Medium Margin
    if (marginFilter === 'STANDARD') return marginVal > 19; // High Margin
    return true;
  });

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans">
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        <TopHeader />
        
        {/* Scrollable Area */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1400px] mx-auto space-y-8">
            
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-[32px] font-bold text-gray-900 tracking-tight leading-none mb-2">Live Quotations</h1>
                <p className="text-[15px] font-medium text-gray-500">
                  Manage and track your active event proposals across the enterprise.
                </p>
              </div>
              
              {/* Header Actions */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <button 
                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                    className={`h-12 px-5 flex items-center gap-2 border rounded-[16px] font-semibold text-[15px] transition-colors shadow-sm ${
                      marginFilter !== 'ALL' 
                        ? 'bg-red-50 border-red-200 text-red-700' 
                        : 'bg-white border-[#ECECF1] text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Filter className={`w-5 h-5 ${marginFilter !== 'ALL' ? 'text-red-500' : 'text-gray-500'}`} />
                    {marginFilter === 'ALL' ? 'Filter' : `Margin: ${marginFilter}`}
                  </button>

                  {showFilterDropdown && (
                    <div className="absolute right-0 top-[calc(100%+8px)] w-56 bg-white border border-[#ECECF1] rounded-[16px] shadow-xl py-2 z-50">
                      <div className="px-4 py-2 text-[12px] font-bold text-gray-400 uppercase tracking-wider border-b border-[#ECECF1] mb-1">
                        Filter by Margin Priority
                      </div>
                      <button 
                        onClick={() => { setMarginFilter('ALL'); setShowFilterDropdown(false); }}
                        className={`w-full text-left px-4 py-2.5 text-[14px] font-semibold hover:bg-gray-50 transition-colors ${marginFilter === 'ALL' ? 'text-red-600 bg-red-50/50' : 'text-gray-700'}`}
                      >
                        All Quotations
                      </button>
                      <button 
                        onClick={() => { setMarginFilter('STANDARD'); setShowFilterDropdown(false); }}
                        className={`w-full text-left px-4 py-2.5 text-[14px] font-semibold hover:bg-gray-50 transition-colors ${marginFilter === 'STANDARD' ? 'text-red-600 bg-red-50/50' : 'text-gray-700'}`}
                      >
                        Standard (High Margin &gt;19%)
                      </button>
                      <button 
                        onClick={() => { setMarginFilter('HIGH'); setShowFilterDropdown(false); }}
                        className={`w-full text-left px-4 py-2.5 text-[14px] font-semibold hover:bg-gray-50 transition-colors ${marginFilter === 'HIGH' ? 'text-red-600 bg-red-50/50' : 'text-gray-700'}`}
                      >
                        High Priority (10-19%)
                      </button>
                      <button 
                        onClick={() => { setMarginFilter('ESCALATED'); setShowFilterDropdown(false); }}
                        className={`w-full text-left px-4 py-2.5 text-[14px] font-semibold hover:bg-gray-50 transition-colors ${marginFilter === 'ESCALATED' ? 'text-red-600 bg-red-50/50' : 'text-gray-700'}`}
                      >
                        Escalated (Low Margin &lt;10%)
                      </button>
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => navigate('/quotations/new')}
                  className="h-12 px-6 flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-400 rounded-[16px] text-white font-semibold text-[15px] hover:from-red-700 hover:to-orange-500 transition-colors shadow-md"
                >
                  <Plus className="w-5 h-5" />
                  Create Quote
                </button>
              </div>
            </div>

            {/* Main Quotations Table Card */}
            <QuotationTable 
              quotations={filteredQuotations} 
              page={page} 
              totalPages={totalPages} 
              onPageChange={setPage} 
            />

            {/* KPI Summary Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SummaryMetricCard 
                icon={TrendingUp} 
                label="Total Pipeline" 
                value="$2,840,000" 
                iconBg="bg-pink-100" 
                iconColor="text-pink-600" 
              />
              <SummaryMetricCard 
                icon={CheckCheck} 
                label="Conversion Rate" 
                value="68.2%" 
                iconBg="bg-purple-100" 
                iconColor="text-purple-600" 
              />
              <SummaryMetricCard 
                icon={Clock} 
                label="Avg. Turnaround" 
                value="1.4 Days" 
                iconBg="bg-amber-100" 
                iconColor="text-amber-600" 
              />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default QuotationListPage;
