import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import { 
  HelpCircle, BookOpen, MessageCircle, FileText, Search, ArrowRight
} from 'lucide-react';

const SupportCenter = () => {
  const navigate = useNavigate();

  const resources = [
    { title: 'Knowledge Base', icon: BookOpen, desc: 'Step-by-step guides and FAQs.', action: 'Browse Articles' },
    { title: 'Support Tickets', icon: MessageCircle, desc: 'View or open support requests.', action: 'View Tickets' },
    { title: 'Documentation', icon: FileText, desc: 'API and system integration docs.', action: 'Read Docs' }
  ];

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans">
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        <TopHeader />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1400px] mx-auto space-y-6">
            
            <div className="bg-gradient-to-r from-red-700 to-orange-400 rounded-[32px] p-12 text-white mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-20">
                <HelpCircle className="w-48 h-48" />
              </div>
              <div className="relative z-10 max-w-2xl">
                <h1 className="text-[36px] font-bold tracking-tight mb-4">How can we help you today?</h1>
                <p className="text-[16px] text-red-50 mb-8 font-medium">Search our knowledge base or get in touch with our enterprise support team.</p>
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Search for help..." className="w-full pl-12 pr-4 py-4 bg-white rounded-full text-[15px] text-gray-900 focus:outline-none focus:ring-4 focus:ring-red-400/30 shadow-lg" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {resources.map((item: any, idx: any) => (
                <div key={idx} className="bg-white rounded-[24px] p-8 shadow-sm border border-[#ECECF1] flex flex-col">
                  <div className="w-14 h-14 rounded-[16px] bg-[#F8F9FC] flex items-center justify-center text-gray-700 mb-6 border border-[#ECECF1]">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-[20px] font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-[14px] text-gray-500 mb-8 flex-1">{item.desc}</p>
                  <button className="flex items-center text-[14px] font-bold text-red-600 hover:text-red-700 group w-max">
                    {item.action} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              ))}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default SupportCenter;
