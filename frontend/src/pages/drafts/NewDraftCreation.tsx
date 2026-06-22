import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import TopHeader from '../../components/TopHeader';
import { 
  ArrowLeft, FilePlus, Copy, LayoutTemplate, UploadCloud, ChevronRight
} from 'lucide-react';

const NewDraftCreation = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans">
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        <TopHeader />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1000px] mx-auto space-y-8">
            
            <div className="flex items-center gap-4 mb-8">
              <button 
                onClick={() => navigate('/quotations/drafts')}
                className="w-10 h-10 bg-white border border-[#ECECF1] rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Create New Quotation</h1>
                <p className="text-[15px] text-gray-500 mt-1">Choose how you want to start your new draft quotation.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div 
                onClick={() => navigate('/quotations/new')}
                className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1] hover:border-red-300 transition-all cursor-pointer group flex items-start gap-4"
              >
                <div className="w-14 h-14 rounded-[16px] bg-red-50 flex items-center justify-center flex-shrink-0 group-hover:bg-red-600 transition-colors">
                  <FilePlus className="w-6 h-6 text-red-600 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[18px] font-bold text-gray-900 mb-2">Blank Quotation</h3>
                  <p className="text-[14px] text-gray-500 leading-relaxed mb-4">Start from scratch using the standard step-by-step quotation builder wizard.</p>
                  <div className="flex items-center text-[13px] font-bold text-red-600">Start Blank <ChevronRight className="w-4 h-4 ml-1" /></div>
                </div>
              </div>

              <div 
                onClick={() => navigate('/templates')}
                className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1] hover:border-emerald-300 transition-all cursor-pointer group flex items-start gap-4"
              >
                <div className="w-14 h-14 rounded-[16px] bg-emerald-50 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500 transition-colors">
                  <LayoutTemplate className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[18px] font-bold text-gray-900 mb-2">From Template</h3>
                  <p className="text-[14px] text-gray-500 leading-relaxed mb-4">Select a pre-approved template from the library with predefined pricing and services.</p>
                  <div className="flex items-center text-[13px] font-bold text-emerald-600">Browse Templates <ChevronRight className="w-4 h-4 ml-1" /></div>
                </div>
              </div>

              <div 
                onClick={() => navigate('/quotations/drafts/search-filter')}
                className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1] hover:border-blue-300 transition-all cursor-pointer group flex items-start gap-4"
              >
                <div className="w-14 h-14 rounded-[16px] bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors">
                  <Copy className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[18px] font-bold text-gray-900 mb-2">Duplicate Previous Quote</h3>
                  <p className="text-[14px] text-gray-500 leading-relaxed mb-4">Search your quotation history and clone an existing quote to use as a starting point.</p>
                  <div className="flex items-center text-[13px] font-bold text-blue-600">Search Quotes <ChevronRight className="w-4 h-4 ml-1" /></div>
                </div>
              </div>

              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1] hover:border-purple-300 transition-all cursor-pointer group flex items-start gap-4">
                <div className="w-14 h-14 rounded-[16px] bg-purple-50 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-600 transition-colors">
                  <UploadCloud className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[18px] font-bold text-gray-900 mb-2">Import Data</h3>
                  <p className="text-[14px] text-gray-500 leading-relaxed mb-4">Upload an Excel or CSV file containing line items and pricing data to auto-generate a draft.</p>
                  <div className="flex items-center text-[13px] font-bold text-purple-600">Upload File <ChevronRight className="w-4 h-4 ml-1" /></div>
                </div>
              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default NewDraftCreation;
