import React from 'react';
import { Calendar } from 'lucide-react';

const EventSummaryBox = () => {
  return (
    <div className="w-[340px] bg-[#F6F7FC] rounded-[28px] p-8 shrink-0 relative overflow-hidden group">
      {/* Decorative gradient blur */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-100 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="flex items-center gap-3 mb-8">
        <Calendar className="w-5 h-5 text-[#B3262E]" />
        <h3 className="text-[14px] font-bold text-gray-900 tracking-widest uppercase">
          Event Summary
        </h3>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Date & Venue</p>
          <p className="text-[15px] font-semibold text-gray-900 leading-tight mb-1">October 14, 2024</p>
          <p className="text-[14px] font-medium text-gray-500 leading-tight">The Belvedere Estate, Highlands</p>
        </div>
        
        <div>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Guest Count</p>
          <p className="text-[15px] font-semibold text-gray-900 leading-tight mb-1">180</p>
          <p className="text-[14px] font-medium text-gray-500 leading-tight">Distinguished Guests</p>
        </div>

        <div>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Event Style</p>
          <p className="text-[15px] font-semibold text-gray-900 leading-tight">Luxury Garden Wedding</p>
        </div>

        <div>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Budget Range</p>
          <p className="text-[15px] font-semibold text-gray-900 leading-tight">$150,000+</p>
        </div>
      </div>
    </div>
  );
};

export default EventSummaryBox;
