import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import TopHeader from '../../components/TopHeader';
import { 
  ArrowLeft, Target, ShieldAlert, TrendingDown, ShieldCheck, Zap
} from 'lucide-react';

const ToggleSwitch = ({ enabled, onChange  }: any) => (
  <button 
    onClick={() => onChange(!enabled)}
    className={`w-11 h-6 rounded-full transition-colors relative ${enabled ? 'bg-red-700' : 'bg-gray-200'}`}
  >
    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${enabled ? 'left-6' : 'left-1'}`} />
  </button>
);

const BusinessRulesCenter = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans">
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        <TopHeader />
        
        <main className="flex-1 overflow-y-auto p-8 pb-32">
          <div className="max-w-[1000px] mx-auto space-y-6">
            
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => navigate('/settings')} className="w-10 h-10 bg-white border border-[#ECECF1] rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Business Rules Center</h1>
                <p className="text-[15px] text-gray-500 mt-1">Configure global discount limits, margin protection, and risk assessment.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Profitability & Discounts */}
              <div className="space-y-6">
                
                <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1]">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#ECECF1]">
                    <div className="w-8 h-8 rounded-[12px] bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <Target className="w-4 h-4" />
                    </div>
                    <h2 className="text-[16px] font-bold text-gray-900">Profitability Rules</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="text-[13px] font-bold text-gray-700 block mb-2">Minimum Gross Margin (%)</label>
                      <input type="number" defaultValue="30" className="w-full px-4 py-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] font-semibold text-gray-900 focus:outline-none focus:border-red-300" />
                      <p className="text-[11px] text-gray-500 mt-1">Quotes below this margin require Director approval.</p>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-[13px] font-bold text-gray-700">Strict Margin Protection</span>
                      <ToggleSwitch enabled={true} onChange={() => {}} />
                    </div>
                    <p className="text-[11px] text-gray-500 -mt-4">Block submission entirely if below absolute minimum (15%).</p>
                  </div>
                </div>

                <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1]">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#ECECF1]">
                    <div className="w-8 h-8 rounded-[12px] bg-blue-50 flex items-center justify-center text-blue-600">
                      <TrendingDown className="w-4 h-4" />
                    </div>
                    <h2 className="text-[16px] font-bold text-gray-900">Discount Limits</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="text-[13px] font-bold text-gray-700 block mb-2">Max Sales Rep Discount (%)</label>
                      <input type="number" defaultValue="10" className="w-full px-4 py-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] font-semibold text-gray-900 focus:outline-none focus:border-red-300" />
                    </div>
                    <div>
                      <label className="text-[13px] font-bold text-gray-700 block mb-2">Max Manager Discount (%)</label>
                      <input type="number" defaultValue="25" className="w-full px-4 py-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] font-semibold text-gray-900 focus:outline-none focus:border-red-300" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Automation & Risk */}
              <div className="space-y-6">
                
                <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1]">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#ECECF1]">
                    <div className="w-8 h-8 rounded-[12px] bg-purple-50 flex items-center justify-center text-purple-600">
                      <Zap className="w-4 h-4" />
                    </div>
                    <h2 className="text-[16px] font-bold text-gray-900">Auto-Approval Conditions</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-[#F8F9FC] rounded-[16px] border border-[#ECECF1]">
                      <div>
                        <h4 className="text-[13px] font-bold text-gray-900">Zero Discount Fast-Track</h4>
                        <p className="text-[11px] text-gray-500">Auto-approve quotes with 0% discount under £5k.</p>
                      </div>
                      <ToggleSwitch enabled={true} onChange={() => {}} />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[#F8F9FC] rounded-[16px] border border-[#ECECF1]">
                      <div>
                        <h4 className="text-[13px] font-bold text-gray-900">Pre-approved Templates</h4>
                        <p className="text-[11px] text-gray-500">Skip review if locked template pricing is unmodified.</p>
                      </div>
                      <ToggleSwitch enabled={false} onChange={() => {}} />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1]">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#ECECF1]">
                    <div className="w-8 h-8 rounded-[12px] bg-red-50 flex items-center justify-center text-red-600">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                    <h2 className="text-[16px] font-bold text-gray-900">Risk Assessment</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="text-[13px] font-bold text-gray-700 block mb-2">New Client Risk Multiplier</label>
                      <select className="w-full px-4 py-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] font-semibold text-gray-900 focus:outline-none focus:border-red-300">
                        <option>Strict (Require 50% deposit)</option>
                        <option>Moderate (Require 25% deposit)</option>
                        <option>Relaxed</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-[13px] font-bold text-gray-700">Flag Custom Payment Terms</span>
                      <ToggleSwitch enabled={true} onChange={() => {}} />
                    </div>
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

export default BusinessRulesCenter;
