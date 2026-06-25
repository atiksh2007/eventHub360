import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ProposalToolbar from '../components/ProposalToolbar';
import DocumentMap from '../components/DocumentMap';
import ProposalCanvas from '../components/ProposalCanvas';
import ProposalToolsPanel from '../components/ProposalToolsPanel';
import ProposalSettingsCard from '../components/ProposalSettingsCard';
import { CollaborationCard, SendStatusCard } from '../components/CollaborationCard';
import { api } from '../services/api';
import { FileText, Send, Loader2, X } from 'lucide-react';

export type ElementType = 'header' | 'text' | 'image' | 'pricing';

export interface CanvasElement {
  id: string;
  type: ElementType;
  content?: string;
  url?: string;
  color?: string;
  fontSize?: string;
  borderRadius?: string;
}

const initialPages = [
  { id: 'cover', title: 'Cover Page', type: 'cover' },
  { id: 'moodboard', title: 'Moodboard', type: 'moodboard' },
  { id: 'agenda', title: 'Event Timeline', type: 'agenda' },
  { id: 'pricing', title: 'Investment', type: 'pricing' },
];

const PREMADE_THEMES: Record<string, Record<string, CanvasElement[]>> = {
  modern: {
    cover: [
      { id: 'c1', type: 'image', url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80', borderRadius: '0px' },
      { id: 'c2', type: 'header', content: 'Minimalist Event Proposal', fontSize: '56px', color: '#111827' },
      { id: 'c3', type: 'text', content: 'Clean, elegant, and modern design for your upcoming event.\n\nPrepared specifically for you to outline our vision for the day.', fontSize: '18px', color: '#6B7280' }
    ],
    moodboard: [
      { id: 'm1', type: 'header', content: 'Design Direction', fontSize: '36px', color: '#111827' },
      { id: 'm2', type: 'image', url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80', borderRadius: '12px' },
      { id: 'm3', type: 'text', content: 'We will be using a combination of monochromatic tones with subtle earthy accents to create a timeless look.', fontSize: '16px', color: '#374151' }
    ],
    agenda: [
      { id: 'a1', type: 'header', content: 'Event Timeline', fontSize: '42px', color: '#111827' },
      { id: 'a2', type: 'text', content: '4:00 PM - Guest Arrival & Cocktails\n5:30 PM - Opening Remarks\n6:00 PM - Dinner Service\n8:00 PM - Entertainment & Dancing\n11:00 PM - Event Concludes', fontSize: '16px', color: '#4B5563' }
    ],
    pricing: [
      { id: 'p1', type: 'header', content: 'Investment Breakdown', fontSize: '42px', color: '#111827' },
      { id: 'p2', type: 'pricing', color: '#111827' }
    ]
  },
  royal: {
    cover: [
      { id: 'c1', type: 'image', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80', borderRadius: '24px' },
      { id: 'c2', type: 'header', content: 'The Royal Wedding', fontSize: '64px', color: '#B45309' },
      { id: 'c3', type: 'text', content: 'An unforgettable evening of luxury and eternal grandeur.\n\nCrafted with meticulous attention to detail to ensure a majestic experience.', fontSize: '20px', color: '#78350F' }
    ],
    moodboard: [
      { id: 'm1', type: 'header', content: 'The Golden Touch', fontSize: '42px', color: '#B45309' },
      { id: 'm2', type: 'image', url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80', borderRadius: '24px' },
      { id: 'm3', type: 'text', content: 'Lavish floral arrangements featuring deep reds and vibrant golds, paired with crystal chandeliers and ambient candle lighting.', fontSize: '18px', color: '#92400E' }
    ],
    agenda: [
      { id: 'a1', type: 'header', content: 'Royal Itinerary', fontSize: '48px', color: '#B45309' },
      { id: 'a2', type: 'text', content: '2:00 PM - Royal Procession\n3:00 PM - The Vows\n4:30 PM - Champagne Reception\n6:30 PM - Grand Banquet\n9:00 PM - The Royal Ball', fontSize: '18px', color: '#78350F' }
    ],
    pricing: [
      { id: 'p1', type: 'header', content: 'Royal Investment', fontSize: '48px', color: '#B45309' },
      { id: 'p2', type: 'pricing', color: '#B45309' }
    ]
  },
  corporate: {
    cover: [
      { id: 'c1', type: 'header', content: 'Tech Summit 2026', fontSize: '52px', color: '#1D4ED8' },
      { id: 'c2', type: 'text', content: 'Innovating the future of enterprise software.\n\nA comprehensive summit bringing together industry leaders and visionaries.', fontSize: '18px', color: '#374151' },
      { id: 'c3', type: 'image', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80', borderRadius: '8px' }
    ],
    moodboard: [
      { id: 'm1', type: 'header', content: 'Stage & Expo Design', fontSize: '38px', color: '#1D4ED8' },
      { id: 'm2', type: 'image', url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80', borderRadius: '4px' },
      { id: 'm3', type: 'text', content: 'Sleek geometric stage designs with massive LED backdrops, emphasizing neon blues and clean whites for a high-tech feel.', fontSize: '16px', color: '#4B5563' }
    ],
    agenda: [
      { id: 'a1', type: 'header', content: 'Summit Schedule', fontSize: '42px', color: '#1D4ED8' },
      { id: 'a2', type: 'text', content: '08:00 AM - Registration & Breakfast\n09:30 AM - Keynote Address\n11:00 AM - Breakout Sessions\n01:00 PM - Networking Lunch\n03:00 PM - Product Demos\n05:00 PM - Happy Hour', fontSize: '16px', color: '#374151' }
    ],
    pricing: [
      { id: 'p1', type: 'header', content: 'Sponsorship Investment', fontSize: '42px', color: '#1D4ED8' },
      { id: 'p2', type: 'pricing', color: '#1D4ED8' }
    ]
  },
  rustic: {
    cover: [
      { id: 'c1', type: 'image', url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80', borderRadius: '16px' },
      { id: 'c2', type: 'header', content: 'Rustic Outdoor Gala', fontSize: '48px', color: '#14532D' },
      { id: 'c3', type: 'text', content: 'Nature meets elegance.\n\nA serene and beautiful gathering under the stars, surrounded by nature.', fontSize: '18px', color: '#064E3B' }
    ],
    moodboard: [
      { id: 'm1', type: 'header', content: 'Natural Elements', fontSize: '36px', color: '#14532D' },
      { id: 'm2', type: 'image', url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80', borderRadius: '16px' },
      { id: 'm3', type: 'text', content: 'Reclaimed wood tables, mason jar centerpieces, string lights, and wildflowers in muted earth tones.', fontSize: '16px', color: '#166534' }
    ],
    agenda: [
      { id: 'a1', type: 'header', content: 'Evening Flow', fontSize: '40px', color: '#14532D' },
      { id: 'a2', type: 'text', content: '5:00 PM - Welcome Drinks in the Garden\n6:30 PM - Sunset Dinner under the Canopy\n8:30 PM - Live Acoustic Band\n10:30 PM - Late Night Smores by the Firepit', fontSize: '16px', color: '#064E3B' }
    ],
    pricing: [
      { id: 'p1', type: 'header', content: 'Gala Investment', fontSize: '40px', color: '#14532D' },
      { id: 'p2', type: 'pricing', color: '#14532D' }
    ]
  },
  luxury: {
    cover: [
      { id: 'c1', type: 'header', content: 'Classic Luxury Experience', fontSize: '56px', color: '#000000' },
      { id: 'c2', type: 'text', content: 'Uncompromising elegance and top-tier service.\n\nA bespoke event designed for the most discerning guests.', fontSize: '18px', color: '#111827' },
      { id: 'c3', type: 'image', url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80', borderRadius: '32px' }
    ],
    moodboard: [
      { id: 'm1', type: 'header', content: 'Elegance & Sophistication', fontSize: '40px', color: '#000000' },
      { id: 'm2', type: 'image', url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80', borderRadius: '0px' },
      { id: 'm3', type: 'text', content: 'Black tie aesthetic featuring stark contrast of black and white, silver accents, and minimalist high-end floral designs.', fontSize: '16px', color: '#374151' }
    ],
    agenda: [
      { id: 'a1', type: 'header', content: 'The Gala Timeline', fontSize: '46px', color: '#000000' },
      { id: 'a2', type: 'text', content: '7:00 PM - Black Tie Arrivals & Press Line\n8:00 PM - Multi-Course Tasting Menu\n10:00 PM - Featured Entertainment\n12:00 AM - Afterparty in the Lounge', fontSize: '16px', color: '#111827' }
    ],
    pricing: [
      { id: 'p1', type: 'header', content: 'Bespoke Investment', fontSize: '46px', color: '#000000' },
      { id: 'p2', type: 'pricing', color: '#000000' }
    ]
  }
};

const ProposalStudio = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState(initialPages);
  const [activePageId, setActivePageId] = useState(pages[0].id);

  const [elementsByPage, setElementsByPage] = useState<Record<string, CanvasElement[]>>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const currentElements = elementsByPage[activePageId] || [];

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
    setElementsByPage(prev => ({
      ...prev,
      [activePageId]: [...(prev[activePageId] || []), newEl]
    }));
    setSelectedId(newEl.id);
  };

  const updateElement = (id: string, updates: Partial<CanvasElement>) => {
    setElementsByPage(prev => ({
      ...prev,
      [activePageId]: (prev[activePageId] || []).map(el => el.id === id ? { ...el, ...updates } : el)
    }));
  };
  
  const deleteElement = (id: string) => {
    setElementsByPage(prev => ({
      ...prev,
      [activePageId]: (prev[activePageId] || []).filter(el => el.id !== id)
    }));
    if (selectedId === id) setSelectedId(null);
  };

  // Setup State
  const [isSetupOpen, setIsSetupOpen] = useState(true);
  const [approvedQuotes, setApprovedQuotes] = useState<any[]>([]);
  const [selectedQuoteId, setSelectedQuoteId] = useState('');
  const [proposalType, setProposalType] = useState('custom');
  const [selectedStyle, setSelectedStyle] = useState('modern');
  
  // Proposal Data
  const [proposalData, setProposalData] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    // Fetch approved quotes for the dropdown
    api.getLiveList('SENT', 1, 50).then((res: any) => {
      setApprovedQuotes(res.rows || []);
    });
  }, []);

  const handleStartEditing = async () => {
    if (!selectedQuoteId) return;
    
    // Fetch details to pre-fill canvas (mocking for prototype)
    const quote = approvedQuotes.find(q => q.quoteNumber === selectedQuoteId);
    setProposalData({
      clientName: quote?.clientName || 'Client',
      eventName: quote?.eventType || 'Event',
      totalAmount: quote?.totalAmount || '0.00',
      customNote: 'We are excited to propose the following for your event.',
      styleTheme: selectedStyle
    });

    if (proposalType === 'premade' && PREMADE_THEMES[selectedStyle]) {
      setElementsByPage(PREMADE_THEMES[selectedStyle]);
    } else {
      setElementsByPage({});
    }

    setIsSetupOpen(false);
  };

  const handleGenerateAndSend = async () => {
    setIsGenerating(true);
    try {
      const result = await api.generateProposal({
        quoteId: selectedQuoteId,
        elementsByPage,
        ...proposalData
      });
      if (result.success) {
        setGeneratedPdfUrl(result.url);
      }
    } catch (e) {
      console.error("Failed to generate PDF", e);
      alert("Failed to generate PDF. Make sure MinIO is running.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F7F8FC] font-sans overflow-hidden h-screen relative">
      <Sidebar />
      
      {/* SETUP OVERLAY */}
      {isSetupOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl w-[500px] p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[22px] font-bold text-gray-900">New Proposal Setup</h2>
              <button onClick={() => navigate('/quotations/approved-center')} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">Select Approved Quotation</label>
                <select 
                  className="w-full border border-[#ECECF1] rounded-xl p-3 text-[14px] bg-[#F8F9FC] focus:outline-none focus:border-red-300"
                  value={selectedQuoteId}
                  onChange={(e) => setSelectedQuoteId(e.target.value)}
                >
                  <option value="">-- Choose a Quote --</option>
                  {approvedQuotes.map(q => (
                    <option key={q.quoteNumber} value={q.quoteNumber}>
                      {q.quoteNumber} - {q.clientName} ({q.eventType})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">Creation Method</label>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button 
                    onClick={() => setProposalType('custom')}
                    className={`p-3 border rounded-xl text-center font-bold text-[14px] transition-colors ${proposalType === 'custom' ? 'border-red-500 bg-red-50 text-red-700' : 'border-[#ECECF1] bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    Custom Build
                  </button>
                  <button 
                    onClick={() => setProposalType('premade')}
                    className={`p-3 border rounded-xl text-center font-bold text-[14px] transition-colors ${proposalType === 'premade' ? 'border-red-500 bg-red-50 text-red-700' : 'border-[#ECECF1] bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    Pre-made Theme
                  </button>
                </div>

                {proposalType === 'premade' && (
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-2">Select Theme</label>
                    <select 
                      className="w-full border border-[#ECECF1] rounded-xl p-3 text-[14px] bg-[#F8F9FC] focus:outline-none focus:border-red-300"
                      value={selectedStyle}
                      onChange={(e) => setSelectedStyle(e.target.value)}
                    >
                      <option value="modern">Modern Minimalist</option>
                      <option value="royal">The Royal Wedding</option>
                      <option value="corporate">Corporate Tech Summit</option>
                      <option value="rustic">Rustic Outdoor Gala</option>
                      <option value="luxury">Classic Luxury</option>
                    </select>
                  </div>
                )}
              </div>

              <button 
                onClick={handleStartEditing}
                disabled={!selectedQuoteId}
                className="w-full py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                Start Editing Proposal
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 ml-[260px] flex flex-col h-full overflow-hidden">
        {/* Mock Toolbar with Preview & Send Button */}
        <header className="h-[72px] bg-white border-b border-[#ECECF1] flex items-center justify-between px-6 shrink-0">
          <div>
            <h1 className="text-[18px] font-bold text-gray-900">Proposal Studio</h1>
            <p className="text-[13px] text-gray-500">Editing {proposalData?.clientName}'s Proposal</p>
          </div>
          <div className="flex gap-3">
             <button 
               onClick={handleGenerateAndSend}
               disabled={isGenerating || !selectedQuoteId}
               className="px-6 py-2 bg-emerald-600 text-white font-bold text-[13px] rounded-full hover:bg-emerald-700 transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50"
             >
               {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
               {isGenerating ? 'Generating PDF...' : 'Preview & Send to Client'}
             </button>
          </div>
        </header>
        
        <main className="flex-1 flex overflow-hidden relative">
          
          {/* Left Column - Document Map (22%) */}
          <DocumentMap 
            pages={pages} 
            setPages={setPages} 
            activePageId={activePageId} 
            onPageSelect={setActivePageId} 
          />

          {/* Center Column - Canvas (58%) */}
          <div className="flex-1 bg-[#F7F8FC] overflow-y-auto p-8 flex justify-center custom-scrollbar">
            {generatedPdfUrl ? (
              <div className="w-full max-w-[800px] h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                <div className="bg-emerald-50 text-emerald-700 p-4 font-bold border-b border-emerald-100 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  PDF Successfully Generated and Saved to Storage!
                </div>
                <iframe src={generatedPdfUrl} className="w-full flex-1" title="PDF Preview" />
              </div>
            ) : (
              <ProposalCanvas 
                elements={currentElements}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
              />
            )}
          </div>

          {/* Right Column - Tools (20%) */}
          <div className="w-[20%] min-w-[280px] max-w-[320px] bg-[#F7F8FC] border-l border-[#ECECF1] h-full overflow-y-auto custom-scrollbar shrink-0" onClick={() => setSelectedId(null)}>
            <div className="p-6">
              <div onClick={(e) => e.stopPropagation()}>
                <ProposalToolsPanel 
                  elements={currentElements}
                  selectedId={selectedId}
                  addElement={addElement}
                  updateElement={updateElement}
                  deleteElement={deleteElement}
                />
              </div>
              <ProposalSettingsCard />
              <CollaborationCard />
              <SendStatusCard />
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default ProposalStudio;
