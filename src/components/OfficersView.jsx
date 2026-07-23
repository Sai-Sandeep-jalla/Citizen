import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  UserPlus, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Building2, 
  MapPin, 
  ShieldCheck, 
  X,
  Plus
} from 'lucide-react';

import { DEPARTMENT_DESIGNATIONS } from '../data/mockData';

export default function OfficersView({ officers, onAddOfficer, onToggleStatus, activeDepartment, selectedDistrict }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newOfficer, setNewOfficer] = useState({
    name: '',
    designation: 'MRO / Tahsildar (Mandal Revenue Officer)',
    department: 'REVENUE',
    district: 'GUNTUR',
    email: '',
    phone: '',
  });

  const filteredOfficers = officers.filter(officer => {
    const matchesSearch = officer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          officer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          officer.designation.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDept = activeDepartment === 'ALL' || officer.department === activeDepartment;
    const matchesDistrict = selectedDistrict === 'ALL' || officer.district.toUpperCase().includes(selectedDistrict.toUpperCase()) || selectedDistrict.toUpperCase().includes(officer.district.toUpperCase());
    const matchesStatus = statusFilter === 'ALL' || officer.status === statusFilter;

    return matchesSearch && matchesDept && matchesDistrict && matchesStatus;
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newOfficer.name || !newOfficer.email) return;

    onAddOfficer({
      ...newOfficer,
      id: `OFF-${100 + officers.length + 1}`,
      status: 'Active',
      assignedWorkload: 0,
      resolvedCount: 0,
      slaCompliance: '100%'
    });

    setNewOfficer({
      name: '',
      designation: '',
      department: 'REVENUE',
      district: 'GUNTUR',
      email: '',
      phone: '',
    });
    setIsModalOpen(false);
  };

  const totalOfficers = officers.length;
  const activeCount = officers.filter(o => o.status === 'Active').length;
  const totalWorkload = officers.reduce((sum, o) => sum + o.assignedWorkload, 0);

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
            <Users className="w-6 h-6 text-blue-600" />
            <span>Officer Management & Workload Allocation</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Directory of administrative nodal officers, district inspectors, and active case assignments.
          </p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center space-x-2 shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New Officer</span>
        </button>
      </div>

      {/* KPI Metric Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Total Registered Officers</span>
            <div className="flex items-baseline space-x-2 mt-0.5">
              <strong className="text-2xl font-black text-slate-900">{totalOfficers}</strong>
              <span className="text-xs font-extrabold text-emerald-600">({activeCount} Active)</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Active Field Workload</span>
            <div className="flex items-baseline space-x-2 mt-0.5">
              <strong className="text-2xl font-black text-slate-900">{totalWorkload}</strong>
              <span className="text-xs font-bold text-slate-500">Assigned Complaints</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Avg SLA Resolution Score</span>
            <div className="flex items-baseline space-x-2 mt-0.5">
              <strong className="text-2xl font-black text-emerald-600">95.2%</strong>
              <span className="text-xs font-bold text-slate-500">District Benchmark</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            placeholder="Search officer name, ID, designation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-xs font-semibold rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
          />
        </div>

        <div className="flex items-center space-x-3">
          <label className="text-xs font-bold text-slate-600">Status Filter:</label>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
          >
            <option value="ALL">All Statuses</option>
            <option value="Active">Active Only</option>
            <option value="On Leave">On Leave</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Officers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOfficers.map((officer) => (
          <div key={officer.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200 tracking-wider">
                    {officer.id}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-sm mt-1.5">{officer.name}</h3>
                  <p className="text-xs text-blue-600 font-bold">{officer.designation}</p>
                </div>

                <button 
                  onClick={() => onToggleStatus(officer.id)}
                  className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border transition-all ${
                    officer.status === 'Active' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100' 
                      : officer.status === 'On Leave'
                      ? 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100'
                      : 'bg-slate-100 text-slate-600 border-slate-300'
                  }`}
                  title="Click to toggle officer status"
                >
                  ● {officer.status}
                </button>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center space-x-2">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-semibold text-slate-800">{officer.department} Dept</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-semibold text-slate-800">{officer.district}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{officer.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{officer.phone}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl">
              <div>
                <span className="text-[10px] text-slate-500 font-bold block uppercase">Active Cases</span>
                <strong className="text-sm font-black text-amber-600">{officer.assignedWorkload} cases</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-bold block uppercase">SLA Score</span>
                <strong className="text-sm font-black text-emerald-600">{officer.slaCompliance}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Officer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-blue-950 p-4 text-white flex items-center justify-between border-b border-orange-500">
              <h3 className="font-black text-sm flex items-center space-x-2">
                <UserPlus className="w-4 h-4 text-orange-400" />
                <span>Register New Administrative Officer</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Officer Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Srikanth Reddy"
                  value={newOfficer.name}
                  onChange={(e) => setNewOfficer({ ...newOfficer, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
                  <select 
                    value={newOfficer.department}
                    onChange={(e) => {
                      const newDept = e.target.value;
                      const defaultDesig = DEPARTMENT_DESIGNATIONS[newDept]?.[0] || '';
                      setNewOfficer({ ...newOfficer, department: newDept, designation: defaultDesig });
                    }}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-800"
                  >
                    <option value="REVENUE">REVENUE (VRO, MRO, RDO)</option>
                    <option value="VILLAGE">VILLAGE (Panchayat Sec, MPDO, DPO)</option>
                    <option value="SCHOOLS">SCHOOLS (Headmaster, MEO, DEO)</option>
                    <option value="HOUSING">HOUSING (AE, DE, EE Housing)</option>
                    <option value="LAND">LAND (Surveyor, IS, AD Survey)</option>
                    <option value="OTHERS">OTHERS (Sanitary Inspector, Nodal)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Official Designation</label>
                  <select 
                    value={newOfficer.designation}
                    onChange={(e) => setNewOfficer({ ...newOfficer, designation: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-800"
                  >
                    {(DEPARTMENT_DESIGNATIONS[newOfficer.department] || []).map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">District</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Visakhapatnam"
                    value={newOfficer.district}
                    onChange={(e) => setNewOfficer({ ...newOfficer, district: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Phone</label>
                  <input 
                    type="text" 
                    required
                    placeholder="+91 98490 00000"
                    value={newOfficer.phone}
                    onChange={(e) => setNewOfficer({ ...newOfficer, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Official Gov Email</label>
                <input 
                  type="email" 
                  required
                  placeholder="officer.name@apgov.in"
                  value={newOfficer.email}
                  onChange={(e) => setNewOfficer({ ...newOfficer, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-300 text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-extrabold bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                >
                  Register Officer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
