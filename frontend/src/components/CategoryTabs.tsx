import React, { useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';

const CategoryTabs = () => {
  const tabs = ['Venues', 'Packages', 'Vendors', 'Services'];
  const [activeTab, setActiveTab] = useState('Venues');
  const [seasonalPricing, setSeasonalPricing] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  return (
    <div className="bg-white h-[80px] rounded-[24px] shadow-sm border border-[#ECECF1] px-6 flex items-center justify-between mb-8">
      {/* Left Tabs */}
      <div className="flex items-center gap-2 p-1 bg-gray-50/50 rounded-full border border-[#ECECF1]">
        {tabs.map((tab: any) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`h-10 px-6 rounded-full text-[14px] font-bold transition-all ${
              activeTab === tab
                ? 'bg-white text-red-700 shadow-[0_2px_8px_rgba(0,0,0,0.06)]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-8">
        
        {/* Toggle */}
        <div className="flex items-center gap-3">
          <span className="text-[14px] font-bold text-gray-700">Seasonal Pricing</span>
          <button 
            onClick={() => setSeasonalPricing(!seasonalPricing)}
            className={`w-11 h-[26px] rounded-full transition-colors relative flex items-center px-1 ${
              seasonalPricing ? 'bg-red-600' : 'bg-gray-200'
            }`}
          >
            <div className={`w-[18px] h-[18px] bg-white rounded-full shadow-sm transition-transform ${
              seasonalPricing ? 'translate-x-[20px]' : 'translate-x-0'
            }`} />
          </button>
        </div>

        <div className="w-px h-8 bg-[#ECECF1]"></div>

        {/* View Toggles */}
        <div className="flex items-center gap-2 p-1 bg-gray-50/50 rounded-xl border border-[#ECECF1]">
          <button 
            onClick={() => setViewMode('grid')}
            className={`w-10 h-10 flex items-center justify-center rounded-[8px] transition-all ${
              viewMode === 'grid' 
                ? 'bg-red-50 text-red-600 shadow-sm' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`w-10 h-10 flex items-center justify-center rounded-[8px] transition-all ${
              viewMode === 'list' 
                ? 'bg-red-50 text-red-600 shadow-sm' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;
