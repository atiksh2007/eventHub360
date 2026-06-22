import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Files, 
  LayoutTemplate, 
  CheckSquare, 
  Users, 
  Settings, 
  HelpCircle 
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: FileText, label: 'Quotations', path: '/quotations' },
    { icon: Files, label: 'Proposals', path: '/proposals' },
    { icon: FileText, label: 'Price Book', path: '/price-book' },
    { icon: LayoutTemplate, label: 'Templates', path: '/templates' },
    { icon: CheckSquare, label: 'Approvals', path: '/approvals' },
    { icon: Users, label: 'Client Portal', path: '/client-portal' },
  ];

  return (
    <div className="w-[260px] bg-white h-screen fixed left-0 top-0 flex flex-col border-r border-[#ECECF1] z-10 shadow-[2px_0_8px_rgba(0,0,0,0.02)]">
      {/* Logo Section */}
      <div className="p-6 pb-8">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">
          <span className="text-red-600">Event</span>Hub360
        </h1>
        <p className="text-xs text-gray-500 font-medium mt-1 uppercase tracking-wider">Enterprise Concierge</p>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 space-y-2 overflow-y-auto">
        {navItems.map((item: any, index: any) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || 
            (item.path === '/quotations' && location.pathname.startsWith('/quotations'));

          return (
            <Link
              key={index}
              to={item.path}
              className={`w-full flex items-center h-12 px-4 rounded-[14px] transition-all duration-200 group relative ${
                isActive 
                  ? 'bg-purple-50 text-red-600 font-semibold' // Light lavender background, Red text as requested
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'
              }`}
            >
              <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-red-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
              <span className="text-[15px]">{item.label}</span>
              {isActive && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-red-600 rounded-l-full" />
              )}
            </Link>
          );
        })}
      </div>

      <div className="p-6 pt-4 border-t border-[#ECECF1] space-y-4">
        <button 
          onClick={() => navigate('/quotations/new')}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-orange-400 text-white h-12 rounded-[14px] font-bold text-[15px] shadow-[0_4px_12px_rgba(220,38,38,0.2)] hover:shadow-[0_6px_16px_rgba(220,38,38,0.3)] transition-all mb-4"
        >
          <span className="text-[15px]">+ New Quotation</span>
        </button>

        <div className="space-y-1">
          <Link to="/settings" className="w-full flex items-center h-10 px-4 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors font-medium">
            <Settings className="w-5 h-5 mr-3 text-gray-400" />
            <span className="text-[15px]">Settings</span>
          </Link>
          <Link to="/support" className="w-full flex items-center h-10 px-4 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors font-medium">
            <HelpCircle className="w-5 h-5 mr-3 text-gray-400" />
            <span className="text-[15px]">Support</span>
          </Link>
        </div>

        {/* User Profile Card */}
        <Link to="/profile" className="mt-4 flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-[14px] transition-colors block">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Alex Sterling"
            className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm"
          />
          <div>
            <p className="text-sm font-bold text-gray-900 leading-tight">Alex Sterling</p>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Admin</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
