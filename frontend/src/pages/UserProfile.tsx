import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import { 
  User, Settings, Bell, Shield, Clock, LogOut, Check
} from 'lucide-react';

const UserProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('preferences');

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans">
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        <TopHeader />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1000px] mx-auto space-y-6">
            
            <div className="mb-8">
              <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">User Profile</h1>
              <p className="text-[15px] text-gray-500 mt-1">Manage your account settings, preferences, and security.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              
              {/* Settings Sidebar */}
              <div className="w-[250px] shrink-0 space-y-1">
                {[
                  { id: 'preferences', label: 'My Preferences', icon: Settings },
                  { id: 'notifications', label: 'Notification Settings', icon: Bell },
                  { id: 'security', label: 'Security Settings', icon: Shield },
                  { id: 'history', label: 'Login History', icon: Clock },
                  { id: 'logout', label: 'Logout', icon: LogOut, textClass: 'text-red-600 hover:bg-red-50' }
                ].map((item: any) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-xl text-[14px] font-bold transition-colors ${
                      activeTab === item.id 
                        ? 'bg-red-50 text-red-700' 
                        : item.textClass || 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 mr-3 ${activeTab === item.id ? 'text-red-700' : 'text-gray-400'}`} />
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Main Settings Area */}
              <div className="flex-1 bg-white rounded-[24px] shadow-sm border border-[#ECECF1] p-8 min-h-[500px]">
                
                {activeTab === 'preferences' && (
                  <div className="space-y-6">
                    <h3 className="text-[18px] font-bold text-gray-900 mb-6">Profile & Preferences</h3>
                    
                    <div className="flex items-center gap-6 mb-8">
                      <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Profile" className="w-20 h-20 rounded-full object-cover shadow-sm" />
                      <div>
                        <button className="px-4 py-2 bg-gray-900 text-white rounded-full font-bold text-[13px] hover:bg-gray-800 transition-colors shadow-sm mb-2">Change Avatar</button>
                        <p className="text-[12px] text-gray-500">JPG, GIF or PNG. Max size of 800K</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="text-[13px] font-bold text-gray-700 block mb-2">First Name</label>
                        <input type="text" defaultValue="Alexander" className="w-full px-4 py-2.5 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] focus:outline-none focus:border-red-300" />
                      </div>
                      <div>
                        <label className="text-[13px] font-bold text-gray-700 block mb-2">Last Name</label>
                        <input type="text" defaultValue="Pierce" className="w-full px-4 py-2.5 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] focus:outline-none focus:border-red-300" />
                      </div>
                      <div className="col-span-2">
                        <label className="text-[13px] font-bold text-gray-700 block mb-2">Email Address</label>
                        <input type="email" defaultValue="alexander.pierce@eventhub360.com" className="w-full px-4 py-2.5 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl text-[14px] focus:outline-none focus:border-red-300" />
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-[#ECECF1] flex justify-end">
                      <button className="px-6 py-2.5 bg-gradient-to-r from-red-700 to-orange-400 text-white rounded-full font-bold text-[14px] shadow-sm hover:shadow-md transition-all">Save Changes</button>
                    </div>
                  </div>
                )}

                {activeTab === 'logout' && (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-600 mx-auto mb-4">
                      <LogOut className="w-8 h-8 ml-1" />
                    </div>
                    <h3 className="text-[20px] font-bold text-gray-900 mb-2">Log out of EventHub360?</h3>
                    <p className="text-[14px] text-gray-500 mb-8 max-w-sm mx-auto">You will be securely logged out. Make sure to save any draft quotations before proceeding.</p>
                    <div className="flex gap-3 justify-center">
                      <button onClick={() => setActiveTab('preferences')} className="px-6 py-3 bg-[#F8F9FC] text-gray-700 rounded-full font-bold text-[14px] hover:bg-gray-100 transition-colors">Cancel</button>
                      <button onClick={() => navigate('/login')} className="px-6 py-3 bg-red-600 text-white rounded-full font-bold text-[14px] hover:bg-red-700 transition-colors shadow-sm">Yes, Log Out</button>
                    </div>
                  </div>
                )}

                {/* Additional tabs would be similarly structured */}
                {(activeTab === 'notifications' || activeTab === 'security' || activeTab === 'history') && (
                  <div className="py-10 text-center">
                    <p className="text-gray-500 text-[15px] font-medium">Settings panel for {activeTab} will go here.</p>
                  </div>
                )}

              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default UserProfile;
