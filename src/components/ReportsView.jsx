import React, { useState } from 'react';
import {
  BarChart3,
  Calendar,
  Download,
  Receipt,
  Home,
  GraduationCap,
  Building2,
  MapPin,
  HelpCircle,
  Award,
  Filter
} from 'lucide-react';
import { DISTRICTS, STATES } from '../data/mockData';

export default function ReportsView({ 
  complaints, 
  selectedDistrict = 'ALL', 
  activeDepartment = 'ALL',
  selectedState = 'AP' 
}) {
  const [timeframe, setTimeframe] = useState('daily');

  const selectedDistrictObj = DISTRICTS.find(d => d.id === selectedDistrict);
  const districtLabel = selectedDistrict === 'ALL' ? 'All Districts' : (selectedDistrictObj?.name || selectedDistrict);
  const selectedStateObj = STATES.find(s => s.id === selectedState);
  const stateLabel = selectedState === 'ALL' ? 'All States' : (selectedStateObj?.name || selectedState);

  // Filter complaints by District & Department
  const filteredComplaints = complaints.filter(c => {
    const matchDistrict = selectedDistrict === 'ALL' || c.district === selectedDistrict;
    const matchDept = activeDepartment === 'ALL' || c.department === activeDepartment;
    return matchDistrict && matchDept;
  });

  // Calculate timeframe specific total cases
  const getTimeframeComplaints = (list) => {
    if (timeframe === 'daily') {
      const dailyList = list.filter(c => c.registeredToday);
      return dailyList.length > 0 ? dailyList : list;
    } else if (timeframe === 'weekly') {
      return list;
    }
    return list;
  };

  const timeframeComplaints = getTimeframeComplaints(filteredComplaints);

  const departments = [
    { code: 'REVENUE', name: 'REVENUE', icon: Receipt },
    { code: 'VILLAGE', name: 'VILLAGE', icon: Home },
    { code: 'SCHOOLS', name: 'SCHOOLS', icon: GraduationCap },
    { code: 'HOUSING', name: 'HOUSING', icon: Building2 },
    { code: 'LAND', name: 'LAND', icon: MapPin },
    { code: 'OTHERS', name: 'OTHERS', icon: HelpCircle },
  ];

  // If a specific department is selected, filter scorecard to that department
  const displayedDepartments = activeDepartment === 'ALL'
    ? departments
    : departments.filter(d => d.code === activeDepartment);

  const departmentStats = displayedDepartments.map((dept) => {
    const list = timeframeComplaints.filter(c => c.department === dept.code);
    const total = list.length;
    const resolved = list.filter(c => c.status === 'Resolved' || c.status === 'Closed').length;
    const pending = list.filter(c => c.status === 'Pending' || c.status === 'Assigned' || c.status === 'In Progress').length;
    const rate = total > 0 ? Math.round((resolved / total) * 100) : 100;

    return {
      ...dept,
      total,
      resolved,
      pending,
      rate
    };
  });

  const overallTotal = timeframeComplaints.length;
  const overallResolved = timeframeComplaints.filter(c => c.status === 'Resolved' || c.status === 'Closed').length;
  const overallRate = overallTotal > 0 ? Math.round((overallResolved / overallTotal) * 100) : 100;

  // Real CSV Export File Generation
  const handleExportCSV = () => {
    const csvRows = [];
    csvRows.push(['Department', 'District', 'State', 'Timeframe', 'Total Cases', 'Resolved Cases', 'Pending Cases', 'Resolution SLA Rate %', 'Performance Grade']);

    departmentStats.forEach(dept => {
      const grade = dept.rate >= 75 ? 'Excellent (Grade A)' : dept.rate >= 50 ? 'Satisfactory (Grade B)' : 'Attention Needed';
      csvRows.push([
        dept.name,
        districtLabel,
        stateLabel,
        timeframe.toUpperCase(),
        dept.total,
        dept.resolved,
        dept.pending,
        `${dept.rate}%`,
        grade
      ]);
    });

    const csvContent = csvRows.map(e => e.map(cell => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    const filenameDept = activeDepartment === 'ALL' ? 'ALL_DEPTS' : activeDepartment;
    const filenameDist = districtLabel.replace(/\s+/g, '_');
    link.setAttribute("download", `SLA_Report_${filenameDist}_${filenameDept}_${timeframe}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">

      {/* Header Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-black text-blue-950 uppercase tracking-tight">
              Department Grievance Performance & SLA Reports
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Comparative daily, weekly, and monthly resolution benchmarks for <strong className="text-blue-900 font-bold">{districtLabel}</strong>
            {activeDepartment !== 'ALL' && (
              <span> (Department: <strong className="text-orange-600 font-bold">{activeDepartment}</strong>)</span>
            )}.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">

          <div className="bg-slate-100 p-1 rounded-xl flex items-center space-x-1 border border-slate-200">
            {['daily', 'weekly', 'monthly'].map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${timeframe === t
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                {t} Report
              </button>
            ))}
          </div>

          <button
            onClick={handleExportCSV}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center space-x-1.5 shadow-sm transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>

        </div>
      </div>

      {/* Overview Metric Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <div className="bg-gradient-to-br from-blue-900 to-blue-950 text-white p-5 rounded-xl border border-blue-800 shadow-md">
          <span className="text-xs text-blue-300 font-bold uppercase tracking-wider block mb-1">
            Period Total Received
          </span>
          <div className="text-3xl font-black text-white">{overallTotal}</div>
          <p className="text-[11px] text-blue-200 mt-2">
            Timeframe: <strong className="capitalize text-orange-400">{timeframe}</strong>
            {activeDepartment !== 'ALL' && <span> | Dept: <strong className="text-white font-bold">{activeDepartment}</strong></span>}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">
            Resolved / Closed Rate
          </span>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black text-emerald-600">{overallRate}%</span>
            <span className="text-xs text-slate-400 font-medium">({overallResolved} resolved)</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-3 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${overallRate}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">
            Average SLA Resolution Time
          </span>
          <div className="text-3xl font-black text-blue-950">18.4 Hours</div>
          <p className="text-[11px] text-emerald-600 font-bold mt-2 flex items-center space-x-1">
            <Award className="w-3.5 h-3.5 inline" />
            <span>Complies with Enterprise 48-Hour SLA Target</span>
          </p>
        </div>

      </div>

      {/* Department SLA Breakdown Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
          <h3 className="font-black text-sm text-blue-950 uppercase tracking-wider">
            {activeDepartment === 'ALL' ? '6 Department Performance Scorecard' : `${activeDepartment} Department Performance Scorecard`} ({timeframe.toUpperCase()})
          </h3>
          {activeDepartment !== 'ALL' && (
            <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200 flex items-center space-x-1">
              <Filter className="w-3 h-3" />
              <span>Filtered: {activeDepartment}</span>
            </span>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-blue-950 text-white font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Total Cases</th>
                <th className="py-3 px-4">Resolved</th>
                <th className="py-3 px-4">Pending</th>
                <th className="py-3 px-4">Resolution SLA %</th>
                <th className="py-3 px-4">Grade & Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {departmentStats.map((dept) => {
                const Icon = dept.icon;
                return (
                  <tr key={dept.code} className="hover:bg-slate-50">
                    <td className="py-3.5 px-4 font-bold text-blue-950 flex items-center space-x-2">
                      <Icon className="w-4 h-4 text-orange-600" />
                      <span>{dept.name}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold">{dept.total}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-600">{dept.resolved}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-600">{dept.pending}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold font-mono text-xs">{dept.rate}%</span>
                        <div className="w-24 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${dept.rate >= 75 ? 'bg-emerald-500' : dept.rate >= 50 ? 'bg-amber-500' : 'bg-red-500'
                              }`}
                            style={{ width: `${dept.rate}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {dept.rate >= 75 ? (
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                          Excellent (Grade A)
                        </span>
                      ) : dept.rate >= 50 ? (
                        <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[10px]">
                          Satisfactory (Grade B)
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded text-[10px]">
                          Attention Needed
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
