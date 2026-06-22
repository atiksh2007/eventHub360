import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import TopHeader from '../../components/TopHeader';
import { 
  ArrowLeft, Archive, Search, Trash2, RotateCcw
} from 'lucide-react';

const DraftArchive = () => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const archivedDrafts = [
    { id: 'Q-88102', client: 'Oceanic Airlines', archivedDate: 'Aug 01, 2024', reason: 'Replaced by Q-88115', owner: 'Alex Sterling' },
    { id: 'Q-88095', client: 'Initech', archivedDate: 'Jul 28, 2024', reason: 'Event Cancelled', owner: 'Sarah Jenkins' },
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
                <h1 className="text-[28px] font-bold text-gray-900 tracking-tight flex items-center gap-3">
                  <Archive className="w-6 h-6 text-gray-400" /> Draft Archive
                </h1>
                <p className="text-[15px] text-gray-500 mt-1">View, restore, or permanently delete archived quotations.</p>
              </div>
            </div>

            <div className="bg-white rounded-[24px] shadow-sm border border-[#ECECF1] overflow-hidden">
              <div className="p-6 border-b border-[#ECECF1] flex items-center justify-between">
                <div className="relative w-full max-w-md">
                  <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="Search archived drafts..." 
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F8F9FC] border border-[#ECECF1] rounded-full text-[13px] focus:outline-none focus:border-red-300"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#F8F9FC]">
                    <tr>
                      <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-widest">Quote #</th>
                      <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-widest">Client</th>
                      <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-widest">Archived On</th>
                      <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-widest">Reason</th>
                      <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-widest text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {archivedDrafts.map((draft: any) => (
                      <tr key={draft.id} className="border-b border-[#ECECF1] hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6 text-[14px] font-bold text-gray-900">{draft.id}</td>
                        <td className="py-4 px-6 text-[14px] text-gray-700">{draft.client}</td>
                        <td className="py-4 px-6 text-[13px] text-gray-500">{draft.archivedDate}</td>
                        <td className="py-4 px-6 text-[13px] text-gray-500">{draft.reason}</td>
                        <td className="py-4 px-6 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button 
                              className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[12px] font-bold hover:bg-blue-100 transition-colors flex items-center gap-1.5"
                            >
                              <RotateCcw className="w-3.5 h-3.5" /> Restore
                            </button>
                            <button 
                              onClick={() => setShowConfirm(true)}
                              className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-[12px] font-bold hover:bg-red-100 transition-colors flex items-center gap-1.5"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {archivedDrafts.length === 0 && (
                <div className="p-12 text-center">
                  <Archive className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-[16px] font-bold text-gray-900">Archive is Empty</p>
                  <p className="text-[14px] text-gray-500 mt-1">No drafts have been archived yet.</p>
                </div>
              )}
            </div>

          </div>
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] p-8 w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-6">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-[20px] font-bold text-gray-900 mb-2">Permanently Delete Draft?</h2>
            <p className="text-[14px] text-gray-600 leading-relaxed mb-8">
              This action cannot be undone. The drafted quotation and all associated files, history, and notes will be permanently removed from the system.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 bg-white border border-[#ECECF1] text-gray-700 rounded-full font-bold text-[14px] hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 bg-red-600 text-white rounded-full font-bold text-[14px] hover:bg-red-700 transition-all shadow-sm"
              >
                Delete Forever
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default DraftArchive;
