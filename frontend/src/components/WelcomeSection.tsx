import React from 'react';
import EventSummaryBox from './EventSummaryBox';

const WelcomeSection = () => {
  return (
    <>
      <div className="flex-1">
        <div className="mb-6">
          <span className="text-[13px] font-bold text-[#B3262E] uppercase tracking-widest">
            Welcome Message
          </span>
        </div>
        
        <h2 className="text-[42px] font-semibold text-gray-900 leading-[1.1] mb-8 tracking-tight">
          Crafting Your<br />Legacy Moment.
        </h2>
        
        <div className="space-y-6 text-[16px] font-medium text-gray-600 leading-relaxed">
          <p>
            Dear Eleanor and Julian, it is an absolute honor to present this curated vision for your wedding day. At EventHub360, we believe that the most memorable events are those that reflect the intimate stories of the people they celebrate.
          </p>
          <p>
            This proposal outlines a meticulously designed experience at The Belvedere Estate, blending timeless elegance with modern luxury. Every detail, from the bespoke floral arches to the curated culinary journey, has been selected to ensure an unforgettable celebration.
          </p>
          <p>
            We look forward to bringing your extraordinary vision to life.
          </p>
        </div>
      </div>
      
      <EventSummaryBox />
    </>
  );
};

export default WelcomeSection;
