import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import TopHeader from '../../components/TopHeader';
import { 
  ArrowLeft, GitCommit, Copy, RotateCcw, FileText, Check, ChevronRight
} from 'lucide-react';

const DraftVersionHistory = () => {
  const navigate = useNavigate();

  const versions = [
    { id: 'v1.4', time: '2 hours ago', user: 'Alex Sterling', change: 'Updated pricing for main auditorium' },
    { id: 'v1.3', time: 'Yesterday, 14:00', user: 'Alex Sterling', change: 'Added VIP catering package' },
    { id: 'v1.2', time: 'Yesterday, 09:30', user: 'Sarah Jenkins', change: 'Modified client contact details' },
    { id: 'v1.1', time: 'Aug 13, 11:20', user: 'System', change: 'Auto-saved draft' },
    { id: 'v1.0', time: 'Aug 12, 16:45', user: 'Sarah Jenkins', change: 'Draft created from Template v2.1' },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans">
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        <TopHeader />
        
        <main className="flex-1 overflow-y-auto p-8 pb-32">
          <div className="max-w-[1000px] mx-auto space-y-6">
            
            <div className="flex items-center gap-4 mb-8">
              <button 
                onClick={() => navigate('/quotations/drafts')}
                className="w-10 h-10 bg-white border border-[#ECECF1] rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Version History</h1>
                <p className="text-[15px] text-gray-500 mt-1">Track changes, compare versions, and restore previous states for Q-88124.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              <div className="lg:col-span-2 space-y-4 relative before:absolute before:inset-y-0 before:left-[35px] before:w-px before:bg-gray-200">
                {versions.map((v: any, i: any) => (
                  <div key={v.id} className="relative pl-20">
                    <div className={`absolute left-[28px] top-6 w-[15px] h-[15px] rounded-full border-2 border-white ${i === 0 ? 'bg-emerald-500' : 'bg-gray-400'}`}></div>
                    
                    <div className={`bg-white rounded-[20px] p-6 shadow-sm border transition-colors ${i === 0 ? 'border-emerald-200' : 'border-[#ECECF1] hover:border-red-200'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-[16px] font-bold text-gray-900 flex items-center gap-2">
                          {v.id}
                          {i === 0 && <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[11px] uppercase tracking-widest rounded-md">Current</span>}
                        </h3>
                        <span className="text-[12px] text-gray-500">{v.time}</span>
                      </div>
                      <p className="text-[14px] text-gray-700 mb-4">{v.change}</p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-[#ECECF1]">
                        <p className="text-[12px] text-gray-500 font-medium">By {v.user}</p>
                        
                        {i !== 0 && (
                          <div className="flex gap-2">
                            <button className="px-3 py-1.5 border border-[#ECECF1] text-gray-600 rounded-lg text-[12px] font-bold hover:bg-gray-50 transition-colors flex items-center gap-1.5">
                              <Copy className="w-3.5 h-3.5" /> Duplicate
                            </button>
                            <button className="px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg text-[12px] font-bold hover:bg-orange-100 transition-colors flex items-center gap-1.5">
                              <RotateCcw className="w-3.5 h-3.5" /> Restore
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[24px] p-6 shadow-md text-white sticky top-24">
                  <div className="flex items-center gap-2 mb-6 text-gray-300">
                    <FileText className="w-5 h-5" />
                    <h3 className="text-[14px] font-bold uppercase tracking-wider">Version Comparison</h3>
                  </div>
                  <p className="text-[13px] text-gray-400 mb-6">Select two versions to compare their line items, pricing, and configurations side-by-side.</p>
                  
                  <div className="space-y-4">
                    <button className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-[14px] font-bold text-white hover:bg-white/20 transition-colors text-left flex justify-between items-center">
                      Select Version A <ChevronRight className="w-4 h-4" />
                    </button>
                    <button className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-[14px] font-bold text-white hover:bg-white/20 transition-colors text-left flex justify-between items-center">
                      Select Version B <ChevronRight className="w-4 h-4" />
                    </button>
                    <button className="w-full px-4 py-3 bg-red-600 text-white rounded-xl text-[14px] font-bold hover:bg-red-700 transition-colors mt-4 opacity-50 cursor-not-allowed">
                      Compare Versions
                    </button>
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

export default DraftVersionHistory;
