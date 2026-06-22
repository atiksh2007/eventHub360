import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import TopHeader from '../../components/TopHeader';
import { 
  ArrowLeft, Save, Send, CheckCircle2, ChevronRight, 
  MapPin, Calendar, Users, DollarSign, FileText, ChevronLeft
} from 'lucide-react';

const ContinueEditingWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(6);
  const [saveStatus, setSaveStatus] = useState<any>(null);

  const steps = [
    { id: 1, label: 'Client Info', icon: Users },
    { id: 2, label: 'Event Details', icon: Calendar },
    { id: 3, label: 'Venue Selection', icon: MapPin },
    { id: 4, label: 'Services Selection', icon: FileText },
    { id: 5, label: 'Pricing Configuration', icon: DollarSign },
    { id: 6, label: 'Proposal Preview', icon: CheckCircle2 }
  ];

  const handleSaveDraft = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans">
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        <TopHeader />
        
        <main className="flex-1 overflow-y-auto p-8 pb-32">
          <div className="max-w-[1200px] mx-auto space-y-6">
            
            {/* Header Area */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate('/quotations/drafts')}
                  className="w-10 h-10 bg-white border border-[#ECECF1] rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Annual Tech Summit 2024</h1>
                  <p className="text-[15px] text-gray-500 mt-1">Draft Quote • Lumina Innovations • Q-88124</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleSaveDraft}
                  disabled={saveStatus === 'saving'}
                  className="px-5 py-2.5 bg-white border border-[#ECECF1] text-gray-700 rounded-full font-bold text-[14px] hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2"
                >
                  {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'success' ? <><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Saved</> : <><Save className="w-4 h-4" /> Save Draft</>}
                </button>
              </div>
            </div>

            {/* Wizard Navigation */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1] mb-6 flex justify-between items-center relative overflow-x-auto">
              <div className="absolute left-10 right-10 top-1/2 h-0.5 bg-gray-100 -z-0"></div>
              {steps.map((step: any) => (
                <div key={step.id} className="relative z-10 flex flex-col items-center gap-2 bg-white px-4 min-w-[120px]">
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

            {/* Content Area */}
            <div className="bg-white rounded-[24px] shadow-sm border border-[#ECECF1] min-h-[500px] flex flex-col">
              
              <div className="p-8 flex-1">
                {currentStep === 6 && (
                  <div className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center border border-[#ECECF1]">
                      <FileText className="w-10 h-10 text-gray-300" />
                    </div>
                    <h2 className="text-[24px] font-bold text-gray-900">Proposal Preview Generation</h2>
                    <p className="text-[15px] text-gray-500 leading-relaxed">
                      You are currently at Step 6. The pricing is configured and the template is applied. Click to preview the generated proposal document before submission.
                    </p>
                    
                    <div className="p-6 bg-[#F8F9FC] rounded-[20px] border border-[#ECECF1] w-full text-left grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Subtotal</p>
                        <p className="text-[16px] font-bold text-gray-900">$125,000.00</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Tax (14%)</p>
                        <p className="text-[16px] font-bold text-gray-900">$17,500.00</p>
                      </div>
                      <div className="col-span-2 pt-4 border-t border-[#ECECF1]">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Grand Total</p>
                        <p className="text-[24px] font-bold text-red-600">$142,500.00</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {currentStep !== 6 && (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-gray-400 font-medium">Wizard Step {currentStep} Placeholder Content</p>
                  </div>
                )}
              </div>

              {/* Bottom Nav */}
              <div className="p-6 border-t border-[#ECECF1] bg-[#F8F9FC] rounded-b-[24px] flex items-center justify-between">
                <button 
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  className={`px-6 py-2.5 bg-white border border-[#ECECF1] text-gray-700 rounded-full font-bold text-[14px] hover:bg-gray-50 transition-colors flex items-center gap-2 ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={currentStep === 1}
                >
                  <ChevronLeft className="w-4 h-4" /> Previous Step
                </button>
                
                {currentStep < 6 ? (
                  <button 
                    onClick={() => setCurrentStep(Math.min(6, currentStep + 1))}
                    className="px-8 py-2.5 bg-gray-900 text-white rounded-full font-bold text-[14px] hover:bg-gray-800 transition-colors flex items-center gap-2"
                  >
                    Next Step <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button 
                    onClick={() => navigate('/quotations')}
                    className="px-8 py-2.5 bg-gradient-to-r from-red-700 to-orange-400 text-white rounded-full font-bold text-[14px] shadow-sm hover:shadow-md transition-all flex items-center gap-2"
                  >
                    Submit Quotation <Send className="w-4 h-4 ml-1" />
                  </button>
                )}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default ContinueEditingWizard;
