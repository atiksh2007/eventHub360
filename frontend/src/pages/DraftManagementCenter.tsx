import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import { 
  History, Play, Filter, MoreHorizontal, ChevronLeft, ChevronRight,
  Edit2, Copy, Edit3, Archive, Trash2, Download, Share2
} from 'lucide-react';

const DraftManagementCenter = () => {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState<any>(null);

  const drafts = [
    { id: 'Q-88124', client: 'Global Spheres Inc.', initials: 'GS', color: 'bg-indigo-100 text-indigo-700', lastEdited: 'Yesterday, 4:15 PM', step: 4, totalSteps: 8, value: '$68,200.00' },
    { id: 'Q-88129', client: 'Apex Ventures', initials: 'AV', color: 'bg-purple-100 text-purple-700', lastEdited: 'Mar 12, 10:20 AM', step: 7, totalSteps: 8, value: '$210,000.00' },
    { id: 'Q-88135', client: 'Metaform Dynamics', initials: 'MF', color: 'bg-amber-100 text-amber-700', lastEdited: 'Mar 11, 2:45 PM', step: 2, totalSteps: 8, value: '$12,400.00' },
    { id: 'Q-88142', client: 'Skyline Creative', initials: 'SC', color: 'bg-blue-100 text-blue-700', lastEdited: 'Mar 10, 09:15 AM', step: 5, totalSteps: 8, value: '$45,000.00' },
  ];

  const toggleDropdown = (id: any, e: any) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans">
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        <TopHeader />
        
        <main className="flex-1 overflow-y-auto p-8 pb-32" onClick={() => setActiveDropdown(null)}>
          <div className="max-w-[1200px] mx-auto space-y-8">
            
            {/* Resume Most Recent Card */}
            <div className="bg-white rounded-[24px] shadow-sm border border-[#ECECF1] overflow-hidden flex flex-col md:flex-row relative">
              <div className="p-8 md:w-2/3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-red-600 font-bold text-[12px] tracking-widest uppercase mb-4">
                    <History className="w-4 h-4" /> Resume Most Recent
                  </div>
                  <h2 
                    className="text-[32px] font-bold text-gray-900 leading-tight mb-8 cursor-pointer hover:text-red-600 transition-colors"
                    onClick={() => navigate('/quotations/drafts/details')}
                  >
                    Annual Tech Summit 2024
                  </h2>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    <div>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Client</p>
                      <p 
                        className="text-[14px] font-bold text-gray-900 cursor-pointer hover:text-red-600"
                        onClick={() => navigate('/quotations/drafts/details')}
                      >
                        Lumina<br/>Innovations
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Est. Value</p>
                      <p className="text-[16px] font-bold text-gray-900">$142,500.00</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Progress</p>
                      <div 
                        className="cursor-pointer group"
                        onClick={() => navigate('/quotations/drafts/continue')}
                      >
                        <p className="text-[14px] font-bold text-gray-900 group-hover:text-red-600 mb-1.5">Step 6 of 8</p>
                        <div className="h-1.5 w-16 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-red-600 rounded-full w-[75%]"></div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Last Edited</p>
                      <p className="text-[14px] font-bold text-gray-900">2 hours ago</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => navigate('/quotations/drafts/continue')}
                  className="w-max px-8 py-3.5 bg-gradient-to-r from-red-700 to-orange-400 text-white rounded-full font-bold text-[15px] shadow-[0_4px_14px_rgba(220,38,38,0.3)] hover:shadow-[0_6px_20px_rgba(220,38,38,0.4)] transition-all flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" /> Continue Editing
                </button>
              </div>
              
              <div className="hidden md:block w-1/3 bg-gray-900 relative">
                <img 
                  src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Event Venue"
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent w-32 left-0 z-10"></div>
              </div>
            </div>

            {/* List Section Header */}
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-[24px] font-bold text-gray-900">Your Drafts</h2>
                <p className="text-[14px] text-gray-500 mt-1">Showing 8 incomplete quotations requiring your attention.</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate('/quotations/drafts/search-filter')}
                  className="px-4 py-2 bg-white border border-[#ECECF1] text-gray-700 rounded-full font-bold text-[13px] hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" /> Sort by
                </button>
              </div>
            </div>

            {/* Drafts Table */}
            <div className="bg-white rounded-[24px] shadow-sm border border-[#ECECF1] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#F8F9FC]">
                    <tr>
                      <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-widest w-[120px]">Quote #</th>
                      <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-widest">Client</th>
                      <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-widest">Last Edited</th>
                      <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-widest w-[200px]">Progress</th>
                      <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-widest">Est. Value</th>
                      <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-widest text-center w-[100px]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {drafts.map((draft: any) => (
                      <tr 
                        key={draft.id} 
                        className="border-b border-[#ECECF1] hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => navigate('/quotations/drafts/details')}
                      >
                        <td className="py-4 px-6">
                          <span className="text-[14px] font-bold text-gray-900">{draft.id}</span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold ${draft.color}`}>
                              {draft.initials}
                            </div>
                            <span className="text-[14px] font-semibold text-gray-900">{draft.client}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-[13px] text-gray-600">{draft.lastEdited}</span>
                        </td>
                        <td className="py-4 px-6">
                          <div 
                            className="group"
                            onClick={(e) => { e.stopPropagation(); navigate('/quotations/drafts/continue'); }}
                          >
                            <p className="text-[13px] font-bold text-gray-900 mb-1.5 group-hover:text-red-600 transition-colors">Step {draft.step} of {draft.totalSteps}</p>
                            <div className="h-1.5 w-full max-w-[120px] bg-gray-200 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${draft.step > 4 ? 'bg-emerald-500' : draft.step < 3 ? 'bg-red-600' : 'bg-orange-400'}`} style={{ width: `${(draft.step / draft.totalSteps) * 100}%` }}></div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-[14px] font-bold text-gray-900">{draft.value}</span>
                        </td>
                        <td className="py-4 px-6 text-center relative">
                          <button 
                            onClick={(e) => toggleDropdown(draft.id, e)}
                            className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                          >
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                          
                          {/* Actions Dropdown */}
                          {activeDropdown === draft.id && (
                            <div className="absolute right-8 top-10 w-[200px] bg-white rounded-[16px] shadow-lg border border-[#ECECF1] py-2 z-10 animate-in fade-in zoom-in-95 duration-200">
                              <button 
                                onClick={(e) => { e.stopPropagation(); navigate('/quotations/drafts/continue'); }}
                                className="w-full flex items-center px-4 py-2 text-[13px] font-bold text-gray-700 hover:bg-gray-50"
                              >
                                <Edit2 className="w-4 h-4 mr-3 text-gray-400" /> Continue Editing
                              </button>
                              <button 
                                onClick={(e) => { e.stopPropagation(); navigate('/quotations/drafts/duplicate'); }}
                                className="w-full flex items-center px-4 py-2 text-[13px] font-bold text-gray-700 hover:bg-gray-50"
                              >
                                <Copy className="w-4 h-4 mr-3 text-gray-400" /> Duplicate Draft
                              </button>
                              <button 
                                onClick={(e) => { e.stopPropagation(); navigate('/quotations/drafts/export'); }}
                                className="w-full flex items-center px-4 py-2 text-[13px] font-bold text-gray-700 hover:bg-gray-50"
                              >
                                <Download className="w-4 h-4 mr-3 text-gray-400" /> Export Draft
                              </button>
                              <div className="h-px bg-[#ECECF1] my-1"></div>
                              <button 
                                onClick={(e) => { e.stopPropagation(); navigate('/quotations/drafts/collaboration'); }}
                                className="w-full flex items-center px-4 py-2 text-[13px] font-bold text-gray-700 hover:bg-gray-50"
                              >
                                <Share2 className="w-4 h-4 mr-3 text-gray-400" /> Share & Collaborate
                              </button>
                              <div className="h-px bg-[#ECECF1] my-1"></div>
                              <button 
                                onClick={(e) => { e.stopPropagation(); navigate('/quotations/drafts/archive'); }}
                                className="w-full flex items-center px-4 py-2 text-[13px] font-bold text-gray-700 hover:bg-gray-50"
                              >
                                <Archive className="w-4 h-4 mr-3 text-gray-400" /> Archive
                              </button>
                              <button 
                                onClick={(e) => { e.stopPropagation(); /* Show delete modal */ }}
                                className="w-full flex items-center px-4 py-2 text-[13px] font-bold text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4 mr-3 text-red-400" /> Delete Draft
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="p-4 border-t border-[#ECECF1] flex items-center justify-between text-[13px]">
                <span className="text-gray-500 font-medium">Showing 1 to 4 of 8 entries</span>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-50"><ChevronLeft className="w-4 h-4" /></button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-full bg-red-600 text-white font-bold">1</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-700 font-bold hover:bg-gray-50">2</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-50"><ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default DraftManagementCenter;
