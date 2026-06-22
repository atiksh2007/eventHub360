import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '../components/Sidebar';
import BuilderTopHeader from '../components/BuilderTopHeader';
import ServiceAccordion from '../components/ServiceAccordion';
import QuotationTableEditor from '../components/QuotationTableEditor';
import QuoteSummaryCard from '../components/QuoteSummaryCard';
import ProfitMarginCard from '../components/ProfitMarginCard';
import EventInfoCard from '../components/EventInfoCard';
import ProposalGeneratorCard from '../components/ProposalGeneratorCard';
import { MapPin, Palette, Utensils, Music, Save, Loader, CheckCircle } from 'lucide-react';
import { api } from '../services/api';
import { useSearchParams } from 'react-router-dom';

const QUOTE_ID = 'Q-8829'; // Default fallback quote ID

const sectionKeys = [
  { key: 'Venue Selection', icon: MapPin, label: 'Venue Selection' },
  { key: 'Floral & Decoration', icon: Palette, label: 'Floral & Decoration' },
  { key: 'Gourmet Catering', icon: Utensils, label: 'Gourmet Catering' },
  { key: 'Entertainment & Sound', icon: Music, label: 'Entertainment & Sound' },
];

const QuotationBuilder = () => {
  const [searchParams] = useSearchParams();
  const quoteId = searchParams.get('id') || QUOTE_ID;

  const [quoteData, setQuoteData] = useState<any>(null);
  const [sections, setSections] = useState<Record<string, any[]>>({
    'Venue Selection': [],
    'Floral & Decoration': [],
    'Gourmet Catering': [],
    'Entertainment & Sound': [],
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [summary, setSummary] = useState<any>({
    subtotal: 0, taxes: '$0.00', serviceCharge: '$0.00',
    totalQuoteValue: '$0.00', netProfitMarginPct: '0%'
  });

  // Load from backend on mount
  useEffect(() => {
    api.getQuoteDetails(quoteId)
      .then((res: any) => {
        setQuoteData(res);
        setSummary(res.summary || {});
        const rebuilt: Record<string, any[]> = {
          'Venue Selection': [],
          'Floral & Decoration': [],
          'Gourmet Catering': [],
          'Entertainment & Sound': [],
        };
        (res.sections || []).forEach((sec: any) => {
          rebuilt[sec.categoryName] = (sec.items || []).map((item: any) => ({
            id: item.id || Math.random().toString(36).substr(2, 9),
            description: item.description || 'Service Item',
            qty: item.qty || item.quantity || 1,
            price: item.unitPrice || item.price || item.rate || 0,
            discount: item.discountPct || item.discount || 0,
            categoryName: sec.categoryName,
          }));
        });
        setSections(rebuilt);
      })
      .catch((err: any) => {
        console.warn('Backend offline, using local state. Error:', err.message);
      });
  }, [quoteId]);

  const calculateSubtotal = () => {
    let subtotal = 0;
    Object.values(sections).forEach((items: any) => {
      items.forEach((item: any) => {
        subtotal += (item.qty * item.price) * (1 - item.discount / 100);
      });
    });
    return subtotal;
  };

  const handleUpdate = (sectionKey: string, id: string, field: string, value: any) => {
    setSections(prev => ({
      ...prev,
      [sectionKey]: prev[sectionKey].map((item: any) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
    setSaved(false);
  };

  const handleDelete = (sectionKey: string, id: string) => {
    setSections(prev => ({
      ...prev,
      [sectionKey]: prev[sectionKey].filter((item: any) => item.id !== id)
    }));
    setSaved(false);
  };

  const handleAdd = (sectionKey: string) => {
    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      description: 'New Item',
      qty: 1,
      price: 0,
      discount: 0,
      categoryName: sectionKey,
    };
    setSections(prev => ({
      ...prev,
      [sectionKey]: [...prev[sectionKey], newItem]
    }));
    setSaved(false);
  };

  const handleSave = useCallback(async () => {
    setSaving(true);
    try {
      // Flatten all sections to a single items array
      const allItems: any[] = [];
      Object.entries(sections).forEach(([categoryName, items]) => {
        items.forEach((item: any) => {
          allItems.push({
            categoryName,
            description: item.description,
            qty: item.qty,
            price: item.price,
            discount: item.discount,
          });
        });
      });

      const updated = await api.syncQuoteItems(quoteId, allItems);
      if (updated?.summary) {
        setSummary(updated.summary);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      console.error('Failed to save to backend:', err.message);
      alert('Save failed. Please ensure the backend is running on port 3000.');
    } finally {
      setSaving(false);
    }
  }, [sections, quoteId]);

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans">
      <Sidebar />
      
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        <BuilderTopHeader />
        
        <main className="flex-1 overflow-y-auto p-8 pb-20">
          <div className="max-w-[1400px] mx-auto">
            
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-4">
                  <h1 className="text-[40px] font-bold text-gray-900 tracking-tight leading-none">
                    {quoteData?.title || 'Royal Wedding Gala'}
                  </h1>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-3 py-1 bg-[#F8E3A5] text-[#2F2100] text-[12px] font-bold rounded-full uppercase tracking-wider">
                      {quoteData?.clientTier || 'Premium Client'}
                    </span>
                    <span className="px-3 py-1 bg-[#EDE9FE] text-[#7C3AED] text-[12px] font-bold rounded-full uppercase tracking-wider">
                      {quoteData?.status || 'Draft'}
                    </span>
                  </div>
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className={`flex items-center gap-2 px-6 py-3 rounded-[14px] font-bold text-[15px] shadow-sm transition-all ${
                    saved
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                      : 'bg-gradient-to-r from-red-600 to-orange-400 text-white shadow-[0_4px_12px_rgba(220,38,38,0.2)] hover:shadow-[0_6px_16px_rgba(220,38,38,0.3)]'
                  }`}
                >
                  {saving ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : saved ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {saving ? 'Saving...' : saved ? 'Saved to DB' : 'Save to Database'}
                </button>
              </div>

              <p className="text-[16px] font-medium text-gray-500">
                Quote #{quoteId} | {quoteData?.lastEdited || 'Last edited 2 mins ago'}
              </p>
            </div>

            {/* Layout Grid */}
            <div className="flex flex-col xl:flex-row gap-8">
              
              {/* Left Column - Builder Content */}
              <div className="flex-1 xl:w-[70%]">
                {sectionKeys.map(({ key, icon, label }) => (
                  <ServiceAccordion key={key} icon={icon} title={label}>
                    {sections[key].length === 0 && key === 'Gourmet Catering' ? (
                      <div className="py-8 flex flex-col items-center justify-center text-center">
                        <p className="text-[15px] font-medium text-gray-500 mb-6">No catering items added yet.</p>
                        <button 
                          onClick={() => handleAdd(key)}
                          className="px-6 py-2.5 rounded-full border border-red-200 text-red-600 font-bold text-[14px] hover:bg-red-50 transition-colors"
                        >
                          Browse Catering Catalog
                        </button>
                      </div>
                    ) : (
                      <QuotationTableEditor 
                        items={sections[key]}
                        onAdd={() => handleAdd(key)}
                        onUpdate={(id: any, f: any, v: any) => handleUpdate(key, id, f, v)}
                        onDelete={(id: any) => handleDelete(key, id)}
                      />
                    )}
                  </ServiceAccordion>
                ))}
              </div>

              {/* Right Column - Sticky Panel */}
              <div className="w-full xl:w-[30%] relative">
                <div className="sticky top-0 pt-2">
                  <QuoteSummaryCard subtotal={calculateSubtotal()} dbSummary={summary} />
                  <ProfitMarginCard margin={quoteData?.summary?.netProfitMarginPct?.replace('%','') || 0} />
                  <EventInfoCard />
                  <ProposalGeneratorCard />
                </div>
              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default QuotationBuilder;
