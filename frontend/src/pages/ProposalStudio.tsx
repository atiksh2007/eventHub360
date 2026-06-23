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

const initialPages = [
  { id: 'cover', title: 'Cover Page', type: 'cover' },
  { id: 'moodboard', title: 'Moodboard', type: 'moodboard' },
  { id: 'agenda', title: 'Event Timeline', type: 'agenda' },
];

const ProposalStudio = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState(initialPages);
  const [activePageId, setActivePageId] = useState(pages[0].id);

  // Setup State
  const [isSetupOpen, setIsSetupOpen] = useState(true);
  const [approvedQuotes, setApprovedQuotes] = useState<any[]>([]);
  const [selectedQuoteId, setSelectedQuoteId] = useState('');
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

    setIsSetupOpen(false);
  };

  const handleGenerateAndSend = async () => {
    setIsGenerating(true);
    try {
      const result = await api.generateProposal({
        quoteId: selectedQuoteId,
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
                <label className="block text-[13px] font-bold text-gray-700 mb-2">Proposal Theme</label>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setSelectedStyle('modern')}
                    className={`p-4 border rounded-xl text-left transition-colors ${selectedStyle === 'modern' ? 'border-red-500 bg-red-50 text-red-700' : 'border-[#ECECF1] bg-white text-gray-700'}`}
                  >
                    <div className="font-bold text-[14px]">Modern Minimal</div>
                    <div className="text-[12px] opacity-80 mt-1">Clean, white background</div>
                  </button>
                  <button 
                    onClick={() => setSelectedStyle('luxury')}
                    className={`p-4 border rounded-xl text-left transition-colors ${selectedStyle === 'luxury' ? 'border-red-500 bg-red-50 text-red-700' : 'border-[#ECECF1] bg-white text-gray-700'}`}
                  >
                    <div className="font-bold text-[14px]">Classic Luxury</div>
                    <div className="text-[12px] opacity-80 mt-1">Rich, warm off-white</div>
                  </button>
                </div>
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
              <ProposalCanvas />
            )}
          </div>

          {/* Right Column - Tools (20%) */}
          <div className="w-[20%] min-w-[280px] max-w-[320px] bg-[#F7F8FC] border-l border-[#ECECF1] h-full overflow-y-auto custom-scrollbar shrink-0">
            <div className="p-6">
              <ProposalToolsPanel />
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
