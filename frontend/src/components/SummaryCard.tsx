import React from 'react';

const SummaryCard = ({ icon: Icon, value, label, iconBg, iconColor, onClick }: any) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-[20px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-[#ECECF1] h-[80px] flex items-center gap-4 ${onClick ? 'cursor-pointer hover:border-red-200 transition-colors' : ''}`}
    >
      <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 ${iconBg}`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      <div>
        <h4 className="text-[22px] font-bold text-gray-900 leading-none mb-1">{value}</h4>
        <p className="text-[13px] font-medium text-gray-500 leading-none">{label}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
