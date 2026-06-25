import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import {
  Plus, Star, TrendingUp, Users, Sparkles, Search, X, FileText,
  Clock, Zap, ArrowRight, CheckCircle
} from 'lucide-react';

const templates = [
  {
    id: 1,
    title: 'The Eternal Grandeur',
    category: 'Luxury Wedding',
    badge: 'Luxury Wedding',
    uses: 412,
    rating: 4.9,
    trending: true,
    description: 'A full white-glove wedding proposal. Includes venue setup, floral decor, catering, and live entertainment packages.',
    color: '#B45309',
    accentBg: 'from-amber-50 to-orange-50',
    accentBorder: 'border-amber-200',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    presets: {
      eventType: 'Luxury Wedding',
      expectedGuests: '200',
      items: [
        { description: 'Grand Ballroom Venue', item_type: 'Venue Selection', price: 15000, qty: 1 },
        { description: 'Premium Floral Arrangements', item_type: 'Floral & Decoration', price: 5000, qty: 1 },
        { description: 'Gourmet 5-Course Dinner', item_type: 'Gourmet Catering', price: 180, qty: 200 },
        { description: 'Live Orchestra (4 hrs)', item_type: 'Entertainment & Sound', price: 8000, qty: 1 }
      ]
    }
  },
  {
    id: 2,
    title: 'Tech-Nexus Summit',
    category: 'Corporate Gala',
    badge: 'Corporate',
    uses: 124,
    rating: 4.7,
    trending: false,
    description: 'Designed for large-scale corporate conferences. Covers AV setup, keynote staging, breakout rooms, and catering.',
    color: '#1D4ED8',
    accentBg: 'from-blue-50 to-indigo-50',
    accentBorder: 'border-blue-200',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80',
    presets: {
      eventType: 'Corporate Summit',
      expectedGuests: '500',
      items: [
        { description: 'Main Conference Hall', item_type: 'Venue Selection', price: 12000, qty: 1 },
        { description: 'Full AV & Stage Production', item_type: 'Entertainment & Sound', price: 18000, qty: 1 },
        { description: 'Keynote Speaker Package', item_type: 'Entertainment & Sound', price: 10000, qty: 1 },
        { description: 'Networking Lunch Catering', item_type: 'Gourmet Catering', price: 45, qty: 500 }
      ]
    }
  },
  {
    id: 3,
    title: 'Boutique Escapes',
    category: 'Hotel Partner',
    badge: 'Hotel Partner',
    uses: 89,
    rating: 4.8,
    trending: false,
    description: 'Boutique hotel event package for intimate gatherings. Includes suite access, in-room dining, and private terrace events.',
    color: '#14532D',
    accentBg: 'from-green-50 to-emerald-50',
    accentBorder: 'border-green-200',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    presets: {
      eventType: 'Boutique Retreat',
      expectedGuests: '50',
      items: [
        { description: 'Penthouse Suite (3 nights)', item_type: 'Venue Selection', price: 4000, qty: 1 },
        { description: 'Private Chef Dinner', item_type: 'Gourmet Catering', price: 220, qty: 50 },
        { description: 'Spa & Wellness Package', item_type: 'Entertainment & Sound', price: 350, qty: 50 },
        { description: 'Terrace Event Setup', item_type: 'Floral & Decoration', price: 3000, qty: 1 }
      ]
    }
  },
  {
    id: 4,
    title: 'Rustic Garden Gala',
    category: 'Outdoor Event',
    badge: 'Outdoor',
    uses: 67,
    rating: 4.6,
    trending: true,
    description: 'An open-air celebration with natural decor. Perfect for anniversary galas, garden parties, and seasonal events.',
    color: '#065F46',
    accentBg: 'from-teal-50 to-green-50',
    accentBorder: 'border-teal-200',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
    presets: {
      eventType: 'Garden Gala',
      expectedGuests: '100',
      items: [
        { description: 'Garden Venue Hire', item_type: 'Venue Selection', price: 6000, qty: 1 },
        { description: 'Tent & Marquee Setup', item_type: 'Floral & Decoration', price: 4500, qty: 1 },
        { description: 'Rustic Floral Decor', item_type: 'Floral & Decoration', price: 2800, qty: 1 },
        { description: 'BBQ & Buffet Catering', item_type: 'Gourmet Catering', price: 85, qty: 100 }
      ]
    }
  },
  {
    id: 5,
    title: 'Black Tie Classic',
    category: 'Luxury Gala',
    badge: 'Luxury Gala',
    uses: 201,
    rating: 4.9,
    trending: false,
    description: 'The ultimate black-tie gala experience. Prestigious venue, world-class cuisine, and exclusive entertainment.',
    color: '#111827',
    accentBg: 'from-gray-50 to-slate-50',
    accentBorder: 'border-gray-200',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    presets: {
      eventType: 'Black Tie Gala',
      expectedGuests: '300',
      items: [
        { description: 'Luxury Ballroom Rental', item_type: 'Venue Selection', price: 25000, qty: 1 },
        { description: 'Michelin-Grade Dinner Service', item_type: 'Gourmet Catering', price: 280, qty: 300 },
        { description: 'Celebrity Entertainment', item_type: 'Entertainment & Sound', price: 20000, qty: 1 },
        { description: 'Premium Decor & Lighting', item_type: 'Floral & Decoration', price: 12000, qty: 1 }
      ]
    }
  }
];

const ALL_CATEGORIES = ['All', 'Luxury Wedding', 'Corporate Gala', 'Hotel Partner', 'Outdoor Event', 'Luxury Gala'];

const Templates = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [usingTemplate, setUsingTemplate] = useState(false);

  const filtered = templates.filter(t => {
    const matchCat = activeCategory === 'All' || t.category === activeCategory;
    const matchSearch = !searchQuery || t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleUseTemplate = async (template: any) => {
    setUsingTemplate(true);
    try {
      // Store template presets in sessionStorage so the quotation builder can pick them up
      sessionStorage.setItem('templatePreset', JSON.stringify({
        eventType: template.presets.eventType,
        expectedGuests: template.presets.expectedGuests,
        items: template.presets.items,
        templateTitle: template.title
      }));
      setTimeout(() => {
        navigate('/quotations/new');
      }, 800);
    } catch (e) {
      setUsingTemplate(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans">
      <Sidebar />

      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        {/* HEADER */}
        <header className="h-[72px] bg-white border-b border-[#ECECF1] px-8 flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-[18px] font-bold text-gray-900">Template Library</h1>
            <p className="text-[12px] text-gray-500">Pick a template to instantly pre-fill a new quotation</p>
          </div>
          <button
            onClick={() => navigate('/quotations/new')}
            className="h-9 px-5 flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-400 text-white rounded-full font-bold text-[13px] shadow-sm hover:shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            Blank Quotation
          </button>
        </header>

        <main className="flex-1 overflow-y-auto">
          {/* HERO BANNER */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-10 py-10">
            <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-orange-400" />
                  <span className="text-orange-400 font-bold text-[12px] uppercase tracking-widest">Ready-to-use</span>
                </div>
                <h2 className="text-[32px] font-bold text-white leading-tight mb-2">
                  Start faster with a template
                </h2>
                <p className="text-[15px] text-gray-400 max-w-xl">
                  Choose a pre-built quotation template. All line items, pricing, and event details will be automatically pre-filled — you just review and send.
                </p>
              </div>

              {/* How it works */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shrink-0 min-w-[260px]">
                <p className="text-white font-bold text-[13px] mb-4">How it works</p>
                <div className="space-y-3">
                  {[
                    { icon: Zap, text: 'Pick a template below' },
                    { icon: CheckCircle, text: 'Quotation is pre-filled' },
                    { icon: FileText, text: 'Review, edit & send' }
                  ].map(({ icon: Icon, text }, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-orange-400/20 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-orange-400" />
                      </div>
                      <span className="text-[13px] text-gray-300">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-[1100px] mx-auto px-10 py-8">
            {/* SEARCH + FILTER ROW */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 bg-white border border-[#ECECF1] rounded-full text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 transition-all"
                />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {ALL_CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-[13px] font-bold whitespace-nowrap transition-all ${
                      activeCategory === cat
                        ? 'bg-gradient-to-r from-red-600 to-orange-400 text-white shadow-sm'
                        : 'bg-white border border-[#ECECF1] text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* TEMPLATE GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(template => (
                <div
                  key={template.id}
                  className="bg-white rounded-[24px] border border-[#ECECF1] shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col group"
                >
                  {/* Image */}
                  <div
                    className="relative w-full aspect-video overflow-hidden bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <img
                      src={template.image}
                      alt={template.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-[11px] font-bold rounded-full shadow-sm">
                        {template.badge}
                      </span>
                      {template.trending && (
                        <span className="px-2 py-1 bg-emerald-500/90 backdrop-blur-sm text-white text-[11px] font-bold rounded-full shadow-sm flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" /> Trending
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-[17px] font-bold text-gray-900 mb-1 cursor-pointer hover:text-red-600 transition-colors" onClick={() => setSelectedTemplate(template)}>
                      {template.title}
                    </h3>
                    <p className="text-[13px] text-gray-500 leading-relaxed mb-4 flex-1">
                      {template.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mb-4 text-[12px] text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        <strong className="text-gray-800">{template.uses}</strong> uses
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <strong className="text-gray-800">{template.rating}</strong>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {template.presets.items.length} line items
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedTemplate(template)}
                        className="flex-1 h-10 border border-[#ECECF1] text-gray-700 rounded-xl font-bold text-[13px] hover:bg-gray-50 transition-colors"
                      >
                        Preview
                      </button>
                      <button
                        onClick={() => handleUseTemplate(template)}
                        className="flex-1 h-10 bg-gradient-to-r from-red-600 to-orange-400 text-white rounded-xl font-bold text-[13px] hover:shadow-md transition-all flex items-center justify-center gap-1.5"
                      >
                        Use Template <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Blank Card */}
              <div
                onClick={() => navigate('/quotations/new')}
                className="bg-white rounded-[24px] border-2 border-dashed border-[#ECECF1] hover:border-red-300 hover:bg-red-50/20 transition-all cursor-pointer flex flex-col items-center justify-center text-center p-10 min-h-[340px] group"
              >
                <div className="w-14 h-14 rounded-full bg-gray-50 group-hover:bg-red-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-red-500 mb-4 transition-all">
                  <Plus className="w-6 h-6" />
                </div>
                <h3 className="text-[18px] font-bold text-gray-800 mb-2">Start from Scratch</h3>
                <p className="text-[13px] text-gray-500 max-w-[180px]">Build your own custom quotation with blank line items.</p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* TEMPLATE PREVIEW MODAL */}
      {selectedTemplate && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setSelectedTemplate(null)}
        >
          <div
            className="bg-white rounded-[28px] w-full max-w-[640px] shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative w-full aspect-video overflow-hidden bg-gray-100">
              <img src={selectedTemplate.image} alt={selectedTemplate.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <button
                onClick={() => setSelectedTemplate(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 text-white hover:bg-black/60 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6">
                <h2 className="text-[26px] font-bold text-white">{selectedTemplate.title}</h2>
                <span className="text-white/80 text-[13px]">{selectedTemplate.category}</span>
              </div>
            </div>

            <div className="p-6">
              <p className="text-[14px] text-gray-600 mb-5 leading-relaxed">{selectedTemplate.description}</p>

              {/* Pre-filled items preview */}
              <div className={`rounded-2xl border ${selectedTemplate.accentBorder} bg-gradient-to-br ${selectedTemplate.accentBg} p-4 mb-5`}>
                <p className="text-[12px] font-bold text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5" /> Pre-filled Line Items
                </p>
                <div className="space-y-2">
                  {selectedTemplate.presets.items.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between items-center bg-white/70 rounded-xl px-3 py-2">
                      <div>
                        <span className="text-[13px] font-semibold text-gray-800">{item.description}</span>
                        <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-bold rounded-full">{item.item_type || item.type}</span>
                      </div>
                      <span className="text-[13px] font-bold" style={{ color: selectedTemplate.color }}>
                        ${((item.price || item.rate) * item.qty).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/60">
                  <span className="text-[13px] font-bold text-gray-700">Estimated Total</span>
                  <span className="text-[16px] font-bold" style={{ color: selectedTemplate.color }}>
                    ${selectedTemplate.presets.items.reduce((s: number, i: any) => s + (i.price || i.rate) * i.qty, 0).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="flex-1 h-12 border border-[#ECECF1] text-gray-700 rounded-2xl font-bold hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => { setSelectedTemplate(null); handleUseTemplate(selectedTemplate); }}
                  disabled={usingTemplate}
                  className="flex-1 h-12 bg-gradient-to-r from-red-600 to-orange-400 text-white rounded-2xl font-bold hover:shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {usingTemplate ? 'Starting...' : 'Use This Template'} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LOADING OVERLAY when using template */}
      {usingTemplate && (
        <div className="fixed inset-0 z-[60] bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-red-600 to-orange-400 flex items-center justify-center shadow-lg animate-pulse">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <p className="text-[18px] font-bold text-gray-800">Loading Template...</p>
          <p className="text-[14px] text-gray-500">Pre-filling your quotation with all line items</p>
        </div>
      )}
    </div>
  );
};

export default Templates;
