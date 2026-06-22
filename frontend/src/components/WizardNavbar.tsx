import React from 'react';
import { HelpCircle, Bell } from 'lucide-react';

const WizardNavbar = () => {
  return (
    <div className="h-[72px] bg-white border-b border-[#ECECF1] px-8 flex items-center justify-between sticky top-0 z-20">
      {/* Left side */}
      <div className="flex items-center">
        <h1 className="text-xl font-bold tracking-tight text-[#B3262E]">
          EventHub360
        </h1>
        <div className="w-px h-6 bg-gray-200 mx-6"></div>
        <h2 className="text-[15px] font-semibold text-gray-700">
          Quotation Management
        </h2>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-5">
        <button className="text-gray-500 hover:text-gray-800 transition-colors">
          <HelpCircle className="w-5 h-5" />
        </button>
        <button className="relative text-gray-500 hover:text-gray-800 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>
        <div className="ml-2">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="User"
            className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default WizardNavbar;
