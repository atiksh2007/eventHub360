import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Files, LayoutTemplate, CheckSquare, Users, 
  Settings, HelpCircle, Bell, History as HistoryIcon, Printer, Plus,
  TrendingUp, Star, MoreVertical, Sparkles
} from 'lucide-react';

const Templates = () => {
  const navigate = useNavigate();

  const sidebarNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: FileText, label: 'Quotations', path: '/quotations' },
    { icon: Files, label: 'Proposals', path: '/proposals' },
    { icon: FileText, label: 'Price Book', path: '/price-book' },
    { icon: LayoutTemplate, label: 'Templates', path: '/templates', active: true },
    { icon: CheckSquare, label: 'Approvals', path: '/approvals' },
    { icon: Users, label: 'Client Portal', path: '/client-portal' },
  ];

  const categories = [
    { label: 'All Templates', active: true, path: '/templates' },
    { label: 'Luxury Weddings', active: false, path: '/templates/category/luxury-weddings' },
    { label: 'Corporate Galas', active: false, path: '/templates/category/corporate-galas' },
    { label: 'Hotel Partnerships', active: false, path: '/templates/category/hotel-partnerships' },
    { label: 'Custom', active: false, path: '/templates/category/custom' }
  ];

  const templates = [
    {
      id: 1,
      title: 'The Eternal Grandeur',
      badge: 'Luxury Wedding',
      uses: 412,
      rating: 4.9,
      trending: true,
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'Tech-Nexus Summit',
      badge: 'Corporate Gala',
      uses: 124,
      rating: 4.7,
      trending: false,
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'Boutique Escapes',
      badge: 'Hotel Partner',
      uses: 89,
      rating: 4.8,
      trending: false,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans relative overflow-hidden">
      
      {/* ========================================== */}
      {/* LEFT SIDEBAR */}
      {/* ========================================== */}
      <div className="w-[260px] bg-white h-screen fixed left-0 top-0 flex flex-col border-r border-[#ECECF1] z-10 shadow-[2px_0_8px_rgba(0,0,0,0.02)] hidden lg:flex">
        <div className="p-6 pb-8 border-b border-[#ECECF1]">
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            <span className="text-red-700">Event</span>Hub360
          </h1>
          <p className="text-[10px] text-gray-500 font-bold mt-1 uppercase tracking-widest">Enterprise Concierge</p>
        </div>

        <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {sidebarNavItems.map((item: any, index: any) => {
            const Icon = item.icon;
            const isActive = item.active;
            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center h-12 px-4 rounded-[14px] transition-all duration-200 group relative ${
                  isActive ? 'bg-[#F8F5FF] text-red-700 font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'
                }`}
              >
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-red-700' : 'text-gray-400 group-hover:text-gray-600'}`} />
                <span className="text-[15px]">{item.label}</span>
                {isActive && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-red-700 rounded-l-full" />}
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
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Alex Rivera" className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm" />
            <div>
              <p className="text-sm font-bold text-gray-900 leading-tight">Alex Rivera</p>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* MAIN CONTENT AREA */}
      {/* ========================================== */}
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        
        {/* TOP HEADER */}
        <div className="h-[72px] bg-white border-b border-[#ECECF1] px-8 flex items-center justify-between shrink-0">
          <div className="w-[200px]">
            <h2 className="text-[20px] font-bold text-red-700 tracking-tight leading-tight">
              Quotation<br/>Management
            </h2>
          </div>

          <div className="flex-1 flex items-center justify-center gap-8 h-full">
            <div className="flex items-center h-full gap-6">
              {['All Quotes', 'Drafts', 'Pending Approval', 'History'].map((tab: any, idx: any) => (
                <button
                  key={idx}
                  className={`h-full flex items-center relative text-[15px] font-semibold transition-colors text-gray-600 hover:text-gray-900`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
              <Bell className="w-[22px] h-[22px]" />
            </button>
            <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
              <HistoryIcon className="w-[22px] h-[22px]" />
            </button>
            <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
              <Printer className="w-[22px] h-[22px]" />
            </button>
            <div className="w-px h-8 bg-gray-200 mx-2"></div>
            <button 
              onClick={() => navigate('/quotations/new')}
              className="h-[42px] px-6 flex items-center gap-2 bg-gradient-to-r from-red-700 to-orange-400 text-white rounded-full font-bold text-[14px] shadow-sm hover:shadow-md transition-all"
            >
              Create New
            </button>
          </div>
        </div>

        {/* SCROLLABLE MAIN */}
        <main className="flex-1 overflow-y-auto p-10 pb-24">
          <div className="max-w-[1200px] mx-auto">
            
            {/* PAGE HEADER */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <h1 className="text-[36px] font-bold text-gray-900 tracking-tight leading-tight mb-2">
                  Proposal Template Library
                </h1>
                <p className="text-[16px] font-medium text-gray-600">
                  Streamline your curation process with our collection of high-conversion event proposal designs.
                </p>
              </div>
              <button 
                onClick={() => navigate('/templates/new')}
                className="h-[46px] px-6 flex items-center gap-2 bg-white border border-red-200 text-red-700 rounded-full font-bold text-[14px] hover:bg-red-50 transition-colors shadow-sm self-start md:self-auto shrink-0"
              >
                <Plus className="w-4 h-4" />
                Create New Template
              </button>
            </div>

            {/* CATEGORY TABS */}
            <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((cat: any, idx: any) => (
                <button
                  key={idx}
                  onClick={() => navigate(cat.path)}
                  className={`px-5 py-2.5 rounded-full text-[14px] font-bold whitespace-nowrap transition-colors ${
                    cat.active 
                      ? 'bg-gradient-to-r from-red-700 to-orange-400 text-white shadow-sm' 
                      : 'bg-white border border-[#ECECF1] text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* TEMPLATE GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              
              {/* NORMAL TEMPLATES */}
              {templates.map((template: any) => (
                <div key={template.id} className="bg-white rounded-[28px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#ECECF1] hover:shadow-md transition-shadow flex flex-col">
                  {/* Image Area */}
                  <div 
                    onClick={() => navigate(`/templates/${template.id}`)}
                    className="w-full aspect-[4/5] rounded-[20px] mb-4 relative overflow-hidden bg-gray-100 cursor-pointer group"
                  >
                    <img src={template.image} alt={template.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-[11px] font-bold rounded-full shadow-sm">
                        {template.badge}
                      </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="px-2 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <h3 
                        onClick={() => navigate(`/templates/${template.id}`)}
                        className="text-[18px] font-bold text-gray-900 leading-tight cursor-pointer hover:text-red-600 transition-colors"
                      >
                        {template.title}
                      </h3>
                      <div className="flex items-center gap-2 shrink-0">
                        {template.trending && <TrendingUp className="w-4 h-4 text-emerald-500" />}
                        <button className="text-gray-400 hover:text-gray-900 transition-colors"><MoreVertical className="w-4 h-4" /></button>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 mb-5">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-gray-400" />
                        <div className="leading-tight">
                          <p className="text-[12px] font-bold text-gray-900">Used {template.uses}</p>
                          <p className="text-[11px] font-semibold text-gray-500">times</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                        <div className="leading-tight">
                          <p className="text-[12px] font-bold text-gray-900">{template.rating}</p>
                          <p className="text-[11px] font-semibold text-gray-500">Rating</p>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => navigate(`/templates/${template.id}/use`)}
                      className="w-full py-3 bg-gradient-to-r from-red-600 to-orange-400 text-white rounded-xl font-bold text-[14px] hover:shadow-md transition-shadow mt-auto"
                    >
                      Use Template
                    </button>
                  </div>
                </div>
              ))}

              {/* CREATE CUSTOM CARD */}
              <div 
                onClick={() => navigate('/templates/custom')}
                className="bg-white rounded-[28px] p-6 border-2 border-dashed border-[#ECECF1] hover:border-red-300 hover:bg-red-50/30 transition-colors flex flex-col items-center justify-center text-center cursor-pointer min-h-[400px]"
              >
                <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center text-red-600 mb-6 border border-gray-100">
                  <Plus className="w-6 h-6" />
                </div>
                <h3 className="text-[20px] font-bold text-gray-900 mb-3">Create<br/>Custom</h3>
                <p className="text-[13px] font-medium text-gray-500 px-4">
                  Start from a blank canvas or import your own design assets.
                </p>
              </div>

            </div>
          </div>
        </main>
        
        {/* FLOATING AI BUTTON */}
        <button 
          onClick={() => navigate('/templates/ai-generator')}
          className="fixed bottom-10 right-10 w-16 h-16 rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center z-50 group"
        >
          <Sparkles className="w-7 h-7 group-hover:rotate-12 transition-transform" />
        </button>

      </div>
    </div>
  );
};

export default Templates;
