import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import TopHeader from '../../components/TopHeader';
import { 
  ArrowLeft, Users, Search, Check, AlertCircle
} from 'lucide-react';

const DraftAssignmentCenter = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(1);

  const teamMembers = [
    { id: 1, name: 'Alex Sterling', role: 'Senior Sales Exec', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', activeDrafts: 3 },
    { id: 2, name: 'Sarah Jenkins', role: 'Sales Manager', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', activeDrafts: 5 },
    { id: 3, name: 'Michael Chang', role: 'Account Exec', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', activeDrafts: 1 },
    { id: 4, name: 'Emma Watson', role: 'Sales Coordinator', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', activeDrafts: 8 },
  ];

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
                <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Assign Draft Owner</h1>
                <p className="text-[15px] text-gray-500 mt-1">Transfer ownership of draft Q-88124 to another team member.</p>
              </div>
            </div>

            <div className="bg-white rounded-[24px] shadow-sm border border-[#ECECF1] p-8">
              
              <div className="flex items-center gap-4 p-4 bg-[#F8F9FC] rounded-2xl border border-[#ECECF1] mb-8">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center font-bold text-[14px]">LI</div>
                <div>
                  <h3 className="text-[16px] font-bold text-gray-900">Annual Tech Summit 2024</h3>
                  <p className="text-[13px] text-gray-500">Lumina Innovations • Est. Value $142,500</p>
                </div>
              </div>

              <div className="mb-6 relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search team members by name or role..." 
                  className="w-full pl-10 pr-4 py-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] focus:outline-none focus:border-red-300" 
                />
              </div>

              <div className="space-y-3 mb-8">
                {teamMembers.map((user: any) => (
                  <div 
                    key={user.id}
                    onClick={() => setSelectedUser(user.id)}
                    className={`flex items-center justify-between p-4 rounded-[16px] border cursor-pointer transition-all ${selectedUser === user.id ? 'bg-red-50 border-red-200' : 'bg-white border-[#ECECF1] hover:border-red-200'}`}
                  >
                    <div className="flex items-center gap-4">
                      <img src={user.avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
                      <div>
                        <p className="text-[15px] font-bold text-gray-900">{user.name}</p>
                        <p className="text-[13px] text-gray-500">{user.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Workload</p>
                        <p className={`text-[13px] font-bold ${user.activeDrafts > 5 ? 'text-orange-600' : 'text-gray-900'}`}>{user.activeDrafts} Active Drafts</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${selectedUser === user.id ? 'bg-red-600 border-red-600 text-white' : 'border-gray-300'}`}>
                        {selectedUser === user.id && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedUser === 4 && (
                <div className="mb-8 p-4 bg-orange-50 border border-orange-200 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[14px] font-bold text-gray-900">High Workload Warning</h4>
                    <p className="text-[13px] text-gray-700 mt-1">Emma Watson currently has 8 active drafts. Reassigning this draft may exceed recommended capacity.</p>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-6 border-t border-[#ECECF1]">
                <button 
                  onClick={() => navigate('/quotations/drafts')}
                  className="px-6 py-2.5 bg-white border border-[#ECECF1] text-gray-700 rounded-full font-bold text-[14px] hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => navigate('/quotations/drafts')}
                  className="px-6 py-2.5 bg-gray-900 text-white rounded-full font-bold text-[14px] hover:bg-gray-800 transition-colors"
                >
                  Confirm Reassignment
                </button>
              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default DraftAssignmentCenter;
