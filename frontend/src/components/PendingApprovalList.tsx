import React from 'react';
import { useNavigate } from 'react-router-dom';

const approvals = [
  {
    id: 1,
    quoteId: 'QT-2024-0892',
    name: 'Grand Ballroom Wedding Gala',
    creator: 'Sarah Miller',
    time: '2h ago',
    amount: '$45,200',
    status: 'HIGH PRIORITY',
    statusColor: 'bg-yellow-100 text-yellow-700',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 2,
    quoteId: 'QT-2024-0893',
    name: 'Tech Summit 2024 - 3 Day Event',
    creator: 'Marcus Chen',
    time: '5h ago',
    amount: '$128,500',
    status: 'STANDARD',
    statusColor: 'bg-blue-100 text-blue-700',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 3,
    quoteId: 'QT-2024-0894',
    name: 'Global Finance Round Table',
    creator: 'Elena Rossi',
    time: 'Yesterday',
    amount: '$12,800',
    status: 'ESCALATED',
    statusColor: 'bg-red-100 text-red-700',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

const PendingApprovalList = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#ECECF1] h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Pending Approvals</h3>
        <button 
          onClick={() => navigate('/approvals')}
          className="text-sm font-semibold text-red-600 hover:text-red-700"
        >
          View All
        </button>
      </div>

      <div className="flex-1 space-y-5">
        {approvals.map((approval: any) => (
          <div key={approval.id} className="flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <img src={approval.avatar} alt={approval.creator} className="w-10 h-10 rounded-full object-cover bg-gray-100" />
              <div>
                <h4 
                  onClick={() => navigate(`/approvals?id=${approval.quoteId}`)}
                  className="text-[15px] font-bold text-gray-900 group-hover:text-red-600 transition-colors cursor-pointer"
                >
                  {approval.name}
                </h4>
                <p className="text-[13px] text-gray-500 mt-0.5">
                  Created by {approval.creator} <span className="mx-1">•</span> {approval.time}
                </p>
              </div>
            </div>
            <div className="text-right flex flex-col items-end gap-1.5">
              <span className="text-[15px] font-bold text-red-600">{approval.amount}</span>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${approval.statusColor}`}>
                {approval.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingApprovalList;
