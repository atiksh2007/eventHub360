import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ServiceAccordion = ({ icon: Icon, title, children, defaultOpen = true }: any) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-[24px] border border-[#ECECF1] shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden mb-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-[#F8F9FC] hover:bg-[#F3F5FD] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-red-600">
            <Icon className="w-4 h-4" />
          </div>
          <span className="text-[15px] font-bold text-gray-900">{title}</span>
        </div>
        <div className="text-gray-400">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {isOpen && (
        <div>
          <div className="p-6">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceAccordion;
