import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const PendingApprovalList = () => {
  const navigate = useNavigate();
  const [approvals, setApprovals] = useState<any[]>([]);

  useEffect(() => {
    api.getPendingApprovals()
      .then(data => setApprovals(data))
      .catch(err => console.error("Failed to load pending approvals", err));
  }, []);

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
        {approvals.map((approval: any, idx: number) => {
          // The backend returns real quoteId: 'QT-10', etc.
          // Fallback parsing for mock data
          const quoteIdStr = approval.quoteId || `QT-${approval.title.match(/#(\d+)/)?.[1] || idx.toString()}`;
          
          return (
            <div key={idx} className="flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">
                  {approval.creator ? approval.creator.charAt(0) : 'E'}
                </div>
                <div>
                  <h4 
                    onClick={() => navigate(`/approvals?id=${quoteIdStr}`)}
                    className="text-[15px] font-bold text-gray-900 group-hover:text-red-600 transition-colors cursor-pointer"
                  >
                    {approval.title}
                  </h4>
                  <p className="text-[13px] text-gray-500 mt-0.5">
                    {approval.creator}
                  </p>
                </div>
              </div>
              <div className="text-right flex flex-col items-end gap-1.5">
                <span className="text-[15px] font-bold text-red-600">{approval.amount}</span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-yellow-100 text-yellow-700`}>
                  {approval.badgeType}
                </span>
              </div>
            </div>
          );
        })}
        {approvals.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">No pending approvals at this time.</p>
        )}
      </div>
    </div>
  );
};

export default PendingApprovalList;
