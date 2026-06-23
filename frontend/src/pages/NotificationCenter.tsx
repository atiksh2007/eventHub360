import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import { 
  Bell, CheckCircle2, MessageSquare, AlertCircle, 
  ExternalLink, Check, FileEdit, CheckSquare
} from 'lucide-react';
import { api } from '../services/api';

const NotificationCenter = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await api.getNotifications();
      setNotifications(data);
    } catch (e) {
      console.error('Failed to fetch notifications', e);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await api.markAllNotificationsRead();
      setNotifications(notifications.map(n => ({ ...n, is_read: true })));
    } catch (e) {
      console.error('Failed to mark as read', e);
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'approval': return CheckSquare;
      case 'mention': return MessageSquare;
      case 'client': return ExternalLink;
      default: return AlertCircle;
    }
  };

  const getColorForType = (type: string) => {
    switch (type) {
      case 'approval': return 'bg-emerald-50 text-emerald-600';
      case 'mention': return 'bg-blue-50 text-blue-600';
      case 'client': return 'bg-purple-50 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans">
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        <TopHeader />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[800px] mx-auto space-y-6">
            
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 relative">
                  <Bell className="w-6 h-6" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div>
                  <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Notifications</h1>
                  <p className="text-[15px] text-gray-500 mt-1">Stay updated on approvals, mentions, and client activity.</p>
                </div>
              </div>
              <button onClick={handleMarkAllRead} className="px-4 py-2 bg-white border border-[#ECECF1] text-gray-700 rounded-full font-bold text-[13px] hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
                <Check className="w-4 h-4" /> Mark All Read
              </button>
            </div>

            <div className="bg-white rounded-[24px] shadow-sm border border-[#ECECF1] overflow-hidden">
              <div className="p-4 border-b border-[#ECECF1] flex gap-2 overflow-x-auto scrollbar-hide bg-[#F8F9FC]">
                <button className="px-4 py-1.5 bg-white border border-[#ECECF1] text-gray-900 font-bold text-[13px] rounded-full shadow-sm">All</button>
                <button className="px-4 py-1.5 text-gray-500 hover:text-gray-900 font-bold text-[13px] rounded-full">Unread ({unreadCount})</button>
              </div>

              <div className="divide-y divide-[#ECECF1]">
                {loading ? (
                  <div className="p-8 text-center text-gray-500 font-medium">Loading notifications...</div>
                ) : notifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-500 font-medium">You're all caught up! No notifications.</div>
                ) : (
                  notifications.map((notif: any) => {
                    const Icon = getIconForType(notif.type);
                    return (
                      <div key={notif.notification_id} className={`p-6 flex gap-4 transition-colors hover:bg-gray-50 cursor-pointer ${!notif.is_read ? 'bg-[#F8F5FF]' : 'bg-white'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${getColorForType(notif.type)}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className={`text-[15px] ${!notif.is_read ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'}`}>{notif.title}</h4>
                            <span className="text-[12px] font-semibold text-gray-400">
                              {new Date(notif.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <p className={`text-[14px] ${!notif.is_read ? 'text-gray-700' : 'text-gray-500'}`}>{notif.description}</p>
                          
                          {notif.type === 'approval' && notif.reference_id && (
                            <div className="flex gap-2 mt-3">
                              <button 
                                onClick={(e) => { e.stopPropagation(); navigate(`/approvals`); }}
                                className="px-4 py-1.5 bg-emerald-600 text-white rounded-lg text-[12px] font-bold hover:bg-emerald-700"
                              >
                                Review Quote #{notif.reference_id}
                              </button>
                            </div>
                          )}
                        </div>
                        {!notif.is_read && <div className="w-2.5 h-2.5 rounded-full bg-red-600 mt-2 shrink-0"></div>}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default NotificationCenter;
