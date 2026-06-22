import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';

const QuotationRow = ({ quotation  }: any) => {
  const navigate = useNavigate();
  const id = quotation.quoteNumber ? quotation.quoteNumber.replace('Q-', '') : '';
  const client = quotation.clientName || 'Unknown Client';
  const initials = quotation.clientInitials || client.substring(0, 2).toUpperCase();
  const event = quotation.eventType || 'Event';
  const date = quotation.eventDate || 'TBD';
  const amount = quotation.totalAmount || '$0.00';
  const margin = quotation.marginPct || '0%';
  const status = quotation.status || 'Draft';

  return (
    <tr 
      onClick={() => navigate(`/quotation-builder?id=${id}`)}
      className="h-[120px] border-b border-[#ECECF1] hover:bg-gray-50 cursor-pointer transition-colors group"
    >
      <td className="px-6 py-4">
        <span className="text-[15px] font-semibold text-red-600 group-hover:text-red-700 transition-colors">
          {quotation.quoteNumber || 'Q-XXX'}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 bg-gray-100 text-gray-700">
            {initials}
          </div>
          <span className="text-[15px] font-semibold text-gray-900">{client}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-[14px] font-medium text-gray-600">{event}</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-[14px] font-medium text-gray-600">{date}</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-[15px] font-bold text-gray-900">{amount}</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-[15px] font-bold text-gray-900">
          {margin}
        </span>
      </td>
      <td className="px-6 py-4">
        <StatusBadge status={status} />
      </td>
      <td className="px-6 py-4">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700 border border-gray-200">
          JD
        </div>
      </td>
    </tr>
  );
};

export default QuotationRow;
