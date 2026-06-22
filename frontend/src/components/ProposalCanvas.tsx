import React from 'react';
import CoverPage from './CoverPage';
import WelcomeSection from './WelcomeSection';

const ProposalCanvas = () => {
  return (
    <div className="flex-1 overflow-y-auto px-8 py-10 flex justify-center bg-[#F7F8FC] h-full custom-scrollbar">
      <div className="w-full max-w-[900px] bg-white rounded-[16px] shadow-[0_12px_40px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col shrink-0 min-h-[1200px] mb-20 relative">
        
        {/* Document Content */}
        <CoverPage />
        
        <div className="p-16 flex gap-16">
          <WelcomeSection />
        </div>

      </div>
    </div>
  );
};

export default ProposalCanvas;
