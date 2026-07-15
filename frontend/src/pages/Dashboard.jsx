import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';
import { StatusBadge } from '../components/Badge';
import { DashboardSkeleton } from '../components/Loader';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  Hammer, 
  Calendar,
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
import { ANNOUNCEMENTS } from '../constants';

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const dashboardData = await api.getDashboardData();
        setData(dashboardData);
      } catch (err) {
        console.error('Failed to load dashboard data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [user]);

  if (loading) return <DashboardSkeleton />;

  const { stats, recentComplaints, pieChartData, categoryChartData, averageRating, citizenSatisfactionRate } = data;
  const isOfficer = user?.role === 'OFFICER' || user?.role === 'ADMIN';

  if (isOfficer) {
    return (
      <div className="space-y-6">
        {/* Officer Hero Banner */}
        <div className="bg-[#0B1E47] text-white rounded-2xl p-6 shadow-md relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1 z-10">
            <span className="bg-[#F97316] text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm">
              OFFICER SUMMARY DASHBOARD
            </span>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-2">
              District Grievance SLA Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-blue-200 font-medium">
              Real-time monitoring for registered complaints in <span className="text-[#F97316] font-bold">All Districts</span> across <span className="text-white font-bold">All 6 Departments</span>.
            </p>
          </div>
          {/* Subtle logo vector graphic on the right */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-4 translate-x-4">
            <FileText className="w-48 h-48 text-white" />
          </div>
        </div>

        {/* Officer Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Issues Registered Today */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 flex flex-col justify-between shadow-xs">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-black text-[#0B1E47] uppercase tracking-wider leading-tight">
                ISSUES REGISTERED<br />TODAY
              </span>
              <div className="p-2 bg-[#FFF7ED] text-[#F97316] rounded-lg">
                <Calendar className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-4xl font-extrabold text-[#0B1E47] leading-none">{stats.registeredToday}</h3>
              <span className="inline-block mt-2 px-1.5 py-0.5 bg-[#FFF7ED] text-[#EA580C] text-[9px] font-black rounded-sm border border-[#FFEDD5]">
                New Received
              </span>
              <p className="text-[11px] text-gray-500 font-medium mt-2 leading-tight">
                Requires initial review within 24 hours
              </p>
            </div>
          </div>

          {/* Card 2: Total Pending */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 flex flex-col justify-between shadow-xs">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-black text-[#0B1E47] uppercase tracking-wider leading-tight">
                TOTAL PENDING
              </span>
              <div className="p-2 bg-[#EFF6FF] text-[#1D4ED8] rounded-lg">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-4xl font-extrabold text-[#0B1E47] leading-none">{stats.pending}</h3>
              <span className="inline-block mt-2 px-1.5 py-0.5 bg-[#EFF6FF] text-[#1D4ED8] text-[9px] font-black rounded-sm border border-[#DBEAFE]">
                Action Required
              </span>
              <p className="text-[11px] text-gray-500 font-medium mt-2 leading-tight">
                Pending officer assignment or review
              </p>
            </div>
          </div>

          {/* Card 3: Completed / Closed */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 flex flex-col justify-between shadow-xs">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-black text-[#0B1E47] uppercase tracking-wider leading-tight">
                COMPLETED / CLOSED
              </span>
              <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                <CheckCircle className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-4xl font-extrabold text-[#0B1E47] leading-none">{stats.resolved + stats.closed}</h3>
              <span className="inline-block mt-2 px-1.5 py-0.5 bg-green-50 text-green-700 text-[9px] font-black rounded-sm border border-green-100">
                Resolved
              </span>
              <p className="text-[11px] text-gray-550 font-medium mt-2 leading-tight">
                Verified with uploaded resolution proof
              </p>
            </div>
          </div>

          {/* Card 4: Total Registered (Year 2026) */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 flex flex-col justify-between shadow-xs">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-black text-[#0B1E47] uppercase tracking-wider leading-tight">
                TOTAL REGISTERED<br />(YEAR 2026)
              </span>
              <div className="p-2 bg-blue-50 text-blue-900 rounded-lg">
                <FileText className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-4xl font-extrabold text-[#0B1E47] leading-none">{stats.total}</h3>
              <span className="inline-block mt-2 px-1.5 py-0.5 bg-slate-50 text-slate-700 text-[9px] font-black rounded-sm border border-slate-100">
                Cumulative Volume
              </span>
              <p className="text-[11px] text-gray-550 font-medium mt-2 leading-tight">
                Total annual district grievance count
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Alerts Orange Bar */}
        <div className="bg-[#F97316] text-white rounded-xl p-4.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
          <div className="flex items-start sm:items-center space-x-3 text-white">
            <div className="p-1.5 bg-white/10 rounded-lg border border-white/10 mt-0.5 sm:mt-0 flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-black text-white">
                {stats.pending} Actionable Complaints Require Immediate Attention!
              </p>
              <p className="text-[11px] text-orange-100 leading-tight mt-0.5">
                Critical water leaks, school hazards, or urgent certificate approvals assigned top SLA priority.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/complaint/history?priority=CRITICAL')}
            className="px-4 py-2 bg-white text-[#F97316] hover:bg-orange-50 font-black text-xs rounded-lg shadow-sm whitespace-nowrap active:scale-[0.98] transition-all"
          >
            Inspect Emergency Case
          </button>
        </div>

        {/* Rest of the functional Dashboard (Charts & Recent lists) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs">
              <div className="flex flex-col h-64">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Status Distribution</h3>
                {pieChartData.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center text-xs text-gray-400 font-bold uppercase tracking-wider">No data yet</div>
                ) : (
                  <div className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={75}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [value, 'Tickets']} />
                        <Legend iconSize={10} layout="horizontal" align="center" verticalAlign="bottom" wrapperStyle={{ fontSize: 10 }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>

              <div className="flex flex-col h-64">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Complaints by Category</h3>
                {categoryChartData.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center text-xs text-gray-400 font-bold uppercase tracking-wider">No category distribution</div>
                ) : (
                  <div className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryChartData}>
                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} tickLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} />
                        <Tooltip formatter={(value) => [value, 'Tickets']} />
                        <Bar dataKey="value" fill="var(--color-primary)" radius={[4, 4, 0, 0]}>
                          {categoryChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#1D4ED8' : '#F97316'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Complaints Log Table */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-black text-[#0B1E47] uppercase tracking-wider">Recent Complaints</h3>
                <Link to="/complaint/history" className="text-xs font-bold text-[#1D4ED8] hover:underline">
                  View All
                </Link>
              </div>
              {recentComplaints.length === 0 ? (
                <p className="text-xs text-gray-400 py-4 text-center">No complaints registered yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-[#E2E8F0]">
                        <th className="text-left py-2 text-[10px] font-black text-gray-400 uppercase tracking-wider">Ticket ID</th>
                        <th className="text-left py-2 text-[10px] font-black text-gray-400 uppercase tracking-wider">Title</th>
                        <th className="text-left py-2 text-[10px] font-black text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="text-left py-2 text-[10px] font-black text-gray-400 uppercase tracking-wider">Category</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentComplaints.map((c) => (
                        <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/complaint/track?id=${c.id}`)}>
                          <td className="py-2.5 font-bold text-[#1D4ED8]">{c.id}</td>
                          <td className="py-2.5 text-gray-700 font-medium max-w-[160px] truncate">{c.title}</td>
                          <td className="py-2.5"><StatusBadge status={c.status} /></td>
                          <td className="py-2.5 text-gray-500 uppercase text-[10px] font-extrabold">{c.category}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar – Stats Summary & Announcements */}
          <div className="space-y-6">
            {/* Feedback Summary Card */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Citizen Satisfaction</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-500">Average Rating</span>
                  <span className="text-xl font-black text-[#0B1E47]">{averageRating} <span className="text-[#F97316] text-sm">★</span></span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-500">Satisfaction Rate</span>
                  <span className="text-xl font-black text-[#0B1E47]">{citizenSatisfactionRate}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-[#F97316] h-2 rounded-full transition-all duration-700" style={{ width: `${citizenSatisfactionRate}%` }} />
                </div>
              </div>
            </div>

            {/* Government Announcements */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs space-y-3">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Official Announcements</h3>
              {ANNOUNCEMENTS.slice(0, 3).map((a, i) => (
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
  }

  // =============================================
  // CITIZEN DASHBOARD
  // =============================================
  return (
    <div className="space-y-6">
      {/* Citizen Hero Banner */}
      <div className="bg-[#0B1E47] text-white rounded-2xl p-6 shadow-md relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1 z-10">
          <span className="bg-[#F97316] text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm">
            CITIZEN PORTAL
          </span>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-2">
            My Grievance Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 font-medium">
            Welcome back, <span className="text-[#F97316] font-bold">{user?.name || 'Citizen'}</span>! Track all your complaints and requests here.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-4 translate-x-4">
          <FileText className="w-48 h-48 text-white" />
        </div>
      </div>

      {/* Citizen Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Registered */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 flex flex-col justify-between shadow-xs">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black text-[#0B1E47] uppercase tracking-wider leading-tight">
              TOTAL GRIEVANCES
            </span>
            <div className="p-2 bg-blue-50 text-blue-900 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-4xl font-extrabold text-[#0B1E47] leading-none">{stats.total}</h3>
            <span className="inline-block mt-2 px-1.5 py-0.5 bg-slate-50 text-slate-700 text-[9px] font-black rounded-sm border border-slate-100">
              Logged History
            </span>
            <p className="text-[11px] text-gray-500 font-medium mt-2 leading-tight">
              Total tickets registered in this account
            </p>
          </div>
        </div>

        {/* Card 2: Total Pending */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 flex flex-col justify-between shadow-xs">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black text-[#0B1E47] uppercase tracking-wider leading-tight">
              TOTAL PENDING
            </span>
            <div className="p-2 bg-[#FFF7ED] text-[#F97316] rounded-lg">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-4xl font-extrabold text-[#0B1E47] leading-none">{stats.pending}</h3>
            <span className="inline-block mt-2 px-1.5 py-0.5 bg-[#FFF7ED] text-[#EA580C] text-[9px] font-black rounded-sm border border-[#FFEDD5]">
              Awaiting Assignment
            </span>
            <p className="text-[11px] text-gray-500 font-medium mt-2 leading-tight">
              Tickets awaiting department review
            </p>
          </div>
        </div>

        {/* Card 3: In Progress */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 flex flex-col justify-between shadow-xs">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black text-[#0B1E47] uppercase tracking-wider leading-tight">
              IN PROGRESS
            </span>
            <div className="p-2 bg-[#EFF6FF] text-[#1D4ED8] rounded-lg">
              <Hammer className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-4xl font-extrabold text-[#0B1E47] leading-none">{stats.inProgress}</h3>
            <span className="inline-block mt-2 px-1.5 py-0.5 bg-[#EFF6FF] text-[#1D4ED8] text-[9px] font-black rounded-sm border border-[#DBEAFE]">
              Being Resolved
            </span>
            <p className="text-[11px] text-gray-500 font-medium mt-2 leading-tight">
              Actively handled by department teams
            </p>
          </div>
        </div>

        {/* Card 4: Resolved */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 flex flex-col justify-between shadow-xs">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black text-[#0B1E47] uppercase tracking-wider leading-tight">
              RESOLVED
            </span>
            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-4xl font-extrabold text-[#0B1E47] leading-none">{stats.resolved + stats.closed}</h3>
            <span className="inline-block mt-2 px-1.5 py-0.5 bg-green-50 text-green-700 text-[9px] font-black rounded-sm border border-green-100">
              Closed SLA
            </span>
            <p className="text-[11px] text-gray-500 font-medium mt-2 leading-tight">
              Grievances successfully resolved
            </p>
          </div>
        </div>
      </div>

      {/* Citizen Register Alerts Orange Bar */}
      <div className="bg-[#F97316] text-white rounded-xl p-4.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
        <div className="flex items-start sm:items-center space-x-3 text-white">
          <div className="p-1.5 bg-white/10 rounded-lg border border-white/10 mt-0.5 sm:mt-0 flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-black text-white">
              Need urgent local support or want to request civic amenities?
            </p>
            <p className="text-[11px] text-orange-100 leading-tight mt-0.5">
              Submit a new citizen grievance directly to get fast SLA response from district officers.
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate('/complaint/register')}
          className="px-4 py-2 bg-white text-[#F97316] hover:bg-orange-50 font-black text-xs rounded-lg shadow-sm whitespace-nowrap active:scale-[0.98] transition-all"
        >
          Lodge New Grievance
        </button>
      </div>

      {/* Rest of the functional Dashboard (Charts & Recent lists) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs">
            <div className="flex flex-col h-64">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">My Grievance Statuses</h3>
              {pieChartData.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-xs text-gray-400 font-bold uppercase tracking-wider">No tickets logged</div>
              ) : (
                <div className="flex-1 min-h-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [value, 'Tickets']} />
                      <Legend iconSize={10} layout="horizontal" align="center" verticalAlign="bottom" wrapperStyle={{ fontSize: 10 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            <div className="flex flex-col h-64">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Complaints by Category</h3>
              {categoryChartData.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-xs text-gray-400 font-bold uppercase tracking-wider">No category distribution</div>
              ) : (
                <div className="flex-1 min-h-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryChartData}>
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} />
                      <Tooltip formatter={(value) => [value, 'Tickets']} />
                      <Bar dataKey="value" fill="var(--color-primary)" radius={[4, 4, 0, 0]}>
                        {categoryChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#1D4ED8' : '#F97316'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>

          {/* Recent Complaints Log Table */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-black text-[#0B1E47] uppercase tracking-wider">My Recent Registered Grievances</h3>
              <Link to="/complaint/history" className="text-xs font-bold text-[#1D4ED8] hover:underline">
                View All Log
              </Link>
            </div>
            {recentComplaints.length === 0 ? (
              <p className="text-xs text-gray-400 py-4 text-center">No active grievances logged.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-[#E2E8F0]">
                      <th className="text-left py-2 text-[10px] font-black text-gray-400 uppercase tracking-wider">Ticket ID</th>
                      <th className="text-left py-2 text-[10px] font-black text-gray-400 uppercase tracking-wider">Title</th>
                      <th className="text-left py-2 text-[10px] font-black text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="text-left py-2 text-[10px] font-black text-gray-400 uppercase tracking-wider">Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentComplaints.map((c) => (
                      <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/complaint/track?id=${c.id}`)}>
                        <td className="py-2.5 font-bold text-[#1D4ED8]">{c.id}</td>
                        <td className="py-2.5 text-gray-700 font-medium max-w-[160px] truncate">{c.title}</td>
                        <td className="py-2.5"><StatusBadge status={c.status} /></td>
                        <td className="py-2.5 text-gray-500 uppercase text-[10px] font-extrabold">{c.priority}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar – Quick Actions & Announcements */}
        <div className="space-y-6">
          {/* Quick Actions Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button
                onClick={() => navigate('/complaint/register')}
                className="w-full flex items-center space-x-3 px-3 py-2.5 bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#1D4ED8] rounded-lg text-xs font-extrabold transition-all active:scale-[0.98]"
              >
                <FileText className="w-4 h-4" />
                <span>Register New Grievance</span>
              </button>
              <button
                onClick={() => navigate('/complaint/track')}
                className="w-full flex items-center space-x-3 px-3 py-2.5 bg-[#FFF7ED] hover:bg-[#FFEDD5] text-[#F97316] rounded-lg text-xs font-extrabold transition-all active:scale-[0.98]"
              >
                <Clock className="w-4 h-4" />
                <span>Track Existing Grievance</span>
              </button>
              <button
                onClick={() => navigate('/feedback')}
                className="w-full flex items-center space-x-3 px-3 py-2.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-xs font-extrabold transition-all active:scale-[0.98]"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Submit Feedback</span>
              </button>
            </div>
          </div>

          {/* Government Announcements */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs space-y-3">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Official Announcements</h3>
            {ANNOUNCEMENTS.slice(0, 3).map((a, i) => (
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

export default Dashboard;
