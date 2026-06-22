import React from 'react';
import { Activity } from 'lucide-react';

const QuoteSummaryCard = ({ subtotal, dbSummary }: any) => {
  // Prefer server-computed values from DB when available
  const taxes = dbSummary?.taxes
    ? parseFloat(String(dbSummary.taxes).replace(/[$,]/g, ''))
    : subtotal * 0.18;
  const serviceCharge = dbSummary?.serviceCharge
    ? parseFloat(String(dbSummary.serviceCharge).replace(/[$,]/g, ''))
    : subtotal * 0.10;
  const total = dbSummary?.totalQuoteValue
    ? parseFloat(String(dbSummary.totalQuoteValue).replace(/[$,]/g, ''))
    : subtotal + taxes + serviceCharge;

  const displaySubtotal = dbSummary?.subtotal
    ? parseFloat(String(dbSummary.subtotal).replace(/[$,]/g, ''))
    : subtotal;

  return (
    <div className="bg-white rounded-[32px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-[#ECECF1] mb-6">
      <div className="flex items-start justify-between mb-8">
        <h3 className="text-[20px] font-bold text-gray-900 leading-tight">Live<br/>Summary</h3>
        <div className="flex items-center gap-2 bg-[#ECFDF5] px-3 py-1.5 rounded-lg border border-[#D1FAE5]">
          <Activity className="w-4 h-4 text-[#059669]" />
          <span className="text-[12px] font-bold text-[#059669]">Draft Auto-saved</span>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-[15px] font-medium text-gray-500">Subtotal</span>
          <span className="text-[15px] font-bold text-gray-900">
            ${displaySubtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[15px] font-medium text-gray-500">Taxes (18%)</span>
          <span className="text-[15px] font-bold text-gray-900">
            ${taxes.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[15px] font-medium text-gray-500">Service Charge (10%)</span>
          <span className="text-[15px] font-bold text-gray-900">
            ${serviceCharge.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      <div className="pt-6 border-t border-[#ECECF1]">
        <div className="flex justify-between items-center">
          <span className="text-[16px] font-bold text-gray-900">Total Quote Value</span>
          <span className="text-[22px] font-bold text-[#B3262E]">
            ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuoteSummaryCard;
