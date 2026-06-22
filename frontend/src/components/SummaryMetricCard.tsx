import React from 'react';

const SummaryMetricCard = ({ icon: Icon, label, value, iconBg, iconColor }: any) => {
  return (
    <div className="bg-white rounded-[24px] shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#ECECF1] h-[120px] p-6 flex items-center gap-6">
      <div className={`w-[60px] h-[60px] rounded-[16px] flex items-center justify-center shrink-0 ${iconBg}`}>
        <Icon className={`w-8 h-8 ${iconColor}`} />
      </div>
      <div>
        <p className="text-[13px] font-bold text-gray-500 uppercase tracking-widest mb-1">{label}</p>
        <h3 className="text-[28px] font-bold text-gray-900 leading-none tracking-tight">{value}</h3>
      </div>
    </div>
  );
};

export default SummaryMetricCard;
