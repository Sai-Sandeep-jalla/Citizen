/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';
import {
  LayoutDashboard,
  FilePlus,
  Search,
  MessageSquare,
  LogOut,
  Menu,
  Globe,
  X,
  ChevronDown,
  FileText,
  Clock,
  RefreshCw,
  TrendingUp,
  Grid,
  Coins,
  Home,
  GraduationCap,
  Building,
  Map
} from 'lucide-react';

export const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const { lang, changeLanguage } = useLanguage();
  const { darkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Dynamic menu counts
  const [counts, setCounts] = useState({ total: 0, pending: 0, assigned: 0 });
  
  useEffect(() => {
    const updateCounts = () => {
      const list = JSON.parse(localStorage.getItem('portal_complaints') || '[]');
      const filtered = user?.role === 'CITIZEN' ? list.filter(c => c.citizenId === user?.id) : list;
      setCounts({
        total: filtered.length,
        pending: filtered.filter(c => c.status === 'PENDING').length,
        assigned: filtered.filter(c => c.status === 'ASSIGNED' || c.status === 'IN_PROGRESS').length
      });
    };
    updateCounts();
    window.addEventListener('storage', updateCounts);
    return () => window.removeEventListener('storage', updateCounts);
  }, [user]);

  // Close menus on path changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setSidebarOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const isOfficer = user?.role === 'OFFICER' || user?.role === 'ADMIN';

  const citizenMenuItems = [
    { path: '/dashboard', label: 'Citizen Dashboard', icon: LayoutDashboard },
    { path: '/complaint/register', label: 'Register Grievance', icon: FilePlus },
    { path: '/complaint/track', label: 'Track Grievance', icon: Search },
    { path: '/complaint/history', label: 'Grievance History', icon: FileText, count: counts.total },
    { path: '/feedback', label: 'Feedback & Ratings', icon: MessageSquare }
  ];

  const officerMenuItems = [
    { path: '/dashboard', label: 'Officer Dashboard', icon: LayoutDashboard },
    { path: '/complaint/history', label: 'Complaint Management', icon: FileText, count: 10 },
    { path: '/complaint/history?status=ASSIGNED', label: 'My Work Queue', icon: Clock, count: 5 },
    { path: '#transfers', label: 'Department Transfers', icon: RefreshCw },
    { path: '#analytics', label: 'Analytics & Reports', icon: TrendingUp }
  ];

  const visibleMenuItems = isOfficer ? officerMenuItems : citizenMenuItems;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={`min-h-screen flex bg-[#F8FAFC] text-gray-800 transition-colors duration-250 ${darkMode ? 'dark bg-gray-900 text-gray-100' : ''}`}>
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#090D16] border-r border-gray-900 h-screen sticky top-0 text-gray-300">
        {/* Header/Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-900 bg-[#090D16] text-white space-x-2.5">
          <div className="bg-[#1D4ED8] text-white font-extrabold rounded-md w-7 h-7 flex items-center justify-center text-xs tracking-tight">AP</div>
          <span className="font-extrabold text-sm tracking-wider uppercase text-white">AP GOVT PORTAL</span>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          {/* MAIN NAVIGATION */}
          <div className="px-6 py-2 text-[10px] font-black text-gray-500 tracking-widest uppercase">
            MAIN NAVIGATION
          </div>
          <nav className="px-4 space-y-1.5">
            {visibleMenuItems.map((item) => {
              const Icon = item.icon;
              const isLinkActive = item.path.includes('?') 
                ? location.pathname + location.search === item.path
                : location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/');
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-extrabold transition-all duration-150 ${
                    isLinkActive
                      ? 'bg-[#1D4ED8] text-white shadow-sm'
                      : 'text-gray-400 hover:bg-[#1E293B] hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                      item.label.includes('Queue') ? 'bg-[#F97316] text-white' : 'bg-[#1E293B] text-gray-300'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* DEPARTMENT SELECTION */}
          {isOfficer && (
            <>
              <div className="px-6 py-2 text-[10px] font-black text-gray-500 tracking-widest uppercase mt-6 flex justify-between items-center">
                <span>DEPARTMENT SELECTION</span>
                <span className="text-[9px] text-[#F97316] font-extrabold bg-[#FFF7ED]/10 border border-[#F97316]/20 px-1 rounded-sm">6 DEPTS</span>
              </div>
              <nav className="px-4 space-y-1.5">
                <Link
                  to="/complaint/history"
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-extrabold transition-all duration-150 ${
                    location.pathname === '/complaint/history' && !location.search.includes('category')
                      ? 'bg-[#F97316] text-white shadow-sm'
                      : 'text-gray-400 hover:bg-[#1E293B] hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Grid className="w-4 h-4 flex-shrink-0" />
                    <span>All Departments</span>
                  </div>
                  <span className="text-[10px] font-bold bg-black/30 text-white px-1.5 py-0.5 rounded-md">
                    20
                  </span>
                </Link>

                {[
                  { id: 'revenue', label: 'REVENUE', icon: Coins, count: 2 },
                  { id: 'village', label: 'VILLAGE', icon: Home, count: 2 },
                  { id: 'schools', label: 'SCHOOLS', icon: GraduationCap, count: 2 },
                  { id: 'housing', label: 'HOUSING', icon: Building, count: 1 },
                  { id: 'land', label: 'LAND', icon: Map, count: 2 }
                ].map((dept) => {
                  const Icon = dept.icon;
                  const isDeptActive = location.search.includes(`category=${dept.id}`);
                  return (
                    <Link
                      key={dept.id}
                      to={`/complaint/history?category=${dept.id}`}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-extrabold transition-all duration-150 ${
                        isDeptActive
                          ? 'bg-[#F97316] text-white shadow-sm'
                          : 'text-gray-400 hover:bg-[#1E293B] hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span>{dept.label}</span>
                      </div>
                      <span className="text-[10px] font-bold bg-[#1E293B] text-gray-300 px-1.5 py-0.5 rounded-md">
                        {dept.count}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </>
          )}
        </div>

        {/* Footer Logout */}
        <div className="p-4 border-t border-gray-900 bg-[#070A11]">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-3 py-2.5 rounded-lg text-xs font-extrabold text-red-400 hover:bg-red-955/20 transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Dashboard</span>
          </button>
        </div>
      </aside>

      {/* Mobile Drawer Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Drawer Sidebar Panel */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#090D16] text-gray-300 border-r border-gray-900 flex flex-col h-full transform transition-transform duration-300 ease-in-out lg:hidden
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-900 bg-[#090D16] text-white">
          <div className="flex items-center space-x-2">
            <div className="bg-[#1D4ED8] text-white font-extrabold rounded-md w-7 h-7 flex items-center justify-center text-xs tracking-tight">AP</div>
            <span className="font-extrabold text-sm tracking-wide uppercase">AP GOVT PORTAL</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="text-white hover:bg-gray-900 p-1 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-6 py-2 text-[10px] font-black text-gray-500 tracking-widest uppercase">
            MAIN NAVIGATION
          </div>
          <nav className="px-4 space-y-1.5">
            {visibleMenuItems.map((item) => {
              const Icon = item.icon;
              const isLinkActive = item.path.includes('?') 
                ? location.pathname + location.search === item.path
                : location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/');
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-extrabold ${
                    isLinkActive ? 'bg-[#1D4ED8] text-white' : 'text-gray-400 hover:bg-[#1E293B] hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <Icon className="w-4 h-4 mr-2.5" />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span className="text-[10px] font-bold bg-[#1E293B] text-gray-300 px-1.5 rounded">{item.count}</span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="p-4 border-t border-gray-900 bg-[#070A11]">
          <button
            onClick={() => { setSidebarOpen(false); handleLogout(); }}
            className="flex items-center space-x-3 w-full px-3 py-2.5 rounded-lg text-xs font-extrabold text-red-455 hover:bg-red-955/20"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Dashboard</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Dual-Bar Layout */}
        <div className="flex flex-col w-full no-print">
          {/* Bar 1 (Upper Government Banner) */}
          <div className="h-9 bg-[#0B1E47] text-white flex items-center justify-between px-4 sm:px-6 border-b border-blue-950">
            <div className="flex items-center">
              <span className="bg-[#F97316] text-white text-[9px] font-black tracking-wider px-1.5 py-0.5 rounded mr-2.5">
                AP GOVT PORTAL
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-blue-200">
                {isOfficer 
                  ? "Department Officer Management & Grievance SLA Escalation Portal"
                  : "Citizen Grievance Management & Redressal SLA Portal"}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {/* Live SLA indicator */}
              <div className="flex items-center space-x-1.5 relative">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full absolute"></span>
                <span className="text-[10px] text-green-400 font-bold tracking-wide uppercase ml-2.5">
                  Live SLA Service Online
                </span>
              </div>
              {/* Timestamp */}
              <span className="text-[10px] text-blue-300 font-medium hidden md:block">
                Wed, 15 Jul, 2026
              </span>

              {/* Lang Selector Dropdown */}
              <div className="flex items-center space-x-1 px-2.5 py-1 bg-white/10 text-white border border-white/10 text-[10px] font-black rounded select-none">
                <Globe className="w-3 h-3 text-[#F97316]" />
                <select
                  value={lang}
                  onChange={(e) => changeLanguage(e.target.value)}
                  className="bg-transparent border-0 text-[10px] font-black text-white focus:ring-0 focus:outline-none cursor-pointer pr-1"
                  style={{ colorScheme: 'dark' }}
                >
                  <option value="en" className="bg-[#0B1E47] text-white">English</option>
                  <option value="hi" className="bg-[#0B1E47] text-white">हिन्दी</option>
                  <option value="te" className="bg-[#0B1E47] text-white">తెలుగు</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bar 2 (Main Lower Navigation and Profile Bar) */}
          <div className="h-20 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20">
            <div className="flex items-center space-x-3">
              {/* Mobile Drawer Trigger */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              {/* Logo and Titles */}
              <div className="w-10 h-10 rounded-full bg-[#0B1E47] flex items-center justify-center text-white font-extrabold text-sm shadow-md">
                AP
              </div>
              <div>
                <div className="flex items-center">
                  <h1 className="text-sm sm:text-base font-extrabold text-[#0B1E47] tracking-tight">
                    {isOfficer ? "Department Officer Portal" : "Citizen Grievance Portal"}
                  </h1>
                  <span className="ml-2 px-1.5 py-0.5 bg-[#EFF6FF] text-[#1D4ED8] text-[9px] font-extrabold rounded">
                    {isOfficer ? "District Level" : "State Level"}
                  </span>
                </div>
                <p className="text-[10px] font-bold text-[#EA580C] leading-none mt-0.5">
                  {isOfficer ? "Active Department: All 6 Departments" : "AP SLA Service: 24/7 Redressal"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Badges/Pills */}
              <div className="hidden md:flex items-center space-x-2.5">
                <div className="px-2.5 py-1 bg-[#FFF7ED] border border-[#FFEDD5] text-[#EA580C] text-[10px] font-extrabold rounded-full flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#EA580C] rounded-full mr-1.5"></span>
                  {isOfficer ? "2 Emergency Alerts" : "SLA Priority: High"}
                </div>
                <div className="px-2.5 py-1 bg-[#EFF6FF] border border-[#DBEAFE] text-[#1D4ED8] text-[10px] font-extrabold rounded-full flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#1D4ED8] rounded-full mr-1.5"></span>
                  {isOfficer ? "Today: 5 Registered" : `My Active Tickets: ${counts.assigned}`}
                </div>
                <div className="px-2.5 py-1 border border-gray-200 text-gray-700 text-[10px] font-bold bg-white rounded-lg flex items-center shadow-2xs">
                  {isOfficer ? "DISTRICT CONTEXT: All Districts" : `MY DISTRICT: ${user?.district || 'All Districts'}`}
                  <ChevronDown className="w-3 h-3 text-gray-400 ml-1.5" />
                </div>
              </div>

              {/* Profile Card */}
              <div className="flex items-center space-x-2 border-l border-gray-150 pl-3">
                <img
                  src={user?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"}
                  alt="User avatar"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-[#EFF6FF]"
                />
                <div className="hidden sm:block leading-tight">
                  <p className="text-xs font-black text-[#0B1E47] truncate w-28">{user?.name || "Guest Citizen"}</p>
                  <p className="text-[9px] text-gray-450 font-bold uppercase">{isOfficer ? "AP-GOV-OFF-4081" : "Citizen Account"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content panel */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
export default DashboardLayout;
