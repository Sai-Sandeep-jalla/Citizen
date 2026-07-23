import React, { useState } from 'react';
import { 
  Building2, 
  Clock, 
  Edit3, 
  X,
  Award
} from 'lucide-react';

export default function DepartmentsView({ departments, onUpdateDepartmentSla }) {
  const [editingDept, setEditingDept] = useState(null);
  const [slaInput, setSlaInput] = useState('');

  const handleEditClick = (dept) => {
    setEditingDept(dept);
    setSlaInput(dept.defaultSlaHours.toString());
  };

  const handleSaveSla = (e) => {
    e.preventDefault();
    if (!editingDept || !slaInput) return;
    onUpdateDepartmentSla(editingDept.id, parseInt(slaInput, 10));
    setEditingDept(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
            <Building2 className="w-6 h-6 text-blue-600" />
            <span>Department Directory & SLA Policy Control</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Configure department HOD accountability, default SLA resolution hours, and review operational efficiency scores.
          </p>
        </div>
      </div>

      {/* Department Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map((dept) => (
          <div key={dept.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase bg-blue-900 text-white px-2.5 py-0.5 rounded-full border border-blue-950 tracking-wider">
                  {dept.code}
                </span>
                <span className="text-xs font-extrabold text-emerald-600 flex items-center space-x-1">
                  <Award className="w-3.5 h-3.5 inline" />
                  <span>{dept.performanceScore}% Score</span>
                </span>
              </div>

              <h3 className="font-extrabold text-slate-900 text-base mt-2.5">{dept.name}</h3>
              
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">Department Head (HOD)</span>
                  <strong className="text-slate-800 font-bold">{dept.hodName}</strong>
                  <p className="text-[11px] text-slate-500 truncate">{dept.hodEmail}</p>
                </div>

                <div className="pt-2 flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-orange-500 shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold block uppercase">Default SLA Target</span>
                      <strong className="text-slate-900 font-black text-xs">{dept.defaultSlaHours} Hours</strong>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleEditClick(dept)}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-white border border-blue-200 px-2.5 py-1 rounded-lg shadow-2xs transition-all flex items-center space-x-1"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit SLA</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 font-bold block uppercase">Active Workload</span>
                <strong className="text-sm font-black text-slate-900">{dept.activeCases} pending</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-bold block uppercase">Lifetime Resolved</span>
                <strong className="text-sm font-black text-emerald-600">{dept.totalProcessed} cases</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit SLA Target Modal */}
      {editingDept && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-blue-950 p-4 text-white flex items-center justify-between border-b border-orange-500">
              <h3 className="font-black text-sm flex items-center space-x-2">
                <Clock className="w-4 h-4 text-orange-400" />
                <span>Configure SLA Target - {editingDept.name}</span>
              </h3>
              <button onClick={() => setEditingDept(null)} className="text-slate-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSla} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Default Resolution SLA Hours (1 - 168 Hours)
                </label>
                <input 
                  type="number"
                  min="1"
                  max="168"
                  required
                  value={slaInput}
                  onChange={(e) => setSlaInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  All new complaints routed to {editingDept.name} will inherit this maximum baseline response SLA.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingDept(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-300 text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-extrabold bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                >
                  Update SLA Rules
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
