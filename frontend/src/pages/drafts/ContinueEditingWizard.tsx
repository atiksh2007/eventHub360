import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import TopHeader from '../../components/TopHeader';
import { 
  ArrowLeft, Save, Send, CheckCircle2, ChevronRight, 
  MapPin, Calendar, Users, DollarSign, FileText, ChevronLeft, Loader
} from 'lucide-react';
import { api } from '../../services/api';

const ContinueEditingWizard = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const idFromUrl = searchParams.get('id');

  const [currentStep, setCurrentStep] = useState(1);
  const [saveStatus, setSaveStatus] = useState<any>(null);
  const [quoteId, setQuoteId] = useState<string | null>(idFromUrl);
  const [summary, setSummary] = useState<any>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    clientName: '',
    primaryContact: '',
    email: '',
    eventTitle: '',
    startDate: '',
    endDate: '',
    attendees: '',
    venue: '',
    venueNotes: ''
  });

  const [priceBookVenues, setPriceBookVenues] = useState<any[]>([]);

  useEffect(() => {
    api.getPriceBook('venues').then((data: any) => {
      if (data && data.items && data.items.length > 0) {
        setPriceBookVenues(data.items);
        if (!formData.venue) {
          setFormData(prev => ({ ...prev, venue: data.items[0].title }));
        }
      }
    }).catch(console.error);
  }, []);

  useEffect(() => {
    if (quoteId && quoteId !== 'NEW') {
      api.getQuoteDetails(quoteId).then((res: any) => {
        setSummary(res.summary);
        setFormData(prev => ({
          ...prev,
          clientName: res.clientName || res.metadata?.clientName || prev.clientName,
          eventTitle: res.eventType || res.metadata?.eventType || prev.eventTitle,
          startDate: (res.eventDate && res.eventDate !== 'TBD') ? res.eventDate : prev.startDate,
          attendees: (res.expectedGuests && res.expectedGuests !== 'TBD') ? res.expectedGuests : prev.attendees,
          email: res.metadata?.email || prev.email,
          primaryContact: res.metadata?.primaryContact || prev.primaryContact,
          endDate: res.metadata?.endDate || prev.endDate,
          venue: res.metadata?.venue || prev.venue,
          venueNotes: res.metadata?.venueNotes || prev.venueNotes,
        }));
      }).catch(console.error);
    }
  }, [quoteId]);

  const steps = [
    { id: 1, label: 'Client Info', icon: Users },
    { id: 2, label: 'Event Details', icon: Calendar },
    { id: 3, label: 'Venue Selection', icon: MapPin },
    { id: 4, label: 'Services Selection', icon: FileText },
    { id: 5, label: 'Pricing Configuration', icon: DollarSign },
    { id: 6, label: 'Proposal Preview', icon: CheckCircle2 }
  ];

  const handleSaveDraft = async () => {
    setSaveStatus('saving');
    try {
      const payload = {
        clientName: formData.clientName,
        eventType: formData.eventTitle,
        eventDate: formData.startDate,
        expectedGuests: formData.attendees,
        metadata: {
          email: formData.email,
          primaryContact: formData.primaryContact,
          endDate: formData.endDate,
          venue: formData.venue,
          venueNotes: formData.venueNotes
        }
      };
      
      if (quoteId && quoteId !== 'NEW') {
        await api.updateQuote(quoteId, payload);
      } else {
        const res: any = await api.createQuote(payload);
        if (res?.quoteId) {
          const newId = res.quoteId.replace('Q-', '');
          setSearchParams({ id: newId });
        }
      }
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (e) {
      console.error(e);
      setSaveStatus(null);
      alert('Failed to save draft. Is backend running?');
    }
  };

  const handleOpenAdvancedBuilder = async () => {
    setSaveStatus('saving');
    try {
      const payload = {
        clientName: formData.clientName,
        eventType: formData.eventTitle,
        eventDate: formData.startDate,
        expectedGuests: formData.attendees,
        metadata: {
          email: formData.email,
          primaryContact: formData.primaryContact,
          endDate: formData.endDate,
          venue: formData.venue,
          venueNotes: formData.venueNotes
        }
      };

      let currentId = quoteId;
      if (!currentId || currentId === 'NEW') {
        const res: any = await api.createQuote(payload);
        if (res?.quoteId) {
          currentId = res.quoteId.replace('Q-', '');
          setSearchParams({ id: currentId as string });
        }
      } else {
        await api.updateQuote(currentId, payload);
      }
      navigate(`/quotation-builder?id=${currentId}`);
    } catch (e) {
      console.error(e);
      setSaveStatus(null);
      alert('Failed to save before opening builder.');
    }
  };

  const handleSubmitQuotation = async () => {
    setSaveStatus('submitting');
    try {
      const payload = {
        clientName: formData.clientName,
        eventType: formData.eventTitle,
        eventDate: formData.startDate,
        expectedGuests: formData.attendees,
        metadata: {
          email: formData.email,
          primaryContact: formData.primaryContact,
          endDate: formData.endDate,
          venue: formData.venue,
          venueNotes: formData.venueNotes
        }
      };

      let currentQuoteId = quoteId;
      if (!currentQuoteId || currentQuoteId === 'NEW') {
        const res: any = await api.createQuote(payload);
        if (res?.quoteId) {
          currentQuoteId = res.quoteId.replace('Q-', '');
          setSearchParams({ id: currentQuoteId as string });
        }
      } else {
        await api.updateQuote(currentQuoteId, payload);
      }
      
      // Submit for approval
      await api.requestApproval(currentQuoteId as string, {
        requester: formData.primaryContact || formData.clientName || 'System User',
        executiveSummary: formData.venueNotes || 'Please review this newly generated quote.',
        priority: 'STANDARD'
      });
      
      navigate('/approvals');
    } catch (e) {
      console.error("Submit failed", e);
      setSaveStatus(null);
      alert('Failed to submit for approval.');
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans">
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        <TopHeader />
        
        <main className="flex-1 overflow-y-auto p-8 pb-32">
          <div className="max-w-[1200px] mx-auto space-y-6">
            
            {/* Header Area */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate('/quotations/drafts')}
                  className="w-10 h-10 bg-white border border-[#ECECF1] rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">{formData.eventTitle || 'New Quotation Draft'}</h1>
                  <p className="text-[15px] text-gray-500 mt-1">Draft Quote • {formData.clientName || 'Client Name'} • {quoteId ? `Q-${quoteId}` : 'Unsaved'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleSaveDraft}
                  disabled={saveStatus === 'saving' || saveStatus === 'submitting'}
                  className="px-5 py-2.5 bg-white border border-[#ECECF1] text-gray-700 rounded-full font-bold text-[14px] hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2"
                >
                  {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'success' ? <><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Saved</> : <><Save className="w-4 h-4" /> Save Draft</>}
                </button>
              </div>
            </div>

            {/* Wizard Navigation */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#ECECF1] mb-6 flex justify-between items-center relative overflow-x-auto">
              <div className="absolute left-10 right-10 top-1/2 h-0.5 bg-gray-100 -z-0"></div>
              {steps.map((step: any) => (
                <div key={step.id} className="relative z-10 flex flex-col items-center gap-2 bg-white px-4 min-w-[120px]">
                  <button 
                    onClick={() => setCurrentStep(step.id)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      currentStep === step.id ? 'bg-red-600 text-white shadow-md' : 
                      currentStep > step.id ? 'bg-emerald-500 text-white' : 'bg-[#F8F9FC] border border-[#ECECF1] text-gray-400'
                    }`}
                  >
                    <step.icon className="w-5 h-5" />
                  </button>
                  <span className={`text-[12px] font-bold ${currentStep === step.id ? 'text-gray-900' : 'text-gray-500'}`}>{step.label}</span>
                </div>
              ))}
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-[24px] shadow-sm border border-[#ECECF1] min-h-[500px] flex flex-col">
              
              <div className="p-8 flex-1">
                {currentStep === 1 && (
                  <div className="max-w-xl mx-auto space-y-6 animate-in fade-in duration-300 py-4">
                    <h2 className="text-[24px] font-bold text-gray-900 mb-6">Client Information</h2>
                    <div>
                      <label className="block text-[13px] font-bold text-gray-700 mb-2">Client Name</label>
                      <input value={formData.clientName} onChange={e => setFormData({...formData, clientName: e.target.value})} type="text" className="w-full h-12 bg-[#F8F9FC] border border-[#ECECF1] rounded-[12px] px-4 text-[15px] font-medium text-gray-900 focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all" placeholder="e.g. Acme Corporation" />
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold text-gray-700 mb-2">Primary Contact</label>
                      <input value={formData.primaryContact} onChange={e => setFormData({...formData, primaryContact: e.target.value})} type="text" className="w-full h-12 bg-[#F8F9FC] border border-[#ECECF1] rounded-[12px] px-4 text-[15px] font-medium text-gray-900 focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all" placeholder="e.g. Jane Doe" />
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold text-gray-700 mb-2">Email Address</label>
                      <input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} type="email" className="w-full h-12 bg-[#F8F9FC] border border-[#ECECF1] rounded-[12px] px-4 text-[15px] font-medium text-gray-900 focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all" placeholder="jane.doe@example.com" />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="max-w-xl mx-auto space-y-6 animate-in fade-in duration-300 py-4">
                    <h2 className="text-[24px] font-bold text-gray-900 mb-6">Event Details</h2>
                    <div>
                      <label className="block text-[13px] font-bold text-gray-700 mb-2">Event Title</label>
                      <input value={formData.eventTitle} onChange={e => setFormData({...formData, eventTitle: e.target.value})} type="text" className="w-full h-12 bg-[#F8F9FC] border border-[#ECECF1] rounded-[12px] px-4 text-[15px] font-medium text-gray-900 focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all" placeholder="e.g. Annual Tech Summit 2024" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[13px] font-bold text-gray-700 mb-2">Start Date</label>
                        <input value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} type="date" className="w-full h-12 bg-[#F8F9FC] border border-[#ECECF1] rounded-[12px] px-4 text-[15px] font-medium text-gray-900 focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all" />
                      </div>
                      <div>
                        <label className="block text-[13px] font-bold text-gray-700 mb-2">End Date</label>
                        <input value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} type="date" className="w-full h-12 bg-[#F8F9FC] border border-[#ECECF1] rounded-[12px] px-4 text-[15px] font-medium text-gray-900 focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold text-gray-700 mb-2">Expected Attendees</label>
                      <input value={formData.attendees} onChange={e => setFormData({...formData, attendees: e.target.value})} type="number" className="w-full h-12 bg-[#F8F9FC] border border-[#ECECF1] rounded-[12px] px-4 text-[15px] font-medium text-gray-900 focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all" placeholder="250" />
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="max-w-xl mx-auto space-y-6 animate-in fade-in duration-300 py-4">
                    <h2 className="text-[24px] font-bold text-gray-900 mb-6">Venue Selection</h2>
                    <div>
                      <label className="block text-[13px] font-bold text-gray-700 mb-2">Select Venue</label>
                      <select value={formData.venue} onChange={e => setFormData({...formData, venue: e.target.value})} className="w-full h-12 bg-[#F8F9FC] border border-[#ECECF1] rounded-[12px] px-4 text-[15px] font-medium text-gray-900 focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all">
                        {priceBookVenues.map((v: any, idx: number) => (
                          <option key={v.id || idx} value={v.title}>{v.title}</option>
                        ))}
                        <option value="Custom/Other Venue">Custom/Other Venue</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold text-gray-700 mb-2">Venue Notes/Requirements</label>
                      <textarea value={formData.venueNotes} onChange={e => setFormData({...formData, venueNotes: e.target.value})} className="w-full h-32 bg-[#F8F9FC] border border-[#ECECF1] rounded-[12px] p-4 text-[15px] font-medium text-gray-900 focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all resize-none" placeholder="Specific seating arrangements, AV requirements, etc."></textarea>
                    </div>
                  </div>
                )}

                {(currentStep === 4 || currentStep === 5) && (
                  <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
                      <FileText className="w-8 h-8 text-red-600" />
                    </div>
                    <h2 className="text-[20px] font-bold text-gray-900 mb-2">Use Quotation Builder</h2>
                    <p className="text-[14px] text-gray-500 mb-6">
                      For detailed Services Selection and Pricing Configuration, please jump to the advanced Quotation Builder interface.
                    </p>
                    <button 
                      onClick={handleOpenAdvancedBuilder}
                      className="px-6 py-2.5 bg-gray-900 text-white rounded-full font-bold text-[14px] hover:bg-gray-800 transition-colors"
                    >
                      Open Advanced Builder
                    </button>
                  </div>
                )}

                {currentStep === 6 && (
                  <div className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center border border-[#ECECF1]">
                      <FileText className="w-10 h-10 text-gray-300" />
                    </div>
                    <h2 className="text-[24px] font-bold text-gray-900">Finalize & Request Approval</h2>
                    <p className="text-[15px] text-gray-500 leading-relaxed">
                      You are currently at Step 6. Once you submit this draft, it will be automatically routed to the necessary stakeholders for approval based on the configured margins and discounts.
                    </p>
                    
                    <div className="p-6 bg-[#F8F9FC] rounded-[20px] border border-[#ECECF1] w-full text-left grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Subtotal</p>
                        <p className="text-[16px] font-bold text-gray-900">{summary?.subtotal || 'TBD'}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Tax (18%)</p>
                        <p className="text-[16px] font-bold text-gray-900">{summary?.taxes || 'TBD'}</p>
                      </div>
                      <div className="col-span-2 pt-4 border-t border-[#ECECF1]">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Grand Total</p>
                        <p className="text-[24px] font-bold text-red-600">{summary?.totalQuoteValue || 'Pending Builder Calculation'}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Nav */}
              <div className="p-6 border-t border-[#ECECF1] bg-[#F8F9FC] rounded-b-[24px] flex items-center justify-between">
                <button 
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  className={`px-6 py-2.5 bg-white border border-[#ECECF1] text-gray-700 rounded-full font-bold text-[14px] hover:bg-gray-50 transition-colors flex items-center gap-2 ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={currentStep === 1}
                >
                  <ChevronLeft className="w-4 h-4" /> Previous Step
                </button>
                
                {currentStep < 6 ? (
                  <button 
                    onClick={() => {
                      if(currentStep === 3) handleSaveDraft();
                      setCurrentStep(Math.min(6, currentStep + 1));
                    }}
                    className="px-8 py-2.5 bg-gray-900 text-white rounded-full font-bold text-[14px] hover:bg-gray-800 transition-colors flex items-center gap-2"
                  >
                    Next Step <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button 
                    onClick={handleSubmitQuotation}
                    disabled={saveStatus === 'submitting'}
                    className="px-8 py-2.5 bg-gradient-to-r from-red-700 to-orange-400 text-white rounded-full font-bold text-[14px] shadow-sm hover:shadow-md transition-all flex items-center gap-2"
                  >
                    {saveStatus === 'submitting' ? <Loader className="w-4 h-4 animate-spin" /> : 'Submit for Approval'} <Send className="w-4 h-4 ml-1" />
                  </button>
                )}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default ContinueEditingWizard;
