import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Eye, Save, Settings, Layout, Image, 
  Type, Palette, Plus, ChevronRight, Layers, FileText, Move, Trash2, Upload
} from 'lucide-react';

type ElementType = 'header' | 'text' | 'image' | 'pricing';

interface CanvasElement {
  id: string;
  type: ElementType;
  content?: string;
  url?: string;
  color?: string;
  fontSize?: string;
  borderRadius?: string;
}

const FullTemplateBuilder = ({ isBlank = false  }: any) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('sections');
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveDraft = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }, 1000);
  };

  const addElement = (type: ElementType) => {
    const newEl: CanvasElement = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content: type === 'header' ? 'New Header' : type === 'text' ? 'Start typing your text here...' : undefined,
      url: type === 'image' ? 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80' : undefined,
      color: '#111827',
      fontSize: type === 'header' ? '42px' : '16px',
      borderRadius: '16px'
    };
    setElements([...elements, newEl]);
    setSelectedId(newEl.id);
  };

  const updateElement = (id: string, updates: Partial<CanvasElement>) => {
    setElements(elements.map(el => el.id === id ? { ...el, ...updates } : el));
  };
  
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
  
  const deleteElement = (id: string) => {
    setElements(elements.filter(el => el.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  return (
    <div className="flex h-screen bg-[#F8F9FC] font-sans overflow-hidden">
      
      {/* ========================================== */}
      {/* LEFT SIDEBAR: BUILDER TOOLS */}
      {/* ========================================== */}
      <div className="w-[300px] bg-white h-screen flex flex-col border-r border-[#ECECF1] z-10 shadow-sm shrink-0">
        
        <div className="p-4 border-b border-[#ECECF1] flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-[16px] font-bold text-gray-900">{isBlank ? 'Blank Custom' : 'The Eternal Grandeur'}</h1>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Template Builder</p>
          </div>
        </div>

        <div className="flex border-b border-[#ECECF1]">
          <button onClick={() => setActiveTab('sections')} className={`flex-1 py-3 text-[13px] font-bold border-b-2 transition-colors ${activeTab === 'sections' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-900'}`}>
            Sections
          </button>
          <button onClick={() => setActiveTab('design')} className={`flex-1 py-3 text-[13px] font-bold border-b-2 transition-colors ${activeTab === 'design' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-900'}`}>
            Design
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-[#F8F9FC]">
          
          {activeTab === 'sections' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Active Pages</span>
                <button className="text-red-600 hover:text-red-700 transition-colors"><Plus className="w-4 h-4" /></button>
              </div>

              {[
                { name: 'Header', icon: Type, type: 'header' },
                { name: 'Text Block', icon: Type, type: 'text' },
                { name: 'Image Cover', icon: Image, type: 'image' },
                { name: 'Pricing Table', icon: FileText, type: 'pricing' }
              ].map((section: any, idx: any) => (
                <div 
                  key={idx} 
                  onClick={() => addElement(section.type as ElementType)}
                  className="bg-white border border-[#ECECF1] rounded-[12px] p-3 flex items-center gap-3 shadow-sm cursor-pointer hover:border-red-300 hover:shadow-md transition-all group"
                >
                  <Plus className="w-4 h-4 text-gray-300 group-hover:text-red-500 transition-colors" />
                  <div className="w-8 h-8 rounded-lg bg-[#F8F5FF] text-red-600 flex items-center justify-center shrink-0">
                    <section.icon className="w-4 h-4" />
                  </div>
                  <span className="text-[14px] font-bold text-gray-700">{section.name}</span>
                </div>
              ))}
              
              <button className="w-full py-3 mt-4 border-2 border-dashed border-[#ECECF1] rounded-[12px] text-[13px] font-bold text-gray-500 hover:bg-white hover:text-red-600 hover:border-red-200 transition-colors flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Add New Section
              </button>
            </div>
          )}

          {activeTab === 'design' && (
            <div className="space-y-6">
              <div>
                <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Color Palette</span>
                <div className="grid grid-cols-5 gap-2">
                  {['#FFFFFF', '#F8F9FC', '#ECECF1', '#9CA3AF', '#111827', '#DC2626', '#EA580C', '#10B981', '#3B82F6', '#8B5CF6'].map((color: any, i: any) => (
                    <div key={i} className="w-full aspect-square rounded-md border border-gray-200 cursor-pointer hover:scale-110 transition-transform shadow-sm" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Typography</span>
                <div className="space-y-3">
                  <div className="bg-white border border-[#ECECF1] rounded-[12px] p-3">
                    <p className="text-[11px] text-gray-400 mb-1">Headings (H1 - H4)</p>
                    <p className="text-[16px] font-bold text-gray-900 font-serif">Playfair Display</p>
                  </div>
                  <div className="bg-white border border-[#ECECF1] rounded-[12px] p-3">
                    <p className="text-[11px] text-gray-400 mb-1">Body Text</p>
                    <p className="text-[14px] font-medium text-gray-700 font-sans">Inter</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================== */}
      {/* MAIN CANVAS AREA */}
      {/* ========================================== */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-gray-200 relative">
        
        {/* BUILDER HEADER */}
        <div className="absolute top-4 left-4 right-4 bg-white/90 backdrop-blur-md border border-[#ECECF1] rounded-[16px] h-14 px-4 flex items-center justify-between z-20 shadow-sm">
          <div className="flex items-center gap-4">
            <span className="text-[13px] font-bold text-gray-700 flex items-center gap-2">
              <Layers className="w-4 h-4 text-gray-400" /> Page 1 of 4
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleSaveDraft}
              className={`px-4 py-2 text-[13px] font-bold flex items-center justify-center gap-2 rounded-lg transition-colors min-w-[120px] ${
                isSaved ? 'text-emerald-600 bg-emerald-50' : 
                'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              ) : isSaved ? (
                <>Saved as Draft!</>
              ) : (
                <><Save className="w-4 h-4" /> Save Draft</>
              )}
            </button>
            <button 
              onClick={() => navigate('/templates/1/preview')}
              className="px-4 py-2 bg-white border border-[#ECECF1] text-gray-700 rounded-full font-bold text-[13px] hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2"
            >
              <Eye className="w-4 h-4" /> Preview
            </button>
            <button className="px-5 py-2 bg-gradient-to-r from-red-700 to-orange-400 text-white rounded-full font-bold text-[13px] hover:shadow-md transition-shadow">
              Publish
            </button>
          </div>
        </div>

        {/* CANVAS */}
        <main className="flex-1 overflow-y-auto p-8 pt-24 pb-24 flex justify-center" onClick={() => setSelectedId(null)}>
          <div 
            className="w-[850px] min-h-[1100px] bg-white shadow-2xl flex flex-col relative transition-all duration-300 ring-1 ring-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {elements.length === 0 && isBlank ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-20 border-4 border-dashed border-gray-100 m-8 rounded-[24px]">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-6">
                  <Layout className="w-10 h-10" />
                </div>
                <h3 className="text-[24px] font-bold text-gray-400 mb-2">Blank Canvas</h3>
                <p className="text-[15px] font-medium text-gray-400 max-w-sm">Click sections from the left sidebar to add them to your template.</p>
              </div>
            ) : (
              <div className="flex-1 p-16 flex flex-col gap-6 relative">
                {!isBlank && elements.length === 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-40">
                    <p className="text-2xl font-bold text-gray-400">The Eternal Grandeur Base</p>
                    <p className="text-gray-400 mt-2">Add elements to override this template</p>
                  </div>
                )}
                
                {elements.map(el => (
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
                      <img src={el.url} alt="Template block" className="w-full object-cover shadow-sm" style={{ borderRadius: el.borderRadius, height: '400px' }} />
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
        </main>
      </div>

      {/* ========================================== */}
      {/* RIGHT SIDEBAR: PROPERTIES */}
      {/* ========================================== */}
      <div className="w-[280px] bg-white border-l border-[#ECECF1] shadow-sm flex flex-col z-10 shrink-0 hidden xl:flex">
        <div className="h-14 border-b border-[#ECECF1] px-4 flex items-center">
          <h3 className="text-[13px] font-bold text-gray-900 uppercase tracking-widest">Properties</h3>
        </div>
        <div className="p-5 flex-1 overflow-y-auto space-y-6 bg-[#F8F9FC]">
          
          <div className="bg-white rounded-[16px] p-4 border border-[#ECECF1] shadow-sm">
            <h4 className="text-[12px] font-bold text-gray-400 uppercase mb-4">Page Settings</h4>
            <div className="space-y-4">
              <div>
                <label className="text-[12px] font-semibold text-gray-600 mb-1 block">Background Color</label>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded border border-gray-200 bg-white"></div>
                  <span className="text-[13px] text-gray-700">#FFFFFF</span>
                </div>
              </div>
              <div>
                <label className="text-[12px] font-semibold text-gray-600 mb-1 block">Padding Top</label>
                <input type="range" className="w-full" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[16px] p-4 border border-[#ECECF1] shadow-sm">
            <h4 className="text-[12px] font-bold text-gray-400 uppercase mb-4">Element Styles</h4>
            {!selectedId ? (
              <p className="text-[13px] text-gray-400 text-center py-4">Select an element on the canvas to edit its properties.</p>
            ) : (
              <div className="space-y-4">
                {elements.find(e => e.id === selectedId)?.type === 'image' && (
                  <>
                    <div>
                      <label className="text-[12px] font-semibold text-gray-600 mb-1 block">Image URL</label>
                      <input 
                        type="text" 
                        value={elements.find(e => e.id === selectedId)?.url || ''} 
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
                        value={elements.find(e => e.id === selectedId)?.borderRadius || ''} 
                        onChange={(e) => updateElement(selectedId, { borderRadius: e.target.value })}
                        className="w-full px-3 py-2 bg-[#F8F9FC] border border-[#ECECF1] rounded-lg text-sm focus:outline-none focus:border-red-300" 
                      />
                    </div>
                  </>
                )}
                {(elements.find(e => e.id === selectedId)?.type === 'header' || elements.find(e => e.id === selectedId)?.type === 'text') && (
                  <>
                    <div>
                      <label className="text-[12px] font-semibold text-gray-600 mb-1 block">Content</label>
                      <textarea 
                        value={elements.find(e => e.id === selectedId)?.content || ''} 
                        onChange={(e) => updateElement(selectedId, { content: e.target.value })}
                        className="w-full px-3 py-2 bg-[#F8F9FC] border border-[#ECECF1] rounded-lg text-sm focus:outline-none focus:border-red-300" 
                        rows={4}
                      />
                    </div>
                    <div>
                      <label className="text-[12px] font-semibold text-gray-600 mb-1 block">Font Size</label>
                      <input 
                        type="text" 
                        value={elements.find(e => e.id === selectedId)?.fontSize || ''} 
                        onChange={(e) => updateElement(selectedId, { fontSize: e.target.value })}
                        className="w-full px-3 py-2 bg-[#F8F9FC] border border-[#ECECF1] rounded-lg text-sm focus:outline-none focus:border-red-300" 
                      />
                    </div>
                  </>
                )}
                {elements.find(e => e.id === selectedId)?.type !== 'image' && (
                  <div>
                    <label className="text-[12px] font-semibold text-gray-600 mb-1 block">Color Code</label>
                    <input 
                      type="text" 
                      value={elements.find(e => e.id === selectedId)?.color || ''} 
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
      </div>

    </div>
  );
};

export default FullTemplateBuilder;
