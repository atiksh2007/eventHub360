import React from 'react';
import { MoreVertical } from 'lucide-react';
import PricingBadge from './PricingBadge';

const VenueCard = ({ venue  }: any) => {
  return (
    <div className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-[#ECECF1] overflow-hidden hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col group cursor-pointer h-full">
      
      {/* Image Section */}
      <div className="relative h-[220px] w-full overflow-hidden shrink-0">
        <img 
          src={venue.image} 
          alt={venue.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <PricingBadge text={venue.badge} />
        {/* Gradient Overlay for better contrast on top */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1 relative">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-[20px] font-bold text-gray-900 leading-tight pr-6">
            {venue.title}
          </h3>
          <button className="absolute top-6 right-5 text-gray-400 hover:text-gray-900 transition-colors p-1 -mr-1">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        <p className="text-[14px] font-medium text-gray-500 line-clamp-2 leading-relaxed mb-6">
          {venue.description}
        </p>

        <div className="mt-auto">
          <div className="w-full h-px bg-[#ECECF1] mb-5"></div>
          
          <div className="flex items-end justify-between">
            {/* Left - Base Pricing */}
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                Base Pricing
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-[24px] font-bold text-gray-900 tracking-tight">
                  {venue.price}
                </span>
                <span className="text-[13px] font-bold text-gray-400">
                  /{venue.unit}
                </span>
              </div>
            </div>

            {/* Right - Markup & Total */}
            <div className="text-right">
              <p className={`text-[12px] font-bold mb-1 ${venue.markupColor || 'text-emerald-500'}`}>
                {venue.markupText}
              </p>
              <p className="text-[11px] font-bold text-gray-400">
                {venue.estimatedText}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VenueCard;
