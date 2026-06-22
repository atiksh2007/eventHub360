import React from 'react';
import { FileText, ArrowRight } from 'lucide-react';

const ProposalGeneratorCard = () => {
  return (
    <div className="bg-white rounded-[28px] border-2 border-red-100 shadow-[0_8px_30px_rgba(220,38,38,0.08)] p-6 relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
      
      <button className="w-full h-14 rounded-full bg-gradient-to-r from-red-600 to-orange-400 text-white text-[16px] font-bold flex items-center justify-center gap-2 hover:from-red-700 hover:to-orange-500 transition-all shadow-md hover:shadow-lg mb-6">
        <FileText className="w-5 h-5" />
        Generate Proposal
        <ArrowRight className="w-5 h-5 ml-1" />
      </button>

      <div className="text-center relative z-10">
        <h5 className="text-[14px] font-bold text-gray-900 mb-1">Premium Concierge</h5>
        <p className="text-[12px] font-medium text-gray-500 leading-relaxed mb-3 px-2">
          Unlock luxury inventory and priority venue booking features.
        </p>
        <button className="text-[13px] font-bold text-red-600 hover:text-red-700 transition-colors">
          Upgrade Plan
        </button>
      </div>
    </div>
  );
};

export default ProposalGeneratorCard;
