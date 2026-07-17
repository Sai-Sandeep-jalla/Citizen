/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';
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
} from 'lucide-react';

export const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const { lang, changeLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Dynamic menu counts
  const [counts, setCounts] = useState({ total: 0, pending: 0, assigned: 0 });

  useEffect(() => {
    const updateCounts = () => {
      const list = JSON.parse(localStorage.getItem('portal_complaints') || '[]');
      const filtered = list.filter(c => c.citizenId === user?.id);
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

  // Close sidebar on path changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setSidebarOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const menuItems = [
    { path: '/dashboard', label: t('citizenDashboard') || 'Citizen Dashboard', icon: LayoutDashboard },
    { path: '/complaint/register', label: t('registerGrievance') || 'Register Grievance', icon: FilePlus },
    { path: '/complaint/track', label: t('trackGrievance') || 'Track Grievance', icon: Search },
    { path: '/complaint/history', label: t('grievanceHistory') || 'Grievance History', icon: FileText, count: counts.total },
    { path: '/feedback', label: t('feedbackRatings') || 'Feedback & Ratings', icon: MessageSquare }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const SidebarNav = ({ onLinkClick }) => (
    <nav className="px-4 space-y-1.5">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          location.pathname === item.path ||
          (item.path === '/dashboard' && location.pathname === '/');
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={onLinkClick}
            className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-extrabold transition-all duration-150 ${isActive
              ? 'bg-[#1D4ED8] text-white shadow-sm border-l-2 border-[#F97316]'
              : 'text-gray-400 hover:bg-[#1D4ED8]/20 hover:text-white'
              }`}
          >
            <div className="flex items-center space-x-2.5">
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
            </div>
            {item.count !== undefined && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-[#1E293B] text-gray-300">
                {item.count}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );

  const SidebarFooter = ({ onLogout }) => (
    <div className="p-4 border-t border-gray-900 bg-[#070A11]">
      <button
        onClick={onLogout}
        className="flex items-center space-x-3 w-full px-3 py-2.5 rounded-lg text-xs font-extrabold text-red-400 hover:bg-red-900/20 transition-all duration-200"
      >
        <LogOut className="w-4 h-4" />
        <span>{t('logout') || 'Logout'}</span>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] text-[#1E293B] transition-colors duration-250">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#090D16] border-r border-gray-900 h-screen sticky top-0 text-gray-300">
        {/* Header/Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-900 bg-[#090D16] text-white space-x-2.5">
          <div className="bg-[#1D4ED8] text-white font-extrabold rounded-md w-7 h-7 flex items-center justify-center text-xs tracking-tight">GP</div>
          <span className="font-extrabold text-sm tracking-wider uppercase text-white">{t('GovtPortal') || 'GOVT PORTAL'}</span>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-6 py-2 text-[10px] font-black text-gray-500 tracking-widest uppercase">
            {t('mainNavigation') || 'MAIN NAVIGATION'}
          </div>
          <SidebarNav />
        </div>

        <SidebarFooter onLogout={handleLogout} />
      </aside>

      {/* Mobile Drawer Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Drawer Panel */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#090D16] text-gray-300 border-r border-gray-900 flex flex-col h-full transform transition-transform duration-300 ease-in-out lg:hidden
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-900 bg-[#090D16] text-white">
          <div className="flex items-center space-x-2">
            <div className="bg-[#1D4ED8] text-white font-extrabold rounded-md w-7 h-7 flex items-center justify-center text-xs tracking-tight">GP</div>
            <span className="font-extrabold text-sm tracking-wide uppercase">{t('GovtPortal') || 'GOVT PORTAL'}</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="text-white hover:bg-gray-900 p-1 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-6 py-2 text-[10px] font-black text-gray-500 tracking-widest uppercase">
            {t('mainNavigation') || 'MAIN NAVIGATION'}
          </div>
          <SidebarNav onLinkClick={() => setSidebarOpen(false)} />
        </div>

        <SidebarFooter onLogout={() => { setSidebarOpen(false); handleLogout(); }} />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <div className="flex flex-col w-full no-print">
          {/* Upper Government Banner */}
          <div className="h-9 bg-[#0B1E47] text-white flex items-center justify-between px-4 sm:px-6 border-b border-blue-950">
            <div className="flex items-center">
              <span className="bg-[#F97316] text-white text-[9px] font-black tracking-wider px-1.5 py-0.5 rounded mr-2.5">
                {t('GovtPortal') || 'GOVT PORTAL'}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-blue-200">
                {t('citizenGrievanceManagement') || 'Citizen Grievance Management & Redressal SLA Portal'}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {/* Live SLA indicator */}
              <div className="flex items-center space-x-1.5 relative">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full absolute"></span>
                <span className="text-[10px] text-green-400 font-bold tracking-wide uppercase ml-2.5">
                  {t('liveSlaServiceOnline') || 'Live SLA Service Online'}
                </span>
              </div>
              {/* Timestamp */}
              <span className="text-[10px] text-blue-300 font-medium hidden md:block">
                {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}
              </span>

              {/* Lang Selector */}
              <div className="flex items-center space-x-1 px-2.5 py-1 bg-white/10 text-white border border-white/10 text-[10px] font-black rounded select-none">
                <Globe className="w-3 h-3 text-[#F97316]" />
                <select
                  value={lang}
                  onChange={(e) => changeLanguage(e.target.value)}
                  className="bg-transparent border-0 text-[10px] font-black text-white focus:ring-0 focus:outline-none cursor-pointer pr-1"
                  style={{ colorScheme: 'dark' }}
                >
                  <option value="en" className="bg-[#0B1E47] text-white">English</option>
                  <option value="hi" className="bg-[#0B1E47] text-white">Hindi/हिंदी</option>
                  <option value="te" className="bg-[#0B1E47] text-white">Telugu/తెలుగు</option>
                  <option value="bn" className="bg-[#0B1E47] text-white">Bengali/বাংলা</option>
                  <option value="mr" className="bg-[#0B1E47] text-white">Marathi/मराठी</option>
                  <option value="ta" className="bg-[#0B1E47] text-white">Tamil/தமிழ்</option>
                  <option value="gu" className="bg-[#0B1E47] text-white">Gujarati/ગુજરાતી</option>
                  <option value="kn" className="bg-[#0B1E47] text-white">Kannada/ಕನ್ನಡ</option>
                  <option value="ml" className="bg-[#0B1E47] text-white">Malayalam/മലയാളം</option>
                  <option value="ur" className="bg-[#0B1E47] text-white">Urdu/اردو</option>
                </select>
              </div>
            </div>
          </div>

          {/* Main Lower Navigation and Profile Bar */}
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
                GP
              </div>
              <div>
                <div className="flex items-center">
                  <h1 className="text-sm sm:text-base font-extrabold text-[#0B1E47] tracking-tight">
                    {t('citizenGrievancePortal') || 'Citizen Grievance Portal'}
                  </h1>
                  <span className="ml-2 px-1.5 py-0.5 bg-[#EFF6FF] text-[#1D4ED8] text-[9px] font-extrabold rounded">
                    {t('stateLevel') || 'State Level'}
                  </span>
                </div>
                <p className="text-[10px] font-bold text-[#EA580C] leading-none mt-0.5">
                  {t('gpSlaService') || 'GP SLA Service: 24/7 Redressal'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Status Pills */}
              <div className="hidden md:flex items-center space-x-2.5">
                <div className="px-2.5 py-1 bg-[#FFF7ED] border border-[#FFEDD5] text-[#EA580C] text-[10px] font-extrabold rounded-full flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#EA580C] rounded-full mr-1.5"></span>
                  {t('slaPriorityHigh') || 'SLA Priority: High'}
                </div>
                <div className="px-2.5 py-1 bg-[#EFF6FF] border border-[#DBEAFE] text-[#1D4ED8] text-[10px] font-extrabold rounded-full flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#1D4ED8] rounded-full mr-1.5"></span>
                  {t('myActiveTickets')?.replace('{count}', counts.assigned) || `My Active Tickets: ${counts.assigned}`}
                </div>
                <div className="px-2.5 py-1 border border-gray-200 text-gray-700 text-[10px] font-bold bg-white rounded-lg flex items-center shadow-2xs">
                  {t('myDistrict')?.replace('{district}', user?.district || 'All Districts') || `MY DISTRICT: ${user?.district || 'All Districts'}`}
                  <ChevronDown className="w-3 h-3 text-gray-400 ml-1.5" />
                </div>
              </div>

              {/* Profile Card */}
              <div className="flex items-center space-x-2 border-l border-gray-150 pl-3">
                <img
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Citizen')}&background=F97316&color=fff`}
                  alt="User avatar"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-[#EFF6FF]"
                />
                <div className="hidden sm:block leading-tight">
                  <p className="text-xs font-black text-[#0B1E47] truncate w-28">{user?.name || 'Guest Citizen'}</p>
                  <p className="text-[9px] text-gray-450 font-bold uppercase">{t('citizenAccount') || 'Citizen Account'}</p>
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
