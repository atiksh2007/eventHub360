import React from 'react';
import { Plus } from 'lucide-react';

const AddRateCard = () => {
  return (
    <div className="bg-[#F8F5FF] rounded-[24px] border-2 border-dashed border-[#DED6FA] flex flex-col items-center justify-center p-8 text-center cursor-pointer hover:bg-[#F3EEFF] hover:border-[#D1C4F9] transition-all duration-300 group h-full min-h-[420px]">
      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm border border-[#ECECF1] mb-6 group-hover:scale-110 transition-transform duration-300">
        <Plus className="w-8 h-8 text-red-600" />
      </div>
      <h3 className="text-[20px] font-bold text-gray-900 mb-3">
        New Rate Card
      </h3>
      <p className="text-[14px] font-medium text-gray-500 max-w-[200px] leading-relaxed">
        Click to add a new venue, package, or service item to the price book catalog.
      </p>
    </div>
  );
};

export default AddRateCard;
