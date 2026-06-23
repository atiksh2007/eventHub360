import React from 'react';
import { Activity } from 'lucide-react';

const QuoteSummaryCard = ({ subtotal, dbSummary, onApplyPricingConfig }: any) => {
  // Initialize from dbSummary if available, otherwise 0
  const initialDiscount = dbSummary?.discountGlobal || 0;
  const initialServiceCharge = dbSummary?.serviceCharge
    ? parseFloat(String(dbSummary.serviceCharge).replace(/[$,]/g, ''))
    : 0;

  const [discountGlobal, setDiscountGlobal] = React.useState<number>(initialDiscount);
  const [chargeService, setChargeService] = React.useState<number>(initialServiceCharge);

  // Sync state if dbSummary loads later
  React.useEffect(() => {
    if (dbSummary?.discountGlobal) {
      setDiscountGlobal(Number(dbSummary.discountGlobal));
    }
    if (dbSummary?.serviceCharge) {
      setChargeService(parseFloat(String(dbSummary.serviceCharge).replace(/[$,]/g, '')));
    }
  }, [dbSummary]);

  // ALWAYS use the live subtotal from the builder for real-time updates!
  const displaySubtotal = subtotal;

  // Calculate live taxes based on net subtotal after global discount
  const taxableAmount = Math.max(0, displaySubtotal - discountGlobal);
  const taxes = taxableAmount * 0.18; // 18% Tax

  // Calculate live grand total
  const total = taxableAmount + taxes + chargeService;

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
        
        {/* Pricing Engine Config */}
        <div className="flex justify-between items-center bg-[#F8F9FC] p-3 rounded-xl border border-[#ECECF1]">
          <span className="text-[13px] font-bold text-gray-700">Global Discount ($)</span>
          <input 
            type="number"
            value={discountGlobal}
            onChange={(e) => setDiscountGlobal(Number(e.target.value))}
            className="w-[80px] h-8 text-right bg-white border border-gray-200 rounded-lg text-[14px] font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400"
          />
        </div>
        
        <div className="flex justify-between items-center bg-[#F8F9FC] p-3 rounded-xl border border-[#ECECF1]">
          <span className="text-[13px] font-bold text-gray-700">Service Charge ($)</span>
          <input 
            type="number"
            value={chargeService}
            onChange={(e) => setChargeService(Number(e.target.value))}
            className="w-[80px] h-8 text-right bg-white border border-gray-200 rounded-lg text-[14px] font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400"
          />
        </div>

        <div className="pt-2 flex justify-between items-center">
          <span className="text-[15px] font-medium text-gray-500">Taxes (18%)</span>
          <span className="text-[15px] font-bold text-gray-900">
            ${taxes.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
        
        <button 
          onClick={() => onApplyPricingConfig && onApplyPricingConfig({ discountGlobal, chargeService })}
          className="w-full mt-6 py-3 bg-gray-900 hover:bg-black text-white rounded-xl font-bold text-[14px] transition-colors"
        >
          Apply Pricing Engine
        </button>
      </div>
    </div>
  );
};

export default QuoteSummaryCard;
