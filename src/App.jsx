import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import ComplaintList from './components/ComplaintList';
import ReportsView from './components/ReportsView';
import TransfersView from './components/TransfersView';
import OfficersView from './components/OfficersView';
import DepartmentsView from './components/DepartmentsView';
import EscalationRulesView from './components/EscalationRulesView';
import AuditLogsView from './components/AuditLogsView';
import ComplaintDetailModal from './components/ComplaintDetailModal';
import ShiftDepartmentModal from './components/ShiftDepartmentModal';
import Toast from './components/Toast';

import { 
  INITIAL_COMPLAINTS, 
  CURRENT_ADMIN,
  INITIAL_OFFICERS,
  INITIAL_DEPARTMENTS,
  INITIAL_ESCALATION_RULES,
  INITIAL_SYSTEM_AUDIT_LOGS
} from './data/mockData';

export default function App() {
  const [currentAdmin] = useState(CURRENT_ADMIN);
  
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS);
  const [officers, setOfficers] = useState(INITIAL_OFFICERS);
  const [departments, setDepartments] = useState(INITIAL_DEPARTMENTS);
  const [escalationRules, setEscalationRules] = useState(INITIAL_ESCALATION_RULES);
  const [systemAuditLogs, setSystemAuditLogs] = useState(INITIAL_SYSTEM_AUDIT_LOGS);

  const [currentTab, setCurrentTab] = useState('dashboard');
  const [selectedState, setSelectedState] = useState('AP');
  const [selectedDistrict, setSelectedDistrict] = useState('ALL');
  const [activeDepartment, setActiveDepartment] = useState('ALL');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [shiftTargetComplaint, setShiftTargetComplaint] = useState(null);
  const [toast, setToast] = useState(null);

  const recordAuditEvent = (action, moduleName, details, severity = 'info') => {
    const timestamp = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    const newLog = {
      id: `AUD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp,
      actor: currentAdmin.name,
      role: currentAdmin.designation,
      module: moduleName,
      action,
      details,
      ipAddress: '192.168.1.45',
      severity
    };
    setSystemAuditLogs(prev => [newLog, ...prev]);
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    showToast('Signed in to Admin Portal!', 'success');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSelectedComplaint(null);
    setShiftTargetComplaint(null);
  };

  // Handler: Accept / Reject Complaint
  const handleAcceptReject = (complaintId, action) => {
    const timestamp = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    const newStatus = action === 'Accept' ? 'In Progress' : 'Rejected';

    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        const updatedHistory = [
          ...c.history,
          {
            id: c.history.length + 1,
            action: action === 'Accept' ? 'Accepted into Work Queue' : 'Rejected Complaint',
            changedBy: currentAdmin.name,
            timestamp,
            remarks: action === 'Accept' ? 'Validated and accepted for execution by Admin.' : 'Rejected due to incomplete documentation.'
          }
        ];
        return { ...c, status: newStatus, history: updatedHistory };
      }
      return c;
    }));

    if (selectedComplaint && selectedComplaint.id === complaintId) {
      setSelectedComplaint(prev => ({
        ...prev,
        status: newStatus,
        history: [
          ...prev.history,
          {
            id: prev.history.length + 1,
            action: action === 'Accept' ? 'Accepted into Work Queue' : 'Rejected Complaint',
            changedBy: currentAdmin.name,
            timestamp,
            remarks: action === 'Accept' ? 'Validated and accepted for execution by Admin.' : 'Rejected due to incomplete documentation.'
          }
        ]
      }));
    }

    showToast(`Grievance ${action === 'Accept' ? 'Accepted' : 'Rejected'} successfully!`, action === 'Accept' ? 'success' : 'warning');
    recordAuditEvent(action === 'Accept' ? 'Grievance Accepted' : 'Grievance Rejected', 'Complaint Lifecycle', `Ticket ${complaintId} was ${action === 'Accept' ? 'accepted into work queue' : 'rejected'} by Admin Lead`);
  };

  // Handler: Update Case Status
  const handleUpdateStatus = (complaintId, newStatus) => {
    const timestamp = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        const updatedHistory = [
          ...c.history,
          {
            id: c.history.length + 1,
            action: `Status changed to ${newStatus}`,
            changedBy: currentAdmin.name,
            timestamp,
            remarks: `Official status update logged by ${currentAdmin.name}.`
          }
        ];
        return { ...c, status: newStatus, history: updatedHistory };
      }
      return c;
    }));

    if (selectedComplaint && selectedComplaint.id === complaintId) {
      setSelectedComplaint(prev => ({
        ...prev,
        status: newStatus,
        history: [
          ...prev.history,
          {
            id: prev.history.length + 1,
            action: `Status changed to ${newStatus}`,
            changedBy: currentAdmin.name,
            timestamp,
            remarks: `Official status update logged by ${currentAdmin.name}.`
          }
        ]
      }));
    }

    showToast(`Complaint status updated to "${newStatus}"!`, 'success');
    recordAuditEvent('Status Modified', 'Complaint Lifecycle', `Ticket ${complaintId} status updated to ${newStatus}`);
  };

  // Handler: Add Internal Note
  const handleAddNote = (complaintId, noteText) => {
    const timestamp = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        const updatedHistory = [
          ...c.history,
          {
            id: c.history.length + 1,
            action: 'Internal Note Added',
            changedBy: currentAdmin.name,
            timestamp,
            remarks: noteText
          }
        ];
        return { ...c, history: updatedHistory };
      }
      return c;
    }));

    if (selectedComplaint && selectedComplaint.id === complaintId) {
      setSelectedComplaint(prev => ({
        ...prev,
        history: [
          ...prev.history,
          {
            id: prev.history.length + 1,
            action: 'Internal Note Added',
            changedBy: currentAdmin.name,
            timestamp,
            remarks: noteText
          }
        ]
      }));
    }

    showToast('Internal Admin comment logged in audit timeline.', 'info');
  };

  // Handler: Shift / Reassign to Other Department
  const handleShiftDepartment = (complaintId, targetDept, reason) => {
    const timestamp = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        const updatedHistory = [
          ...c.history,
          {
            id: c.history.length + 1,
            action: 'Department Shifted',
            changedBy: currentAdmin.name,
            timestamp,
            remarks: `Reassigned from ${c.department} to ${targetDept}. Reason: ${reason}`
          }
        ];
        return { ...c, department: targetDept, history: updatedHistory };
      }
      return c;
    }));

    if (selectedComplaint && selectedComplaint.id === complaintId) {
      setSelectedComplaint(prev => ({
        ...prev,
        department: targetDept,
        history: [
          ...prev.history,
          {
            id: prev.history.length + 1,
            action: 'Department Shifted',
            changedBy: currentAdmin.name,
            timestamp,
            remarks: `Reassigned from ${prev.department} to ${targetDept}. Reason: ${reason}`
          }
        ]
      }));
    }

    showToast(`Case transferred to ${targetDept} Department!`, 'warning');
    recordAuditEvent('Inter-Dept Shift', 'Inter-Department Transfer', `Reassigned ticket ${complaintId} to ${targetDept} Department. Reason: ${reason}`, 'warning');
  };

  // Handler: Upload Resolution Proof
  const handleUploadResolution = (complaintId, documentName, notes) => {
    const timestamp = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

    const proof = {
      documentName,
      uploadedAt: timestamp,
      notes: notes || 'Resolution document attached by Admin.'
    };

    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        const updatedHistory = [
          ...c.history,
          {
            id: c.history.length + 1,
            action: 'Resolution Proof Uploaded',
            changedBy: currentAdmin.name,
            timestamp,
            remarks: `Uploaded: ${documentName}. Notes: ${notes}`
          }
        ];
        return { ...c, status: 'Resolved', resolutionProof: proof, history: updatedHistory };
      }
      return c;
    }));

    if (selectedComplaint && selectedComplaint.id === complaintId) {
      setSelectedComplaint(prev => ({
        ...prev,
        status: 'Resolved',
        resolutionProof: proof,
        history: [
          ...prev.history,
          {
            id: prev.history.length + 1,
            action: 'Resolution Proof Uploaded',
            changedBy: currentAdmin.name,
            timestamp,
            remarks: `Uploaded: ${documentName}. Notes: ${notes}`
          }
        ]
      }));
    }

    showToast('Resolution proof uploaded and complaint marked as Resolved!', 'success');
    recordAuditEvent('Resolution Proof Uploaded', 'Complaint Lifecycle', `Resolution attached for ticket ${complaintId}: ${documentName}`);
  };

  // Handler: Officer Management
  const handleAddOfficer = (newOfficer) => {
    setOfficers(prev => [newOfficer, ...prev]);
    recordAuditEvent('Officer Registered', 'Officer Management', `Registered officer ${newOfficer.name} (${newOfficer.id}) under ${newOfficer.department} Dept`);
    showToast(`Officer ${newOfficer.name} registered successfully!`, 'success');
  };

  const handleToggleOfficerStatus = (officerId) => {
    setOfficers(prev => prev.map(o => o.id === officerId ? { ...o, status: o.status === 'Active' ? 'Inactive' : 'Active' } : o));
    recordAuditEvent('Officer Status Changed', 'Officer Management', `Toggled active state for officer ID ${officerId}`);
    showToast('Officer status updated!', 'info');
  };

  // Handler: Department Management
  const handleUpdateDepartmentSla = (deptId, hours) => {
    setDepartments(prev => prev.map(d => d.id === deptId ? { ...d, defaultSlaHours: hours } : d));
    recordAuditEvent('SLA Policy Modified', 'Department Control', `Updated baseline SLA resolution hours for ${deptId} to ${hours} hours`);
    showToast(`Baseline SLA for ${deptId} updated to ${hours} Hours!`, 'success');
  };

  // Handler: Escalation Rules Management
  const handleToggleEscalationRule = (ruleId) => {
    setEscalationRules(prev => prev.map(r => r.id === ruleId ? { ...r, enabled: !r.enabled } : r));
    recordAuditEvent('Escalation Policy Toggled', 'SLA Monitoring', `Toggled operational rule status for ${ruleId}`);
    showToast('Escalation policy state updated!', 'info');
  };

  const handleAddEscalationRule = (newRule) => {
    setEscalationRules(prev => [newRule, ...prev]);
    recordAuditEvent('Escalation Policy Created', 'SLA Monitoring', `Configured new SLA escalation policy: ${newRule.name}`);
    showToast(`Escalation rule ${newRule.name} saved!`, 'success');
  };

  // Handler: Audit Log Export
  const handleExportAuditLogs = () => {
    recordAuditEvent('Audit Trail Exported', 'Master System Audit', 'Generated and downloaded CSV system audit report file');
    showToast('Master System Audit log exported to CSV successfully!', 'success');
  };

  return (
    <div className="h-screen bg-slate-100 flex flex-col font-sans text-slate-900 selection:bg-orange-500 selection:text-white overflow-hidden">
      
      {/* Top Admin Header */}
      <Header 
        selectedState={selectedState}
        setSelectedState={setSelectedState}
        selectedDistrict={selectedDistrict}
        setSelectedDistrict={setSelectedDistrict}
        activeDepartment={activeDepartment}
        setActiveDepartment={setActiveDepartment}
        currentAdmin={currentAdmin}
        complaints={complaints}
        onLogout={handleLogout}
      />

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Navigation Sidebar */}
        <Sidebar 
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          complaints={complaints}
          onLogout={handleLogout}
        />

        {/* Dynamic Main Workspace Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto h-full">
          {currentTab === 'dashboard' && (
            <DashboardView 
              complaints={complaints}
              selectedDistrict={selectedDistrict}
              activeDepartment={activeDepartment}
              onSelectComplaint={(c) => setSelectedComplaint(c)}
              onOpenShiftModal={(c) => setShiftTargetComplaint(c)}
            />
          )}

          {currentTab === 'complaints' && (
            <ComplaintList 
              complaints={complaints}
              selectedDistrict={selectedDistrict}
              activeDepartment={activeDepartment}
              onSelectComplaint={(c) => setSelectedComplaint(c)}
              onOpenShiftModal={(c) => setShiftTargetComplaint(c)}
            />
          )}

          {currentTab === 'workqueue' && (
            <ComplaintList 
              complaints={complaints.filter(c => c.status === 'Pending' || c.status === 'Assigned' || c.status === 'In Progress')}
              selectedDistrict={selectedDistrict}
              activeDepartment={activeDepartment}
              onSelectComplaint={(c) => setSelectedComplaint(c)}
              onOpenShiftModal={(c) => setShiftTargetComplaint(c)}
            />
          )}

          {currentTab === 'transfers' && (
            <TransfersView 
              complaints={complaints}
              onSelectComplaint={(c) => setSelectedComplaint(c)}
            />
          )}

          {currentTab === 'reports' && (
            <ReportsView 
              complaints={complaints}
              selectedDistrict={selectedDistrict}
              activeDepartment={activeDepartment}
              selectedState={selectedState}
            />
          )}

          {currentTab === 'officers' && (
            <OfficersView 
              officers={officers}
              onAddOfficer={handleAddOfficer}
              onToggleStatus={handleToggleOfficerStatus}
              activeDepartment={activeDepartment}
              selectedDistrict={selectedDistrict}
            />
          )}

          {currentTab === 'departments' && (
            <DepartmentsView 
              departments={departments}
              onUpdateDepartmentSla={handleUpdateDepartmentSla}
            />
          )}

          {currentTab === 'escalations' && (
            <EscalationRulesView 
              escalationRules={escalationRules}
              onToggleRule={handleToggleEscalationRule}
              onAddRule={handleAddEscalationRule}
            />
          )}

          {currentTab === 'auditlogs' && (
            <AuditLogsView 
              systemAuditLogs={systemAuditLogs}
              onExportAuditLogs={handleExportAuditLogs}
            />
          )}
        </main>

      </div>

      {/* Complaint Detail Inspector Modal */}
      {selectedComplaint && (
        <ComplaintDetailModal 
          complaint={selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
          onUpdateStatus={handleUpdateStatus}
          onAddNote={handleAddNote}
          onShiftDepartment={handleShiftDepartment}
          onUploadResolution={handleUploadResolution}
          onAcceptReject={handleAcceptReject}
        />
      )}

      {/* Quick Shift Department Modal */}
      {shiftTargetComplaint && (
        <ShiftDepartmentModal 
          complaint={shiftTargetComplaint}
          onClose={() => setShiftTargetComplaint(null)}
          onShiftDepartment={handleShiftDepartment}
        />
      )}

      {/* Toast Notification Popup */}
      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
}
