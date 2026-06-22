import React from 'react';
import { User, Calendar, MapPin, Utensils, CreditCard, Eye } from 'lucide-react';

const steps = [
  { id: 1, label: 'Client Info', icon: User, active: true },
  { id: 2, label: 'Event Details', icon: Calendar, active: false },
  { id: 3, label: 'Venue', icon: MapPin, active: false },
  { id: 4, label: 'Services', icon: Utensils, active: false },
  { id: 5, label: 'Pricing', icon: CreditCard, active: false },
  { id: 6, label: 'Preview', icon: Eye, active: false },
];

const WizardProgress = () => {
  return (
    <div className="w-full max-w-[900px] mx-auto py-10 px-4 overflow-x-auto">
      <div className="flex items-center justify-between relative min-w-[600px]">
        {/* Background connecting line */}
        <div className="absolute top-6 left-[5%] right-[5%] h-[2px] bg-gray-200 -z-10" />

        {steps.map((step: any, index: any) => {
          const Icon = step.icon;
          return (
            <div key={step.id} className="flex flex-col items-center relative z-10 w-24">
              {/* If it's active, the line segment to its left should also be red if we are past step 1, 
                  but for step 1 only the icon and maybe a small line below is red. 
                  Let's match the prompt: "Progress line red". We can just color the line up to the active step. */}
              {step.active && index < steps.length - 1 && (
                 <div className="absolute top-6 left-1/2 w-full h-[2px] bg-[#B3262E] -z-10" />
              )}
              {step.active && index > 0 && (
                 <div className="absolute top-6 right-1/2 w-full h-[2px] bg-[#B3262E] -z-10" />
              )}
              
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  step.active 
                    ? 'bg-[#B3262E] shadow-md' 
                    : 'bg-white border-2 border-gray-200'
                }`}
              >
                <Icon className={`w-5 h-5 ${step.active ? 'text-white' : 'text-gray-400'}`} />
              </div>
              
              <div className="mt-3 flex flex-col items-center">
                <span className={`text-[13px] font-bold tracking-wide transition-colors ${
                  step.active ? 'text-[#B3262E]' : 'text-gray-400'
                }`}>
                  {step.label}
                </span>
                {step.active && (
                  <div className="w-full h-[3px] bg-[#B3262E] mt-2 rounded-full" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WizardProgress;
