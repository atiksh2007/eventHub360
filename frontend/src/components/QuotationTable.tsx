import React from 'react';
import QuotationRow from './QuotationRow';
import Pagination from './Pagination';

const mockData = [
  {
    id: '#QT-2024-8841',
    client: 'Alpha Solutions Inc.',
    initials: 'AS',
    avatarBg: 'bg-purple-100',
    avatarText: 'text-purple-700',
    event: 'Corporate Gala',
    date: 'Nov 12, 2024',
    amount: '$124,500.00',
    margin: '24.5%',
    marginColor: 'text-green-600',
    status: 'Accepted',
    ownerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: '#QT-2024-8842',
    client: 'BlueTech Ventures',
    initials: 'BT',
    avatarBg: 'bg-pink-100',
    avatarText: 'text-pink-700',
    event: 'Product Launch',
    date: 'Dec 05, 2024',
    amount: '$45,200.00',
    margin: '18.2%',
    status: 'Sent',
    ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: '#QT-2024-8845',
    client: 'Echelon Luxury',
    initials: 'EL',
    avatarBg: 'bg-amber-100',
    avatarText: 'text-amber-700',
    event: 'VIP Retreat',
    date: 'Jan 18, 2025',
    amount: '$12,800.00',
    margin: '32.0%',
    status: 'Draft',
    ownerAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: '#QT-2024-8830',
    client: 'Urban Media',
    initials: 'UM',
    avatarBg: 'bg-gray-200',
    avatarText: 'text-gray-700',
    event: 'Street Festival',
    date: 'Oct 20, 2024',
    amount: '$68,000.00',
    margin: '15.5%',
    status: 'Expired',
    ownerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

const QuotationTable = () => {
  return (
    <div className="bg-[#F7F8FC] rounded-[28px] border border-[#ECECF1] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col">
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-[#F1F3FA] h-[80px]">
              <th className="px-6 py-4 text-[12px] font-semibold text-gray-500 uppercase tracking-widest whitespace-nowrap">Quote Number</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-gray-500 uppercase tracking-widest whitespace-nowrap">Client Name</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-gray-500 uppercase tracking-widest whitespace-nowrap">Event Type</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-gray-500 uppercase tracking-widest whitespace-nowrap">Event Date</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-gray-500 uppercase tracking-widest whitespace-nowrap">Total Amount</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-gray-500 uppercase tracking-widest whitespace-nowrap">Margin (%)</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-gray-500 uppercase tracking-widest whitespace-nowrap">Status</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-gray-500 uppercase tracking-widest whitespace-nowrap">Owner</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {mockData.map((quote: any, idx: any) => (
              <QuotationRow key={idx} quotation={quote} />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination />
    </div>
  );
};

export default QuotationTable;
