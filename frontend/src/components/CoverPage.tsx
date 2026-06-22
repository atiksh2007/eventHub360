import React from 'react';

const CoverPage = () => {
  return (
    <div className="w-full h-[500px] relative overflow-hidden group">
      {/* Background Image */}
      <img 
        src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
        alt="Wedding Venue"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 p-16 w-full">
        <h1 className="text-[64px] font-bold text-white leading-tight mb-2 tracking-tight">
          The Sterling-Vance Union
        </h1>
        <p className="text-[20px] font-medium text-white/90 tracking-wide">
          Proposal for the Autumnal Celebration • October 2024
        </p>
      </div>
    </div>
  );
};

export default CoverPage;
