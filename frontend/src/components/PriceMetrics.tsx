import React from 'react';

const MetricCard = ({ label, value  }: any) => (
  <div className="bg-[#EEF2FF] rounded-[16px] px-5 py-3 flex flex-col justify-center min-w-[140px]">
    <span className="text-[11px] font-bold text-gray-500 mb-0.5">{label}</span>
    <span className="text-[18px] font-bold text-gray-900 leading-tight">{value}</span>
  </div>
);

const PriceMetrics = () => {
  return (
    <div className="flex items-center gap-3">
      <MetricCard label="Total Items" value="142 Items" />
      <MetricCard label="Avg. Venue Rate" value="$7,420" />
    </div>
  );
};

export default PriceMetrics;
