import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import { 
  Activity, CheckCircle2, Send, FileEdit, User, Search, Filter
} from 'lucide-react';

const ActivityTimeline = () => {
  const navigate = useNavigate();

  const activities = [
    { id: 1, action: 'Approved Quotation', details: 'QT-2023-145 for TechCorp Gala', time: '10:45 AM', user: 'Alexander Pierce', icon: CheckCircle2, color: 'bg-emerald-50 text-emerald-600' },
    { id: 2, action: 'Sent Proposal', details: 'Sent v2.0 to Sarah Jenkins', time: 'Yesterday, 4:20 PM', user: 'Alex Chen', icon: Send, color: 'bg-blue-50 text-blue-600' },
    { id: 3, action: 'Edited Quotation', details: 'Updated pricing tiers on QT-2023-148', time: 'Yesterday, 1:15 PM', user: 'Michael Chang', icon: FileEdit, color: 'bg-orange-50 text-orange-600' },
    { id: 4, action: 'Created New Version', details: 'v2.0 created for Starlight Hotels', time: 'Oct 23, 9:00 AM', user: 'Alex Chen', icon: Activity, color: 'bg-purple-50 text-purple-600' },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans">
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        <TopHeader />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1000px] mx-auto space-y-6">
            
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Activity Timeline</h1>
                <p className="text-[15px] text-gray-500 mt-1">Review your recent actions and system events.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Search activity..." className="pl-9 pr-4 py-2 bg-white border border-[#ECECF1] rounded-full text-[13px] focus:outline-none focus:border-red-300 w-[200px] shadow-sm" />
                </div>
                <button className="p-2 bg-white border border-[#ECECF1] rounded-full text-gray-600 hover:bg-gray-50 shadow-sm">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-[24px] shadow-sm border border-[#ECECF1] p-8">
              <div className="relative border-l-2 border-[#ECECF1] ml-4 space-y-8">
                {activities.map((activity: any) => (
                  <div key={activity.id} className="relative pl-8">
                    <div className={`absolute -left-[17px] top-0 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center ${activity.color}`}>
                      <activity.icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-[15px] font-bold text-gray-900">
                          {activity.action} <span className="font-medium text-gray-500">• {activity.details}</span>
                        </p>
                        <span className="text-[12px] text-gray-400 font-semibold">{activity.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          <User className="w-3 h-3 text-gray-500" />
                        </div>
                        <span className="text-[12px] font-semibold text-gray-600">{activity.user}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default ActivityTimeline;
