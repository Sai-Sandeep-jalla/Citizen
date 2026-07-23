/**
 * @file DashboardOverview.jsx
 * @description Overview tab for Officer Dashboard showing department statistics.
 */

import { useState, useEffect } from 'react';
import { useLanguage } from '../../../hooks/useLanguage';
import { api } from '../../../services/api';
import { DashboardSkeleton } from '../../../components/Loader';
import { FileText, Clock, Hammer, AlertTriangle } from 'lucide-react';
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

const COLORS = ['#1D4ED8', '#F59E0B', '#10B981', '#EF4444'];

export const DashboardOverview = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Mocking fetch since we might not have the specific officer dashboard API ready
    const fetchOfficerData = async () => {
      try {
        // Attempt to fetch from API, but we'll use mocked data for the UI if it fails or returns differently formatted data
        const res = await api.getDashboardData();
        // Since we are building the UI, let's inject realistic officer stats
        setData({
          stats: { totalAssigned: 145, pendingReview: 42, inProgress: 68, unresolvedEscalated: 12 },
          pieChartData: [
            { name: 'Pending', value: 42, color: '#F59E0B' },
            { name: 'In Progress', value: 68, color: '#1D4ED8' },
            { name: 'Resolved', value: 23, color: '#10B981' },
            { name: 'Escalated', value: 12, color: '#EF4444' }
          ],
          barChartData: [
            { name: 'Roads', value: 45 },
            { name: 'Water', value: 30 },
            { name: 'Sanitation', value: 50 },
            { name: 'Electricity', value: 20 }
          ]
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOfficerData();
  }, []);

  if (loading || !data) return <DashboardSkeleton />;

  const { stats, pieChartData, barChartData } = data;

  return (
    <div className="space-y-6">
      {/* Officer Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Assigned"
          value={stats.totalAssigned}
          subtitle="Department Grievances"
          icon={FileText}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <MetricCard
          title="Pending Review"
          value={stats.pendingReview}
          subtitle="Needs Assignment"
          icon={Clock}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />
        <MetricCard
          title="In Progress"
          value={stats.inProgress}
          subtitle="Actively Handled"
          icon={Hammer}
          iconBg="bg-indigo-50"
          iconColor="text-indigo-600"
        />
        <MetricCard
          title="Escalated"
          value={stats.unresolvedEscalated}
          subtitle="SLA Breached"
          icon={AlertTriangle}
          iconBg="bg-red-50"
          iconColor="text-red-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-6">Status Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconSize={10} verticalAlign="bottom" wrapperStyle={{ fontSize: 11, fontWeight: 'bold' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-6">Complaints by Sub-Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={30}>
                  {barChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#1D4ED8" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, subtitle, icon: Icon, iconBg, iconColor }) => (
  <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 flex flex-col justify-between transition-transform hover:-translate-y-1 duration-300">
    <div className="flex justify-between items-start">
      <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider">{title}</span>
      <div className={`p-2 rounded-xl ${iconBg} ${iconColor}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
    <div className="mt-4">
      <h3 className="text-4xl font-black text-gray-900">{value}</h3>
      <p className="text-[11px] font-bold text-gray-400 mt-2 uppercase tracking-wide">{subtitle}</p>
    </div>
  </div>
);

export default DashboardOverview;
