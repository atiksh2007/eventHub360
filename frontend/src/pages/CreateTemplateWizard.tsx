import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle2, ChevronRight, FileEdit, Tags, 
  LayoutTemplate, ListTree, Palette, Eye, CheckCircle, Upload
} from 'lucide-react';

const CreateTemplateWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, title: 'Template Info', icon: FileEdit },
    { id: 2, title: 'Category', icon: Tags },
    { id: 3, title: 'Design Layout', icon: LayoutTemplate },
    { id: 4, title: 'Sections', icon: ListTree },
    { id: 5, title: 'Branding', icon: Palette },
    { id: 6, title: 'Preview', icon: Eye },
    { id: 7, title: 'Publish', icon: CheckCircle }
  ];

  const handleNext = () => {
    if (currentStep < 7) setCurrentStep(currentStep + 1);
    else navigate('/templates');
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
            <p className="text-[11px] font-bold text-red-700 uppercase tracking-widest leading-none mb-1">Create New Template</p>
            <h2 className="text-[18px] font-bold text-gray-900 leading-none">Template Configuration Builder</h2>
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
            {currentStep === 7 ? 'Publish Template' : 'Continue'}
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
          <div className="max-w-[800px] w-full bg-white rounded-[32px] p-10 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#ECECF1]">
            
            {currentStep === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-[28px] font-bold text-gray-900 mb-2">Template Information</h2>
                <p className="text-gray-500 mb-8">Let's start by giving your new template a clear name and description.</p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-[14px] font-bold text-gray-700 mb-2">Template Name</label>
                    <input type="text" placeholder="e.g. Modern Minimalist Wedding" className="w-full px-5 py-4 bg-[#F8F9FC] border border-[#ECECF1] rounded-[16px] text-[15px] focus:outline-none focus:border-red-300" />
                  </div>
                  <div>
                    <label className="block text-[14px] font-bold text-gray-700 mb-2">Description</label>
                    <textarea rows={4} placeholder="Briefly describe what this template is best used for..." className="w-full px-5 py-4 bg-[#F8F9FC] border border-[#ECECF1] rounded-[16px] text-[15px] focus:outline-none focus:border-red-300 resize-none"></textarea>
                  </div>
                  <div>
                    <label className="block text-[14px] font-bold text-gray-700 mb-2">Cover Image Thumbnail</label>
                    <div className="border-2 border-dashed border-[#ECECF1] rounded-[16px] p-8 flex flex-col items-center justify-center bg-[#F8F9FC] hover:bg-gray-50 transition-colors cursor-pointer text-center">
                      <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 mb-4">
                        <Upload className="w-6 h-6" />
                      </div>
                      <p className="text-[14px] font-bold text-gray-700 mb-1">Upload Thumbnail Image</p>
                      <p className="text-[12px] font-medium text-gray-500">PNG or JPG up to 5MB</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep > 1 && currentStep < 7 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center py-10">
                <div className="w-20 h-20 bg-[#F8F5FF] text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  {currentStep === 2 && <Tags className="w-10 h-10" />}
                  {currentStep === 3 && <LayoutTemplate className="w-10 h-10" />}
                  {currentStep === 4 && <ListTree className="w-10 h-10" />}
                  {currentStep === 5 && <Palette className="w-10 h-10" />}
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
                <h2 className="text-[32px] font-bold text-gray-900 mb-2">Template Ready to Publish!</h2>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto">Your template has been configured and is ready to be published to the library for your team to use.</p>
                <button onClick={() => navigate('/templates')} className="px-8 py-4 bg-gradient-to-r from-red-700 to-orange-400 text-white rounded-full font-bold text-[16px] hover:shadow-lg transition-shadow">
                  Publish to Library
                </button>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateTemplateWizard;
