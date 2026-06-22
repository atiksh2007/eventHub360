import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import TopHeader from '../../components/TopHeader';
import { 
  ArrowLeft, Activity, AlertCircle, CheckCircle2, ChevronRight, XCircle
} from 'lucide-react';

const DraftApprovalReadiness = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans">
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        <TopHeader />
        
        <main className="flex-1 overflow-y-auto p-8 pb-32">
          <div className="max-w-[800px] mx-auto space-y-6">
            
            <div className="flex items-center gap-4 mb-8">
              <button 
                onClick={() => navigate('/quotations/drafts/details')}
                className="w-10 h-10 bg-white border border-[#ECECF1] rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-[28px] font-bold text-gray-900 tracking-tight flex items-center gap-3">
                  Approval Readiness Report
                </h1>
                <p className="text-[15px] text-gray-500 mt-1">Pre-submission validation checks for Q-88124.</p>
              </div>
            </div>

            <div className="bg-white rounded-[24px] shadow-sm border border-[#ECECF1] overflow-hidden">
              <div className="p-8 border-b border-[#ECECF1] bg-gradient-to-r from-orange-500 to-red-600 text-white flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <Activity className="w-8 h-8" />
                </div>
                <h2 className="text-[24px] font-bold mb-1">Attention Required</h2>
                <p className="text-[15px] text-white/80 max-w-md">This draft has 2 missing fields and 1 policy warning. It cannot be submitted for approval until these are resolved.</p>
              </div>

              <div className="p-8 space-y-8">
                
                {/* Missing Fields */}
                <div>
                  <h3 className="text-[16px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-500" /> Critical Missing Fields
                  </h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-[#F8F9FC] border border-red-200 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="text-[14px] font-bold text-gray-900">Event Start Date</p>
                        <p className="text-[13px] text-gray-500">Step 2: Event Details</p>
                      </div>
                      <button 
                        onClick={() => navigate('/quotations/drafts/continue')}
                        className="text-[13px] font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
                      >
                        Fix Now <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="p-4 bg-[#F8F9FC] border border-red-200 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="text-[14px] font-bold text-gray-900">Primary Contact Email</p>
                        <p className="text-[13px] text-gray-500">Step 1: Client Information</p>
                      </div>
                      <button 
                        onClick={() => navigate('/quotations/drafts/continue')}
                        className="text-[13px] font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
                      >
                        Fix Now <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Validation Checks */}
                <div>
                  <h3 className="text-[16px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-500" /> Policy & Margin Warnings
                  </h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[14px] font-bold text-gray-900">Low Margin on Catering Services</p>
                        <p className="text-[13px] text-gray-700 mt-1">The applied discount brings the catering margin below the 20% minimum threshold. This will trigger a Level 2 Director Approval requirement.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Passed Checks */}
                <div>
                  <h3 className="text-[16px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Passed Validation
                  </h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <span className="text-[14px] font-medium text-gray-700">Venue availability confirmed</span>
                    </div>
                    <div className="p-4 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <span className="text-[14px] font-medium text-gray-700">Minimum total value threshold met</span>
                    </div>
                    <div className="p-4 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <span className="text-[14px] font-medium text-gray-700">Tax configuration applied correctly</span>
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

export default DraftApprovalReadiness;
