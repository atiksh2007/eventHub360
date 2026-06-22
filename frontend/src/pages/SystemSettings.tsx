import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import { 
  Calculator, Shield, DollarSign, Percent, Receipt, Plus, Edit2, 
  ChevronDown, Save, X, AlertTriangle, CheckCircle2
} from 'lucide-react';

// Reusable Switch Component
const ToggleSwitch = ({ enabled, onChange  }: any) => (
  <button 
    onClick={() => onChange(!enabled)}
    className={`w-11 h-6 rounded-full transition-colors relative ${enabled ? 'bg-red-700' : 'bg-gray-200'}`}
  >
    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${enabled ? 'left-6' : 'left-1'}`} />
  </button>
);

const SystemSettings = () => {
  const navigate = useNavigate();
  
  // States to track changes for the Save/Discard workflow
  const [hasChanges, setHasChanges] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [saveStatus, setSaveStatus] = useState<any>(null); // null, 'saving', 'success', 'error'

  const [formState, setFormState] = useState({
    quotePrefix: 'QT-',
    suffixLogic: '/2024',
    nextSequence: '1042',
    resetAnnually: true,
    currency: 'GBP',
    multiCurrency: false,
    taxLabel: 'VAT',
    taxRate: '20',
    serviceCharge: '12.5',
    taxOnServiceCharge: true
  });

  const handleInputChange = (field: any, value: any) => {
    setFormState(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('success');
      setHasChanges(false);
      setTimeout(() => setSaveStatus(null), 3000);
    }, 1500);
  };

  const handleDiscard = () => {
    setShowDiscardModal(true);
  };

  const confirmDiscard = () => {
    // Reset form state to initial values (in a real app, fetch from server)
    setFormState({
      quotePrefix: 'QT-',
      suffixLogic: '/2024',
      nextSequence: '1042',
      resetAnnually: true,
      currency: 'GBP',
      multiCurrency: false,
      taxLabel: 'VAT',
      taxRate: '20',
      serviceCharge: '12.5',
      taxOnServiceCharge: true
    });
    setHasChanges(false);
    setShowDiscardModal(false);
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans">
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden relative">
        <TopHeader />
        
        <main className="flex-1 overflow-y-auto p-8 pb-32">
          <div className="max-w-[1200px] mx-auto space-y-6">
            
            <div className="mb-8">
              <h1 className="text-[20px] font-bold text-gray-900 tracking-tight">Configuration & Business Rules</h1>
              <p className="text-[15px] text-gray-500 mt-1">Define the operational DNA of your event quotations and proposal workflows.</p>
            </div>

            <div className="flex gap-6 flex-col lg:flex-row">
              
              {/* Left Column: Numbering & Currency */}
              <div className="w-full lg:w-[360px] flex flex-col gap-6">
                
                {/* Automated Numbering Card */}
                <div 
                  className="bg-white rounded-[24px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-[#ECECF1] cursor-pointer hover:border-red-200 transition-colors"
                  onClick={() => navigate('/settings/automated-numbering')}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-[8px] bg-red-50 flex items-center justify-center text-red-600">
                      <Calculator className="w-4 h-4" />
                    </div>
                    <h3 className="text-[16px] font-bold text-gray-900">Automated Numbering</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-[13px] font-semibold text-gray-600 block mb-2">Quote Prefix</label>
                      <input 
                        type="text" 
                        value={formState.quotePrefix}
                        onChange={(e) => handleInputChange('quotePrefix', e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full px-4 py-2.5 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] font-semibold text-gray-900 focus:outline-none focus:border-red-300" 
                      />
                    </div>
                    <div>
                      <label className="text-[13px] font-semibold text-gray-600 block mb-2">Suffix Logic</label>
                      <input 
                        type="text" 
                        value={formState.suffixLogic}
                        onChange={(e) => handleInputChange('suffixLogic', e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full px-4 py-2.5 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] font-semibold text-gray-900 focus:outline-none focus:border-red-300" 
                      />
                    </div>
                    <div>
                      <label className="text-[13px] font-semibold text-gray-600 block mb-2">Next Sequence Number</label>
                      <input 
                        type="number" 
                        value={formState.nextSequence}
                        onChange={(e) => handleInputChange('nextSequence', e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full px-4 py-2.5 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] font-semibold text-gray-900 focus:outline-none focus:border-red-300" 
                      />
                    </div>
                    <div className="flex items-center justify-between pt-4" onClick={(e) => e.stopPropagation()}>
                      <span className="text-[14px] font-bold text-gray-900">Reset Annually</span>
                      <ToggleSwitch enabled={formState.resetAnnually} onChange={(val: any) => handleInputChange('resetAnnually', val)} />
                    </div>
                  </div>
                </div>

                {/* Currency Card */}
                <div 
                  className="bg-white rounded-[24px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-[#ECECF1] cursor-pointer hover:border-red-200 transition-colors"
                  onClick={() => navigate('/settings/currency')}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-[8px] bg-amber-50 flex items-center justify-center text-amber-600">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <h3 className="text-[16px] font-bold text-gray-900">Currency</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="relative">
                      <select 
                        value={formState.currency}
                        onChange={(e) => handleInputChange('currency', e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full px-4 py-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] font-semibold text-gray-900 focus:outline-none focus:border-red-300 appearance-none"
                      >
                        <option value="GBP">GBP - British Pound (£)</option>
                        <option value="USD">USD - US Dollar ($)</option>
                        <option value="EUR">EUR - Euro (€)</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    <div className="flex items-center justify-between pt-2" onClick={(e) => e.stopPropagation()}>
                      <span className="text-[14px] font-semibold text-gray-600">Multi-currency Support</span>
                      <ToggleSwitch enabled={formState.multiCurrency} onChange={(val: any) => handleInputChange('multiCurrency', val)} />
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Approval Rules, Tax, Service Charge */}
              <div className="flex-1 flex flex-col gap-6">
                
                {/* Approval Workflow Rules */}
                <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-[#ECECF1]">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-[8px] bg-purple-50 flex items-center justify-center text-purple-600">
                        <Shield className="w-4 h-4" />
                      </div>
                      <h3 className="text-[16px] font-bold text-gray-900">Approval Workflow Rules</h3>
                    </div>
                    <button 
                      onClick={() => navigate('/settings/approval-rule-wizard')}
                      className="text-[14px] font-bold text-red-700 hover:text-red-800 flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Add New Rule
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-[#F8F9FC] rounded-[16px] p-4 flex items-center justify-between group border border-transparent hover:border-[#ECECF1] transition-colors">
                      <div>
                        <h4 className="text-[14px] font-bold text-gray-900">Standard Manager Review</h4>
                        <p className="text-[13px] text-gray-500 mt-1">Requires review if total exceeds £10,000.00</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex -space-x-2">
                          <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="" />
                          <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="" />
                        </div>
                        <button 
                          onClick={() => navigate('/settings/approval-rule-wizard')}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-white hover:shadow-sm hover:text-gray-900 transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="bg-[#F8F9FC] rounded-[16px] p-4 flex items-center justify-between group border border-transparent hover:border-[#ECECF1] transition-colors">
                      <div>
                        <h4 className="text-[14px] font-bold text-gray-900">High-Value VIP Exception</h4>
                        <p className="text-[13px] text-gray-500 mt-1">Requires Director signature for quotes over £50,000.00</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex -space-x-2">
                          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="" />
                        </div>
                        <button 
                          onClick={() => navigate('/settings/approval-rule-wizard')}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-white hover:shadow-sm hover:text-gray-900 transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="bg-[#F8F9FC] rounded-[16px] p-4 flex items-center justify-between group border border-transparent hover:border-[#ECECF1] transition-colors">
                      <div>
                        <h4 className="text-[14px] font-bold text-gray-900">Discount Threshold</h4>
                        <p className="text-[13px] text-gray-500 mt-1">Flag for review if manual discount exceeds 15%</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => navigate('/settings/approval-rule-wizard')}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-white hover:shadow-sm hover:text-gray-900 transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tax & Service Charge Row */}
                <div className="flex gap-6 flex-col sm:flex-row">
                  
                  {/* Tax Config */}
                  <div 
                    className="flex-1 bg-white rounded-[24px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-[#ECECF1] cursor-pointer hover:border-red-200 transition-colors"
                    onClick={() => navigate('/settings/tax-configuration')}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-[8px] bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <Percent className="w-4 h-4" />
                      </div>
                      <h3 className="text-[16px] font-bold text-gray-900">Tax Config</h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-[13px] font-semibold text-gray-600 block mb-2">Default Tax Label</label>
                        <input 
                          type="text" 
                          value={formState.taxLabel}
                          onChange={(e) => handleInputChange('taxLabel', e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          className="w-full px-4 py-2.5 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] font-semibold text-gray-900 focus:outline-none focus:border-red-300" 
                        />
                      </div>
                      <div>
                        <label className="text-[13px] font-semibold text-gray-600 block mb-2">Rate (%)</label>
                        <div className="relative">
                          <input 
                            type="number" 
                            value={formState.taxRate}
                            onChange={(e) => handleInputChange('taxRate', e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full px-4 py-2.5 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] font-semibold text-gray-900 focus:outline-none focus:border-red-300 pr-10" 
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Service Charge */}
                  <div 
                    className="flex-1 bg-white rounded-[24px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-[#ECECF1] cursor-pointer hover:border-red-200 transition-colors"
                    onClick={() => navigate('/settings/service-charge')}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-[8px] bg-orange-50 flex items-center justify-center text-orange-600">
                        <Receipt className="w-4 h-4" />
                      </div>
                      <h3 className="text-[16px] font-bold text-gray-900">Service Charge</h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-[13px] font-semibold text-gray-600 block mb-2">Standard Rate (%)</label>
                        <div className="relative">
                          <input 
                            type="number" 
                            value={formState.serviceCharge}
                            onChange={(e) => handleInputChange('serviceCharge', e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full px-4 py-2.5 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] font-semibold text-gray-900 focus:outline-none focus:border-red-300 pr-10" 
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-5" onClick={(e) => e.stopPropagation()}>
                        <span className="text-[14px] font-bold text-gray-900 pr-4">Apply Tax to Service Charge</span>
                        <ToggleSwitch enabled={formState.taxOnServiceCharge} onChange={(val: any) => handleInputChange('taxOnServiceCharge', val)} />
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>

            {/* Advanced Settings Row */}
            <div className="mt-8 pt-8 border-t border-[#ECECF1]">
              <h2 className="text-[18px] font-bold text-gray-900 mb-6">Global & Advanced Configurations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <button 
                  onClick={() => navigate('/settings/business-rules')}
                  className="bg-white p-6 rounded-[24px] shadow-sm border border-[#ECECF1] text-left hover:border-red-200 transition-colors flex flex-col gap-4"
                >
                  <div className="w-10 h-10 rounded-[12px] bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-gray-900">Business Rules</h3>
                    <p className="text-[12px] text-gray-500 mt-1">Discount limits & margins</p>
                  </div>
                </button>
                <button 
                  onClick={() => navigate('/settings/notifications')}
                  className="bg-white p-6 rounded-[24px] shadow-sm border border-[#ECECF1] text-left hover:border-red-200 transition-colors flex flex-col gap-4"
                >
                  <div className="w-10 h-10 rounded-[12px] bg-blue-50 flex items-center justify-center text-blue-600">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-gray-900">Notifications</h3>
                    <p className="text-[12px] text-gray-500 mt-1">Email, SMS & Alerts</p>
                  </div>
                </button>
                <button 
                  onClick={() => navigate('/settings/permissions')}
                  className="bg-white p-6 rounded-[24px] shadow-sm border border-[#ECECF1] text-left hover:border-red-200 transition-colors flex flex-col gap-4"
                >
                  <div className="w-10 h-10 rounded-[12px] bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-gray-900">User Permissions</h3>
                    <p className="text-[12px] text-gray-500 mt-1">Roles & access control</p>
                  </div>
                </button>
                <button 
                  onClick={() => navigate('/settings/audit-logs')}
                  className="bg-white p-6 rounded-[24px] shadow-sm border border-[#ECECF1] text-left hover:border-red-200 transition-colors flex flex-col gap-4"
                >
                  <div className="w-10 h-10 rounded-[12px] bg-gray-100 flex items-center justify-center text-gray-600">
                    <Save className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-gray-900">Audit Logs</h3>
                    <p className="text-[12px] text-gray-500 mt-1">System change history</p>
                  </div>
                </button>
              </div>
            </div>

          </div>
        </main>

        {/* Floating Bottom Bar for Save / Discard */}
        <div className={`fixed bottom-0 right-0 left-[260px] bg-white border-t border-[#ECECF1] shadow-[0_-4px_24px_rgba(0,0,0,0.02)] p-4 flex justify-end gap-4 transition-transform duration-300 z-20 ${hasChanges ? 'translate-y-0' : 'translate-y-full'}`}>
          <button 
            onClick={handleDiscard}
            className="px-6 py-2.5 bg-white border border-[#ECECF1] text-gray-700 rounded-full font-bold text-[14px] hover:bg-gray-50 transition-colors shadow-sm"
          >
            Discard Changes
          </button>
          <button 
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className="px-8 py-2.5 bg-gradient-to-r from-red-700 to-orange-400 text-white rounded-full font-bold text-[14px] shadow-sm hover:shadow-md transition-all flex items-center gap-2 disabled:opacity-70"
          >
            {saveStatus === 'saving' ? (
              <span className="flex items-center gap-2">Saving...</span>
            ) : saveStatus === 'success' ? (
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Saved Successfully</span>
            ) : (
              <span className="flex items-center gap-2">Save Configuration <Save className="w-4 h-4 ml-1" /></span>
            )}
          </button>
        </div>

        {/* Discard Confirmation Modal */}
        {showDiscardModal && (
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white rounded-[24px] p-8 w-full max-w-md shadow-xl border border-[#ECECF1]">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 mb-6">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h2 className="text-[20px] font-bold text-gray-900 mb-2">Discard unsaved changes?</h2>
              <p className="text-[14px] text-gray-500 mb-8 leading-relaxed">
                You have made changes to your configuration settings. If you discard them, they will be permanently lost and the last saved version will be restored.
              </p>
              <div className="flex items-center gap-3 justify-end">
                <button 
                  onClick={() => setShowDiscardModal(false)}
                  className="px-5 py-2.5 bg-gray-50 text-gray-700 rounded-full font-bold text-[14px] hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDiscard}
                  className="px-5 py-2.5 bg-orange-600 text-white rounded-full font-bold text-[14px] hover:bg-orange-700 transition-colors shadow-sm"
                >
                  Yes, Discard Changes
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SystemSettings;
