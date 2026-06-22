import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PriceBookPagination = () => {
  return (
    <div className="flex items-center gap-2">
      <button className="w-8 h-8 flex items-center justify-center rounded-[8px] bg-transparent text-gray-500 hover:text-gray-900 transition-colors">
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button className="w-8 h-8 flex items-center justify-center rounded-[8px] bg-[#B3262E] text-white text-[13px] font-bold shadow-[0_2px_8px_rgba(179,38,46,0.3)]">
        1
      </button>
      <button className="w-8 h-8 flex items-center justify-center rounded-[8px] bg-transparent text-gray-600 hover:bg-white text-[13px] font-bold transition-colors">
        2
      </button>
      <button className="w-8 h-8 flex items-center justify-center rounded-[8px] bg-transparent text-gray-600 hover:bg-white text-[13px] font-bold transition-colors">
        3
      </button>
      <span className="w-8 h-8 flex items-center justify-center text-gray-400 font-bold">
        ...
      </span>
      <button className="w-8 h-8 flex items-center justify-center rounded-[8px] bg-transparent text-gray-600 hover:bg-white text-[13px] font-bold transition-colors">
        12
      </button>
      <button className="w-8 h-8 flex items-center justify-center rounded-[8px] bg-transparent text-gray-500 hover:text-gray-900 transition-colors">
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default PriceBookPagination;
