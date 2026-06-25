import React from 'react';
import { Palette, Type, Droplet, LayoutTemplate, Image as ImageIcon, ChevronRight, Plus, FileText, Trash2, Upload } from 'lucide-react';
import { ElementType } from '../pages/ProposalStudio';

const ProposalToolsPanel = ({ elements, selectedId, addElement, updateElement, deleteElement }: any) => {
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedId) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateElement(selectedId, { url: event.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 mb-6">
      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1]">
        <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">
          Add Elements
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: 'Header', icon: Type, type: 'header' },
            { name: 'Text', icon: FileText, type: 'text' },
            { name: 'Image', icon: ImageIcon, type: 'image' },
            { name: 'Pricing', icon: LayoutTemplate, type: 'pricing' }
          ].map((section: any, idx: any) => (
            <div 
              key={idx} 
              onClick={() => addElement(section.type as ElementType)}
              className="border border-[#ECECF1] rounded-xl p-3 flex flex-col items-center justify-center gap-2 shadow-sm cursor-pointer hover:border-red-300 hover:shadow-md transition-all group bg-[#F8F9FC]"
            >
              <section.icon className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
              <span className="text-[12px] font-bold text-gray-600">{section.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1]">
        <h4 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">Properties</h4>
        {!selectedId ? (
          <p className="text-[13px] text-gray-400 text-center py-4">Select an element on the canvas to edit its properties.</p>
        ) : (
          <div className="space-y-4">
            {elements.find((e: any) => e.id === selectedId)?.type === 'image' && (
              <>
                <div>
                  <label className="text-[12px] font-semibold text-gray-600 mb-1 block">Image URL</label>
                  <input 
                    type="text" 
                    value={elements.find((e: any) => e.id === selectedId)?.url || ''} 
                    onChange={(e) => updateElement(selectedId, { url: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8F9FC] border border-[#ECECF1] rounded-lg text-sm focus:outline-none focus:border-red-300" 
                  />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-gray-600 mb-1 block">Upload from Device</label>
                  <label className="w-full px-3 py-2 bg-[#F8F9FC] border border-[#ECECF1] rounded-lg text-[13px] font-medium text-gray-600 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors shadow-sm">
                    <Upload className="w-4 h-4" /> Choose File
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-gray-600 mb-1 block">Border Radius</label>
                  <input 
                    type="text" 
                    value={elements.find((e: any) => e.id === selectedId)?.borderRadius || ''} 
                    onChange={(e) => updateElement(selectedId, { borderRadius: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8F9FC] border border-[#ECECF1] rounded-lg text-sm focus:outline-none focus:border-red-300" 
                  />
                </div>
              </>
            )}
            {(elements.find((e: any) => e.id === selectedId)?.type === 'header' || elements.find((e: any) => e.id === selectedId)?.type === 'text') && (
              <>
                <div>
                  <label className="text-[12px] font-semibold text-gray-600 mb-1 block">Content</label>
                  <textarea 
                    value={elements.find((e: any) => e.id === selectedId)?.content || ''} 
                    onChange={(e) => updateElement(selectedId, { content: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8F9FC] border border-[#ECECF1] rounded-lg text-sm focus:outline-none focus:border-red-300" 
                    rows={4}
                  />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-gray-600 mb-1 block">Font Size</label>
                  <input 
                    type="text" 
                    value={elements.find((e: any) => e.id === selectedId)?.fontSize || ''} 
                    onChange={(e) => updateElement(selectedId, { fontSize: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8F9FC] border border-[#ECECF1] rounded-lg text-sm focus:outline-none focus:border-red-300" 
                  />
                </div>
              </>
            )}
            {elements.find((e: any) => e.id === selectedId)?.type !== 'image' && (
              <div>
                <label className="text-[12px] font-semibold text-gray-600 mb-1 block">Color Code</label>
                <input 
                  type="text" 
                  value={elements.find((e: any) => e.id === selectedId)?.color || ''} 
                  onChange={(e) => updateElement(selectedId, { color: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F8F9FC] border border-[#ECECF1] rounded-lg text-sm focus:outline-none focus:border-red-300" 
                  placeholder="#000000"
                />
              </div>
            )}
            <div className="pt-4 border-t border-gray-100">
              <button 
                onClick={() => deleteElement(selectedId)}
                className="w-full py-2.5 bg-red-50 text-red-600 border border-red-200 rounded-lg text-[13px] font-bold hover:bg-red-100 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Trash2 className="w-4 h-4" /> Delete Element
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProposalToolsPanel;
