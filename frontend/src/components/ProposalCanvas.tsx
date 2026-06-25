import React from 'react';
import { Layout } from 'lucide-react';
import { CanvasElement } from '../pages/ProposalStudio';

const ProposalCanvas = ({ elements, selectedId, setSelectedId }: any) => {
  return (
    <div 
      className="flex-1 overflow-y-auto px-8 py-10 flex justify-center bg-[#F7F8FC] h-full custom-scrollbar"
      onClick={() => setSelectedId(null)}
    >
      <div 
        className="w-full max-w-[900px] bg-white rounded-[16px] shadow-[0_12px_40px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col shrink-0 min-h-[1100px] mb-20 relative transition-all duration-300 ring-1 ring-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {elements.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-20 border-4 border-dashed border-gray-100 m-8 rounded-[24px]">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-6">
              <Layout className="w-10 h-10" />
            </div>
            <h3 className="text-[24px] font-bold text-gray-400 mb-2">Blank Proposal Page</h3>
            <p className="text-[15px] font-medium text-gray-400 max-w-sm">Use the Design Tools panel on the right to add elements to this page.</p>
          </div>
        ) : (
          <div className="flex-1 p-16 flex flex-col gap-6 relative">
            {elements.map((el: CanvasElement) => (
              <div 
                key={el.id}
                onClick={(e) => { e.stopPropagation(); setSelectedId(el.id); }}
                className={`relative group cursor-pointer p-4 rounded-[16px] transition-all border-2 ${selectedId === el.id ? 'border-red-500 shadow-lg bg-red-50/10 scale-[1.01]' : 'border-transparent hover:border-gray-200 hover:bg-gray-50'}`}
              >
                {el.type === 'header' && (
                  <h1 className="font-serif leading-tight tracking-tight" style={{ color: el.color, fontSize: el.fontSize }}>{el.content}</h1>
                )}
                {el.type === 'text' && (
                  <p className="font-sans whitespace-pre-wrap leading-relaxed" style={{ color: el.color, fontSize: el.fontSize }}>{el.content}</p>
                )}
                {el.type === 'image' && (
                  <img src={el.url} alt="Proposal Visual" className="w-full object-cover shadow-sm" style={{ borderRadius: el.borderRadius, height: '500px' }} />
                )}
                {el.type === 'pricing' && (
                  <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                    <h3 className="text-2xl font-bold mb-6 font-serif" style={{ color: el.color }}>Investment Summary</h3>
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b-2 border-gray-100 text-gray-400 text-sm uppercase tracking-wider">
                          <th className="pb-3 font-bold">Description</th>
                          <th className="pb-3 text-right font-bold">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        <tr><td className="py-4 text-[15px] font-medium text-gray-700">Premium Package Item</td><td className="py-4 text-right font-bold text-gray-900">$0.00</td></tr>
                        <tr><td className="py-4 text-[15px] font-medium text-gray-700">Add-on Service</td><td className="py-4 text-right font-bold text-gray-900">$0.00</td></tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProposalCanvas;
