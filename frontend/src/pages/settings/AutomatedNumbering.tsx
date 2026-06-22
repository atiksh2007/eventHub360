import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import TopHeader from '../../components/TopHeader';
import { 
  ArrowLeft, Calculator, Save, AlertTriangle, History, 
  RotateCcw, Eye, CheckCircle2 
} from 'lucide-react';

const ToggleSwitch = ({ enabled, onChange  }: any) => (
  <button 
    onClick={() => onChange(!enabled)}
    className={`w-11 h-6 rounded-full transition-colors relative ${enabled ? 'bg-red-700' : 'bg-gray-200'}`}
  >
    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${enabled ? 'left-6' : 'left-1'}`} />
  </button>
);

const AutomatedNumbering = () => {
  const navigate = useNavigate();
  const [showResetModal, setShowResetModal] = useState(false);
  const [saveStatus, setSaveStatus] = useState<any>(null);

  const [formState, setFormState] = useState({
    prefix: 'QT-',
    dateFormat: 'YYYY',
    useCustomSuffix: true,
    customSuffix: '/2024',
    sequenceLength: 4,
    nextSequence: '1042',
    resetFrequency: 'annually'
  });

  const getPreview = () => {
    let preview = formState.prefix;
    const seq = formState.nextSequence.padStart(formState.sequenceLength, '0');
    preview += seq;
    if (formState.useCustomSuffix) {
      preview += formState.customSuffix;
    } else if (formState.dateFormat !== 'none') {
      const year = new Date().getFullYear();
      const month = String(new Date().getMonth() + 1).padStart(2, '0');
      if (formState.dateFormat === 'YYYY') preview += `/${year}`;
      if (formState.dateFormat === 'YYYY-MM') preview += `/${year}-${month}`;
      if (formState.dateFormat === 'MM-YYYY') preview += `/${month}-${year}`;
    }
    return preview;
  };

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans">
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        <TopHeader />
        
        <main className="flex-1 overflow-y-auto p-8 pb-32">
          <div className="max-w-[1000px] mx-auto space-y-6">
            
            {/* Header Area */}
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => navigate('/settings')} className="w-10 h-10 bg-white border border-[#ECECF1] rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Automated Numbering</h1>
                <p className="text-[15px] text-gray-500 mt-1">Configure prefixes, logic, and sequences for generated quotations.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Main Form Area */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Configuration Card */}
                <div className="bg-white rounded-[24px] p-8 shadow-sm border border-[#ECECF1]">
                  <div className="flex items-center gap-3 mb-8 pb-6 border-b border-[#ECECF1]">
                    <div className="w-10 h-10 rounded-[12px] bg-red-50 flex items-center justify-center text-red-600">
                      <Calculator className="w-5 h-5" />
                    </div>
                    <h2 className="text-[18px] font-bold text-gray-900">Sequence Builder</h2>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="text-[13px] font-bold text-gray-700 block mb-2">Quote Prefix</label>
                      <input 
                        type="text" 
                        value={formState.prefix}
                        onChange={(e) => setFormState({...formState, prefix: e.target.value})}
                        className="w-full px-4 py-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] font-semibold text-gray-900 focus:outline-none focus:border-red-300" 
                      />
                      <p className="text-[11px] text-gray-500 mt-2">String appearing before the number.</p>
                    </div>
                    <div>
                      <label className="text-[13px] font-bold text-gray-700 block mb-2">Sequence Padding (Length)</label>
                      <select 
                        value={formState.sequenceLength}
                        onChange={(e) => setFormState({...formState, sequenceLength: Number(e.target.value)})}
                        className="w-full px-4 py-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] font-semibold text-gray-900 focus:outline-none focus:border-red-300"
                      >
                        <option value={3}>3 digits (001)</option>
                        <option value={4}>4 digits (0001)</option>
                        <option value={5}>5 digits (00001)</option>
                        <option value={6}>6 digits (000001)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-6 pt-6 border-t border-[#ECECF1]">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-[14px] font-bold text-gray-900">Custom Suffix Builder</h4>
                        <p className="text-[12px] text-gray-500">Append specific text or dates to the end of the quote number.</p>
                      </div>
                      <ToggleSwitch enabled={formState.useCustomSuffix} onChange={(v: any) => setFormState({...formState, useCustomSuffix: v})} />
                    </div>

                    {formState.useCustomSuffix ? (
                      <div>
                        <label className="text-[13px] font-bold text-gray-700 block mb-2">Suffix String</label>
                        <input 
                          type="text" 
                          value={formState.customSuffix}
                          onChange={(e) => setFormState({...formState, customSuffix: e.target.value})}
                          className="w-full px-4 py-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] font-semibold text-gray-900 focus:outline-none focus:border-red-300" 
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="text-[13px] font-bold text-gray-700 block mb-2">Date Format Suffix</label>
                        <select 
                          value={formState.dateFormat}
                          onChange={(e) => setFormState({...formState, dateFormat: e.target.value})}
                          className="w-full px-4 py-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] font-semibold text-gray-900 focus:outline-none focus:border-red-300"
                        >
                          <option value="none">No Date Suffix</option>
                          <option value="YYYY">/YYYY (e.g. /2024)</option>
                          <option value="YYYY-MM">/YYYY-MM (e.g. /2024-10)</option>
                          <option value="MM-YYYY">/MM-YYYY (e.g. /10-2024)</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>

                {/* Counter & Reset Card */}
                <div className="bg-white rounded-[24px] p-8 shadow-sm border border-[#ECECF1]">
                  <h2 className="text-[18px] font-bold text-gray-900 mb-6">Counter Management</h2>
                  <div className="flex gap-6">
                    <div className="flex-1">
                      <label className="text-[13px] font-bold text-gray-700 block mb-2">Next Sequence Number</label>
                      <input 
                        type="number" 
                        value={formState.nextSequence}
                        onChange={(e) => setFormState({...formState, nextSequence: e.target.value})}
                        className="w-full px-4 py-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] font-semibold text-gray-900 focus:outline-none focus:border-red-300" 
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-[13px] font-bold text-gray-700 block mb-2">Auto-Reset Counter</label>
                      <select 
                        value={formState.resetFrequency}
                        onChange={(e) => setFormState({...formState, resetFrequency: e.target.value})}
                        className="w-full px-4 py-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] font-semibold text-gray-900 focus:outline-none focus:border-red-300"
                      >
                        <option value="never">Never Reset</option>
                        <option value="monthly">Monthly</option>
                        <option value="annually">Annually</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-[#ECECF1]">
                    <button 
                      onClick={() => setShowResetModal(true)}
                      className="px-5 py-2.5 bg-red-50 text-red-700 rounded-full font-bold text-[13px] hover:bg-red-100 transition-colors flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" /> Reset Counter Manually Now
                    </button>
                  </div>
                </div>

              </div>

              {/* Right Column: Preview & Audit */}
              <div className="space-y-6">
                
                {/* Live Preview Card */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[24px] p-6 shadow-md text-white">
                  <div className="flex items-center gap-2 mb-6 text-gray-300">
                    <Eye className="w-5 h-5" />
                    <h3 className="text-[14px] font-bold uppercase tracking-wider">Live Preview</h3>
                  </div>
                  <p className="text-[12px] text-gray-400 mb-2">The next generated quotation will be:</p>
                  <div className="bg-white/10 rounded-[16px] p-4 border border-white/10">
                    <span className="text-[28px] font-black tracking-widest">{getPreview()}</span>
                  </div>
                </div>

                {/* Audit History */}
                <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1]">
                  <div className="flex items-center gap-2 mb-6">
                    <History className="w-5 h-5 text-gray-400" />
                    <h3 className="text-[16px] font-bold text-gray-900">Recent Changes</h3>
                  </div>
                  <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-[11px] before:w-px before:bg-gray-200">
                    {[
                      { user: 'Alex Sterling', action: 'Changed Suffix to /2024', time: 'Oct 23, 2023' },
                      { user: 'System', action: 'Annual Counter Reset', time: 'Jan 1, 2023' },
                      { user: 'Alex Sterling', action: 'Configured Padding to 4', time: 'Nov 12, 2022' }
                    ].map((log: any, i: any) => (
                      <div key={i} className="relative pl-8">
                        <div className="absolute left-0 top-1.5 w-[22px] h-[22px] bg-white border-4 border-gray-200 rounded-full"></div>
                        <p className="text-[13px] font-bold text-gray-900 leading-tight">{log.action}</p>
                        <p className="text-[11px] text-gray-500 mt-1">{log.user} • {log.time}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </main>

        {/* Floating Save Bar */}
        <div className="fixed bottom-0 right-0 left-[260px] bg-white border-t border-[#ECECF1] shadow-[0_-4px_24px_rgba(0,0,0,0.02)] p-4 flex justify-end gap-4 z-20">
          <button 
            onClick={() => navigate('/settings')}
            className="px-6 py-2.5 bg-white border border-[#ECECF1] text-gray-700 rounded-full font-bold text-[14px] hover:bg-gray-50 transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className="px-8 py-2.5 bg-gradient-to-r from-red-700 to-orange-400 text-white rounded-full font-bold text-[14px] shadow-sm hover:shadow-md transition-all flex items-center gap-2"
          >
            {saveStatus === 'saving' ? (
              <span>Saving...</span>
            ) : saveStatus === 'success' ? (
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Saved</span>
            ) : (
              <span className="flex items-center gap-2">Save Configuration <Save className="w-4 h-4 ml-1" /></span>
            )}
          </button>
        </div>

        {/* Reset Confirmation Modal */}
        {showResetModal && (
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[24px] p-8 w-full max-w-md shadow-xl border border-[#ECECF1]">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-6">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h2 className="text-[20px] font-bold text-gray-900 mb-2">Reset Sequence Counter?</h2>
              <p className="text-[14px] text-gray-500 mb-8 leading-relaxed">
                This will immediately reset the sequence counter to 0001 (or your defined padding length). The next generated quote will use this new number. This action cannot be undone.
              </p>
              <div className="flex items-center gap-3 justify-end">
                <button 
                  onClick={() => setShowResetModal(false)}
                  className="px-5 py-2.5 bg-gray-50 text-gray-700 rounded-full font-bold text-[14px] hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    setFormState({...formState, nextSequence: '1'});
                    setShowResetModal(false);
                  }}
                  className="px-5 py-2.5 bg-red-600 text-white rounded-full font-bold text-[14px] hover:bg-red-700 transition-colors shadow-sm"
                >
                  Yes, Reset Counter
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AutomatedNumbering;
