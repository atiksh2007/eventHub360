import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { 
  Search, Bell, History as ActivityIcon, Printer, 
  Upload, ChevronDown, Plus, LayoutGrid, List, MoreVertical,
  ChevronLeft, ChevronRight, LayoutDashboard, FileText, 
  Files, LayoutTemplate, CheckSquare, Users, Settings, HelpCircle, Trash2
} from 'lucide-react';

const headerTabs = [
  { label: 'All Quotes' },
  { label: 'Drafts' },
  { label: 'Pending Approval' },
  { label: 'History', active: true },
];

const categoryTabsList = ['Venues', 'Packages', 'Vendors', 'Services'];



const PriceBookHeader = () => (
  <div className="h-[72px] bg-white border-b border-[#ECECF1] px-8 flex items-center justify-between sticky top-0 z-10 shrink-0">
    <div className="w-[200px]">
      <h2 className="text-[20px] font-bold text-red-700 tracking-tight leading-tight">
        Quotation<br/>Management
      </h2>
    </div>
    <div className="flex-1 flex items-center gap-8 h-full px-4 overflow-x-auto no-scrollbar">
      <div className="flex items-center h-full gap-6 shrink-0">
        {headerTabs.map((tab: any, idx: any) => (
          <button
            key={idx}
            className={`h-full flex items-center relative text-[15px] font-semibold transition-colors ${
              tab.active ? 'text-red-700' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
            {tab.active && (
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-red-600 rounded-t-full" />
            )}
          </button>
        ))}
      </div>
      <div className="relative ml-4 shrink-0">
        <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search price book..."
          className="w-[280px] h-10 pl-10 pr-4 bg-gray-50 border border-transparent rounded-full text-[14px] font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400 transition-all placeholder:text-gray-400"
        />
      </div>
    </div>
    <div className="flex items-center gap-5 shrink-0 pl-4">
      <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
        <Bell className="w-[22px] h-[22px]" />
      </button>
      <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
        <ActivityIcon className="w-[22px] h-[22px]" />
      </button>
      <button className="relative text-gray-500 hover:text-gray-700 transition-colors hidden md:block">
        <Printer className="w-[22px] h-[22px]" />
      </button>
    </div>
  </div>
);

const CategoryTabs = () => {
  const [activeTab, setActiveTab] = useState('Venues');
  const [seasonalPricing, setSeasonalPricing] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  return (
    <div className="bg-white h-[80px] rounded-[24px] shadow-sm border border-[#ECECF1] px-6 flex items-center justify-between mb-8 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-2 p-1 bg-gray-50/50 rounded-full border border-[#ECECF1] shrink-0">
        {categoryTabsList.map((tab: any) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`h-10 px-6 rounded-full text-[14px] font-bold transition-all ${
              activeTab === tab
                ? 'bg-white text-red-700 shadow-[0_2px_8px_rgba(0,0,0,0.06)]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-8 shrink-0 pl-4">
        <div className="flex items-center gap-3">
          <span className="text-[14px] font-bold text-gray-700 hidden sm:block">Seasonal Pricing</span>
          <button 
            onClick={() => setSeasonalPricing(!seasonalPricing)}
            className={`w-11 h-[26px] rounded-full transition-colors relative flex items-center px-1 ${
              seasonalPricing ? 'bg-red-600' : 'bg-gray-200'
            }`}
          >
            <div className={`w-[18px] h-[18px] bg-white rounded-full shadow-sm transition-transform ${
              seasonalPricing ? 'translate-x-[20px]' : 'translate-x-0'
            }`} />
          </button>
        </div>
        <div className="w-px h-8 bg-[#ECECF1] hidden sm:block"></div>
        <div className="flex items-center gap-2 p-1 bg-gray-50/50 rounded-xl border border-[#ECECF1]">
          <button 
            onClick={() => setViewMode('grid')}
            className={`w-10 h-10 flex items-center justify-center rounded-[8px] transition-all ${
              viewMode === 'grid' 
                ? 'bg-red-50 text-red-600 shadow-sm' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`w-10 h-10 flex items-center justify-center rounded-[8px] transition-all ${
              viewMode === 'list' 
                ? 'bg-red-50 text-red-600 shadow-sm' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const PricingBadge = ({ text  }: any) => (
  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-red-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
    {text}
  </span>
);

const VenueCard = ({ venue, onDelete  }: any) => (
  <div className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-[#ECECF1] overflow-hidden hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col group cursor-pointer h-full">
    <div className="relative h-[220px] w-full overflow-hidden shrink-0">
      <img 
        src={venue.image} 
        alt={venue.title} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <PricingBadge text={venue.badge} />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
    </div>
    <div className="p-6 flex flex-col flex-1 relative">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-[20px] font-bold text-gray-900 leading-tight pr-6">
          {venue.title}
        </h3>
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete && onDelete(venue.id); }}
          className="absolute top-6 right-5 text-gray-300 hover:text-red-500 transition-colors p-1 -mr-1"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
      <p className="text-[14px] font-medium text-gray-500 line-clamp-2 leading-relaxed mb-6">
        {venue.description}
      </p>
      <div className="mt-auto">
        <div className="w-full h-px bg-[#ECECF1] mb-5"></div>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Base Pricing
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-[24px] font-bold text-gray-900 tracking-tight">
                {venue.price}
              </span>
              <span className="text-[13px] font-bold text-gray-400">
                /{venue.unit}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-[12px] font-bold mb-1 ${venue.markupColor || 'text-emerald-500'}`}>
              {venue.markupText}
            </p>
            <p className="text-[11px] font-bold text-gray-400">
              {venue.estimatedText}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AddRateCard = () => (
  <div className="bg-[#F8F5FF] rounded-[24px] border-2 border-dashed border-[#DED6FA] flex flex-col items-center justify-center p-8 text-center cursor-pointer hover:bg-[#F3EEFF] hover:border-[#D1C4F9] transition-all duration-300 group h-full min-h-[420px]">
    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm border border-[#ECECF1] mb-6 group-hover:scale-110 transition-transform duration-300">
      <Plus className="w-8 h-8 text-red-600" />
    </div>
    <h3 className="text-[20px] font-bold text-gray-900 mb-3">
      New Rate Card
    </h3>
    <p className="text-[14px] font-medium text-gray-500 max-w-[200px] leading-relaxed">
      Click to add a new venue, package, or service item to the price book catalog.
    </p>
  </div>
);

const PriceMetrics = () => (
  <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
    <div className="bg-[#EEF2FF] rounded-[16px] px-5 py-3 flex flex-col justify-center min-w-[140px] shrink-0">
      <span className="text-[11px] font-bold text-gray-500 mb-0.5">Total Items</span>
      <span className="text-[18px] font-bold text-gray-900 leading-tight">142 Items</span>
    </div>
    <div className="bg-[#EEF2FF] rounded-[16px] px-5 py-3 flex flex-col justify-center min-w-[140px] shrink-0">
      <span className="text-[11px] font-bold text-gray-500 mb-0.5">Avg. Venue Rate</span>
      <span className="text-[18px] font-bold text-gray-900 leading-tight">$7,420</span>
    </div>
  </div>
);

const PriceBookPagination = () => (
  <div className="flex items-center gap-1 sm:gap-2 shrink-0">
    <button className="w-8 h-8 flex items-center justify-center rounded-[8px] bg-transparent text-gray-500 hover:text-gray-900 transition-colors hidden sm:flex">
      <ChevronLeft className="w-4 h-4" />
    </button>
    <button className="w-8 h-8 flex items-center justify-center rounded-[8px] bg-[#B3262E] text-white text-[13px] font-bold shadow-[0_2px_8px_rgba(179,38,46,0.3)]">
      1
    </button>
    <button className="w-8 h-8 flex items-center justify-center rounded-[8px] bg-transparent text-gray-600 hover:bg-white text-[13px] font-bold transition-colors">
      2
    </button>
    <button className="w-8 h-8 flex items-center justify-center rounded-[8px] bg-transparent text-gray-600 hover:bg-white text-[13px] font-bold transition-colors hidden sm:flex">
      3
    </button>
    <span className="w-8 h-8 flex items-center justify-center text-gray-400 font-bold hidden sm:flex">
      ...
    </span>
    <button className="w-8 h-8 flex items-center justify-center rounded-[8px] bg-transparent text-gray-600 hover:bg-white text-[13px] font-bold transition-colors">
      12
    </button>
    <button className="w-8 h-8 flex items-center justify-center rounded-[8px] bg-transparent text-gray-500 hover:text-gray-900 transition-colors hidden sm:flex">
      <ChevronRight className="w-4 h-4" />
    </button>
  </div>
);
// ==========================================
// MAIN COMPONENT
// ==========================================

const GlobalPriceBook = () => {
  const [venues, setVenues] = useState<any[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    tag: 'Premium Venue',
    capacityDetails: '',
    basePricing: '',
    pricingUnit: 'day',
    adjustmentLabel: '+15% Service',
    adjustmentSubtext: 'Estimated Total',
    estimatedTotal: '',
    imageUrl: ''
  });

  React.useEffect(() => {
    import('../services/api').then(({ api }) => {
      api.getPriceBook('venues').then((data: any) => {
        if (data && data.items && data.items.length > 0) {
          const apiVenues = data.items.map((v: any) => ({
            id: v.id,
            title: v.title,
            badge: v.tag,
            description: v.capacityDetails,
            price: v.basePricing,
            unit: v.pricingUnit,
            markupText: v.adjustmentLabel,
            markupColor: 'text-emerald-500',
            estimatedText: v.estimatedTotal || v.adjustmentSubtext,
            image: v.imageUrl || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80'
          }));
          setVenues(apiVenues);
        }
      }).catch(console.error);
    });
  }, []);

  const handleSaveRateCard = async () => {
    try {
      const { api } = await import('../services/api');
      const payload = {
        ...formData,
        imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80'
      };
      const res = await api.createRateCard(payload);
      
      const newVenue = {
        id: res.id || Date.now(),
        title: formData.title,
        badge: formData.tag,
        description: formData.capacityDetails,
        price: formData.basePricing,
        unit: formData.pricingUnit,
        markupText: formData.adjustmentLabel,
        markupColor: 'text-emerald-500',
        estimatedText: formData.estimatedTotal,
        image: payload.imageUrl
      };
      
      setVenues(prev => [...prev, newVenue]);
      setShowCreateModal(false);
      setFormData({
        title: '', tag: 'Premium Venue', capacityDetails: '', basePricing: '',
        pricingUnit: 'day', adjustmentLabel: '+15% Service', adjustmentSubtext: 'Estimated Total', estimatedTotal: '', imageUrl: ''
      });
    } catch (e: any) {
      console.error(e);
      alert('Failed to save rate card: ' + e.message);
    }
  };

  const handleDeleteVenue = (id: any) => {
    // In a real app, call api.deleteRateCard(id)
    setVenues(prev => prev.filter(v => v.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans">
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        <PriceBookHeader />
        
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-[1400px] mx-auto">
            
            {/* Header Content */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 text-red-700 text-[12px] font-bold tracking-widest uppercase mb-4 border border-red-100">
                  <LayoutTemplate className="w-4 h-4" />
                  Rate Card & Pricing
                </span>
                <h1 className="text-[36px] md:text-[48px] font-bold text-gray-900 tracking-tight leading-none mb-4">
                  Global Price Book
                </h1>
                <p className="text-[15px] md:text-[16px] font-medium text-gray-500 leading-relaxed">
                  Manage enterprise-wide service rates, venue fees, and vendor markups with seasonal intelligent adjustments.
                </p>
              </div>

            {/* Header Actions */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button className="h-12 px-5 flex items-center gap-2 bg-white border border-[#ECECF1] rounded-[16px] text-gray-700 font-semibold text-[15px] hover:bg-gray-50 transition-colors shadow-sm">
                <Upload className="w-5 h-5 text-gray-500" />
                <span className="hidden sm:inline">Import / Export</span>
                <span className="sm:hidden">Import</span>
                <ChevronDown className="w-4 h-4 text-gray-400 ml-1" />
              </button>
              <button onClick={() => setShowCreateModal(true)} className="h-12 px-5 sm:px-6 flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-400 rounded-[16px] text-white font-semibold text-[15px] hover:from-red-700 hover:to-orange-500 transition-colors shadow-[0_4px_14px_rgba(220,38,38,0.25)]">
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Create New Rate</span>
                <span className="sm:hidden">New Rate</span>
              </button>
            </div>
          </div>

          {/* Category Filter Bar */}
          <CategoryTabs />

          {/* Price Book Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {venues.map((venue: any) => (
              <div key={venue.id}>
                <VenueCard venue={venue} onDelete={handleDeleteVenue} />
              </div>
            ))}
            
            <div onClick={() => setShowCreateModal(true)}>
              <AddRateCard />
            </div>
          </div>

            {/* Footer Area */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-8 mt-4 gap-6 border-t border-[#ECECF1]">
              <PriceMetrics />
              <PriceBookPagination />
            </div>

          </div>
        </main>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="p-6 border-b border-[#ECECF1] flex items-center justify-between bg-gray-50/50">
              <div>
                <h3 className="text-[18px] font-bold text-gray-900">Create Rate Card</h3>
                <p className="text-[13px] text-gray-500 mt-1">Add a new item to the price book catalog.</p>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-[#ECECF1] text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-colors">
                <span className="sr-only">Close</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6 flex-1 overflow-y-auto space-y-4">
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1">Title</label>
                <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full h-10 px-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-[12px] text-[14px] focus:outline-none focus:border-red-300" placeholder="e.g. Grand Sapphire Ballroom" />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1">Venue Capacity & Features</label>
                <input type="text" value={formData.capacityDetails} onChange={e => setFormData({...formData, capacityDetails: e.target.value})} className="w-full h-10 px-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-[12px] text-[14px] focus:outline-none focus:border-red-300" placeholder="e.g. Capacity: up to 500 guests." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Base Pricing</label>
                  <input type="text" value={formData.basePricing} onChange={e => setFormData({...formData, basePricing: e.target.value})} className="w-full h-10 px-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-[12px] text-[14px] focus:outline-none focus:border-red-300" placeholder="e.g. $12,500" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Unit</label>
                  <input type="text" value={formData.pricingUnit} onChange={e => setFormData({...formData, pricingUnit: e.target.value})} className="w-full h-10 px-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-[12px] text-[14px] focus:outline-none focus:border-red-300" placeholder="e.g. day" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Service %</label>
                  <input type="text" value={formData.adjustmentLabel} onChange={e => setFormData({...formData, adjustmentLabel: e.target.value})} className="w-full h-10 px-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-[12px] text-[14px] focus:outline-none focus:border-red-300" placeholder="e.g. +15% Service" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Estimated Total</label>
                  <input type="text" value={formData.estimatedTotal} onChange={e => setFormData({...formData, estimatedTotal: e.target.value})} className="w-full h-10 px-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-[12px] text-[14px] focus:outline-none focus:border-red-300" placeholder="e.g. $14,375" />
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1">Image Upload (Optional)</label>
                <div className="flex items-center gap-3">
                  <label className="flex-1 h-10 px-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-[12px] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                    <span className="text-[14px] text-gray-500 font-medium">
                      {formData.imageUrl && formData.imageUrl.startsWith('data:image') ? 'Image Selected ✓' : 'Choose a file...'}
                    </span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData({...formData, imageUrl: reader.result as string});
                          };
                          reader.readAsDataURL(file);
                        }
                      }} 
                    />
                  </label>
                  {formData.imageUrl && formData.imageUrl.startsWith('data:image') && (
                    <button 
                      onClick={() => setFormData({...formData, imageUrl: ''})}
                      className="h-10 px-4 rounded-[12px] text-red-500 hover:bg-red-50 text-[13px] font-bold transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-[#ECECF1] bg-gray-50/50 flex justify-end gap-3">
              <button onClick={() => setShowCreateModal(false)} className="px-5 py-2.5 rounded-full text-[14px] font-bold text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
              <button onClick={handleSaveRateCard} className="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-[14px] font-bold shadow-sm transition-colors">Save Rate Card</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalPriceBook;
