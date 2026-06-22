import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle2, ChevronRight, User, Calendar, 
  Palette, Layout, FileText, Eye, CheckCircle
} from 'lucide-react';

const TemplateApplicationWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, title: 'Select Client', icon: User },
    { id: 2, title: 'Event Type', icon: Calendar },
    { id: 3, title: 'Branding', icon: Palette },
    { id: 4, title: 'Sections', icon: Layout },
    { id: 5, title: 'Generate', icon: FileText },
    { id: 6, title: 'Preview', icon: Eye },
    { id: 7, title: 'Finish', icon: CheckCircle }
  ];

  const handleNext = () => {
    if (currentStep < 7) setCurrentStep(currentStep + 1);
    else navigate('/quotations/new'); // Proceeds to quotation builder
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
    else navigate(-1);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] font-sans flex flex-col">
      
      {/* HEADER */}
      <div className="h-[72px] bg-white border-b border-[#ECECF1] px-8 flex items-center justify-between shrink-0 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={handleBack} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <p className="text-[11px] font-bold text-red-700 uppercase tracking-widest leading-none mb-1">Application Wizard</p>
            <h2 className="text-[18px] font-bold text-gray-900 leading-none">The Eternal Grandeur</h2>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2 text-[14px] font-bold text-gray-600 hover:text-gray-900" onClick={() => navigate('/templates')}>
            Cancel
          </button>
          <button 
            onClick={handleNext}
            className="px-6 py-2.5 bg-gradient-to-r from-red-700 to-orange-400 text-white rounded-full font-bold text-[14px] hover:from-red-800 hover:to-orange-500 shadow-sm flex items-center gap-2"
          >
            {currentStep === 7 ? 'Create Quotation' : 'Continue'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* PROGRESS SIDEBAR */}
        <div className="w-[280px] bg-white border-r border-[#ECECF1] p-8 hidden md:block overflow-y-auto">
          <h3 className="text-[14px] font-bold text-gray-900 mb-8">Setup Progress</h3>
          <div className="relative">
            <div className="absolute left-[15px] top-4 bottom-4 w-px bg-[#ECECF1] z-0"></div>
            <div className="space-y-6 relative z-10">
              {steps.map((step: any) => {
                const Icon = step.icon;
                const isCompleted = currentStep > step.id;
                const isActive = currentStep === step.id;
                const isPending = currentStep < step.id;

                return (
                  <div key={step.id} className="flex items-center gap-4">
                    <div className={`w-[30px] h-[30px] rounded-full flex items-center justify-center text-[12px] font-bold shrink-0 transition-colors ${
                      isCompleted ? 'bg-emerald-500 text-white' : 
                      isActive ? 'bg-red-700 text-white shadow-md' : 
                      'bg-white border-2 border-[#ECECF1] text-gray-400'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : step.id}
                    </div>
                    <span className={`text-[14px] font-semibold transition-colors ${
                      isCompleted ? 'text-gray-900' : 
                      isActive ? 'text-red-700' : 
                      'text-gray-400'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-10 flex items-center justify-center">
          <div className="max-w-[700px] w-full bg-white rounded-[32px] p-10 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#ECECF1]">
            
            {currentStep === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-[28px] font-bold text-gray-900 mb-2">Select Client</h2>
                <p className="text-gray-500 mb-8">Who is this proposal for? Choose an existing client or create a new one.</p>
                
                <div className="space-y-4">
                  <input type="text" placeholder="Search clients..." className="w-full px-5 py-4 bg-[#F8F9FC] border border-[#ECECF1] rounded-[16px] text-[15px] focus:outline-none focus:border-red-300" />
                  <div className="p-5 rounded-[16px] border-2 border-red-700 bg-red-50 flex items-center gap-4 cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-red-200"></div>
                    <div>
                      <p className="font-bold text-gray-900">Grand Plaza Hotel</p>
                      <p className="text-[13px] text-gray-500">marcus@grandplaza.com</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-[28px] font-bold text-gray-900 mb-2">Event Details</h2>
                <p className="text-gray-500 mb-8">Specify the core details to configure template variables.</p>
                <div className="space-y-6">
                  <div>
                    <label className="block text-[14px] font-bold text-gray-700 mb-2">Event Name</label>
                    <input type="text" placeholder="e.g. Summer Corporate Gala" className="w-full px-5 py-4 bg-[#F8F9FC] border border-[#ECECF1] rounded-[16px] focus:outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[14px] font-bold text-gray-700 mb-2">Event Date</label>
                      <input type="date" className="w-full px-5 py-4 bg-[#F8F9FC] border border-[#ECECF1] rounded-[16px] focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-[14px] font-bold text-gray-700 mb-2">Guest Count</label>
                      <input type="number" placeholder="e.g. 250" className="w-full px-5 py-4 bg-[#F8F9FC] border border-[#ECECF1] rounded-[16px] focus:outline-none" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep > 2 && currentStep < 7 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center py-10">
                <div className="w-20 h-20 bg-[#F8F5FF] text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  {currentStep === 3 && <Palette className="w-10 h-10" />}
                  {currentStep === 4 && <Layout className="w-10 h-10" />}
                  {currentStep === 5 && <FileText className="w-10 h-10" />}
                  {currentStep === 6 && <Eye className="w-10 h-10" />}
                </div>
                <h2 className="text-[28px] font-bold text-gray-900 mb-2">
                  {steps[currentStep-1].title}
                </h2>
                <p className="text-gray-500">Configure settings for {steps[currentStep-1].title.toLowerCase()}...</p>
              </div>
            )}

            {currentStep === 7 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center py-10">
                <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <h2 className="text-[32px] font-bold text-gray-900 mb-2">Ready to Go!</h2>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto">The template has been successfully configured. You can now jump into the quotation builder to finalize pricing.</p>
                <button onClick={() => navigate('/quotation-builder')} className="px-8 py-4 bg-gradient-to-r from-red-700 to-orange-400 text-white rounded-full font-bold text-[16px] hover:shadow-lg transition-shadow">
                  Open Quotation Builder
                </button>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};

export default TemplateApplicationWizard;
