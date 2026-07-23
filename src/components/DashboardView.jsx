import React from 'react';
import {
  FileText,
  Clock,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  ShieldAlert,
  ArrowUpRight,
  TrendingUp,
  Receipt,
  Home,
  GraduationCap,
  Building2,
  MapPin,
  HelpCircle,
  Eye,
  Phone,
  ArrowRightLeft
} from 'lucide-react';

export default function DashboardView({
  complaints,
  selectedDistrict,
  activeDepartment,
  onSelectComplaint,
  onOpenShiftModal
}) {

  const filtered = complaints.filter(c => {
    const matchDistrict = selectedDistrict === 'ALL' || c.district === selectedDistrict;
    const matchDept = activeDepartment === 'ALL' || c.department === activeDepartment;
    return matchDistrict && matchDept;
  });

  const totalRegisteredYear = filtered.filter(c => c.createdYear === 2026).length;
  const registeredToday = filtered.filter(c => c.registeredToday).length;
  const pendingCount = filtered.filter(c => c.status === 'Pending' || c.status === 'Assigned').length;
  const completedCount = filtered.filter(c => c.status === 'Resolved' || c.status === 'Closed').length;
  const highPriorityCount = filtered.filter(c => c.priority === 'High' && c.status !== 'Closed').length;

  const departmentBreakdown = [
    { name: 'REVENUE', code: 'REVENUE', icon: Receipt },
    { name: 'VILLAGE', code: 'VILLAGE', icon: Home },
    { name: 'SCHOOLS', code: 'SCHOOLS', icon: GraduationCap },
    { name: 'HOUSING', code: 'HOUSING', icon: Building2 },
    { name: 'LAND', code: 'LAND', icon: MapPin },
    { name: 'OTHERS', code: 'OTHERS', icon: HelpCircle },
  ];

  return (
    <div className="space-y-6">

      {/* Deep Blue Banner with Crisp White Typography & Orange Focal Highlights */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden border border-blue-800">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-10">
          <FileText className="w-64 h-64 text-white" />
        </div>

        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center space-x-2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
            <span>OFFICER SUMMARY DASHBOARD</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
            District Grievance SLA Dashboard
          </h2>
          <p className="text-blue-100 text-xs md:text-sm max-w-2xl">
            Real-time monitoring for registered complaints in <strong className="text-orange-400 font-extrabold">{selectedDistrict === 'ALL' ? 'All Districts' : selectedDistrict}</strong> across <strong className="text-white font-extrabold">{activeDepartment === 'ALL' ? 'All 6 Departments' : activeDepartment}</strong>.
          </p>
        </div>
      </div>

      {/* Metric Cards Grid - Clean White Surfaces, Royal Blue Primary Text, Orange Highlight Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Card 1: Registered Today (Orange Highlight Focal Card) */}
        <div className="bg-white rounded-xl p-5 border-2 border-orange-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-blue-900 uppercase tracking-wider">
              Issues Registered Today
            </span>
            <div className="p-2.5 rounded-xl bg-orange-500 text-white shadow-sm">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-black text-orange-600">{registeredToday}</span>
            <span className="text-[11px] font-bold text-orange-700 bg-orange-100 px-2.5 py-0.5 rounded-full border border-orange-300">
              New Received
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-medium">
            Requires initial review within 10 days
          </p>
        </div>

        {/* Card 2: Total Pending */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Pending
            </span>
            <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-black text-blue-950">{pendingCount}</span>
            <span className="text-xs font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
              Action Required
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 font-medium">
            Pending officer assignment or review
          </p>
        </div>

        {/* Card 3: Completed / Closed */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Completed / Closed
            </span>
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-black text-emerald-600">{completedCount}</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Resolved
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 font-medium">
            Verified with uploaded resolution proof
          </p>
        </div>

        {/* Card 4: Total Registered (Year) */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Registered (Year 2026)
            </span>
            <div className="p-2.5 rounded-xl bg-blue-900 text-white">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-black text-blue-900">{totalRegisteredYear}</span>
            <span className="text-xs font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
              Cumulative Volume
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 font-medium">
            Total annual district grievance count
          </p>
        </div>

      </div>

      {/* High Priority Complaints Highlight Banner */}
      {highPriorityCount > 0 && (
        <div className="bg-gradient-to-r from-rose-700 to-rose-600 rounded-xl p-4 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-extrabold text-base text-white">
                {highPriorityCount} High Priority Issue{highPriorityCount > 1 ? 's' : ''} Active!
              </h4>
              <p className="text-xs text-rose-100">
                Critical public issues assigned 3-Month District Magistrate Apex Escalation monitoring.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              const highItem = filtered.find(c => c.priority === 'High' && c.status !== 'Closed');
              if (highItem) onSelectComplaint(highItem);
            }}
            className="shrink-0 bg-white text-rose-800 font-extrabold px-4 py-2 rounded-xl text-xs hover:bg-rose-50 transition-colors shadow-md"
          >
            Inspect High Priority Case
          </button>
        </div>
      )}

      {/* 6 Department Workload Grid (Clean Blue & White Cards with Orange Hover Accent) */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
        <h3 className="font-black text-sm text-blue-950 uppercase tracking-wider mb-4 flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-orange-500" />
          <span>Department-Wise Active Workload</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {departmentBreakdown.map((dept) => {
            const Icon = dept.icon;
            const deptCount = complaints.filter(c =>
              c.department === dept.code &&
              (selectedDistrict === 'ALL' || c.district === selectedDistrict)
            ).length;

            return (
              <div
                key={dept.code}
                className="p-3.5 rounded-xl border border-blue-100 bg-blue-50/50 hover:bg-white hover:border-orange-400 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between">
                  <Icon className="w-5 h-5 text-blue-700 group-hover:text-orange-500 transition-colors" />
                  <span className="font-mono font-black text-lg text-blue-950">{deptCount}</span>
                </div>
                <div className="mt-3">
                  <span className="font-bold text-xs text-slate-800 group-hover:text-orange-600 block leading-tight">
                    {dept.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">Department</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* List of Issues Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-black text-sm text-blue-950 uppercase tracking-wider">
              List of Issues ({filtered.length})
            </h3>
            <p className="text-xs text-slate-500">
              Click on any <strong className="text-blue-700">Ticket ID</strong> to inspect issue, contact citizen, shift department, or log notes.
            </p>
          </div>
          <div className="text-xs text-slate-600 font-medium bg-white px-3 py-1 rounded-md border border-slate-200">
            District: <strong className="text-blue-900">{selectedDistrict}</strong> | Dept: <strong className="text-orange-600">{activeDepartment}</strong>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-blue-950 text-white font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Ticket ID</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Subject & Location</th>
                <th className="py-3 px-4">Citizen Name</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400 font-medium">
                    No registered complaints found for selected District/Department filter.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-blue-50/50 transition-colors cursor-pointer group"
                    onClick={() => onSelectComplaint(item)}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-700 group-hover:underline">
                      {item.ticketNo}
                      {item.registeredToday && (
                        <span className="ml-1.5 bg-orange-500 text-white font-sans text-[9px] font-extrabold px-1.5 py-0.2 rounded">
                          NEW
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-700">
                      <span className="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded text-[11px]">
                        {item.department}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-bold text-blue-950 truncate">{item.title}</div>
                      <div className="text-[10px] text-slate-400 truncate">{item.mandal}, {item.village}</div>
                    </td>

                    <td className="py-3.5 px-4 font-medium text-slate-800">
                      <div>{item.citizen.name}</div>
                      <div className="text-[10px] text-slate-400">{item.citizen.mobile}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      {item.priority === 'High' ? (
                        <span className="bg-red-100 text-red-800 border border-red-200 font-extrabold px-2 py-0.5 rounded text-[10px]">
                          High
                        </span>
                      ) : item.priority === 'Medium' ? (
                        <span className="bg-yellow-100 text-yellow-900 border border-yellow-300 font-extrabold px-2 py-0.5 rounded text-[10px]">
                          Medium
                        </span>
                      ) : (
                        <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 font-extrabold px-2 py-0.5 rounded text-[10px]">
                          Low
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] border ${item.status === 'Resolved' || item.status === 'Closed'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : item.status === 'In Progress'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                        {item.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center space-x-1.5">
                        <button
                          onClick={() => onSelectComplaint(item)}
                          className="bg-blue-700 hover:bg-blue-800 text-white p-1.5 rounded-lg transition-colors"
                          title="Inspect & Process"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onOpenShiftModal(item)}
                          className="bg-orange-500 hover:bg-orange-600 text-white p-1.5 rounded-lg transition-colors shadow-xs"
                          title="Shift to other department"
                        >
                          <ArrowRightLeft className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
