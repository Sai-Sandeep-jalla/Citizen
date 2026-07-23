import React from 'react';
import { ArrowRightLeft, Building2, Calendar, FileText, CheckCircle2 } from 'lucide-react';

export default function TransfersView({ complaints, onSelectComplaint }) {
  // Extract complaints that have transfer history
  const transferred = complaints.filter(c =>
    c.history.some(h => h.action === 'Department Shifted' || h.action === 'Transferred')
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-2">
          <ArrowRightLeft className="w-5 h-5 text-orange-500" />
          <h2 className="text-lg font-black text-blue-950 uppercase tracking-tight">
            Inter-Departmental Case Transfers Log
          </h2>
        </div>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Complete audit history of grievances routed or shifted across REVENUE, VILLAGE, SCHOOLS, HOUSING, LAND, and OTHERS.
        </p>
      </div>

      {/* Transfers Master Log List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200">
          <h3 className="font-black text-sm text-blue-950 uppercase tracking-wider">
            Shifted Complaints Audit Trail ({transferred.length})
          </h3>
        </div>

        <div className="divide-y divide-slate-100">
          {transferred.length === 0 ? (
            <div className="p-8 text-center text-slate-400 font-medium text-xs">
              No inter-departmental transfers logged yet. You can shift any complaint from the inspector view or quick action menu.
            </div>
          ) : (
            transferred.map((item) => {
              const shiftLogs = item.history.filter(h => h.action === 'Department Shifted' || h.action === 'Transferred');
              const lastLog = shiftLogs[shiftLogs.length - 1];

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectComplaint(item)}
                  className="p-4 hover:bg-blue-50/40 transition-colors cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-black text-sm text-blue-700">{item.ticketNo}</span>
                      <span className="bg-orange-100 text-orange-800 font-bold text-[10px] px-2 py-0.5 rounded">
                        Shifted to {item.department}
                      </span>
                    </div>
                    <h4 className="font-bold text-xs text-blue-950">{item.title}</h4>
                    <p className="text-[11px] text-slate-500">
                      Applicant: <strong>{item.citizen.name}</strong> | District: <strong>{item.district}</strong> ({item.mandal})
                    </p>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs max-w-md shrink-0 space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>Action by: {lastLog.changedBy}</span>
                      <span>{lastLog.timestamp}</span>
                    </div>
                    <p className="text-slate-700 italic text-[11px]">
                      "{lastLog.remarks}"
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

    </div>
  );
}
