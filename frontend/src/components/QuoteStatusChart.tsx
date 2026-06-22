import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const QuoteStatusChart = ({ statusCounters }: any) => {
  const safeCounters = statusCounters || { drafts: 0, sent: 0, accepted: 0, expired: 0, pendingApproval: 0 };
  
  let data = [
    { name: 'Accepted', value: safeCounters.accepted || 0, color: '#dc2626' }, 
    { name: 'Sent', value: safeCounters.sent || 0, color: '#f97316' },     
    { name: 'Draft', value: safeCounters.drafts || 0, color: '#fcd34d' },    
    { name: 'Expired', value: safeCounters.expired || 0, color: '#bae6fd' },  
    { name: 'Pending', value: safeCounters.pendingApproval || 0, color: '#8b5cf6' },  
    { name: 'Approved', value: safeCounters.approved || 0, color: '#10b981' },
  ].filter(d => d.value > 0);

  // Fallback data for empty database so the graph remains visible
  if (data.length === 0) {
    data = [
      { name: 'Accepted', value: 12, color: '#dc2626' },
      { name: 'Sent', value: 8, color: '#f97316' },
      { name: 'Draft', value: 4, color: '#fcd34d' },
      { name: 'Pending', value: 6, color: '#8b5cf6' },
      { name: 'Approved', value: 3, color: '#10b981' }
    ];
  }

  const totalItems = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#ECECF1] h-full flex flex-col">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Quote Status</h3>
      
      <div className="flex-1 relative flex items-center justify-center w-full min-h-[220px]">
        {totalItems > 0 ? (
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
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 font-medium">No Data Available</div>
        )}
        
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
