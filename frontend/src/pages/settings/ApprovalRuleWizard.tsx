import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import TopHeader from '../../components/TopHeader';
import { 
  ArrowLeft, Shield, Users, GitBranch, Save, ChevronRight, 
  CheckCircle2, Plus, Trash2, Copy, AlertTriangle, X
} from 'lucide-react';

const ToggleSwitch = ({ enabled, onChange  }: any) => (
  <button 
    onClick={() => onChange(!enabled)}
    className={`w-11 h-6 rounded-full transition-colors relative ${enabled ? 'bg-red-700' : 'bg-gray-200'}`}
  >
    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${enabled ? 'left-6' : 'left-1'}`} />
  </button>
);

const ApprovalRuleWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const [formState, setFormState] = useState({
    ruleName: 'Standard Manager Review',
    status: true,
    thresholdOperator: '>',
    thresholdValue: '10000',
    region: 'Global',
    department: 'Sales',
    escalationTime: '48',
    notifySubmitter: true,
    notifyManager: true,
    stages: [
      { id: 1, type: 'Manager Review', reviewers: ['Sarah Jenkins'], required: 1 },
      { id: 2, type: 'Finance Review', reviewers: ['Michael Chang'], required: 1 }
    ]
  });

  const steps = [
    { id: 1, label: 'Rule Configuration', icon: Shield },
    { id: 2, label: 'Approval Matrix', icon: GitBranch },
    { id: 3, label: 'Reviewer Assignment', icon: Users },
    { id: 4, label: 'Review & Publish', icon: CheckCircle2 }
  ];

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans">
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        <TopHeader />
        
        <main className="flex-1 overflow-y-auto p-8 pb-32">
          <div className="max-w-[1000px] mx-auto space-y-6">
            
            {/* Header Area */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <button onClick={() => navigate('/settings')} className="w-10 h-10 bg-white border border-[#ECECF1] rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Edit Approval Workflow</h1>
                  <p className="text-[15px] text-gray-500 mt-1">Configure rule logic, approval stages, and assign reviewers.</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-white border border-[#ECECF1] rounded-full text-gray-600 font-bold text-[13px] hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Copy className="w-4 h-4" /> Duplicate
                </button>
                <button onClick={() => setShowDeleteModal(true)} className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-full font-bold text-[13px] hover:bg-red-50 transition-colors flex items-center gap-2">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>

            {/* Wizard Navigation */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1] mb-6 flex justify-between items-center relative">
              <div className="absolute left-10 right-10 top-1/2 h-0.5 bg-gray-100 -z-0"></div>
              {steps.map((step: any, idx: any) => (
                <div key={step.id} className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
                  <button 
                    onClick={() => setCurrentStep(step.id)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      currentStep === step.id ? 'bg-red-600 text-white shadow-md' : 
                      currentStep > step.id ? 'bg-emerald-500 text-white' : 'bg-[#F8F9FC] border border-[#ECECF1] text-gray-400'
                    }`}
                  >
                    <step.icon className="w-5 h-5" />
                  </button>
                  <span className={`text-[12px] font-bold ${currentStep === step.id ? 'text-gray-900' : 'text-gray-500'}`}>{step.label}</span>
                </div>
              ))}
            </div>

            {/* Wizard Content Steps */}
            <div className="bg-white rounded-[24px] p-8 shadow-sm border border-[#ECECF1] min-h-[500px]">
              
              {currentStep === 1 && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <h2 className="text-[20px] font-bold text-gray-900">Rule Configuration</h2>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2">
                      <label className="text-[13px] font-bold text-gray-700 block mb-2">Rule Name</label>
                      <input type="text" value={formState.ruleName} onChange={(e) => setFormState({...formState, ruleName: e.target.value})} className="w-full px-4 py-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] font-semibold text-gray-900 focus:outline-none focus:border-red-300" />
                    </div>
                    
                    <div>
                      <label className="text-[13px] font-bold text-gray-700 block mb-2">Total Value Condition</label>
                      <div className="flex gap-2">
                        <select value={formState.thresholdOperator} onChange={(e) => setFormState({...formState, thresholdOperator: e.target.value})} className="w-[100px] px-4 py-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] font-semibold text-gray-900 focus:outline-none focus:border-red-300">
                          <option value=">">Greater than</option>
                          <option value="<">Less than</option>
                        </select>
                        <input type="number" value={formState.thresholdValue} onChange={(e) => setFormState({...formState, thresholdValue: e.target.value})} className="flex-1 px-4 py-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] font-semibold text-gray-900 focus:outline-none focus:border-red-300" />
                      </div>
                    </div>

                    <div>
                      <label className="text-[13px] font-bold text-gray-700 block mb-2">Region Scope</label>
                      <select value={formState.region} onChange={(e) => setFormState({...formState, region: e.target.value})} className="w-full px-4 py-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] font-semibold text-gray-900 focus:outline-none focus:border-red-300">
                        <option>Global</option>
                        <option>North America</option>
                        <option>EMEA</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[13px] font-bold text-gray-700 block mb-2">Auto-Escalate If Not Approved After (Hrs)</label>
                      <input type="number" value={formState.escalationTime} onChange={(e) => setFormState({...formState, escalationTime: e.target.value})} className="w-full px-4 py-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] font-semibold text-gray-900 focus:outline-none focus:border-red-300" />
                    </div>
                    
                    <div className="flex flex-col justify-center gap-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-bold text-gray-700">Rule Active Status</span>
                        <ToggleSwitch enabled={formState.status} onChange={(v: any) => setFormState({...formState, status: v})} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <h2 className="text-[20px] font-bold text-gray-900">Approval Matrix Designer</h2>
                    <button className="text-[13px] font-bold text-red-600 flex items-center gap-1 hover:text-red-700">
                      <Plus className="w-4 h-4" /> Add Stage
                    </button>
                  </div>

                  <div className="space-y-4">
                    {formState.stages.map((stage: any, idx: any) => (
                      <div key={stage.id} className="bg-[#F8F9FC] border border-[#ECECF1] rounded-[20px] p-6 flex items-center gap-6 relative">
                        <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-600 font-bold text-[14px] shrink-0">
                          {idx + 1}
                        </div>
                        <div className="flex-1 grid grid-cols-3 gap-6">
                          <div>
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Stage Name</p>
                            <p className="text-[14px] font-bold text-gray-900">{stage.type}</p>
                          </div>
                          <div>
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Required Approvals</p>
                            <select className="w-[100px] px-3 py-1.5 bg-white border border-[#ECECF1] rounded-lg text-[13px] font-semibold text-gray-900 focus:outline-none focus:border-red-300">
                              <option>1 of {stage.reviewers.length}</option>
                              <option>All Reviewers</option>
                            </select>
                          </div>
                          <div>
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Type</p>
                            <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-[11px] font-bold uppercase rounded-md">Sequential</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <h2 className="text-[20px] font-bold text-gray-900">Reviewer Assignment</h2>
                  
                  <div className="space-y-6">
                    {formState.stages.map((stage: any, idx: any) => (
                      <div key={stage.id} className="border border-[#ECECF1] rounded-[20px] p-6">
                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#ECECF1]">
                          <h3 className="text-[16px] font-bold text-gray-900">Stage {idx + 1}: {stage.type}</h3>
                          <button className="text-[12px] font-bold text-gray-500 hover:text-gray-900">+ Assign User</button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {stage.reviewers.map((rev: any, rIdx: any) => (
                            <div key={rIdx} className="px-4 py-2 bg-[#F8F9FC] border border-[#ECECF1] rounded-full flex items-center gap-2">
                              <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden"><Users className="w-3 h-3 text-gray-500" /></div>
                              <span className="text-[13px] font-bold text-gray-700">{rev}</span>
                              <button className="text-gray-400 hover:text-red-500 ml-1"><X className="w-3 h-3" /></button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="text-center pb-6 border-b border-[#ECECF1]">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h2 className="text-[24px] font-bold text-gray-900">Ready to Publish</h2>
                    <p className="text-[14px] text-gray-500 mt-2 max-w-md mx-auto">Review your configuration. Once published, this rule will apply to all newly generated quotations matching the criteria.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-[#F8F9FC] rounded-xl border border-[#ECECF1]">
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Rule Name</p>
                      <p className="text-[14px] font-bold text-gray-900">{formState.ruleName}</p>
                    </div>
                    <div className="p-4 bg-[#F8F9FC] rounded-xl border border-[#ECECF1]">
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Condition</p>
                      <p className="text-[14px] font-bold text-gray-900">Total {formState.thresholdOperator} £{formState.thresholdValue}</p>
                    </div>
                    <div className="p-4 bg-[#F8F9FC] rounded-xl border border-[#ECECF1]">
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Stages</p>
                      <p className="text-[14px] font-bold text-gray-900">{formState.stages.length} Sequential Stages</p>
                    </div>
                    <div className="p-4 bg-[#F8F9FC] rounded-xl border border-[#ECECF1]">
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
                      <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase rounded-md">Active</span>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>
        </main>

        {/* Floating Bottom Bar for Next / Save */}
        <div className="fixed bottom-0 right-0 left-[260px] bg-white border-t border-[#ECECF1] shadow-[0_-4px_24px_rgba(0,0,0,0.02)] p-4 flex justify-between gap-4 z-20">
          <button 
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            className={`px-6 py-2.5 bg-white border border-[#ECECF1] text-gray-700 rounded-full font-bold text-[14px] hover:bg-gray-50 transition-colors shadow-sm ${currentStep === 1 ? 'invisible' : ''}`}
          >
            Previous
          </button>
          
          {currentStep < 4 ? (
            <button 
              onClick={() => setCurrentStep(prev => Math.min(4, prev + 1))}
              className="px-8 py-2.5 bg-gray-900 text-white rounded-full font-bold text-[14px] shadow-sm hover:bg-gray-800 transition-all flex items-center gap-2"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button 
              onClick={() => navigate('/settings')}
              className="px-8 py-2.5 bg-gradient-to-r from-red-700 to-orange-400 text-white rounded-full font-bold text-[14px] shadow-sm hover:shadow-md transition-all flex items-center gap-2"
            >
              Publish Rule <Save className="w-4 h-4 ml-1" />
            </button>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[24px] p-8 w-full max-w-md shadow-xl border border-[#ECECF1]">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-6">
                <Trash2 className="w-6 h-6" />
              </div>
              <h2 className="text-[20px] font-bold text-gray-900 mb-2">Delete Approval Rule?</h2>
              <p className="text-[14px] text-gray-500 mb-8 leading-relaxed">
                Are you sure you want to delete the "{formState.ruleName}" rule? This action cannot be undone, and quotes previously evaluated under this rule will retain their current statuses.
              </p>
              <div className="flex items-center gap-3 justify-end">
                <button onClick={() => setShowDeleteModal(false)} className="px-5 py-2.5 bg-gray-50 text-gray-700 rounded-full font-bold text-[14px] hover:bg-gray-100 transition-colors">Cancel</button>
                <button onClick={() => navigate('/settings')} className="px-5 py-2.5 bg-red-600 text-white rounded-full font-bold text-[14px] hover:bg-red-700 transition-colors shadow-sm">Delete Rule</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ApprovalRuleWizard;
