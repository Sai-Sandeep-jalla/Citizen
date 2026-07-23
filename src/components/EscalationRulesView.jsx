import React, { useState } from 'react';
import { 
  Zap, 
  ShieldAlert, 
  Clock, 
  Send, 
  Check, 
  ToggleLeft, 
  ToggleRight, 
  Bell, 
  Plus, 
  AlertOctagon,
  ArrowRight
} from 'lucide-react';

export default function EscalationRulesView({ escalationRules, onToggleRule, onAddRule }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newRule, setNewRule] = useState({
    level: 'Low Priority',
    name: '',
    triggerThreshold: 10,
    unit: 'Days',
    targetAuthority: '',
    channel: 'SMS & Web Portal Alert',
    autoReassign: false,
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newRule.name || !newRule.targetAuthority) return;

    onAddRule({
      ...newRule,
      id: `ESC-RULE-${100 + escalationRules.length + 1}`,
      enabled: true
    });

    setNewRule({
      level: 'Low Priority',
      name: '',
      triggerThreshold: 10,
      unit: 'Days',
      targetAuthority: '',
      channel: 'SMS & Web Portal Alert',
      autoReassign: false,
    });
    setIsAddModalOpen(false);
  };

  const formatThresholdDisplay = (rule) => {
    const t = rule.triggerThreshold;
    if (t >= 90) return `${t} Days (3 Months) SLA Breach`;
    if (t >= 30) return `${t} Days (1 Month) SLA Breach`;
    return `${t} Days SLA Breach`;
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
            <Zap className="w-6 h-6 text-amber-500" />
            <span>Overdue Complaint Delay Rules</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Set deadlines for officers to solve complaints (10 Days, 1 Month, or 3 Months). If work is delayed beyond the deadline, the system automatically sends warnings and alerts higher officers up to the District Magistrate.
          </p>
        </div>

        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center space-x-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Escalation Policy</span>
        </button>
      </div>

      {/* Rules List */}
      <div className="space-y-4">
        {escalationRules.map((rule) => (
          <div 
            key={rule.id}
            className={`bg-white rounded-2xl border p-5 shadow-xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
              rule.enabled ? 'border-amber-200 bg-gradient-to-r from-amber-50/20 via-white to-white' : 'border-slate-200 opacity-60'
            }`}
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center space-x-3">
                <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                  rule.level.includes('High')
                    ? 'bg-red-600 text-white border-red-700'
                    : rule.level.includes('Medium')
                    ? 'bg-yellow-400 text-slate-950 border-yellow-500'
                    : 'bg-emerald-600 text-white border-emerald-700'
                }`}>
                  {rule.level}
                </span>
              </div>

              <h3 className="font-extrabold text-slate-900 text-base">{rule.name}</h3>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                <div className="flex items-center space-x-1 font-semibold text-slate-800">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>Threshold: <strong>{formatThresholdDisplay(rule)}</strong></span>
                </div>

                <div className="flex items-center space-x-1 font-semibold text-slate-800">
                  <ShieldAlert className="w-3.5 h-3.5 text-blue-600" />
                  <span>Authority: <strong>{rule.targetAuthority}</strong></span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 shrink-0">
              <div className="text-right hidden sm:block">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Auto-Reassignment</span>
                <span className={`text-xs font-bold ${rule.autoReassign ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {rule.autoReassign ? '● Active' : '○ Disabled'}
                </span>
              </div>

              <button 
                onClick={() => onToggleRule(rule.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                  rule.enabled 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300' 
                    : 'bg-slate-100 text-slate-500 border-slate-300'
                }`}
              >
                {rule.enabled ? <ToggleRight className="w-5 h-5 text-emerald-600" /> : <ToggleLeft className="w-5 h-5 text-slate-400" />}
                <span>{rule.enabled ? 'Policy Enabled' : 'Disabled'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Rule Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-amber-600 p-4 text-white flex items-center justify-between">
              <h3 className="font-black text-sm flex items-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-300" />
                <span>Create Government SLA Escalation Policy Rule</span>
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-amber-100 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Priority Tier</label>
                <select 
                  value={newRule.level}
                  onChange={(e) => setNewRule({ ...newRule, level: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-amber-500 focus:outline-none text-slate-800"
                >
                  <option value="Low Priority">Low Priority (10 Days Nodal Review)</option>
                  <option value="Medium Priority">Medium Priority (1 Month / 30 Days HOD Alert)</option>
                  <option value="High Priority">High Priority (3 Months / District Magistrate)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Policy Title / Rule Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. 90-Day DM Apex Escalation Order"
                  value={newRule.name}
                  onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Trigger Threshold (Days)</label>
                  <input 
                    type="number" 
                    min="1"
                    required
                    value={newRule.triggerThreshold}
                    onChange={(e) => setNewRule({ ...newRule, triggerThreshold: parseInt(e.target.value, 10) || 10 })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Authority Role</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. District Magistrate & Collector (DM)"
                    value={newRule.targetAuthority}
                    onChange={(e) => setNewRule({ ...newRule, targetAuthority: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center space-x-2">
                <input 
                  type="checkbox"
                  id="autoReassign"
                  checked={newRule.autoReassign}
                  onChange={(e) => setNewRule({ ...newRule, autoReassign: e.target.checked })}
                  className="w-4 h-4 text-amber-600 rounded"
                />
                <label htmlFor="autoReassign" className="text-xs font-bold text-slate-800 cursor-pointer">
                  Automatically reassign case to designated Authority on trigger
                </label>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-300 text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-extrabold bg-amber-500 hover:bg-amber-600 text-white shadow-md"
                >
                  Save Escalation Policy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
