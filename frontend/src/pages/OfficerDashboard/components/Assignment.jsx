/**
 * @file Assignment.jsx
 * @description Tab for Officer Dashboard allowing the assignment of pending complaints to staff members.
 */

import { useState } from 'react';
import toast from 'react-hot-toast';
import { StatusBadge } from '../../../components/Badge';
import { UserPlus, CheckCircle2 } from 'lucide-react';

// Mock data for staff and pending complaints
const STAFF_MEMBERS = [
  { id: 'S1', name: 'John Doe', role: 'Field Inspector' },
  { id: 'S2', name: 'Jane Smith', role: 'Technician' },
  { id: 'S3', name: 'Raj Kumar', role: 'Supervisor' },
];

const MOCK_UNASSIGNED = [
  { id: 'TKT-2001', title: 'Road broken near City Center', priority: 'HIGH', date: '2026-07-21' },
  { id: 'TKT-2002', title: 'Drainage overflow', priority: 'MEDIUM', date: '2026-07-21' },
];

export const Assignment = () => {
  const [unassigned, setUnassigned] = useState(MOCK_UNASSIGNED);
  const [selectedStaff, setSelectedStaff] = useState({});

  const handleAssign = (ticketId) => {
    const staffId = selectedStaff[ticketId];
    if (!staffId) {
      toast.error('Please select a staff member first.');
      return;
    }
    
    // Optimistic UI update
    setUnassigned(prev => prev.filter(t => t.id !== ticketId));
    toast.success(`Ticket ${ticketId} assigned successfully!`);
    
    // In real scenario: Call api.updateComplaint(ticketId, { assignedTo: staffId, status: 'ASSIGNED' })
  };

  const handleStaffChange = (ticketId, staffId) => {
    setSelectedStaff(prev => ({ ...prev, [ticketId]: staffId }));
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-gray-100">
      <div className="mb-6">
        <h2 className="text-lg font-black text-gray-900">Task Assignment</h2>
        <p className="text-xs text-gray-500 font-medium mt-1">Assign pending grievances to department staff for resolution.</p>
      </div>

      <div className="space-y-4">
        {unassigned.length > 0 ? (
          unassigned.map((ticket) => (
            <div key={ticket.id} className="p-4 border border-gray-100 bg-gray-50/50 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-blue-200 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-bold text-blue-600">{ticket.id}</span>
                  <StatusBadge status="PENDING" />
                  <span className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded border ${
                      ticket.priority === 'HIGH' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                    }`}>
                      {ticket.priority}
                  </span>
                </div>
                <p className="text-xs font-semibold text-gray-800">{ticket.title}</p>
                <p className="text-[10px] text-gray-400 font-medium">Logged on: {ticket.date}</p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <select 
                  value={selectedStaff[ticket.id] || ''}
                  onChange={(e) => handleStaffChange(ticket.id, e.target.value)}
                  className="bg-white border border-gray-200 text-xs font-medium rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-full sm:w-48"
                >
                  <option value="" disabled>Select Staff Member</option>
                  {STAFF_MEMBERS.map(staff => (
                    <option key={staff.id} value={staff.id}>{staff.name} - {staff.role}</option>
                  ))}
                </select>
                <button 
                  onClick={() => handleAssign(ticket.id)}
                  className="flex items-center justify-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-[0.98] w-full sm:w-auto"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Assign</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-3 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
            <div className="w-12 h-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-2">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-gray-800">All Caught Up!</h3>
            <p className="text-xs text-gray-500 max-w-sm">There are no pending grievances awaiting assignment in your department queue.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assignment;
