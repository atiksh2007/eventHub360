import React from 'react';
import { Search, Bell, History as ActivityIcon, Printer } from 'lucide-react';

const PriceBookHeader = () => {
  const tabs = [
    { label: 'All Quotes' },
    { label: 'Drafts' },
    { label: 'Pending Approval' },
    { label: 'History', active: true },
  ];

  return (
    <div className="h-[72px] bg-white border-b border-[#ECECF1] px-8 flex items-center justify-between sticky top-0 z-10 shrink-0">
      {/* Left Title */}
      <div className="w-[200px]">
        <h2 className="text-[20px] font-bold text-red-700 tracking-tight leading-tight">
          Quotation<br/>Management
        </h2>
      </div>

      {/* Center Section - Tabs then Search */}
      <div className="flex-1 flex items-center gap-8 h-full px-4">
        {/* Navigation Tabs */}
        <div className="flex items-center h-full gap-6">
          {tabs.map((tab: any, idx: any) => (
            <button
              key={idx}
              className={`h-full flex items-center relative text-[15px] font-semibold transition-colors ${
                tab.active ? 'text-red-700' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
              {tab.active && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-red-600 rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative ml-4">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search price book..."
            className="w-[280px] h-10 pl-10 pr-4 bg-gray-50 border border-transparent rounded-full text-[14px] font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400 transition-all placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center gap-5">
        <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
          <Bell className="w-[22px] h-[22px]" />
        </button>
        <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
          <ActivityIcon className="w-[22px] h-[22px]" />
        </button>
        <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
          <Printer className="w-[22px] h-[22px]" />
        </button>
      </div>
    </div>
  );
};

export default PriceBookHeader;
