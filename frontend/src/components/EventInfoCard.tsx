import React from 'react';
import { Calendar, Users } from 'lucide-react';

const EventInfoCard = () => {
  return (
    <div className="bg-white rounded-[24px] shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#ECECF1] p-4 mb-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4 p-2">
          <div className="w-10 h-10 rounded-[12px] bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Event Date</p>
            <p className="text-[14px] font-bold text-gray-900">Oct 24, 2024</p>
          </div>
        </div>
        
        <div className="w-full h-px bg-[#ECECF1]" />
        
        <div className="flex items-center gap-4 p-2">
          <div className="w-10 h-10 rounded-[12px] bg-pink-50 flex items-center justify-center text-pink-600 shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Expected Guests</p>
            <p className="text-[14px] font-bold text-gray-900">450 - 500 PAX</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventInfoCard;
