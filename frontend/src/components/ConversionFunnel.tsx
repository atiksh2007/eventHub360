import React from 'react';

const ConversionFunnel = () => {
  const steps = [
    { label: 'Leads Qualified', value: '1,240', color: 'bg-red-100 text-red-900', width: 'w-full' },
    { label: 'Quotes Created', value: '482', color: 'bg-red-300 text-red-900', width: 'w-[85%]' },
    { label: 'Quotes Sent', value: '163', color: 'bg-red-500 text-white', width: 'w-[65%]' },
    { label: 'Contracts Signed', value: '42', color: 'bg-red-700 text-white', width: 'w-[45%]' },
  ];

  return (
    <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#ECECF1] h-full flex flex-col">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Conversion Funnel</h3>
      
      <div className="flex-1 flex flex-col items-center justify-center gap-3">
        {steps.map((step: any, index: any) => (
          <div 
            key={index} 
            className={`${step.width} h-12 rounded-[14px] ${step.color} flex items-center justify-between px-6 transition-all`}
          >
            <span className="text-sm font-medium">{step.label}</span>
            <span className="text-sm font-bold">{step.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8 bg-gray-50 p-4 rounded-[16px]">
        <div className="text-center">
          <p className="text-2xl font-bold text-red-600 mb-1">33.8%</p>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Quote Sent %</p>
        </div>
        <div className="text-center border-l border-gray-200">
          <p className="text-2xl font-bold text-gray-900 mb-1">25.7%</p>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Closing Rate</p>
        </div>
      </div>
    </div>
  );
};

export default ConversionFunnel;
