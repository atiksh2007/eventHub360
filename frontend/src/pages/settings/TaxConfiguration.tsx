import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import TopHeader from '../../components/TopHeader';
import { 
  ArrowLeft, Percent, Plus, Edit2, Trash2, ShieldOff, Calculator
} from 'lucide-react';

const ToggleSwitch = ({ enabled, onChange  }: any) => (
  <button 
    onClick={() => onChange(!enabled)}
    className={`w-11 h-6 rounded-full transition-colors relative ${enabled ? 'bg-red-700' : 'bg-gray-200'}`}
  >
    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${enabled ? 'left-6' : 'left-1'}`} />
  </button>
);

const TaxConfiguration = () => {
  const navigate = useNavigate();

  const taxRules = [
    { id: 1, name: 'Standard VAT', rate: 20, region: 'UK', type: 'VAT', default: true },
    { id: 2, name: 'Reduced VAT', rate: 5, region: 'UK', type: 'VAT', default: false },
    { id: 3, name: 'Standard GST', rate: 10, region: 'Australia', type: 'GST', default: false },
    { id: 4, name: 'State Sales Tax', rate: 8.5, region: 'California (US)', type: 'Sales Tax', default: false }
  ];

  const [previewAmount, setPreviewAmount] = useState('1000');
  const [selectedPreviewTax, setSelectedPreviewTax] = useState(taxRules[0]);

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans">
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        <TopHeader />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1200px] mx-auto space-y-6">
            
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <button onClick={() => navigate('/settings')} className="w-10 h-10 bg-white border border-[#ECECF1] rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Tax Configuration</h1>
                  <p className="text-[15px] text-gray-500 mt-1">Manage VAT, GST, regional tax rules, and exemptions.</p>
                </div>
              </div>
              <button className="px-5 py-2.5 bg-gradient-to-r from-red-700 to-orange-400 text-white rounded-full font-bold text-[14px] shadow-sm hover:shadow-md transition-all flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Tax Rule
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Main Tax Rule Table */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-[24px] shadow-sm border border-[#ECECF1] overflow-hidden">
                  <div className="p-6 border-b border-[#ECECF1] flex items-center gap-3">
                    <div className="w-8 h-8 rounded-[8px] bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <Percent className="w-4 h-4" />
                    </div>
                    <h2 className="text-[18px] font-bold text-gray-900">Active Tax Rules</h2>
                  </div>
                  
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-[#F8F9FC]">
                      <tr>
                        <th className="py-3 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Rule Name</th>
                        <th className="py-3 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Rate</th>
                        <th className="py-3 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Region</th>
                        <th className="py-3 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {taxRules.map((rule: any) => (
                        <tr key={rule.id} className="border-b border-[#ECECF1] hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6">
                            <p className="text-[14px] font-bold text-gray-900 flex items-center gap-2">
                              {rule.name}
                              {rule.default && <span className="px-2 py-0.5 bg-gray-900 text-white text-[10px] uppercase rounded">Default</span>}
                            </p>
                            <p className="text-[12px] text-gray-500">{rule.type}</p>
                          </td>
                          <td className="py-4 px-6 text-[14px] font-bold text-gray-900">{rule.rate}%</td>
                          <td className="py-4 px-6 text-[13px] text-gray-600 font-medium">{rule.region}</td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors"><Edit2 className="w-4 h-4" /></button>
                              <button className="p-2 text-gray-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Exemption Config */}
                <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-[8px] bg-purple-50 flex items-center justify-center text-purple-600">
                        <ShieldOff className="w-4 h-4" />
                      </div>
                      <h2 className="text-[16px] font-bold text-gray-900">Tax Exemption Rules</h2>
                    </div>
                    <button className="text-[13px] font-bold text-red-600 hover:text-red-700">+ Add Rule</button>
                  </div>
                  <div className="bg-[#F8F9FC] rounded-[16px] p-4 border border-[#ECECF1] flex items-center justify-between">
                    <div>
                      <p className="text-[14px] font-bold text-gray-900">Registered Charities</p>
                      <p className="text-[12px] text-gray-500">Apply 0% tax when client type is Charity & ID provided.</p>
                    </div>
                    <ToggleSwitch enabled={true} onChange={() => {}} />
                  </div>
                </div>
              </div>

              {/* Right Column: Calculator */}
              <div>
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[24px] p-6 shadow-md text-white sticky top-24">
                  <div className="flex items-center gap-2 mb-6 text-gray-300">
                    <Calculator className="w-5 h-5" />
                    <h3 className="text-[14px] font-bold uppercase tracking-wider">Preview Calculator</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-[12px] font-bold text-gray-400 block mb-1">Subtotal Amount</label>
                      <input 
                        type="number" 
                        value={previewAmount}
                        onChange={(e) => setPreviewAmount(e.target.value)}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-[14px] font-bold text-white focus:outline-none focus:border-red-400" 
                      />
                    </div>
                    <div>
                      <label className="text-[12px] font-bold text-gray-400 block mb-1">Apply Rule</label>
                      <select 
                        onChange={(e) => setSelectedPreviewTax(taxRules.find((r: any) => r.id === Number(e.target.value)) as any)}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-[14px] font-bold text-white focus:outline-none focus:border-red-400"
                      >
                        {taxRules.map(r => <option key={r.id} value={r.id} className="text-gray-900">{r.name} ({r.rate}%)</option>)}
                      </select>
                    </div>

                    <div className="pt-4 border-t border-white/10 space-y-2">
                      <div className="flex justify-between text-[13px] text-gray-300">
                        <span>Subtotal</span>
                        <span>£{Number(previewAmount).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-[13px] text-gray-300">
                        <span>{selectedPreviewTax.name}</span>
                        <span>£{((Number(previewAmount) * selectedPreviewTax.rate) / 100).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-[18px] font-bold text-white pt-2 border-t border-white/10">
                        <span>Total</span>
                        <span>£{(Number(previewAmount) * (1 + selectedPreviewTax.rate / 100)).toFixed(2)}</span>
                      </div>
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

export default TaxConfiguration;
