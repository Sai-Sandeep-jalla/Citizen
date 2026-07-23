import React, { useState } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  Eye,
  Phone,
  ArrowRightLeft,
  CheckCircle,
  Clock,
  ShieldAlert,
  FileText,
  Download
} from 'lucide-react';

export default function ComplaintList({
  complaints,
  selectedDistrict,
  activeDepartment,
  onSelectComplaint,
  onOpenShiftModal
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('newest');

  // Filter complaints based on District, Department, Search, Status, Priority
  const filtered = complaints.filter((c) => {
    const matchDistrict = selectedDistrict === 'ALL' || c.district === selectedDistrict;
    const matchDept = activeDepartment === 'ALL' || c.department === activeDepartment;
    const matchSearch =
      c.ticketNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.citizen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.village.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus = statusFilter === 'ALL' || c.status === statusFilter;
    const matchPriority = priorityFilter === 'ALL' || c.priority === priorityFilter;

    return matchDistrict && matchDept && matchSearch && matchStatus && matchPriority;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'newest') return b.id.localeCompare(a.id);
    if (sortBy === 'oldest') return a.id.localeCompare(a.id);
    if (sortBy === 'sla') return a.slaHoursRemaining - b.slaHoursRemaining;
    return 0;
  });

  return (
    <div className="space-y-4">

      {/* Search & Control Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">

        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Ticket ID, Title, Citizen Name, or Village..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 text-xs rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          />
        </div>

        {/* Filters & Controls */}
        <div className="flex flex-wrap items-center gap-2">

          {/* Status Dropdown */}
          <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs">
            <Filter className="w-3.5 h-3.5 text-orange-600" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent font-bold text-blue-950 focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Priority Dropdown */}
          <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs">
            <ShieldAlert className="w-3.5 h-3.5 text-orange-600" />
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-transparent font-bold text-blue-950 focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-blue-600" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-bold text-blue-950 focus:outline-none cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="sla">Urgent SLA Remaining</option>
            </select>
          </div>

        </div>

      </div>

      {/* Complaints Master Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gradient-to-r from-blue-950 to-blue-900 text-white font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Ticket ID</th>
                <th className="py-3.5 px-4">Department & District</th>
                <th className="py-3.5 px-4">Subject Description</th>
                <th className="py-3.5 px-4">Applicant & Contact</th>
                <th className="py-3.5 px-4">Priority / SLA</th>
                <th className="py-3.5 px-4">Current Status</th>
                <th className="py-3.5 px-4 text-center">Officer Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400 font-medium">
                    No complaints matching search & filter criteria.
                  </td>
                </tr>
              ) : (
                sorted.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-blue-50/40 transition-colors cursor-pointer group"
                    onClick={() => onSelectComplaint(item)}
                  >
                    {/* ID Column */}
                    <td className="py-4 px-4 font-mono font-bold text-blue-700">
                      <div className="flex items-center space-x-1.5">
                        <span className="group-hover:underline">{item.ticketNo}</span>
                        {item.registeredToday && (
                          <span className="bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded shadow-xs">
                            NEW
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 font-sans block mt-0.5">
                        {item.registeredDate}
                      </span>
                    </td>

                    {/* Department & District */}
                    <td className="py-4 px-4 font-bold text-slate-800">
                      <span className="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded text-[11px] block w-max mb-1">
                        {item.department}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">
                        {item.district}
                      </span>
                    </td>

                    {/* Subject & Village */}
                    <td className="py-4 px-4 max-w-sm">
                      <div className="font-bold text-blue-950 group-hover:text-blue-700 leading-tight">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {item.mandal}, {item.village}
                      </div>
                    </td>

                    {/* Citizen Info */}
                    <td className="py-4 px-4 font-medium text-slate-800">
                      <div>{item.citizen.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono flex items-center space-x-1 mt-0.5">
                        <Phone className="w-3 h-3 text-orange-600 inline" />
                        <span>{item.citizen.mobile}</span>
                      </div>
                    </td>

                    {/* Priority & SLA */}
                    <td className="py-4 px-4">
                      <div className="flex flex-col space-y-0.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold w-max ${
                          item.priority === 'High' 
                            ? 'bg-red-100 text-red-800 border border-red-200' 
                            : item.priority === 'Medium' 
                            ? 'bg-yellow-100 text-yellow-900 border border-yellow-300' 
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}>
                          {item.priority || 'Low'} Priority
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">
                          SLA: {item.slaHoursRemaining || 24}h remaining
                        </span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] border ${item.status === 'Resolved' || item.status === 'Closed'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : item.status === 'In Progress'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                        {item.status}
                      </span>
                    </td>

                    {/* Action buttons */}
                    <td className="py-4 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center space-x-1.5">
                        <button
                          onClick={() => onSelectComplaint(item)}
                          className="bg-blue-700 hover:bg-blue-800 text-white px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center space-x-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Details</span>
                        </button>

                        <button
                          onClick={() => onOpenShiftModal(item)}
                          className="bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 p-1.5 rounded-lg transition-colors"
                          title="Shift Department"
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
