import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import TopHeader from '../../components/TopHeader';
import { 
  ArrowLeft, Users, Shield, Plus, Edit2, Trash2, CheckCircle2, Lock
} from 'lucide-react';

const ToggleSwitch = ({ enabled, onChange  }: any) => (
  <button 
    onClick={() => onChange(!enabled)}
    className={`w-11 h-6 rounded-full transition-colors relative ${enabled ? 'bg-red-700' : 'bg-gray-200'}`}
  >
    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${enabled ? 'left-6' : 'left-1'}`} />
  </button>
);

const UserPermissions = () => {
  const navigate = useNavigate();

  const roles = [
    { id: 1, name: 'System Administrator', users: 2, type: 'System', color: 'bg-red-50 text-red-600' },
    { id: 2, name: 'Sales Director', users: 5, type: 'Custom', color: 'bg-purple-50 text-purple-600' },
    { id: 3, name: 'Finance Manager', users: 3, type: 'Custom', color: 'bg-blue-50 text-blue-600' },
    { id: 4, name: 'Sales Executive', users: 24, type: 'System', color: 'bg-emerald-50 text-emerald-600' }
  ];

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans">
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        <TopHeader />
        
        <main className="flex-1 overflow-y-auto p-8 pb-32">
          <div className="max-w-[1200px] mx-auto space-y-6">
            
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <button onClick={() => navigate('/settings')} className="w-10 h-10 bg-white border border-[#ECECF1] rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Roles & Permissions</h1>
                  <p className="text-[15px] text-gray-500 mt-1">Manage user access control and feature permissions.</p>
                </div>
              </div>
              <button className="px-5 py-2.5 bg-gradient-to-r from-red-700 to-orange-400 text-white rounded-full font-bold text-[14px] shadow-sm hover:shadow-md transition-all flex items-center gap-2">
                <Plus className="w-4 h-4" /> Create Role
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Roles List */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white rounded-[24px] shadow-sm border border-[#ECECF1] overflow-hidden">
                  <div className="p-6 border-b border-[#ECECF1] flex items-center gap-3 bg-[#F8F9FC]">
                    <div className="w-8 h-8 rounded-[12px] bg-white shadow-sm flex items-center justify-center text-gray-700">
                      <Users className="w-4 h-4" />
                    </div>
                    <h2 className="text-[16px] font-bold text-gray-900">Configured Roles</h2>
                  </div>
                  
                  <div className="divide-y divide-[#ECECF1]">
                    {roles.map((role: any) => (
                      <div key={role.id} className="p-5 hover:bg-gray-50 transition-colors cursor-pointer group">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-[15px] font-bold text-gray-900 flex items-center gap-2">
                            {role.name}
                            {role.type === 'System' && <Lock className="w-3 h-3 text-gray-400" />}
                          </h4>
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="text-gray-400 hover:text-gray-900"><Edit2 className="w-3.5 h-3.5" /></button>
                            {role.type !== 'System' && <button className="text-gray-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase ${role.color}`}>{role.users} Users</span>
                          <span className="text-[12px] text-gray-500 font-semibold">{role.type} Role</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Permission Matrix */}
              <div className="lg:col-span-8">
                <div className="bg-white rounded-[24px] shadow-sm border border-[#ECECF1] p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-[12px] bg-red-50 flex items-center justify-center text-red-600">
                        <Shield className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-[18px] font-bold text-gray-900">Permission Matrix</h2>
                        <p className="text-[13px] text-gray-500 mt-1">Editing permissions for: <span className="font-bold text-gray-700">Sales Director</span></p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    
                    {/* Category: Quotations */}
                    <div>
                      <h3 className="text-[14px] font-bold text-gray-900 uppercase tracking-widest mb-4 bg-[#F8F9FC] p-3 rounded-xl border border-[#ECECF1]">Quotations & Proposals</h3>
                      <div className="space-y-4 px-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[14px] font-bold text-gray-700">Create & Edit Quotes</p>
                            <p className="text-[12px] text-gray-500">Allow generating new quotes.</p>
                          </div>
                          <ToggleSwitch enabled={true} onChange={() => {}} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[14px] font-bold text-gray-700">Approve Quotes</p>
                            <p className="text-[12px] text-gray-500">Allow bypassing standard workflows.</p>
                          </div>
                          <ToggleSwitch enabled={true} onChange={() => {}} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[14px] font-bold text-gray-700">Delete Quotes</p>
                            <p className="text-[12px] text-gray-500">Permanently remove records.</p>
                          </div>
                          <ToggleSwitch enabled={false} onChange={() => {}} />
                        </div>
                      </div>
                    </div>

                    {/* Category: Templates */}
                    <div>
                      <h3 className="text-[14px] font-bold text-gray-900 uppercase tracking-widest mb-4 bg-[#F8F9FC] p-3 rounded-xl border border-[#ECECF1]">Template Library</h3>
                      <div className="space-y-4 px-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[14px] font-bold text-gray-700">Manage Templates</p>
                            <p className="text-[12px] text-gray-500">Create, edit, and archive global templates.</p>
                          </div>
                          <ToggleSwitch enabled={true} onChange={() => {}} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[14px] font-bold text-gray-700">Manage Branding</p>
                            <p className="text-[12px] text-gray-500">Update global color schemes and logos.</p>
                          </div>
                          <ToggleSwitch enabled={false} onChange={() => {}} />
                        </div>
                      </div>
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

export default UserPermissions;
