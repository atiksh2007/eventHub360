import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Accepted', value: 42, color: '#dc2626' }, // Red
  { name: 'Sent', value: 85, color: '#f97316' },     // Orange
  { name: 'Draft', value: 24, color: '#fcd34d' },    // Yellow
  { name: 'Expired', value: 12, color: '#bae6fd' },  // Light Blue
];

const totalItems = data.reduce((acc, curr) => acc + curr.value, 0);

const QuoteStatusChart = () => {
  return (
    <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#ECECF1] h-full flex flex-col">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Quote Status</h3>
      
      <div className="flex-1 relative flex items-center justify-center w-full min-h-[220px]">
        <ResponsiveContainer width="99%" height="99%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry: any, index: any) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold text-gray-900 leading-none">{totalItems}</span>
          <span className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">Total Items</span>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-y-4 gap-x-2 mt-4 px-2">
        {data.map((item: any, index: any) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-xs font-medium text-gray-600">
              {item.name} <span className="text-gray-400">({item.value})</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuoteStatusChart;
