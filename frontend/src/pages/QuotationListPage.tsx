import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import QuotationTable from '../components/QuotationTable';
import SummaryMetricCard from '../components/SummaryMetricCard';
import { Filter, Upload, Plus, TrendingUp, CheckCheck, Clock } from 'lucide-react';

const QuotationListPage = () => {
  const navigate = useNavigate();
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
                <button className="h-12 px-5 flex items-center gap-2 bg-white border border-[#ECECF1] rounded-[16px] text-gray-700 font-semibold text-[15px] hover:bg-gray-50 transition-colors shadow-sm">
                  <Filter className="w-5 h-5 text-gray-500" />
                  Filter
                </button>
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
            <QuotationTable />

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
