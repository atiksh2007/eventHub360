import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = () => {
  return (
    <div className="h-[80px] bg-[#F8F9FC] px-8 flex items-center justify-between border-t border-[#ECECF1] rounded-b-[28px]">
      <div className="text-[14px] font-medium text-gray-500">
        Showing <span className="font-semibold text-gray-900">1</span> to <span className="font-semibold text-gray-900">4</span> of <span className="font-semibold text-gray-900">124</span> quotations
      </div>

      <div className="flex items-center gap-2">
        <button className="w-8 h-8 flex items-center justify-center rounded-[8px] bg-white border border-gray-200 text-gray-500 hover:text-gray-900 transition-colors shadow-sm">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-[8px] bg-red-700 text-white text-sm font-bold shadow-sm">
          1
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-[8px] bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-bold transition-colors shadow-sm">
          2
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-[8px] bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-bold transition-colors shadow-sm">
          3
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-[8px] bg-white border border-gray-200 text-gray-500 hover:text-gray-900 transition-colors shadow-sm">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
