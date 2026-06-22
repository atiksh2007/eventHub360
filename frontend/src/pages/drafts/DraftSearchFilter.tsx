import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import TopHeader from '../../components/TopHeader';
import { 
  ArrowLeft, Search, Filter, Calendar, Users, Briefcase, FileText
} from 'lucide-react';

const DraftSearchFilter = () => {
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
                onClick={() => navigate('/quotations/drafts')}
                className="w-10 h-10 bg-white border border-[#ECECF1] rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Search & Filter Drafts</h1>
                <p className="text-[15px] text-gray-500 mt-1">Find specific draft quotations using advanced parameters.</p>
              </div>
            </div>

            <div className="bg-white rounded-[24px] shadow-sm border border-[#ECECF1] overflow-hidden">
              <div className="p-8 border-b border-[#ECECF1] bg-[#F8F9FC]">
                <div className="relative">
                  <Search className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="Search by quote number, client name, or event details..." 
                    className="w-full pl-14 pr-4 py-4 bg-white border border-[#ECECF1] rounded-[16px] text-[16px] font-medium focus:outline-none focus:border-red-300 shadow-sm"
                    autoFocus
                  />
                </div>
              </div>

              <div className="p-8">
                <h2 className="text-[16px] font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-400" /> Advanced Filters
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  
                  {/* Status / Progress Filter */}
                  <div className="space-y-3">
                    <label className="text-[12px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5" /> Progress Stage
                    </label>
                    <select className="w-full p-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] text-gray-900 focus:outline-none focus:border-red-300">
                      <option>Any Stage</option>
                      <option>Initial Info (Steps 1-2)</option>
                      <option>Configuration (Steps 3-5)</option>
                      <option>Ready for Review (Step 6+)</option>
                    </select>
                  </div>

                  {/* Owner Filter */}
                  <div className="space-y-3">
                    <label className="text-[12px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                      <Users className="w-3.5 h-3.5" /> Assigned Owner
                    </label>
                    <select className="w-full p-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] text-gray-900 focus:outline-none focus:border-red-300">
                      <option>Anyone</option>
                      <option>Me (Alex Sterling)</option>
                      <option>Sarah Jenkins</option>
                      <option>Emma Watson</option>
                    </select>
                  </div>

                  {/* Client Filter */}
                  <div className="space-y-3">
                    <label className="text-[12px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5" /> Client Account
                    </label>
                    <select className="w-full p-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] text-gray-900 focus:outline-none focus:border-red-300">
                      <option>All Clients</option>
                      <option>Lumina Innovations</option>
                      <option>Global Spheres Inc.</option>
                      <option>Apex Ventures</option>
                    </select>
                  </div>

                  {/* Date Range Filter */}
                  <div className="space-y-3">
                    <label className="text-[12px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" /> Last Modified Date
                    </label>
                    <select className="w-full p-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] text-gray-900 focus:outline-none focus:border-red-300">
                      <option>Any Time</option>
                      <option>Today</option>
                      <option>Past 7 Days</option>
                      <option>Past 30 Days</option>
                      <option>Older than 30 Days</option>
                    </select>
                  </div>

                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-[#ECECF1]">
                  <button 
                    className="px-6 py-2.5 bg-white border border-[#ECECF1] text-gray-700 rounded-full font-bold text-[14px] hover:bg-gray-50 transition-colors"
                  >
                    Clear All
                  </button>
                  <button 
                    onClick={() => navigate('/quotations/drafts')}
                    className="px-8 py-2.5 bg-red-600 text-white rounded-full font-bold text-[14px] hover:bg-red-700 transition-colors shadow-sm"
                  >
                    Apply Filters
                  </button>
                </div>

              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default DraftSearchFilter;
