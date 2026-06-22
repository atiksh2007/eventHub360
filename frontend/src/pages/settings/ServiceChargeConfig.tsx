import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import TopHeader from '../../components/TopHeader';
import { 
  ArrowLeft, Receipt, Plus, Edit2, Trash2, MapPin, Calendar, Star
} from 'lucide-react';

const ToggleSwitch = ({ enabled, onChange  }: any) => (
  <button 
    onClick={() => onChange(!enabled)}
    className={`w-11 h-6 rounded-full transition-colors relative ${enabled ? 'bg-red-700' : 'bg-gray-200'}`}
  >
    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${enabled ? 'left-6' : 'left-1'}`} />
  </button>
);

const ServiceChargeConfig = () => {
  const navigate = useNavigate();

  const specificRules = [
    { id: 1, name: 'Grand Ballroom Premium', type: 'Venue Specific', rate: '15.0', icon: MapPin, color: 'text-blue-600 bg-blue-50' },
    { id: 2, name: 'Peak Season Holiday', type: 'Seasonal (Dec 1 - Jan 15)', rate: '18.5', icon: Calendar, color: 'text-purple-600 bg-purple-50' },
    { id: 3, name: 'VIP Concierge Service', type: 'Premium Markup', rate: '20.0', icon: Star, color: 'text-amber-600 bg-amber-50' }
  ];

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans">
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        <TopHeader />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1000px] mx-auto space-y-6">
            
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <button onClick={() => navigate('/settings')} className="w-10 h-10 bg-white border border-[#ECECF1] rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Service Charge Rules</h1>
                  <p className="text-[15px] text-gray-500 mt-1">Configure standard rates, venue exceptions, and seasonal markups.</p>
                </div>
              </div>
            </div>

            {/* Standard Config */}
            <div className="bg-white rounded-[24px] p-8 shadow-sm border border-[#ECECF1]">
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-[#ECECF1]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[12px] bg-orange-50 flex items-center justify-center text-orange-600">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <h2 className="text-[18px] font-bold text-gray-900">Standard Configuration</h2>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="text-[13px] font-bold text-gray-700 block mb-2">Default Global Rate (%)</label>
                  <input type="number" defaultValue="12.5" className="w-full px-4 py-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] font-semibold text-gray-900 focus:outline-none focus:border-red-300" />
                  <p className="text-[12px] text-gray-500 mt-2">Applies automatically if no specific rules match.</p>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-[14px] font-bold text-gray-900">Apply Tax on Service Charge</h4>
                      <p className="text-[12px] text-gray-500">Calculate tax inclusive of service fee.</p>
                    </div>
                    <ToggleSwitch enabled={true} onChange={() => {}} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-[14px] font-bold text-gray-900">Allow Manual Overrides</h4>
                      <p className="text-[12px] text-gray-500">Sales team can edit charge on quote.</p>
                    </div>
                    <ToggleSwitch enabled={false} onChange={() => {}} />
                  </div>
                </div>
              </div>
            </div>

            {/* Exceptions & Specific Rules */}
            <div className="bg-white rounded-[24px] shadow-sm border border-[#ECECF1] overflow-hidden">
              <div className="p-6 border-b border-[#ECECF1] flex items-center justify-between">
                <h2 className="text-[18px] font-bold text-gray-900">Rule Exceptions & Markups</h2>
                <button className="px-4 py-2 bg-gray-900 text-white rounded-full font-bold text-[13px] hover:bg-gray-800 transition-colors shadow-sm flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Add Exception
                </button>
              </div>

              <div className="p-6 space-y-4 bg-[#F8F9FC]">
                {specificRules.map((rule: any) => (
                  <div key={rule.id} className="bg-white rounded-[20px] p-5 shadow-sm border border-[#ECECF1] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center ${rule.color}`}>
                        <rule.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-[16px] font-bold text-gray-900">{rule.name}</h4>
                        <p className="text-[13px] text-gray-500">{rule.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Override Rate</p>
                        <p className="text-[16px] font-bold text-gray-900">{rule.rate}%</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors"><Edit2 className="w-4 h-4" /></button>
                        <button className="p-2 text-gray-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default ServiceChargeConfig;
