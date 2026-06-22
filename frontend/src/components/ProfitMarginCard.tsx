import React from 'react';

const ProfitMarginCard = ({ margin }: any) => {
  const displayMargin = margin !== undefined ? margin : 32.4;
  const marginPctStr = typeof displayMargin === 'string' ? displayMargin.replace('%', '') : displayMargin.toString();
  const widthPct = Math.min(100, Math.max(0, parseFloat(marginPctStr) || 0));

  return (
    <div className="bg-[#F8F5FF] rounded-[24px] p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-[14px] font-bold text-gray-500 uppercase tracking-widest">Net Profit Margin</h4>
        <span className="text-[24px] font-bold text-[#6D4C41]">{displayMargin}%</span>
      </div>
      
      <div className="h-2 w-full bg-indigo-100 rounded-full overflow-hidden mb-4">
        <div 
          className="h-full bg-gradient-to-r from-red-600 to-orange-400 rounded-full transition-all duration-300" 
          style={{ width: `${widthPct}%` }}
        />
      </div>
      
      <p className="text-[11px] font-medium text-gray-500 leading-relaxed italic">
        Margins calculated based on historical vendor costs and current overhead rates.
      </p>
    </div>
  );
};

export default ProfitMarginCard;
