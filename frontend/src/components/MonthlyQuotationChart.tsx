import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ChevronDown } from 'lucide-react';

const data = [
  { name: 'JAN', value: 400 },
  { name: 'FEB', value: 600 },
  { name: 'MAR', value: 800 },
  { name: 'APR', value: 900 },
  { name: 'MAY', value: 700 },
  { name: 'JUN', value: 1200, highlighted: true },
  { name: 'JUL', value: 850 },
  { name: 'AUG', value: 650 },
  { name: 'SEP', value: 950 },
  { name: 'OCT', value: 1050 },
  { name: 'NOV', value: 750 },
  { name: 'DEC', value: 900 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white text-xs px-3 py-1.5 rounded-md shadow-lg font-medium">
        ${(payload[0].value / 1000).toFixed(1)}M
      </div>
    );
  }
  return null;
};

const CustomBarLabel = (props: any) => {
  const { x, y, width, index } = props;
  if (data[index].highlighted) {
    return (
      <g>
        <rect x={x + width / 2 - 16} y={y - 28} width="32" height="20" fill="#111827" rx="4" />
        <text x={x + width / 2} y={y - 14} fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">
          1.2M
        </text>
      </g>
    );
  }
  return null;
};

const MonthlyQuotationChart = () => {
  return (
    <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#ECECF1] h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-lg font-bold text-gray-900">Monthly Quotations</h3>
        <button className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
          Last 12 Months
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      
      <div className="flex-1 w-full min-h-[240px]">
        <ResponsiveContainer width="99%" height="99%">
          <BarChart data={data} margin={{ top: 30, right: 0, left: -20, bottom: 0 }}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }}
              dy={10}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            <Bar 
              dataKey="value" 
              radius={[6, 6, 6, 6]}
              barSize={32}
              label={<CustomBarLabel />}
            >
              {data.map((entry: any, index: any) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.highlighted ? '#dc2626' : '#eff2f6'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyQuotationChart;
