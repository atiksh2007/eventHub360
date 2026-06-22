import React from 'react';
import { MessageSquare, GitCommit } from 'lucide-react';

export const CollaborationCard = () => {
  return (
    <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1] mb-6">
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">
          Collaboration
        </h3>
        <span className="text-[11px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md flex items-center gap-1">
          <GitCommit className="w-3 h-3" />
          v2.4
        </span>
      </div>
      
      <div className="flex items-center justify-between px-2">
        <div className="flex -space-x-2">
          <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
          <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
          <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[11px] font-bold text-gray-600">
            +2
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 text-gray-500 hover:text-red-600 cursor-pointer transition-colors">
          <MessageSquare className="w-4 h-4" />
          <span className="text-[13px] font-bold">14</span>
        </div>
      </div>
    </div>
  );
};

export const SendStatusCard = () => {
  return (
    <div className="bg-[#ECFDF5] rounded-[20px] p-5 border border-[#D1FAE5]">
      <div className="flex flex-col items-center text-center gap-1">
        <p className="text-[14px] font-bold text-[#059669]">
          Ready for Client Review
        </p>
        <p className="text-[12px] font-medium text-[#047857]/70">
          Last saved: 2 minutes ago
        </p>
      </div>
    </div>
  );
};
