import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import TopHeader from '../../components/TopHeader';
import { 
  ArrowLeft, History, RotateCcw, Filter, Search, Shield, DollarSign, Calculator
} from 'lucide-react';

const SettingsAuditLogs = () => {
  const navigate = useNavigate();

  const logs = [
    { id: 1, action: 'Updated Tax Rate', module: 'Tax Config', oldValue: '20%', newValue: '22.5%', user: 'Alex Sterling', time: 'Today, 14:30', icon: DollarSign, color: 'text-emerald-600 bg-emerald-50' },
    { id: 2, action: 'Created Approval Rule', module: 'Workflow Rules', oldValue: '-', newValue: 'VIP Exceptions', user: 'Alex Sterling', time: 'Yesterday, 09:15', icon: Shield, color: 'text-purple-600 bg-purple-50' },
    { id: 3, action: 'Reset Sequence Counter', module: 'Automated Numbering', oldValue: 'QT-1042', newValue: 'QT-0001', user: 'System Admin', time: 'Oct 23, 11:00', icon: Calculator, color: 'text-red-600 bg-red-50' }
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
                  <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Audit Logs</h1>
                  <p className="text-[15px] text-gray-500 mt-1">Track configuration changes and restore previous versions.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[24px] shadow-sm border border-[#ECECF1] overflow-hidden">
              <div className="p-6 border-b border-[#ECECF1] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-[8px] bg-gray-100 flex items-center justify-center text-gray-600">
                    <History className="w-4 h-4" />
                  </div>
                  <h2 className="text-[18px] font-bold text-gray-900">Change History</h2>
                </div>
                
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-[300px]">
                    <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text" 
                      placeholder="Search logs..." 
                      className="w-full pl-10 pr-4 py-2.5 bg-[#F8F9FC] border border-[#ECECF1] rounded-full text-[13px] font-semibold text-gray-900 focus:outline-none focus:border-red-300" 
                    />
                  </div>
                  <button className="p-2.5 border border-[#ECECF1] rounded-full text-gray-600 hover:bg-gray-50 transition-colors">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#F8F9FC]">
                    <tr>
                      <th className="py-3 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Event</th>
                      <th className="py-3 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Changes</th>
                      <th className="py-3 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider">User</th>
                      <th className="py-3 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log: any) => (
                      <tr key={log.id} className="border-b border-[#ECECF1] hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${log.color}`}>
                              <log.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-[14px] font-bold text-gray-900">{log.action}</p>
                              <p className="text-[12px] text-gray-500">{log.module} • {log.time}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 bg-gray-100 rounded text-[12px] font-mono text-gray-500 line-through">{log.oldValue}</span>
                            <ArrowLeft className="w-3 h-3 text-gray-400 rotate-180" />
                            <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-[12px] font-mono font-bold">{log.newValue}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-[13px] font-bold text-gray-700">{log.user}</p>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button className="px-3 py-1.5 border border-orange-200 text-orange-600 rounded-lg text-[12px] font-bold hover:bg-orange-50 transition-colors inline-flex items-center gap-1.5">
                            <RotateCcw className="w-3.5 h-3.5" /> Restore
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsAuditLogs;
