import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Files, LayoutTemplate, CheckSquare, Users, 
  Settings, HelpCircle, Bell, History as HistoryIcon, PlusCircle, 
  CheckCircle, Download, Wallet, ChevronRight, Calendar, MapPin, 
  ChefHat, Speaker, Flower2, Phone, Mail, FileSignature
} from 'lucide-react';

const QuoteAcceptedDashboard = () => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);

  // Auto-hide confetti after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const sidebarNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: FileText, label: 'Quotations', path: '/quotations', active: true },
    { icon: Files, label: 'Proposals', path: '/proposals' },
    { icon: FileText, label: 'Price Book', path: '/price-book' },
    { icon: LayoutTemplate, label: 'Templates', path: '/templates' },
    { icon: CheckSquare, label: 'Approvals', path: '/approvals' },
    { icon: Users, label: 'Client Portal', path: '/client-portal' },
  ];

  // Lightweight CSS Confetti logic
  const confettiColors = ['#EF4444', '#F97316', '#EAB308', '#22C55E', '#3B82F6', '#A855F7'];
  const confettiPieces = Array.from({ length: 50 }).map((_: any, i: any) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 2}s`,
    animationDuration: `${2 + Math.random() * 2}s`,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    size: `${6 + Math.random() * 6}px`
  }));

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans relative overflow-hidden">
      
      {/* CSS CONFETTI OVERLAY */}
      {showConfetti && (
        <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden">
          {confettiPieces.map((p: any) => (
            <div
              key={p.id}
              className="absolute top-[-10px] rounded-sm opacity-80"
              style={{
                left: p.left,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                animation: `fall ${p.animationDuration} linear ${p.animationDelay} forwards`
              }}
            />
          ))}
          <style>{`
            @keyframes fall {
              0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
              100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
            }
          `}</style>
        </div>
      )}

      {/* ========================================== */}
      {/* LEFT SIDEBAR */}
      {/* ========================================== */}
      <div className="w-[260px] bg-white h-screen fixed left-0 top-0 flex flex-col border-r border-[#ECECF1] z-10 shadow-[2px_0_8px_rgba(0,0,0,0.02)] hidden lg:flex">
        {/* Logo Section */}
        <div className="p-6 pb-8">
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            <span className="text-red-600">Event</span>Hub360
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-1 uppercase tracking-wider">Enterprise Concierge</p>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-4 space-y-2 overflow-y-auto">
          {sidebarNavItems.map((item: any, index: any) => {
            const Icon = item.icon;
            const isActive = item.active;

            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center h-12 px-4 rounded-[14px] transition-all duration-200 group relative ${
                  isActive 
                    ? 'bg-purple-50 text-red-600 font-semibold' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'
                }`}
              >
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-red-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                <span className="text-[15px]">{item.label}</span>
                {isActive && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-red-600 rounded-l-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Section */}
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
              alt="Alex Chen"
              className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm"
            />
            <div>
              <p className="text-sm font-bold text-gray-900 leading-tight">Alex Chen</p>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Senior Planner</p>
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

          {/* Center Tabs */}
          <div className="flex-1 flex items-center justify-center gap-8 h-full">
            <div className="flex items-center h-full gap-6">
              {['All Quotes', 'Drafts', 'Pending Approval', 'History'].map((tab: any, idx: any) => (
                <button
                  key={idx}
                  className={`h-full flex items-center relative text-[15px] font-semibold transition-colors ${
                    tab === 'Pending Approval' ? 'text-red-700' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                  {tab === 'Pending Approval' && (
                    <div className="absolute bottom-0 left-0 w-full h-[3px] bg-red-600 rounded-t-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-5">
            <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
              <Bell className="w-[22px] h-[22px]" />
            </button>
            <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
              <HistoryIcon className="w-[22px] h-[22px]" />
            </button>
            <div className="w-px h-8 bg-gray-200 mx-2"></div>
            <button 
              onClick={() => navigate('/quotations/new')}
              className="h-[42px] px-6 flex items-center gap-2 bg-gradient-to-r from-red-700 to-orange-400 text-white rounded-full font-bold text-[14px] shadow-sm hover:shadow-md transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              Create New
            </button>
          </div>
        </div>

        {/* SCROLLABLE MAIN */}
        <main className="flex-1 overflow-y-auto p-8 lg:p-10 pb-24">
          <div className="max-w-[1400px] mx-auto space-y-8">
            
            {/* MILESTONE BANNER HERO */}
            <div className="relative h-auto md:h-[240px] rounded-[32px] overflow-hidden bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between shadow-[0_8px_30px_rgba(16,185,129,0.2)]">
              {/* Background Accent Rings */}
              <div className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] rounded-full border-[40px] border-white/10 pointer-events-none"></div>
              <div className="absolute bottom-[-50%] right-[10%] w-[300px] h-[300px] rounded-full border-[20px] border-white/10 pointer-events-none"></div>

              <div className="relative z-10 md:w-[60%] mb-8 md:mb-0">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-[12px] font-bold uppercase tracking-widest mb-6 border border-white/30">
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                  </div>
                  MILESTONE REACHED
                </div>
                <h1 className="text-[32px] md:text-[42px] font-bold text-white tracking-tight leading-tight mb-4 drop-shadow-sm">
                  Quotation Accepted by Client!
                </h1>
                <p className="text-[16px] font-medium text-emerald-50 leading-relaxed max-w-xl">
                  The client has digitally signed Proposal <span className="font-bold underline decoration-emerald-300 underline-offset-4">#QT-8821</span>. You are now ready to finalize the booking and initialize the event operations workflow.
                </p>
              </div>

              <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-[28px] p-6 text-center shadow-inner min-w-[240px]">
                <p className="text-[12px] font-bold text-emerald-100 uppercase tracking-widest mb-2">REFERENCE ID</p>
                <div className="text-[28px] font-black text-white tracking-wider font-mono">
                  QT-8821-2024
                </div>
              </div>
            </div>

            {/* DASHBOARD GRID - 3 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* CARD 1: TOTAL QUOTE VALUE */}
              <div className="bg-white rounded-[28px] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#ECECF1] flex flex-col justify-center">
                <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-3">Total Quote Value</p>
                <p className="text-[36px] font-black text-gray-900 tracking-tight leading-none mb-4">$142,500.00</p>
                <div className="flex items-center gap-2 text-[14px] font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-[12px] self-start">
                  <CheckCircle className="w-4 h-4" />
                  10% Deposit Received
                </div>
              </div>

              {/* CARD 2: EVENT DATE */}
              <div className="bg-white rounded-[28px] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#ECECF1] flex flex-col justify-center">
                <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-3">Event Date</p>
                <p className="text-[24px] font-bold text-gray-900 tracking-tight leading-none mb-3">September 24, 2024</p>
                <div className="flex items-center gap-2 text-[14px] font-medium text-gray-500 mb-4">
                  <MapPin className="w-4 h-4 text-orange-400" />
                  Venue: Lakeside Pavilion & Resort
                </div>
                <div className="flex items-center gap-2 text-[14px] font-bold text-orange-600 bg-orange-50 px-4 py-2 rounded-[12px] self-start">
                  <Calendar className="w-4 h-4" />
                  154 Days Remaining
                </div>
              </div>

              {/* CARD 3: WORKFLOW ACTIVATION */}
              <div className="bg-white rounded-[28px] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#ECECF1] flex flex-col justify-center items-center text-center">
                <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-4">Workflow Activation</p>
                <button className="w-full h-[64px] bg-gradient-to-r from-red-600 to-orange-400 hover:from-red-700 hover:to-orange-500 text-white rounded-[20px] font-bold text-[18px] shadow-[0_8px_20px_rgba(220,38,38,0.2)] hover:shadow-[0_10px_25px_rgba(220,38,38,0.3)] transition-all flex flex-col items-center justify-center transform hover:-translate-y-1">
                  Generate Final Booking
                  <span className="text-[11px] font-medium text-white/80 uppercase tracking-wider mt-0.5">and Create Operational Event</span>
                </button>
              </div>

            </div>

            {/* TWO COLUMNS LAYOUT FOR BOTTOM SECTION */}
            <div className="flex flex-col xl:flex-row gap-6">
              
              {/* LEFT COLUMN - VENDORS & SECONDARY ACTIONS */}
              <div className="flex-1 space-y-6 xl:w-[70%]">
                
                {/* SECONDARY ACTIONS ROW */}
                <div>
                  <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-4">Secondary Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="group bg-white border border-[#ECECF1] rounded-[20px] p-5 flex items-center justify-between shadow-sm hover:shadow-md hover:border-gray-300 transition-all text-left">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Users className="w-5 h-5" />
                        </div>
                        <span className="text-[15px] font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Assign Project Team</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </button>

                    <button className="group bg-white border border-[#ECECF1] rounded-[20px] p-5 flex items-center justify-between shadow-sm hover:shadow-md hover:border-gray-300 transition-all text-left">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Wallet className="w-5 h-5" />
                        </div>
                        <span className="text-[15px] font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">Notify Finance Department</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                    </button>

                    <button className="group bg-white border border-[#ECECF1] rounded-[20px] p-5 flex items-center justify-between shadow-sm hover:shadow-md hover:border-gray-300 transition-all text-left">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Download className="w-5 h-5" />
                        </div>
                        <span className="text-[15px] font-bold text-gray-900 group-hover:text-purple-600 transition-colors">Download Signed Contract</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                    </button>
                  </div>
                </div>

                {/* PRIMARY VENDOR LIST */}
                <div className="bg-white rounded-[28px] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#ECECF1]">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-[20px] font-bold text-gray-900">Primary Vendor List</h2>
                    <span className="px-4 py-1.5 bg-gray-100 text-gray-600 text-[13px] font-bold rounded-full">
                      6 Vendors Total
                    </span>
                  </div>

                  <div className="space-y-4">
                    {/* Vendor 1 */}
                    <div className="group border border-[#ECECF1] rounded-[20px] p-5 flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-5 mb-4 md:mb-0">
                        <div className="w-12 h-12 rounded-[14px] bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100 shrink-0">
                          <ChefHat className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-[16px] font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">Elite Catering Co.</p>
                          <p className="text-[13px] font-medium text-gray-500 uppercase tracking-wider">Gastronomy & Beverage Services</p>
                        </div>
                      </div>
                      <div className="text-left md:text-right">
                        <p className="text-[18px] font-black text-gray-900">$42,000</p>
                      </div>
                    </div>

                    {/* Vendor 2 */}
                    <div className="group border border-[#ECECF1] rounded-[20px] p-5 flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-5 mb-4 md:mb-0">
                        <div className="w-12 h-12 rounded-[14px] bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
                          <Speaker className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-[16px] font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">Lumina Lighting & Sound</p>
                          <p className="text-[13px] font-medium text-gray-500 uppercase tracking-wider">Audio-Visual Production</p>
                        </div>
                      </div>
                      <div className="text-left md:text-right">
                        <p className="text-[18px] font-black text-gray-900">$28,500</p>
                      </div>
                    </div>

                    {/* Vendor 3 */}
                    <div className="group border border-[#ECECF1] rounded-[20px] p-5 flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-5 mb-4 md:mb-0">
                        <div className="w-12 h-12 rounded-[14px] bg-pink-50 text-pink-600 flex items-center justify-center border border-pink-100 shrink-0">
                          <Flower2 className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-[16px] font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">Bloom & Stem Artistry</p>
                          <p className="text-[13px] font-medium text-gray-500 uppercase tracking-wider">Floral Design & Decor</p>
                        </div>
                      </div>
                      <div className="text-left md:text-right">
                        <p className="text-[18px] font-black text-gray-900">$18,200</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-[#ECECF1]">
                    <button className="text-[14px] font-bold text-red-600 hover:text-red-700 transition-colors flex items-center gap-2">
                      View All Vendors
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN - CLIENT ACCOUNT PANEL */}
              <div className="xl:w-[30%]">
                <div className="bg-white rounded-[28px] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#ECECF1] sticky top-6">
                  <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-6">Client Account</h3>
                  
                  <div className="mb-8">
                    <h4 className="text-[22px] font-bold text-gray-900 mb-2">Global Horizon Corp</h4>
                    <span className="inline-block px-3 py-1 bg-purple-50 text-purple-700 text-[12px] font-bold rounded-full border border-purple-100">
                      Key Account: Annual Gala
                    </span>
                  </div>

                  <div className="bg-[#F8F9FC] rounded-[20px] p-6 border border-[#ECECF1]">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Primary Contact</p>
                    
                    <div className="flex items-center gap-4 mb-6">
                      <img 
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                        alt="Sarah Jenkins" 
                        className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                      <div>
                        <p className="text-[16px] font-bold text-gray-900">Sarah Jenkins</p>
                        <p className="text-[13px] font-medium text-gray-500">Lead Event Coordinator</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <button className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-[12px] border border-[#ECECF1] hover:border-gray-300 transition-colors group text-left">
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                          <span className="text-[14px] font-semibold text-gray-700 group-hover:text-gray-900">Call Client</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300" />
                      </button>
                      
                      <button className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-[12px] border border-[#ECECF1] hover:border-gray-300 transition-colors group text-left">
                        <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
                          <span className="text-[14px] font-semibold text-gray-700 group-hover:text-gray-900">Email Client</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300" />
                      </button>

                      <button className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-[12px] border border-[#ECECF1] hover:border-gray-300 transition-colors group text-left">
                        <div className="flex items-center gap-3">
                          <FileSignature className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
                          <span className="text-[14px] font-semibold text-gray-700 group-hover:text-gray-900">View Signatures</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300" />
                      </button>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default QuoteAcceptedDashboard;
