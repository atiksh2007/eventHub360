import React, { useState } from 'react';

const Toggle = ({ label, defaultChecked = false  }: any) => {
  const [checked, setChecked] = useState(defaultChecked);
  
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-[14px] font-semibold text-gray-700">{label}</span>
      <button 
        onClick={() => setChecked(!checked)}
        className={`w-10 h-6 rounded-full transition-colors relative ${checked ? 'bg-red-600' : 'bg-gray-200'}`}
      >
        <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${checked ? 'left-5' : 'left-1 shadow-sm'}`} />
      </button>
    </div>
  );
};

const ProposalSettingsCard = () => {
  return (
    <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1] mb-6">
      <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">
        Proposal Settings
      </h3>
      <div className="space-y-2 px-2">
        <Toggle label="Client Branding" defaultChecked />
        <Toggle label="Enable Watermark" />
        <Toggle label="Page Numbers" defaultChecked />
        <Toggle label="Interactive PDF" defaultChecked />
      </div>
    </div>
  );
};

export default ProposalSettingsCard;
