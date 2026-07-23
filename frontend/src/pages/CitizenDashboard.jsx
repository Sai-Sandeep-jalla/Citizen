/**
 * @file CitizenDashboard.jsx
 * @description Dashboard for Citizen role showing personal statistics and quick actions.
 */

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';
import { api } from '../services/api';
import { StatusBadge } from '../components/Badge';
import { DashboardSkeleton } from '../components/Loader';
import {
  FileText,
  Clock,
  CheckCircle,
  Hammer,
  AlertTriangle
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';

export const CitizenDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [dashboardData, announcementsData] = await Promise.all([
          api.getDashboardData(),
          api.getAnnouncements().catch(() => []) // fallback if API fails
        ]);
        setData(dashboardData);
        setAnnouncements(announcementsData);
      } catch (err) {
        console.error('Failed to load dashboard data', err);
        // Fallback for development/demo if backend is offline
        setData({
          stats: { total: 0, pending: 0, inProgress: 0, resolved: 0, closed: 0 },
          recentComplaints: [],
          pieChartData: [],
          categoryChartData: []
        });
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [user]);

  if (loading) return <DashboardSkeleton />;

  const { stats, recentComplaints, pieChartData, categoryChartData } = data;

  const translatedPieChartData = pieChartData.map(item => {
    const statusKeyMap = {
      'PENDING': 'pending',
      'ASSIGNED': 'assigned',
      'IN_PROGRESS': 'inProgress',
      'RESOLVED': 'resolved',
      'CLOSED': 'closed',
      'REJECTED': 'rejected'
    };
    const translatedName = t(statusKeyMap[item.name.toUpperCase()]) || item.name;
    return { ...item, name: translatedName };
  });

  const translatedCategoryChartData = categoryChartData.map(item => ({
    ...item,
    name: t(item.name.toLowerCase()) || item.name
  }));

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Citizen Hero Banner */}
      <div className="bg-gradient-to-br from-[#0B1E47] via-[#1D4ED8] to-[#0B1E47] text-white rounded-3xl px-4 py-6 sm:px-6 sm:py-8 shadow-xl shadow-blue-900/10 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1 z-10">
          <span className="bg-[#F97316] text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm">
            {t('citizenRole')?.toUpperCase() || 'CITIZEN'}
          </span>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-2">
            {t('myGrievanceDashboard') || 'My Grievance Dashboard'}
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 font-medium">
            {t('welcome') || 'Welcome back'}{(user?.data?.userName || user?.data?.name || user?.user?.name || user?.name || user?.userName) ? <>, <span className="text-[#F97316] font-bold">{user?.data?.userName || user?.data?.name || user?.user?.name || user?.name || user?.userName}</span>!</> : '!'} {t('trackAllComplaints') || 'Track all your complaints and requests here.'}
          </p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-4 translate-x-4">
          <FileText className="w-48 h-48 text-white" />
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Total Grievances */}
        <div className="bg-white/90 backdrop-blur-md border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(11,30,71,0.08)] hover:-translate-y-1 transition-all duration-300 rounded-3xl p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black text-[#0B1E47] uppercase tracking-wider leading-tight">
              {t('totalComplaints')?.toUpperCase() || 'TOTAL GRIEVANCES'}
            </span>
            <div className="p-2 bg-blue-50 text-blue-900 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-4xl font-extrabold text-[#0B1E47] leading-none">{stats.total}</h3>
            <span className="inline-block mt-2 px-1.5 py-0.5 bg-slate-50 text-slate-700 text-[9px] font-black rounded-sm border border-slate-100">
              {t('loggedHistory') || 'Logged History'}
            </span>
            <p className="text-[11px] text-gray-500 font-medium mt-2 leading-tight">
              {t('totalTicketsRegistered') || 'Total tickets registered in this account'}
            </p>
          </div>
        </div>

        {/* Card 2: Total Pending */}
        <div className="bg-white/90 backdrop-blur-md border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(11,30,71,0.08)] hover:-translate-y-1 transition-all duration-300 rounded-3xl p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black text-[#0B1E47] uppercase tracking-wider leading-tight">
              {t('pending')?.toUpperCase() || 'PENDING'}
            </span>
            <div className="p-2 bg-[#FFF7ED] text-[#F97316] rounded-lg">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-4xl font-extrabold text-[#0B1E47] leading-none">{stats.pending}</h3>
            <span className="inline-block mt-2 px-1.5 py-0.5 bg-[#FFF7ED] text-[#EA580C] text-[9px] font-black rounded-sm border border-[#FFEDD5]">
              {t('awaitingAssignment') || 'Awaiting Assignment'}
            </span>
            <p className="text-[11px] text-gray-500 font-medium mt-2 leading-tight">
              {t('ticketsAwaitingReview') || 'Tickets awaiting department review'}
            </p>
          </div>
        </div>

        {/* Card 3: In Progress */}
        <div className="bg-white/90 backdrop-blur-md border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(11,30,71,0.08)] hover:-translate-y-1 transition-all duration-300 rounded-3xl p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black text-[#0B1E47] uppercase tracking-wider leading-tight">
              {t('inProgress')?.toUpperCase() || 'IN PROGRESS'}
            </span>
            <div className="p-2 bg-[#EFF6FF] text-[#1D4ED8] rounded-lg">
              <Hammer className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-4xl font-extrabold text-[#0B1E47] leading-none">{stats.inProgress}</h3>
            <span className="inline-block mt-2 px-1.5 py-0.5 bg-[#EFF6FF] text-[#1D4ED8] text-[9px] font-black rounded-sm border border-[#DBEAFE]">
              {t('beingResolved') || 'Being Resolved'}
            </span>
            <p className="text-[11px] text-gray-500 font-medium mt-2 leading-tight">
              {t('activelyHandled') || 'Actively handled by department teams'}
            </p>
          </div>
        </div>

        {/* Card 4: Resolved */}
        <div className="bg-white/90 backdrop-blur-md border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(11,30,71,0.08)] hover:-translate-y-1 transition-all duration-300 rounded-3xl p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black text-[#0B1E47] uppercase tracking-wider leading-tight">
              {t('resolved')?.toUpperCase() || 'RESOLVED'}
            </span>
            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-4xl font-extrabold text-[#0B1E47] leading-none">{stats.resolved + stats.closed}</h3>
            <span className="inline-block mt-2 px-1.5 py-0.5 bg-green-50 text-green-700 text-[9px] font-black rounded-sm border border-green-100">
              {t('closedSla') || 'Closed SLA'}
            </span>
            <p className="text-[11px] text-gray-500 font-medium mt-2 leading-tight">
              {t('grievancesResolved') || 'Grievances successfully resolved'}
            </p>
          </div>
        </div>
      </div>

      {/* Register Grievance CTA Bar */}
      <div className="bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white rounded-3xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 shadow-lg shadow-orange-900/10">
        <div className="flex items-start sm:items-center space-x-4 text-white">
          <div className="p-2 bg-white/20 rounded-xl border border-white/20 mt-0.5 sm:mt-0 flex-shrink-0 backdrop-blur-sm">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm sm:text-base font-black text-white">
              {t('needSupportQuestion') || 'Need urgent local support or want to request civic amenities?'}
            </p>
            <p className="text-xs text-orange-100 leading-tight mt-1">
              {t('submitGrievanceDirectly') || 'Submit a new citizen grievance directly to get fast SLA response from district officers.'}
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate('/complaint/register')}
          className="px-6 py-3 bg-white text-[#F97316] hover:bg-orange-50 font-black text-sm rounded-xl shadow-md whitespace-nowrap active:scale-[0.98] transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          {t('lodgeNewGrievance') || 'Lodge New Grievance'}
        </button>
      </div>

      {/* Charts & Recent Complaints */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/90 backdrop-blur-md border border-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            {/* Pie Chart */}
            <div className="flex flex-col h-64">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">{t('myGrievanceStatuses') || 'My Grievance Statuses'}</h3>
              {translatedPieChartData.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-xs text-gray-400 font-bold uppercase tracking-wider">{t('noTicketsLogged') || 'No tickets logged'}</div>
              ) : (
                <div className="flex-1 min-h-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={translatedPieChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {translatedPieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [value, t('ticketId') || 'Tickets']} />
                      <Legend iconSize={10} layout="horizontal" align="center" verticalAlign="bottom" wrapperStyle={{ fontSize: 10 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* Bar Chart */}
            <div className="flex flex-col h-64">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">{t('complaintsByCategory') || 'Complaints by Category'}</h3>
              {translatedCategoryChartData.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-xs text-gray-400 font-bold uppercase tracking-wider">{t('noCategoryDistribution') || 'No category distribution'}</div>
              ) : (
                <div className="flex-1 min-h-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={translatedCategoryChartData}>
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} />
                      <Tooltip formatter={(value) => [value, t('ticketId') || 'Tickets']} />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {translatedCategoryChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#1D4ED8' : '#F97316'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>

          {/* Recent Complaints Table */}
          <div className="bg-white/90 backdrop-blur-md border border-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-black text-[#0B1E47] uppercase tracking-wider">{t('myRecentGrievances') || 'My Recent Registered Grievances'}</h3>
              <Link to="/complaint/history" className="text-xs font-bold text-[#1D4ED8] hover:underline">
                {t('viewAllLog') || 'View All Log'}
              </Link>
            </div>
            {recentComplaints.length === 0 ? (
              <p className="text-xs text-gray-400 py-4 text-center">{t('noActiveGrievances') || 'No active grievances logged.'}</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-[#E2E8F0]">
                      <th className="text-left py-2 text-[10px] font-black text-gray-400 uppercase tracking-wider">{t('ticketId') || 'Ticket ID'}</th>
                      <th className="text-left py-2 text-[10px] font-black text-gray-400 uppercase tracking-wider">{t('title') || 'Title'}</th>
                      <th className="text-left py-2 text-[10px] font-black text-gray-400 uppercase tracking-wider">{t('status') || 'Status'}</th>
                      <th className="text-left py-2 text-[10px] font-black text-gray-400 uppercase tracking-wider">{t('priority') || 'Priority'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentComplaints.map((c) => (
                      <tr
                        key={c.id}
                        className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer"
                        onClick={() => navigate(`/complaint/track?id=${c.id}`)}
                      >
                        <td className="py-2.5 font-bold text-[#1D4ED8]">{c.id}</td>
                        <td className="py-2.5 text-gray-700 font-medium max-w-[160px] truncate">{c.title}</td>
                        <td className="py-2.5"><StatusBadge status={c.status} /></td>
                        <td className="py-2.5 text-gray-500 uppercase text-[10px] font-extrabold">{t(c.priority.toLowerCase()) || c.priority}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar – Quick Actions & Announcements */}
        <div className="space-y-8">
          {/* Quick Actions Card */}
          <div className="bg-white/90 backdrop-blur-md border border-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">{t('quickActions') || 'Quick Actions'}</h3>
            <div className="space-y-2">
              <button
                onClick={() => navigate('/complaint/register')}
                className="w-full flex items-center space-x-3 px-3 py-2.5 bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#1D4ED8] rounded-lg text-xs font-extrabold transition-all active:scale-[0.98]"
              >
                <FileText className="w-4 h-4" />
                <span>{t('registerNewGrievance') || 'Register New Grievance'}</span>
              </button>
              <button
                onClick={() => navigate('/complaint/track')}
                className="w-full flex items-center space-x-3 px-3 py-2.5 bg-[#FFF7ED] hover:bg-[#FFEDD5] text-[#F97316] rounded-lg text-xs font-extrabold transition-all active:scale-[0.98]"
              >
                <Clock className="w-4 h-4" />
                <span>{t('trackExistingGrievance') || 'Track Existing Grievance'}</span>
              </button>
              <button
                onClick={() => navigate('/feedback')}
                className="w-full flex items-center space-x-3 px-3 py-2.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-xs font-extrabold transition-all active:scale-[0.98]"
              >
                <CheckCircle className="w-4 h-4" />
                <span>{t('submitFeedback') || 'Submit Feedback'}</span>
              </button>
            </div>
          </div>

          {/* Government Announcements */}
          <div className="bg-white/90 backdrop-blur-md border border-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-4">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('officialAnnouncements') || 'Official Announcements'}</h3>
            {announcements.slice(0, 3).map((a, i) => (
              <div key={i} className="flex items-start space-x-3 border-b border-gray-50 pb-3 last:border-0">
                <div className="p-1.5 bg-[#EFF6FF] text-[#1D4ED8] rounded-md flex-shrink-0">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[11px] font-extrabold text-[#0B1E47] leading-snug">{a.title}</p>
                  <p className="text-[10px] text-gray-400 font-medium mt-0.5">{a.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenDashboard;
