import React from 'react';
import { Palette, Type, Droplet, LayoutTemplate, Image as ImageIcon, ChevronRight } from 'lucide-react';

const tools = [
  { icon: Palette, label: 'Theme' },
  { icon: Type, label: 'Typography' },
  { icon: Droplet, label: 'Colors' },
  { icon: LayoutTemplate, label: 'Layout' },
  { icon: ImageIcon, label: 'Media' },
];

const ProposalToolsPanel = () => {
  return (
    <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1] mb-6">
      <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">
        Design Tools
      </h3>
      <div className="space-y-1">
        {tools.map((tool: any, idx: any) => {
          const Icon = tool.icon;
          return (
            <button key={idx} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group">
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-gray-500 group-hover:text-red-600 transition-colors" />
                <span className="text-[14px] font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                  {tool.label}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProposalToolsPanel;
