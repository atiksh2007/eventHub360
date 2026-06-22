import React, { useState } from 'react';
import { 
  Search, Bell, History as ActivityIcon, Printer, 
  Upload, ChevronDown, Plus, LayoutGrid, List, MoreVertical,
  ChevronLeft, ChevronRight, LayoutDashboard, FileText, 
  Files, LayoutTemplate, CheckSquare, Users, Settings, HelpCircle
} from 'lucide-react';

// ==========================================
// DATA
// ==========================================
const mockVenues = [
  {
    id: 1,
    title: 'Grand Sapphire Ballroom',
    description: 'Capacity: up to 500 guests. Features 360-degree mapping and dual staircases.',
    badge: 'Premium Venue',
    price: '$12,500',
    unit: 'day',
    markupText: '+15% Service',
    markupColor: 'text-emerald-500',
    estimatedText: 'Estimated Total: $14,375',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Horizon Vista Terrace',
    description: 'Rooftop access with panoramic city views. Features fire pits and glass railings.',
    badge: 'Sky Deck',
    price: '$5,200',
    unit: 'session',
    markupText: '+10% Service',
    markupColor: 'text-emerald-500',
    estimatedText: 'Estimated Total: $5,720',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Innovation Tech Hub',
    description: 'Theater-style seating for 200. HD projectors, live-streaming ready.',
    badge: 'Conference',
    price: '$8,900',
    unit: 'day',
    markupText: 'Included Service',
    markupColor: 'text-emerald-500',
    estimatedText: 'Flat Rate',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    title: 'The Verdant Atrium',
    description: 'Indoor garden setting with sustainable climate control and living walls.',
    badge: 'Eco-Lounge',
    price: '$4,500',
    unit: 'day',
    markupText: '+20% Seasonal',
    markupColor: 'text-emerald-500',
    estimatedText: 'Estimated Total: $5,400',
    image: 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    title: 'The Reserve Cellar',
    description: 'Intimate underground tasting room. Private barrel backdrop.',
    badge: 'Private Reserve',
    price: '$2,800',
    unit: 'night',
    markupText: 'Sommelier Incl.',
    markupColor: 'text-emerald-500',
    estimatedText: 'Exclusive Access',
    image: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    title: 'Manor Estate Tent',
    description: 'All-weather luxury marquee on estate lawn. Floor-to-ceiling windows.',
    badge: 'Estate Grounds',
    price: '$15,000',
    unit: 'event',
    markupText: '+5% Logistics',
    markupColor: 'text-emerald-500',
    estimatedText: 'Setup Included',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 7,
    title: 'Industrial Loft 402',
    description: 'Flexible studio space for product launches and creative workshops.',
    badge: 'Urban Chic',
    price: '$3,200',
    unit: 'day',
    markupText: 'Standard Rate',
    markupColor: 'text-emerald-500',
    estimatedText: 'No Surcharge',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

const sidebarNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: FileText, label: 'Quotations', active: true },
  { icon: Files, label: 'Proposals' },
  { icon: LayoutTemplate, label: 'Templates' },
  { icon: CheckSquare, label: 'Approvals' },
  { icon: Users, label: 'Client Portal' },
];

const headerTabs = [
  { label: 'All Quotes' },
  { label: 'Drafts' },
  { label: 'Pending Approval' },
  { label: 'History', active: true },
];

const categoryTabsList = ['Venues', 'Packages', 'Vendors', 'Services'];

// ==========================================
// INLINE COMPONENTS
// ==========================================

const Sidebar = () => (
  <div className="w-[260px] bg-white h-screen fixed left-0 top-0 flex flex-col border-r border-[#ECECF1] z-10 shadow-[2px_0_8px_rgba(0,0,0,0.02)] hidden lg:flex">
    <div className="p-6 pb-8">
      <h1 className="text-xl font-bold text-gray-900 tracking-tight">
        <span className="text-red-600">Event</span>Hub360
      </h1>
      <p className="text-xs text-gray-500 font-medium mt-1 uppercase tracking-wider">Enterprise Concierge</p>
    </div>
    <div className="flex-1 px-4 space-y-2 overflow-y-auto">
      {sidebarNavItems.map((item: any, index: any) => {
        const Icon = item.icon;
        return (
          <button
            key={index}
            className={`w-full flex items-center h-12 px-4 rounded-[14px] transition-all duration-200 group relative ${
              item.active 
                ? 'bg-purple-50 text-red-600 font-semibold'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'
            }`}
          >
            <Icon className={`w-5 h-5 mr-3 ${item.active ? 'text-red-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
            <span className="text-[15px]">{item.label}</span>
            {item.active && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-red-600 rounded-l-full" />
            )}
          </button>
        );
      })}
    </div>
    <div className="p-6 pt-4 border-t border-[#ECECF1] space-y-4">
      <div className="space-y-1">
        <button className="w-full flex items-center h-10 px-4 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors font-medium">
          <Settings className="w-5 h-5 mr-3 text-gray-400" />
          <span className="text-[15px]">Settings</span>
        </button>
        <button className="w-full flex items-center h-10 px-4 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors font-medium">
          <HelpCircle className="w-5 h-5 mr-3 text-gray-400" />
          <span className="text-[15px]">Support</span>
        </button>
      </div>
      <div className="mt-4 flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-[14px] transition-colors">
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="Alex Sterling"
          className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm"
        />
        <div>
          <p className="text-sm font-bold text-gray-900 leading-tight">Alex Sterling</p>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Admin</p>
        </div>
      </div>
    </div>
  </div>
);

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

const VenueCard = ({ venue  }: any) => (
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
        <button className="absolute top-6 right-5 text-gray-400 hover:text-gray-900 transition-colors p-1 -mr-1">
          <MoreVertical className="w-5 h-5" />
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
  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans">
      <Sidebar />
      
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden relative w-full">
        <PriceBookHeader />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-12 overflow-x-hidden">
          <div className="max-w-[1400px] mx-auto space-y-8">
            
            {/* Page Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-[600px]">
                <span className="inline-block bg-[#FCE8E8] text-[#B3262E] text-[12px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
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
                <button className="h-12 px-5 sm:px-6 flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-400 rounded-[16px] text-white font-semibold text-[15px] hover:from-red-700 hover:to-orange-500 transition-colors shadow-[0_4px_14px_rgba(220,38,38,0.25)]">
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
              {mockVenues.map((venue: any) => (
                <div key={venue.id}>
                  <VenueCard venue={venue} />
                </div>
              ))}
              
              <div>
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
    </div>
  );
};

export default GlobalPriceBook;
