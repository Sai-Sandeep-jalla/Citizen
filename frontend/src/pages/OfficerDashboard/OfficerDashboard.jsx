/**
 * @file OfficerDashboard.jsx
 * @description Main dashboard wrapper for the Department Officer role. Navigation is controlled via URL hash from the sidebar.
 */

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../hooks/useLanguage';
import DashboardOverview from './components/DashboardOverview';
import ComplaintManagement from './components/ComplaintManagement';
import Assignment from './components/Assignment';
import Reports from './components/Reports';
import { LayoutDashboard } from 'lucide-react';

export const OfficerDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    // Parse the hash to set the active tab, defaulting to 'dashboard'
    const hash = location.hash.replace('#', '');
    if (['complaints', 'assignment', 'reports'].includes(hash)) {
      setActiveTab(hash);
    } else {
      setActiveTab('dashboard');
    }
  }, [location.hash]);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'complaints':
        return <ComplaintManagement />;
      case 'assignment':
        return <Assignment />;
      case 'reports':
        return <Reports />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Officer Hero Banner */}
      <div className="bg-gradient-to-br from-[#0B1E47] via-[#1E3A8A] to-[#0B1E47] text-white rounded-3xl px-4 py-6 sm:px-6 sm:py-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1 z-10">
          <span className="bg-blue-500 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm">
            {t('officerRole')?.toUpperCase() || 'DEPARTMENT OFFICER'}
          </span>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-2">
            Department Command Center
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 font-medium">
            {t('welcome') || 'Welcome back'}{(user?.data?.userName || user?.data?.name || user?.user?.name || user?.name || user?.userName) ? <>, <span className="text-blue-400 font-bold">{user?.data?.userName || user?.data?.name || user?.user?.name || user?.name || user?.userName}</span>!</> : '!'} Manage and assign department grievances efficiently.
          </p>
        </div>
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none transform translate-x-8">
          <LayoutDashboard className="w-40 h-40 text-white" />
        </div>
      </div>

      {/* Active Tab Content */}
      <div className="mt-6">
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default OfficerDashboard;
