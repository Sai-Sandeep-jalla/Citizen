import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Filter, 
  ShieldCheck, 
  AlertTriangle, 
  Info, 
  Download, 
  Clock, 
  User, 
  Globe, 
  FileSpreadsheet,
  X
} from 'lucide-react';

export default function AuditLogsView({ systemAuditLogs, onExportAuditLogs }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [moduleFilter, setModuleFilter] = useState('ALL');
  const [selectedLog, setSelectedLog] = useState(null);

  const filteredLogs = systemAuditLogs.filter(log => {
    const matchesSearch = log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = severityFilter === 'ALL' || log.severity === severityFilter;
    const matchesModule = moduleFilter === 'ALL' || log.module === moduleFilter;

    return matchesSearch && matchesSeverity && matchesModule;
  });

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
            <History className="w-6 h-6 text-indigo-600" />
            <span>Master System Audit Trail & Security Logs</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Tamper-evident system log registry recording all administrative status modifications, department re-assignments, and security events.
          </p>
        </div>

        <button 
          onClick={onExportAuditLogs}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center space-x-2 shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export Audit Log (CSV)</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            placeholder="Search actor name, ticket ID, event action..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-xs font-semibold rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2">
            <label className="text-xs font-bold text-slate-600">Module:</label>
            <select 
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
            >
              <option value="ALL">All Modules</option>
              <option value="Complaint Lifecycle">Complaint Lifecycle</option>
              <option value="Inter-Department Transfer">Inter-Dept Transfer</option>
              <option value="SLA Monitoring">SLA Monitoring</option>
              <option value="Authentication">Authentication</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-xs font-bold text-slate-600">Severity:</label>
            <select 
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
            >
              <option value="ALL">All Severities</option>
              <option value="info">Info / Normal</option>
              <option value="warning">Warning</option>
              <option value="critical">Critical Flag</option>
            </select>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900 text-white font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4 whitespace-nowrap">Event ID & Date</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Actor / Responsible User</th>
                <th className="py-3.5 px-4 whitespace-nowrap">System Module</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Action Event</th>
                <th className="py-3.5 px-4">Event Summary Details</th>
                <th className="py-3.5 px-4 text-center whitespace-nowrap">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredLogs.map((log) => (
                <tr 
                  key={log.id} 
                  onClick={() => setSelectedLog(log)}
                  className="hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-4 whitespace-nowrap min-w-[140px]">
                    <span className="font-extrabold text-slate-900 block">{log.id}</span>
                    <span className="text-[10px] text-slate-500 flex items-center space-x-1 mt-0.5">
                      <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{log.timestamp}</span>
                    </span>
                  </td>

                  <td className="py-3.5 px-4 min-w-[180px]">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-900 font-bold text-xs flex items-center justify-center shrink-0">
                        {log.actor.charAt(0)}
                      </div>
                      <div className="truncate">
                        <strong className="text-slate-900 font-bold block truncate">{log.actor}</strong>
                        <span className="text-[10px] text-slate-500 block truncate">{log.role}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap min-w-[160px]">
                    <span className="inline-block font-extrabold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 text-[11px] leading-tight whitespace-nowrap">
                      {log.module}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap min-w-[160px]">
                    {log.action}
                  </td>

                  <td className="py-3.5 px-4 text-slate-600 max-w-xs lg:max-w-md truncate">
                    {log.details}
                  </td>

                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <span className={`inline-flex items-center space-x-1 text-[10px] font-black uppercase px-2.5 py-1 rounded-full border whitespace-nowrap ${
                      log.severity === 'critical' 
                        ? 'bg-rose-50 text-rose-700 border-rose-300'
                        : log.severity === 'warning'
                        ? 'bg-amber-50 text-amber-700 border-amber-300'
                        : 'bg-blue-50 text-blue-700 border-blue-300'
                    }`}>
                      {log.severity === 'critical' && <AlertTriangle className="w-3 h-3 text-rose-600 shrink-0" />}
                      <span>{log.severity}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Detail Drawer Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-slate-900 p-4 text-white flex items-center justify-between border-b border-indigo-500">
              <h3 className="font-black text-sm flex items-center space-x-2">
                <History className="w-4 h-4 text-indigo-400" />
                <span>Audit Log Inspector - {selectedLog.id}</span>
              </h3>
              <button onClick={() => setSelectedLog(null)} className="text-slate-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">Recorded Timestamp</span>
                  <strong className="text-slate-900 font-extrabold">{selectedLog.timestamp}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">Network IP Source</span>
                  <strong className="text-slate-900 font-extrabold flex items-center space-x-1">
                    <Globe className="w-3 h-3 text-indigo-600 inline" />
                    <span>{selectedLog.ipAddress}</span>
                  </strong>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 font-bold block uppercase mb-1">Performing User / Actor</span>
                <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center justify-between">
                  <div>
                    <strong className="text-sm font-extrabold text-blue-950 block">{selectedLog.actor}</strong>
                    <span className="text-xs text-blue-700 font-semibold">{selectedLog.role}</span>
                  </div>
                  <User className="w-5 h-5 text-blue-600" />
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 font-bold block uppercase mb-1">Full System Log Message</span>
                <p className="p-3 bg-slate-900 text-slate-100 rounded-xl font-mono text-[11px] leading-relaxed">
                  {selectedLog.details}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end">
                <button
                  onClick={() => setSelectedLog(null)}
                  className="px-5 py-2 rounded-xl text-xs font-extrabold bg-slate-900 hover:bg-slate-800 text-white"
                >
                  Close Inspection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
