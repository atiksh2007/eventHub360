import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Eye, Save, Settings, Layout, Image, 
  Type, Palette, Plus, ChevronRight, Layers, FileText, Move
} from 'lucide-react';

const FullTemplateBuilder = ({ isBlank = false  }: any) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('sections');

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
                { name: 'Cover Page', icon: Image },
                { name: 'Welcome Letter', icon: Type },
                { name: 'Event Vision', icon: Layout },
                { name: 'Pricing Breakdown', icon: FileText }
              ].map((section: any, idx: any) => (
                <div key={idx} className="bg-white border border-[#ECECF1] rounded-[12px] p-3 flex items-center gap-3 shadow-sm cursor-grab hover:border-red-300 transition-colors group">
                  <Move className="w-4 h-4 text-gray-300 group-hover:text-gray-500" />
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
            <button className="px-4 py-2 text-[13px] font-bold text-gray-600 hover:text-gray-900 flex items-center gap-2">
              <Save className="w-4 h-4" /> Save Draft
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
        <main className="flex-1 overflow-y-auto p-8 pt-24 pb-24 flex justify-center">
          <div className="w-[850px] min-h-[1100px] bg-white shadow-xl flex flex-col relative transition-all duration-300 group ring-1 ring-gray-200">
            {isBlank ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-20 border-4 border-dashed border-gray-100 m-8 rounded-[24px]">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-6">
                  <Layout className="w-10 h-10" />
                </div>
                <h3 className="text-[24px] font-bold text-gray-400 mb-2">Blank Canvas</h3>
                <p className="text-[15px] font-medium text-gray-400 max-w-sm">Drag and drop sections from the left sidebar to start building your custom template.</p>
              </div>
            ) : (
              <div className="flex-1 p-16 flex flex-col relative">
                {/* Visual Editor Overlay for existing template */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-400 transition-colors pointer-events-none z-10"></div>
                
                <div className="flex items-center justify-center mb-16 relative group/element cursor-pointer hover:outline hover:outline-2 hover:outline-red-400 p-4 rounded-md">
                   <h1 className="text-4xl font-serif text-gray-900 tracking-wider">The Grand Event</h1>
                </div>

                <div className="w-full aspect-video bg-gray-100 rounded-[16px] mb-12 relative group/element cursor-pointer hover:outline hover:outline-2 hover:outline-red-400 overflow-hidden flex items-center justify-center">
                  <Image className="w-12 h-12 text-gray-300" />
                  <span className="absolute bottom-4 right-4 bg-black/50 text-white text-[11px] px-3 py-1 rounded-full backdrop-blur-md">Cover Image Area</span>
                </div>

                <div className="space-y-6 relative group/element cursor-pointer hover:outline hover:outline-2 hover:outline-red-400 p-4 rounded-md">
                  <div className="w-full h-4 bg-gray-100 rounded-full"></div>
                  <div className="w-[90%] h-4 bg-gray-100 rounded-full"></div>
                  <div className="w-[95%] h-4 bg-gray-100 rounded-full"></div>
                  <div className="w-[80%] h-4 bg-gray-100 rounded-full"></div>
                </div>
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
            <p className="text-[13px] text-gray-400 text-center py-4">Select an element on the canvas to edit its properties.</p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default FullTemplateBuilder;
