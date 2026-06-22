import React from 'react';

const PricingBadge = ({ text  }: any) => {
  return (
    <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-red-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
      {text}
    </span>
  );
};

export default PricingBadge;
