import React from 'react';

const executives = [
  {
    id: 1,
    name: 'Sarah Miller',
    revenue: '$3.2M',
    progress: 100,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 2,
    name: 'David Brooks',
    revenue: '$2.8M',
    progress: 85,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 3,
    name: 'Elena Rossi',
    revenue: '$2.4M',
    progress: 70,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

const TopSalesExecutives = () => {
  return (
    <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#ECECF1] h-full flex flex-col">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Top Sales Executives</h3>
      
      <div className="flex-1 flex flex-col gap-5 justify-center">
        {executives.map((exec: any, idx: any) => (
          <div key={exec.id} className="relative">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src={exec.avatar} alt={exec.name} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-[9px] font-bold text-gray-700">{exec.id}</span>
                  </div>
                </div>
                <span className="text-sm font-bold text-gray-900">{exec.name}</span>
              </div>
              <span className="text-sm font-bold text-red-600">{exec.revenue}</span>
            </div>
            {/* Progress bar container aligned with text, let's keep it full width minus avatar space or just below */}
            <div className="pl-13">
               <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                 <div 
                   className="h-full bg-gradient-to-r from-red-600 to-orange-400 rounded-full" 
                   style={{ width: `${exec.progress}%` }} 
                 />
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSalesExecutives;
