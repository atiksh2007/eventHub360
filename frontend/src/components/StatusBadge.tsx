import React from 'react';

const StatusBadge = ({ status  }: any) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'Accepted':
        return 'bg-[#DCFCE7] text-[#16A34A]';
      case 'Sent':
        return 'bg-[#FEF3C7] text-[#D97706]';
      case 'Draft':
        return 'bg-[#EDE9FE] text-[#7C3AED]';
      case 'Expired':
        return 'bg-[#FEE2E2] text-[#DC2626]';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <span className={`inline-flex items-center justify-center rounded-full px-4 py-1 text-[12px] font-bold tracking-wide ${getStatusStyles()}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
