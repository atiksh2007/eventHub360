import React from 'react';
import { ArrowLeft, ZoomOut, ZoomIn, Printer, Download, Share2 } from 'lucide-react';

const ProposalToolbar = () => {
  return (
    <div className="h-[72px] bg-white border-b border-[#ECECF1] px-6 flex items-center justify-between shrink-0 sticky top-0 z-30">
      
      {/* Left */}
      <div className="flex items-center gap-4 w-[350px]">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div className="flex flex-col">
          <h2 className="text-[16px] font-bold text-[#B3262E] leading-tight">
            Proposal Management
          </h2>
          <p className="text-[13px] font-medium text-gray-500 leading-tight">
            The Sterling-Vance Wedding - Draft v2.4
          </p>
        </div>
      </div>

      {/* Center - Zoom */}
      <div className="flex-1 flex justify-center">
        <div className="flex items-center bg-[#F8F9FC] rounded-full px-2 py-1 border border-[#ECECF1]">
          <button className="p-1.5 hover:bg-white rounded-full transition-colors text-gray-500">
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-[13px] font-bold text-gray-700 w-14 text-center">100%</span>
          <button className="p-1.5 hover:bg-white rounded-full transition-colors text-gray-500">
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center justify-end gap-6 w-[350px]">
        <div className="flex items-center gap-4 text-gray-600">
          <button className="hover:text-gray-900 transition-colors">
            <Printer className="w-5 h-5" />
          </button>
          <button className="hover:text-gray-900 transition-colors">
            <Download className="w-5 h-5" />
          </button>
          <button className="hover:text-gray-900 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
        
        <button className="h-10 px-6 rounded-full bg-gradient-to-r from-red-600 to-orange-400 text-white text-[14px] font-bold shadow-md hover:shadow-lg hover:from-red-700 hover:to-orange-500 transition-all">
          Send to Client
        </button>
      </div>

    </div>
  );
};

export default ProposalToolbar;
