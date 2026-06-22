import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Download, Send, ChevronRight, ChevronLeft, Save,
  X, CheckCircle2, FileText
} from 'lucide-react';

const FullProposalPreview = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const pages = [
    {
      id: 1,
      title: 'Cover Page',
      content: (
        <div className="w-full h-full bg-[#F8F5FF] flex flex-col items-center justify-center p-20 relative text-center">
          <div className="absolute top-20 left-20 w-32 h-32 opacity-10 bg-red-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 opacity-10 bg-orange-500 rounded-full blur-3xl"></div>
          
          <h1 className="text-[54px] font-serif font-bold text-gray-900 tracking-wider mb-6 relative z-10">
            The Grand Event
          </h1>
          <p className="text-[18px] text-gray-600 uppercase tracking-[0.2em] relative z-10 max-w-lg mx-auto">
            A bespoke proposal curated exclusively for your distinguished celebration.
          </p>
          <div className="mt-24 text-[13px] text-gray-400 font-bold uppercase tracking-widest relative z-10">
            Prepared by EventHub360 Concierge
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: 'Welcome Message',
      content: (
        <div className="w-full h-full bg-white p-24 text-left flex flex-col justify-center">
          <h2 className="text-[36px] font-serif font-bold text-gray-900 mb-10">Welcome to Excellence</h2>
          <div className="w-12 h-1 bg-red-600 mb-10"></div>
          <p className="text-[16px] text-gray-600 leading-relaxed mb-6 font-serif">
            Dear Client,
          </p>
          <p className="text-[16px] text-gray-600 leading-relaxed mb-6 font-serif">
            It is with great pleasure that we present this curated vision for your upcoming event. Our team of seasoned professionals has meticulously crafted every detail to ensure an unforgettable experience that exceeds your highest expectations.
          </p>
          <p className="text-[16px] text-gray-600 leading-relaxed font-serif">
            From the initial concept to the final execution, EventHub360 is dedicated to delivering flawless service, unparalleled luxury, and memories that will last a lifetime.
          </p>
          <div className="mt-16">
            <p className="text-[18px] font-serif font-bold text-gray-900">Alex Chen</p>
            <p className="text-[13px] text-gray-400 uppercase tracking-widest mt-1">Senior Event Director</p>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: 'Event Vision',
      content: (
        <div className="w-full h-full bg-white p-24 text-left flex flex-col justify-center">
          <h2 className="text-[36px] font-serif font-bold text-gray-900 mb-10">The Vision</h2>
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Vision 1" className="w-full h-full object-cover" />
            </div>
            <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Vision 2" className="w-full h-full object-cover" />
            </div>
          </div>
          <p className="text-[16px] text-gray-600 leading-relaxed font-serif">
            Our design concept blends timeless elegance with modern sophistication. Expect lush floral arrangements, ambient lighting, and bespoke table settings that create an atmosphere of pure luxury.
          </p>
        </div>
      )
    },
    {
      id: 4,
      title: 'Pricing Summary',
      content: (
        <div className="w-full h-full bg-white p-24 flex flex-col justify-center">
          <h2 className="text-[36px] font-serif font-bold text-gray-900 mb-10">Investment Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-4 border-b border-gray-200">
              <span className="text-[16px] text-gray-700 font-medium">Venue & Location Setup</span>
              <span className="text-[16px] text-gray-900 font-bold">$24,500</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-gray-200">
              <span className="text-[16px] text-gray-700 font-medium">Gastronomy & Beverage</span>
              <span className="text-[16px] text-gray-900 font-bold">$32,000</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-gray-200">
              <span className="text-[16px] text-gray-700 font-medium">Decor & Floral Artistry</span>
              <span className="text-[16px] text-gray-900 font-bold">$18,200</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-gray-200">
              <span className="text-[16px] text-gray-700 font-medium">Audio-Visual & Entertainment</span>
              <span className="text-[16px] text-gray-900 font-bold">$15,800</span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-10 p-6 bg-[#F8F9FC] rounded-xl border border-[#ECECF1]">
            <span className="text-[18px] text-gray-900 font-bold uppercase tracking-wider">Estimated Total</span>
            <span className="text-[28px] text-red-700 font-black">$90,500</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 font-sans">
      
      {/* HEADER */}
      <div className="h-[72px] bg-black/50 backdrop-blur-md border-b border-gray-800 px-8 flex items-center justify-between shrink-0 sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
            <X className="w-5 h-5 text-gray-300" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-600/20 text-red-500 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-[16px] font-bold text-white leading-tight">The Eternal Grandeur</h2>
              <p className="text-[11px] text-gray-400 uppercase tracking-widest font-bold">Template Preview</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 mr-4 bg-gray-800 rounded-full p-1">
            <button 
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-700 disabled:opacity-50 text-gray-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-[13px] font-bold text-gray-300 w-16 text-center">
              {currentPage} / {totalPages}
            </span>
            <button 
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-700 disabled:opacity-50 text-gray-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <button className="px-5 py-2.5 bg-gray-800 text-white rounded-full font-bold text-[13px] hover:bg-gray-700 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" /> Export PDF
          </button>
          <button onClick={() => navigate('/templates/1/use')} className="px-6 py-2.5 bg-gradient-to-r from-red-700 to-orange-400 text-white rounded-full font-bold text-[14px] hover:shadow-lg transition-shadow flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Use Template
          </button>
        </div>
      </div>

      {/* DOCUMENT VIEWER */}
      <main className="flex-1 overflow-y-auto p-10 flex items-center justify-center bg-gray-900">
        {/* A4 sized paper container */}
        <div className="w-[850px] h-[1100px] bg-white shadow-2xl relative transition-all duration-500 transform-gpu origin-center overflow-hidden">
          {pages[currentPage - 1].content}
        </div>
      </main>

    </div>
  );
};

export default FullProposalPreview;
