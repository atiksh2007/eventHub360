import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import TopHeader from '../../components/TopHeader';
import { 
  ArrowLeft, Bell, Mail, MessageSquare, Smartphone, Clock, AlertTriangle
} from 'lucide-react';

const ToggleSwitch = ({ enabled, onChange  }: any) => (
  <button 
    onClick={() => onChange(!enabled)}
    className={`w-11 h-6 rounded-full transition-colors relative ${enabled ? 'bg-red-700' : 'bg-gray-200'}`}
  >
    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${enabled ? 'left-6' : 'left-1'}`} />
  </button>
);

const NotificationPreferences = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans">
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        <TopHeader />
        
        <main className="flex-1 overflow-y-auto p-8 pb-32">
          <div className="max-w-[1000px] mx-auto space-y-6">
            
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => navigate('/settings')} className="w-10 h-10 bg-white border border-[#ECECF1] rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Notification Preferences</h1>
                <p className="text-[15px] text-gray-500 mt-1">Manage communication channels, alerts, and reminder frequencies.</p>
              </div>
            </div>

            <div className="bg-white rounded-[24px] p-8 shadow-sm border border-[#ECECF1] mb-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#ECECF1]">
                <div className="w-8 h-8 rounded-[12px] bg-blue-50 flex items-center justify-center text-blue-600">
                  <Bell className="w-4 h-4" />
                </div>
                <h2 className="text-[18px] font-bold text-gray-900">Communication Channels</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 bg-[#F8F9FC] border border-[#ECECF1] rounded-[20px] flex flex-col justify-between h-[140px]">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-700">
                      <Mail className="w-5 h-5" />
                    </div>
                    <ToggleSwitch enabled={true} onChange={() => {}} />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-gray-900">Email Notifications</h4>
                    <p className="text-[12px] text-gray-500">Standard system emails</p>
                  </div>
                </div>

                <div className="p-5 bg-[#F8F9FC] border border-[#ECECF1] rounded-[20px] flex flex-col justify-between h-[140px]">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-700">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <ToggleSwitch enabled={false} onChange={() => {}} />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-gray-900">SMS Notifications</h4>
                    <p className="text-[12px] text-gray-500">Urgent text alerts</p>
                  </div>
                </div>

                <div className="p-5 bg-[#F8F9FC] border border-[#ECECF1] rounded-[20px] flex flex-col justify-between h-[140px]">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-emerald-600">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <ToggleSwitch enabled={true} onChange={() => {}} />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-gray-900">WhatsApp Integration</h4>
                    <p className="text-[12px] text-gray-500">Client updates & approvals</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Approvals & Reminders */}
              <div className="bg-white rounded-[24px] p-8 shadow-sm border border-[#ECECF1]">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#ECECF1]">
                  <div className="w-8 h-8 rounded-[12px] bg-purple-50 flex items-center justify-center text-purple-600">
                    <Clock className="w-4 h-4" />
                  </div>
                  <h2 className="text-[18px] font-bold text-gray-900">Approval Reminders</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-[14px] font-bold text-gray-900">New Approval Request</h4>
                      <p className="text-[12px] text-gray-500">Notify when assigned a quote.</p>
                    </div>
                    <ToggleSwitch enabled={true} onChange={() => {}} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-[14px] font-bold text-gray-900">Daily Pending Summary</h4>
                      <p className="text-[12px] text-gray-500">Morning digest of pending items.</p>
                    </div>
                    <ToggleSwitch enabled={true} onChange={() => {}} />
                  </div>
                  <div>
                    <label className="text-[13px] font-bold text-gray-700 block mb-2">Reminder Frequency</label>
                    <select className="w-full px-4 py-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] font-semibold text-gray-900 focus:outline-none focus:border-red-300">
                      <option>Every 24 Hours</option>
                      <option>Every 48 Hours</option>
                      <option>Once a week</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Escalations */}
              <div className="bg-white rounded-[24px] p-8 shadow-sm border border-[#ECECF1]">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#ECECF1]">
                  <div className="w-8 h-8 rounded-[12px] bg-red-50 flex items-center justify-center text-red-600">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <h2 className="text-[18px] font-bold text-gray-900">Escalation Alerts</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-[14px] font-bold text-gray-900">SLA Breach Warning</h4>
                      <p className="text-[12px] text-gray-500">Alert 4 hours before breach.</p>
                    </div>
                    <ToggleSwitch enabled={true} onChange={() => {}} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-[14px] font-bold text-gray-900">Manager Escalation</h4>
                      <p className="text-[12px] text-gray-500">Notify when request skips level.</p>
                    </div>
                    <ToggleSwitch enabled={true} onChange={() => {}} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-[14px] font-bold text-gray-900">Internal Alerts</h4>
                      <p className="text-[12px] text-gray-500">Show red badges in dashboard.</p>
                    </div>
                    <ToggleSwitch enabled={true} onChange={() => {}} />
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

export default NotificationPreferences;
