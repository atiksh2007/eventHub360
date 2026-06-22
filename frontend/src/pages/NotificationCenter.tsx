import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import { 
  Bell, CheckCircle2, MessageSquare, AlertCircle, 
  ExternalLink, Check, FileEdit, CheckSquare
} from 'lucide-react';

const NotificationCenter = () => {
  const navigate = useNavigate();

  const notifications = [
    { id: 1, title: 'Approval Request', desc: 'Sarah Jenkins requested approval for "TechCorp Gala" quote.', time: '10 mins ago', type: 'approval', icon: CheckSquare, color: 'bg-emerald-50 text-emerald-600', unread: true },
    { id: 2, title: 'Mentioned You', desc: 'Alex Chen mentioned you in "Starlight Hotels" draft.', time: '1 hour ago', type: 'mention', icon: MessageSquare, color: 'bg-blue-50 text-blue-600', unread: true },
    { id: 3, title: 'Client Activity', desc: 'Wayne Enterprises viewed your proposal 3 times today.', time: '2 hours ago', type: 'client', icon: ExternalLink, color: 'bg-purple-50 text-purple-600', unread: false },
    { id: 4, title: 'System Alert', desc: 'Template "Luxury Weddings v2" has been archived.', time: '1 day ago', type: 'system', icon: AlertCircle, color: 'bg-gray-100 text-gray-600', unread: false }
  ];

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans">
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        <TopHeader />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[800px] mx-auto space-y-6">
            
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                  <Bell className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Notifications</h1>
                  <p className="text-[15px] text-gray-500 mt-1">Stay updated on approvals, mentions, and client activity.</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-white border border-[#ECECF1] text-gray-700 rounded-full font-bold text-[13px] hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
                <Check className="w-4 h-4" /> Mark All Read
              </button>
            </div>

            <div className="bg-white rounded-[24px] shadow-sm border border-[#ECECF1] overflow-hidden">
              <div className="p-4 border-b border-[#ECECF1] flex gap-2 overflow-x-auto scrollbar-hide bg-[#F8F9FC]">
                <button className="px-4 py-1.5 bg-white border border-[#ECECF1] text-gray-900 font-bold text-[13px] rounded-full shadow-sm">All</button>
                <button className="px-4 py-1.5 text-gray-500 hover:text-gray-900 font-bold text-[13px] rounded-full">Unread (2)</button>
                <button className="px-4 py-1.5 text-gray-500 hover:text-gray-900 font-bold text-[13px] rounded-full">Approvals</button>
                <button className="px-4 py-1.5 text-gray-500 hover:text-gray-900 font-bold text-[13px] rounded-full">Mentions</button>
              </div>

              <div className="divide-y divide-[#ECECF1]">
                {notifications.map((notif: any) => (
                  <div key={notif.id} className={`p-6 flex gap-4 transition-colors hover:bg-gray-50 cursor-pointer ${notif.unread ? 'bg-[#F8F5FF]' : 'bg-white'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notif.color}`}>
                      <notif.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`text-[15px] ${notif.unread ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'}`}>{notif.title}</h4>
                        <span className="text-[12px] font-semibold text-gray-400">{notif.time}</span>
                      </div>
                      <p className={`text-[14px] ${notif.unread ? 'text-gray-700' : 'text-gray-500'}`}>{notif.desc}</p>
                      
                      {notif.type === 'approval' && (
                        <div className="flex gap-2 mt-3">
                          <button className="px-4 py-1.5 bg-emerald-600 text-white rounded-lg text-[12px] font-bold hover:bg-emerald-700">Review</button>
                          <button className="px-4 py-1.5 bg-white border border-[#ECECF1] text-gray-700 rounded-lg text-[12px] font-bold hover:bg-gray-50">Dismiss</button>
                        </div>
                      )}
                    </div>
                    {notif.unread && <div className="w-2.5 h-2.5 rounded-full bg-red-600 mt-2 shrink-0"></div>}
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

export default NotificationCenter;
