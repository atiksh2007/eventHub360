import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import TopHeader from '../../components/TopHeader';
import { 
  ArrowLeft, DollarSign, Plus, Edit2, Trash2, 
  TrendingUp, TrendingDown, Clock, Save, X
} from 'lucide-react';

const ToggleSwitch = ({ enabled, onChange  }: any) => (
  <button 
    onClick={() => onChange(!enabled)}
    className={`w-11 h-6 rounded-full transition-colors relative ${enabled ? 'bg-red-700' : 'bg-gray-200'}`}
  >
    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${enabled ? 'left-6' : 'left-1'}`} />
  </button>
);

const CurrencyManagement = () => {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [multiCurrency, setMultiCurrency] = useState(true);

  const currencies = [
    { code: 'GBP', name: 'British Pound', symbol: '£', rate: '1.0000', isBase: true, trend: 'up', lastUpdated: '1 hour ago' },
    { code: 'USD', name: 'US Dollar', symbol: '$', rate: '1.2450', isBase: false, trend: 'up', lastUpdated: '1 hour ago' },
    { code: 'EUR', name: 'Euro', symbol: '€', rate: '1.1520', isBase: false, trend: 'down', lastUpdated: '1 hour ago' },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', rate: '4.5728', isBase: false, trend: 'up', lastUpdated: '2 hours ago' }
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
                  <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Currency Management</h1>
                  <p className="text-[15px] text-gray-500 mt-1">Configure base currency, exchange rates, and multi-currency support.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="px-5 py-2.5 bg-gradient-to-r from-red-700 to-orange-400 text-white rounded-full font-bold text-[14px] shadow-sm hover:shadow-md transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Currency
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column: Global Config */}
              <div className="space-y-6">
                <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1]">
                  <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#ECECF1]">
                    <div className="w-10 h-10 rounded-[12px] bg-amber-50 flex items-center justify-center text-amber-600">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <h2 className="text-[18px] font-bold text-gray-900">Global Settings</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-[14px] font-bold text-gray-900">Multi-currency Support</h4>
                        <p className="text-[12px] text-gray-500 max-w-[200px]">Allow quoting in multiple currencies.</p>
                      </div>
                      <ToggleSwitch enabled={multiCurrency} onChange={setMultiCurrency} />
                    </div>

                    <div>
                      <label className="text-[13px] font-bold text-gray-700 block mb-2">Base (Default) Currency</label>
                      <select className="w-full px-4 py-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] font-semibold text-gray-900 focus:outline-none focus:border-red-300">
                        <option>GBP - British Pound (£)</option>
                        <option>USD - US Dollar ($)</option>
                        <option>EUR - Euro (€)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[13px] font-bold text-gray-700 block mb-2">Exchange Rate Source</label>
                      <select className="w-full px-4 py-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] font-semibold text-gray-900 focus:outline-none focus:border-red-300">
                        <option>Manual Updates</option>
                        <option>OpenExchangeRates API</option>
                        <option>European Central Bank</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Currency Table */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-[24px] shadow-sm border border-[#ECECF1] overflow-hidden">
                  <div className="p-6 border-b border-[#ECECF1] flex items-center justify-between">
                    <h2 className="text-[18px] font-bold text-gray-900">Active Currencies</h2>
                    <span className="text-[12px] font-semibold text-gray-500 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Last synced 1 hour ago</span>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-[#F8F9FC]">
                        <tr>
                          <th className="py-3 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Currency</th>
                          <th className="py-3 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Exchange Rate</th>
                          <th className="py-3 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="py-3 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currencies.map((currency: any, idx: any) => (
                          <tr key={idx} className="border-b border-[#ECECF1] hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-700">{currency.symbol}</div>
                                <div>
                                  <p className="text-[14px] font-bold text-gray-900">{currency.code}</p>
                                  <p className="text-[12px] text-gray-500">{currency.name}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-2">
                                <span className="text-[14px] font-bold text-gray-900">{currency.rate}</span>
                                {!currency.isBase && (
                                  currency.trend === 'up' ? <TrendingUp className="w-4 h-4 text-emerald-500" /> : <TrendingDown className="w-4 h-4 text-red-500" />
                                )}
                              </div>
                              <p className="text-[11px] text-gray-400 mt-1">1 GBP = {currency.rate} {currency.code}</p>
                            </td>
                            <td className="py-4 px-6">
                              {currency.isBase ? (
                                <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-[11px] font-bold uppercase rounded-md">Base</span>
                              ) : (
                                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase rounded-md">Active</span>
                              )}
                            </td>
                            <td className="py-4 px-6 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors"><Edit2 className="w-4 h-4" /></button>
                                {!currency.isBase && (
                                  <button className="p-2 text-gray-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </main>

        {/* Add Currency Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[24px] p-8 w-full max-w-md shadow-xl border border-[#ECECF1]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[20px] font-bold text-gray-900">Add New Currency</h2>
                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
              </div>
              
              <div className="space-y-4 mb-8">
                <div>
                  <label className="text-[13px] font-bold text-gray-700 block mb-2">Currency Code</label>
                  <select className="w-full px-4 py-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] font-semibold text-gray-900 focus:outline-none focus:border-red-300">
                    <option>CAD - Canadian Dollar</option>
                    <option>AUD - Australian Dollar</option>
                    <option>JPY - Japanese Yen</option>
                  </select>
                </div>
                <div>
                  <label className="text-[13px] font-bold text-gray-700 block mb-2">Exchange Rate vs GBP</label>
                  <input type="number" placeholder="1.0000" className="w-full px-4 py-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] font-semibold text-gray-900 focus:outline-none focus:border-red-300" />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button onClick={() => setShowAddModal(false)} className="px-5 py-2.5 bg-gray-50 text-gray-700 rounded-full font-bold text-[14px] hover:bg-gray-100 transition-colors">Cancel</button>
                <button onClick={() => setShowAddModal(false)} className="px-5 py-2.5 bg-gray-900 text-white rounded-full font-bold text-[14px] hover:bg-gray-800 transition-colors shadow-sm">Add Currency</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CurrencyManagement;
