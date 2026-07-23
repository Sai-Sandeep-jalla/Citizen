import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Clock, 
  ArrowRightLeft, 
  BarChart3, 
  Building2, 
  Users,
  Zap,
  History,
  LogOut
} from 'lucide-react';

export default function Sidebar({ 
  currentTab, 
  setCurrentTab, 
  complaints,
  onLogout
}) {
  
  const pendingCount = complaints.filter(c => c.status === 'Pending' || c.status === 'Assigned').length;

  const navItems = [
    { id: 'dashboard', label: 'Admin Dashboard Overview', icon: LayoutDashboard },
    { id: 'complaints', label: 'All Registered Complaints', icon: FileText, badge: complaints.length },
    { id: 'workqueue', label: 'Pending Action Queue', icon: Clock, badge: pendingCount, badgeColor: 'bg-orange-500 text-white font-bold' },
    { id: 'transfers', label: 'Inter-Dept Transfer Logs', icon: ArrowRightLeft },
    { id: 'reports', label: 'District SLA Reports', icon: BarChart3 },
    { id: 'officers', label: 'Officer Management', icon: Users },
    { id: 'departments', label: 'Department Directory', icon: Building2 },
    { id: 'escalations', label: 'Overdue Complaint Delay Rules', icon: Zap },
    { id: 'auditlogs', label: 'Master System Audit', icon: History },
  ];

  return (
    <aside className="w-full md:w-64 bg-slate-900 text-slate-100 flex-shrink-0 flex flex-col justify-between border-r border-slate-800 md:h-full overflow-y-auto">
      <div className="p-4 space-y-6">
        
        {/* Main Navigation */}
        <div>
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
            Admin Navigation
          </h2>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-800 text-white shadow-md border-l-4 border-orange-500'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-orange-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

      </div>

      {/* Sidebar Footer */}
      <div className="p-3 border-t border-slate-800 bg-slate-950 text-xs flex items-center justify-between">
        <span className="text-[10px] text-slate-500">Admin Portal</span>
        <button 
          onClick={onLogout}
          className="text-orange-400 hover:text-orange-300 text-xs font-bold flex items-center space-x-1 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
