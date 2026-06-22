import React from 'react';
import { Filter, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const getStatusStyle = (status: any) => {
  switch (status) {
    case 'Accepted': return 'bg-emerald-50 text-emerald-600 border border-emerald-200';
    case 'Sent': return 'bg-amber-50 text-amber-600 border border-amber-200';
    case 'Draft': return 'bg-purple-50 text-purple-600 border border-purple-200';
    default: return 'bg-gray-50 text-gray-600 border border-gray-200';
  }
};

const RecentQuotationTable = ({ quotations }: any) => {
  const navigate = useNavigate();
  const displayQuotes = quotations || [
    { id: '#QUO-8921', client: 'Skyline Ventures', amount: '$24,500', status: 'Accepted', initial: 'S', color: 'bg-indigo-100 text-indigo-700' },
    { id: '#QUO-8919', client: 'Prism Logistics', amount: '$18,200', status: 'Sent', initial: 'P', color: 'bg-orange-100 text-orange-700' },
    { id: '#QUO-8918', client: 'NexGen Media', amount: '$115,000', status: 'Draft', initial: 'N', color: 'bg-rose-100 text-rose-700' },
  ];

  return (
    <div className="bg-white rounded-[24px] shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#ECECF1] overflow-hidden flex flex-col h-full">
      <div className="p-6 flex items-center justify-between border-b border-[#ECECF1]">
        <h3 className="text-lg font-bold text-gray-900">Recent Quotations</h3>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Quote ID</th>
              <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Client</th>
              <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {displayQuotes.map((quote: any, idx: any) => (
              <tr 
                key={idx} 
                onClick={() => navigate(`/quotation-builder?id=${quote.id || quote.quoteNumber}`)}
                className="hover:bg-gray-50/50 transition-colors cursor-pointer group"
              >
                <td className="py-4 px-6 text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                  {quote.id || quote.quoteNumber}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${quote.color || 'bg-red-100 text-red-700'}`}>
                      {quote.initial || (quote.clientName ? quote.clientName.charAt(0) : 'C')}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{quote.client || quote.clientName}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm font-bold text-gray-900">
                  {quote.amount || quote.totalAmount}
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold ${getStatusStyle(quote.status)}`}>
                    {quote.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentQuotationTable;
