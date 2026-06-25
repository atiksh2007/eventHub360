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
import { useSearchParams, useNavigate } from 'react-router-dom';

const QUOTE_ID = 'Q-8829'; // Default fallback quote ID

const sectionKeys = [
  { key: 'Venue Selection', icon: MapPin, label: 'Venue Selection' },
  { key: 'Floral & Decoration', icon: Palette, label: 'Floral & Decoration' },
  { key: 'Gourmet Catering', icon: Utensils, label: 'Gourmet Catering' },
  { key: 'Entertainment & Sound', icon: Music, label: 'Entertainment & Sound' },
];

const QuotationBuilder = () => {
  const navigate = useNavigate();
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

  const [priceBookVenues, setPriceBookVenues] = useState<any[]>([]);
  const [priceBookCatering, setPriceBookCatering] = useState<any[]>([]);
  const [priceBookEntertainment, setPriceBookEntertainment] = useState<any[]>([]);
  const [priceBookFloral, setPriceBookFloral] = useState<any[]>([]);

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
        
        // Auto-inject venue from draft metadata if section is empty
        if (rebuilt['Venue Selection'].length === 0 && res.metadata?.venue) {
          rebuilt['Venue Selection'].push({
            id: Math.random().toString(36).substr(2, 9),
            description: res.metadata.venue,
            qty: 1,
            price: 0, // Let the user select the matching price from dropdown or it will be populated later
            discount: 0,
            categoryName: 'Venue Selection',
          });
        }

        // Auto-inject default Floral if empty
        if (rebuilt['Floral & Decoration'].length === 0) {
          rebuilt['Floral & Decoration'].push({
            id: Math.random().toString(36).substr(2, 9),
            description: 'Premium Grand Centerpiece',
            qty: 10, // Default to 10 tables
            price: 450, // Default price from our catalog
            discount: 0,
            categoryName: 'Floral & Decoration',
          });
        }

        // Auto-inject default Catering if empty
        if (rebuilt['Gourmet Catering'].length === 0) {
          rebuilt['Gourmet Catering'].push({
            id: Math.random().toString(36).substr(2, 9),
            description: 'Gourmet Catering Standard',
            qty: res.expectedGuests || 100, // Default to 100 or expected guests
            price: 120, // Default price from our catalog
            discount: 0,
            categoryName: 'Gourmet Catering',
          });
        }

        // Auto-inject default Entertainment if empty
        if (rebuilt['Entertainment & Sound'].length === 0) {
          rebuilt['Entertainment & Sound'].push({
            id: Math.random().toString(36).substr(2, 9),
            description: 'Elite Live Band',
            qty: 1,
            price: 4500, // Default price from our catalog
            discount: 0,
            categoryName: 'Entertainment & Sound',
          });
        }
        
        setSections(rebuilt);
      })
      .catch((err: any) => {
        console.warn('Backend offline, using local state. Error:', err.message);
      });
  }, [quoteId]);

  useEffect(() => {
    api.getPriceBook('venues').then((data: any) => {
      if (data && data.items && data.items.length > 0) setPriceBookVenues(data.items);
    }).catch(console.error);

    api.getPriceBook('floral').then((data: any) => {
      if (data && data.items && data.items.length > 0) setPriceBookFloral(data.items);
    }).catch(console.error);

    api.getPriceBook('catering').then((data: any) => {
      if (data && data.items && data.items.length > 0) setPriceBookCatering(data.items);
    }).catch(console.error);

    api.getPriceBook('entertainment').then((data: any) => {
      if (data && data.items && data.items.length > 0) setPriceBookEntertainment(data.items);
    }).catch(console.error);
  }, []);

  const handleApplyPricingConfig = async (config: { discountGlobal: number; chargeService: number }) => {
    if (!quoteId) return;
    try {
      setSaving(true);
      const res = await api.calculateQuote(quoteId, config);
      
      if (res?.summary) {
        setSummary(res.summary);
        setQuoteData((prev: any) => prev ? { ...prev, summary: res.summary } : null);
      }
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      console.error(e);
      setSaving(false);
      alert('Failed to apply pricing configuration.');
    }
  };

  const calculateSubtotal = () => {
    let subtotal = 0;
    Object.values(sections).forEach((items: any) => {
      items.forEach((item: any) => {
        subtotal += (item.qty * item.price) * (1 - item.discount / 100);
      });
    });
    return subtotal;
  };

  const calculateMargin = () => {
    let subtotal = 0;
    let costTotal = 0;
    Object.values(sections).forEach((items: any) => {
      items.forEach((item: any) => {
        subtotal += (item.qty * item.price) * (1 - item.discount / 100);
        costTotal += (item.cost || item.price * 0.7) * item.qty;
      });
    });

    const discountGlobal = summary?.discountGlobal ? Number(summary.discountGlobal) : 0;
    const serviceCharge = summary?.serviceCharge ? parseFloat(String(summary.serviceCharge).replace(/[$,]/g, '')) : 0;
    
    const revenueTotal = subtotal - discountGlobal + serviceCharge;
    const profit = revenueTotal - costTotal;

    if (revenueTotal <= 0) return 0;
    return ((profit / revenueTotal) * 100).toFixed(1);
  };

  const handleUpdate = (sectionKey: string, id: string, field: string, value: any) => {
    setSections(prev => {
      let additionalUpdates: any = {};
      
      if (field === 'description') {
        let catalog: any[] = [];
        if (sectionKey === 'Venue Selection') catalog = priceBookVenues;
        if (sectionKey === 'Floral & Decoration') catalog = priceBookFloral;
        if (sectionKey === 'Gourmet Catering') catalog = priceBookCatering;
        if (sectionKey === 'Entertainment & Sound') catalog = priceBookEntertainment;
        
        const matchedItem = catalog.find(v => v.title === value);
        if (matchedItem) {
          const rawPrice = String(matchedItem.price || matchedItem.basePricing || '0').replace(/[^0-9.]/g, '');
          additionalUpdates.price = parseFloat(rawPrice) || 0;
          additionalUpdates.qty = 1;
        } else if (catalog.length > 0) { // Only reset to 0 if it was meant to be from catalog but didn't match
          additionalUpdates.price = 0;
        }
      }

      return {
        ...prev,
        [sectionKey]: prev[sectionKey].map((item: any) =>
          item.id === id ? { ...item, [field]: value, ...additionalUpdates } : item
        )
      };
    });
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
            costUnit: item.cost, // Include the cost back so backend maintains accurate margin
          });
        });
      });

      const updated = await api.syncQuoteItems(quoteId, allItems);
      if (updated?.summary) {
        setSummary(updated.summary);
        setQuoteData((prev: any) => prev ? { ...prev, summary: updated.summary } : null);
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
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigate(`/quotations/drafts/continue?id=${quoteId}`)}
                    className="flex items-center gap-2 px-6 py-3 rounded-[14px] font-bold text-[15px] bg-white border border-[#ECECF1] text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
                  >
                    Back to Wizard
                  </button>
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
                        availableItems={
                          key === 'Venue Selection' ? priceBookVenues : 
                          key === 'Floral & Decoration' ? priceBookFloral : 
                          key === 'Gourmet Catering' ? priceBookCatering : 
                          key === 'Entertainment & Sound' ? priceBookEntertainment : 
                          undefined
                        }
                      />
                    )}
                  </ServiceAccordion>
                ))}
              </div>

              {/* Right Column - Sticky Panel */}
              <div className="w-full xl:w-[30%] relative">
                <div className="sticky top-0 pt-2">
                  <QuoteSummaryCard subtotal={calculateSubtotal()} dbSummary={summary} onApplyPricingConfig={handleApplyPricingConfig} />
                  <ProfitMarginCard margin={calculateMargin()} />
                  <EventInfoCard quoteData={quoteData} />
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
