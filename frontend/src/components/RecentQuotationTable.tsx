import React, { useState } from 'react';
import { Filter, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const displayQuotes = quotations || [
    { id: '#QUO-8921', client: 'Skyline Ventures', amount: '$24,500', status: 'Accepted', initial: 'S', color: 'bg-indigo-100 text-indigo-700' },
    { id: '#QUO-8919', client: 'Prism Logistics', amount: '$18,200', status: 'Sent', initial: 'P', color: 'bg-orange-100 text-orange-700' },
    { id: '#QUO-8918', client: 'NexGen Media', amount: '$115,000', status: 'Draft', initial: 'N', color: 'bg-rose-100 text-rose-700' },
  ];

  const totalPages = Math.ceil(displayQuotes.length / itemsPerPage);
  const currentQuotes = displayQuotes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDownloadExcel = () => {
    const exportData = displayQuotes.map((q: any) => ({
      'Quote ID': q.id || q.quoteNumber,
      'Client': q.client || q.clientName,
      'Amount': q.amount || q.totalAmount,
      'Status': q.status
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Recent Quotations");
    XLSX.writeFile(workbook, "Recent_Quotations.xlsx");
  };

  return (
    <div className="bg-white rounded-[24px] shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#ECECF1] overflow-hidden flex flex-col h-full">
      <div className="p-6 flex items-center justify-between border-b border-[#ECECF1]">
        <h3 className="text-lg font-bold text-gray-900">Recent Quotations</h3>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
          <button 
            onClick={handleDownloadExcel}
            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            title="Download Excel"
          >
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
            {currentQuotes.map((quote: any, idx: any) => (
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
      
      {totalPages > 1 && (
        <div className="p-4 flex items-center justify-between border-t border-[#ECECF1] bg-gray-50/30">
          <span className="text-sm text-gray-500">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, displayQuotes.length)} of {displayQuotes.length}
          </span>
          <div className="flex items-center gap-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg border border-gray-200 text-gray-500 disabled:opacity-50 hover:bg-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded-lg border border-gray-200 text-gray-500 disabled:opacity-50 hover:bg-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentQuotationTable;
