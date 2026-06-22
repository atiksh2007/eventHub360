import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';

const QuotationRow = ({ quotation  }: any) => {
  const navigate = useNavigate();
  return (
    <tr 
      onClick={() => navigate('/quotation-builder')}
      className="h-[120px] border-b border-[#ECECF1] hover:bg-gray-50 cursor-pointer transition-colors group"
    >
      <td className="px-6 py-4">
        <span className="text-[15px] font-semibold text-red-600 group-hover:text-red-700 transition-colors">
          {quotation.id}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${quotation.avatarBg} ${quotation.avatarText}`}>
            {quotation.initials}
          </div>
          <span className="text-[15px] font-semibold text-gray-900">{quotation.client}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-[14px] font-medium text-gray-600">{quotation.event}</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-[14px] font-medium text-gray-600">{quotation.date}</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-[15px] font-bold text-gray-900">{quotation.amount}</span>
      </td>
      <td className="px-6 py-4">
        <span className={`text-[15px] font-bold ${quotation.marginColor || 'text-gray-900'}`}>
          {quotation.margin}
        </span>
      </td>
      <td className="px-6 py-4">
        <StatusBadge status={quotation.status} />
      </td>
      <td className="px-6 py-4">
        <img 
          src={quotation.ownerAvatar} 
          alt="Owner" 
          className="w-8 h-8 rounded-full object-cover border border-gray-200"
        />
      </td>
    </tr>
  );
};

export default QuotationRow;
