import React, { useState } from 'react';
import { X, ArrowRightLeft, Building2, AlertCircle } from 'lucide-react';

export default function ShiftDepartmentModal({ complaint, onClose, onShiftDepartment }) {
  const [targetDept, setTargetDept] = useState('');
  const [reason, setReason] = useState('');

  if (!complaint) return null;

  const departmentsList = [
    { code: 'REVENUE', label: 'REVENUE' },
    { code: 'VILLAGE', label: 'VILLAGE' },
    { code: 'SCHOOLS', label: 'SCHOOLS' },
    { code: 'HOUSING', label: 'HOUSING' },
    { code: 'LAND', label: 'LAND' },
    { code: 'OTHERS', label: 'OTHERS' },
  ].filter(d => d.code !== complaint.department);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!targetDept) return;
    onShiftDepartment(complaint.id, targetDept, reason);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-4 flex items-center justify-between border-b border-orange-500/40">
          <div className="flex items-center space-x-2">
            <ArrowRightLeft className="w-5 h-5 text-orange-400" />
            <h3 className="font-bold text-base text-white">
              Shift Grievance to Other Department
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content & Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">

          <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl space-y-1">
            <span className="text-[10px] uppercase font-bold text-blue-700">Complaint Reference</span>
            <div className="font-mono font-black text-sm text-blue-950">{complaint.ticketNo}</div>
            <p className="text-slate-700 font-medium truncate">{complaint.title}</p>
            <div className="text-[11px] text-slate-500">
              Current Assigned Dept: <strong className="text-orange-600">{complaint.department}</strong>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Select New Target Department *
            </label>
            <select
              required
              value={targetDept}
              onChange={(e) => setTargetDept(e.target.value)}
              className="w-full bg-white border border-slate-300 text-xs rounded-xl p-2.5 font-bold text-blue-950 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              <option value="">Choose Target Department...</option>
              {departmentsList.map(d => (
                <option key={d.code} value={d.code}>{d.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Reason for Department Transfer *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Provide context on why this grievance is being reassigned..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-white border border-slate-300 text-xs rounded-xl p-2.5 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-5 py-2 rounded-xl shadow-sm transition-colors"
            >
              Reassign & Shift Case
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
