import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import { 
  TrendingUp, BarChart3, PieChart, Activity, Target, ArrowRight
} from 'lucide-react';

const RevenueForecastCenter = () => {
  const navigate = useNavigate();

  const projections = [
    { label: 'Monthly Projection', value: '$840k', target: '$1M', status: 'On Track' },
    { label: 'Quarterly Projection', value: '$2.4M', target: '$3M', status: 'At Risk' },
    { label: 'Yearly Projection', value: '$11.2M', target: '$12M', status: 'On Track' }
  ];

  const pipeline = [
    { stage: 'Initial Inquiry', count: 45, value: '$2.1M' },
    { stage: 'Quote Sent', count: 28, value: '$1.4M' },
    { stage: 'Negotiation', count: 12, value: '$850k' },
    { stage: 'Pending Approval', count: 8, value: '$420k' }
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
                <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Revenue Forecast Center</h1>
                <p className="text-[15px] text-gray-500 mt-1">Analyze pipeline velocity, conversion impact, and projected revenue.</p>
              </div>
              <button className="px-5 py-2.5 bg-white border border-[#ECECF1] text-gray-700 rounded-full font-bold text-[14px] hover:bg-gray-50 transition-colors shadow-sm">
                Download Report
              </button>
            </div>

            {/* Forecast Summary & Projections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {projections.map((proj: any, idx: any) => (
                <div key={idx} className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1] relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-2 h-full ${proj.status === 'On Track' ? 'bg-emerald-500' : 'bg-orange-500'}`}></div>
                  <p className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-2">{proj.label}</p>
                  <h3 className="text-[36px] font-black text-gray-900 mb-2">{proj.value}</h3>
                  <div className="flex items-center justify-between mt-4 border-t border-[#ECECF1] pt-4">
                    <div>
                      <p className="text-[11px] text-gray-400 font-bold uppercase">Target</p>
                      <p className="text-[14px] font-bold text-gray-700">{proj.target}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-[11px] font-bold uppercase ${proj.status === 'On Track' ? 'bg-emerald-50 text-emerald-700' : 'bg-orange-50 text-orange-700'}`}>
                      {proj.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Charts Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              
              {/* Opportunity Pipeline */}
              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[18px] font-bold text-gray-900">Opportunity Pipeline</h3>
                  <Target className="w-5 h-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                  {pipeline.map((item: any, idx: any) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-[#F8F9FC] rounded-[16px] border border-[#ECECF1]">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-[12px]">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="text-[14px] font-bold text-gray-900">{item.stage}</p>
                          <p className="text-[12px] text-gray-500">{item.count} Active Quotes</p>
                        </div>
                      </div>
                      <p className="text-[16px] font-black text-gray-900">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conversion Impact Analysis */}
              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[18px] font-bold text-gray-900">Conversion Impact Analysis</h3>
                  <Activity className="w-5 h-5 text-gray-400" />
                </div>
                <div className="h-[250px] flex flex-col justify-center items-center bg-[#F8F9FC] rounded-[16px] border border-dashed border-[#ECECF1]">
                  <PieChart className="w-12 h-12 text-gray-300 mb-4" />
                  <p className="text-[14px] font-semibold text-gray-500">Conversion chart visualization here</p>
                  <p className="text-[12px] text-gray-400 max-w-xs text-center mt-2">Win rate impacts projected revenue by +/- 15%</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="p-4 bg-emerald-50 rounded-[12px]">
                    <p className="text-[11px] font-bold text-emerald-600 uppercase mb-1">Win Rate</p>
                    <p className="text-[20px] font-black text-emerald-700">42.5%</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-[12px]">
                    <p className="text-[11px] font-bold text-red-600 uppercase mb-1">Loss Rate</p>
                    <p className="text-[20px] font-black text-red-700">21.0%</p>
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

export default RevenueForecastCenter;
