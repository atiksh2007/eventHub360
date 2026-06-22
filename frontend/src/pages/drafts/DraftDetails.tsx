import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import TopHeader from '../../components/TopHeader';
import { 
  ArrowLeft, FileEdit, Users, Calendar, Clock, MessageSquare, 
  Play, Download, Share2, Activity, GitCommit, Search, DollarSign
} from 'lucide-react';

const DraftDetails = () => {
  const navigate = useNavigate();

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
                  <h1 className="text-[28px] font-bold text-gray-900 tracking-tight flex items-center gap-3">
                    Annual Tech Summit 2024
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-[11px] font-bold uppercase tracking-widest">Draft</span>
                  </h1>
                  <p className="text-[15px] text-gray-500 mt-1">Quote # Q-88124 • Client: Lumina Innovations</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate('/quotations/drafts/export')}
                  className="p-2.5 bg-white border border-[#ECECF1] text-gray-600 rounded-full hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => navigate('/quotations/drafts/collaboration')}
                  className="p-2.5 bg-white border border-[#ECECF1] text-gray-600 rounded-full hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => navigate('/quotations/drafts/continue')}
                  className="px-6 py-2.5 bg-gradient-to-r from-red-700 to-orange-400 text-white rounded-full font-bold text-[14px] shadow-sm hover:shadow-md transition-all flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" /> Continue Editing
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column: Metadata & Details */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-[20px] shadow-sm border border-[#ECECF1]">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Est. Value</p>
                    <p className="text-[18px] font-bold text-gray-900">$142,500</p>
                  </div>
                  <div className="bg-white p-5 rounded-[20px] shadow-sm border border-[#ECECF1]">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                      <FileEdit className="w-4 h-4" />
                    </div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Progress</p>
                    <p className="text-[18px] font-bold text-gray-900">Step 6 of 8</p>
                  </div>
                  <div className="bg-white p-5 rounded-[20px] shadow-sm border border-[#ECECF1]">
                    <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
                      <Clock className="w-4 h-4" />
                    </div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Last Edited</p>
                    <p className="text-[18px] font-bold text-gray-900">2h ago</p>
                  </div>
                  <div className="bg-white p-5 rounded-[20px] shadow-sm border border-[#ECECF1]">
                    <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Event Date</p>
                    <p className="text-[18px] font-bold text-gray-900">Oct 14</p>
                  </div>
                </div>

                {/* Draft Overview Card */}
                <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1]">
                  <h2 className="text-[18px] font-bold text-gray-900 mb-6">Draft Overview</h2>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-[12px] font-bold text-gray-500 uppercase tracking-widest mb-1">Client</p>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[12px] font-bold">LI</div>
                          <span className="text-[14px] font-bold text-gray-900">Lumina Innovations</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-[12px] font-bold text-gray-500 uppercase tracking-widest mb-1">Assigned Owner</p>
                        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/quotations/drafts/assignment')}>
                          <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" className="w-8 h-8 rounded-full object-cover" alt="" />
                          <span className="text-[14px] font-bold text-gray-900 group-hover:text-red-600 transition-colors">Alex Sterling</span>
                          <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full ml-auto group-hover:bg-blue-100 transition-colors">Change</span>
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-[#ECECF1] w-full"></div>

                    <div>
                      <p className="text-[12px] font-bold text-gray-500 uppercase tracking-widest mb-2">Event Description</p>
                      <p className="text-[14px] text-gray-700 leading-relaxed">
                        Annual technology summit gathering industry leaders for keynotes and networking. Requires main auditorium, 4 breakout rooms, and VIP catering services for 500 attendees over 2 days.
                      </p>
                    </div>

                    <div className="h-px bg-[#ECECF1] w-full"></div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-[12px] font-bold text-gray-500 uppercase tracking-widest mb-1">Created By</p>
                        <p className="text-[14px] font-semibold text-gray-900">Sarah Jenkins on Aug 12, 2024</p>
                      </div>
                      <div>
                        <p className="text-[12px] font-bold text-gray-500 uppercase tracking-widest mb-1">Template Used</p>
                        <p className="text-[14px] font-semibold text-gray-900 cursor-pointer hover:text-red-600">Enterprise Tech Conf v2.1</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Collaboration & Comments */}
                <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1]">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[18px] font-bold text-gray-900 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-gray-400" /> Team Notes & Comments
                    </h2>
                    <button 
                      onClick={() => navigate('/quotations/drafts/collaboration')}
                      className="text-[13px] font-bold text-gray-500 hover:text-gray-900"
                    >
                      View All
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" className="w-8 h-8 rounded-full object-cover" alt="" />
                      <div className="flex-1 bg-[#F8F9FC] rounded-2xl rounded-tl-none p-4 border border-[#ECECF1]">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[13px] font-bold text-gray-900">Sarah Jenkins</span>
                          <span className="text-[11px] text-gray-500">2 hours ago</span>
                        </div>
                        <p className="text-[13px] text-gray-700">I've added the AV equipment. We just need to finalize the catering numbers.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 relative">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <Users className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="flex-1 relative">
                        <input type="text" placeholder="Add a note or @mention someone..." className="w-full px-4 py-3 bg-white border border-[#ECECF1] rounded-full text-[13px] focus:outline-none focus:border-red-300 shadow-sm" />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Timeline & Validation */}
              <div className="space-y-6">
                
                {/* Readiness Check */}
                <div 
                  className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1] cursor-pointer hover:border-red-200 transition-colors"
                  onClick={() => navigate('/quotations/drafts/approval-readiness')}
                >
                  <h2 className="text-[16px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-orange-500" /> Approval Readiness
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] text-gray-600">Missing Fields</span>
                      <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-[11px] font-bold">2 Required</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] text-gray-600">Margin Validation</span>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[11px] font-bold">Passed</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] text-gray-600">Est. Approval Route</span>
                      <span className="text-[13px] font-bold text-gray-900">Director Review</span>
                    </div>
                  </div>
                </div>

                {/* Activity Timeline */}
                <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1]">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[16px] font-bold text-gray-900 flex items-center gap-2">
                      <GitCommit className="w-4 h-4 text-gray-400" /> Activity Timeline
                    </h2>
                    <button 
                      onClick={() => navigate('/quotations/drafts/history')}
                      className="text-[12px] font-bold text-red-600 hover:text-red-700"
                    >
                      History
                    </button>
                  </div>
                  
                  <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-[15px] before:w-px before:bg-gray-200">
                    <div className="relative pl-10">
                      <div className="absolute left-[8px] top-1.5 w-[15px] h-[15px] bg-emerald-500 border-2 border-white rounded-full"></div>
                      <p className="text-[13px] font-bold text-gray-900">Updated Pricing config</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">Alex Sterling • 2 hrs ago</p>
                    </div>
                    <div className="relative pl-10">
                      <div className="absolute left-[8px] top-1.5 w-[15px] h-[15px] bg-blue-500 border-2 border-white rounded-full"></div>
                      <p className="text-[13px] font-bold text-gray-900">Assigned to Alex Sterling</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">System • 5 hrs ago</p>
                    </div>
                    <div className="relative pl-10">
                      <div className="absolute left-[8px] top-1.5 w-[15px] h-[15px] bg-gray-400 border-2 border-white rounded-full"></div>
                      <p className="text-[13px] font-bold text-gray-900">Draft Created</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">Sarah Jenkins • Aug 12</p>
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

export default DraftDetails;
