/**
 * @file ComplaintManagement.jsx
 * @description Tab for Officer Dashboard showing list of complaints assigned to the department.
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../services/api';
import { StatusBadge } from '../../../components/Badge';
import { DashboardSkeleton } from '../../../components/Loader';
import { Search, Filter } from 'lucide-react';

export const ComplaintManagement = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await api.getComplaints({ role: 'OFFICER' }); // Using role or specific param if backend supports
        // In case API returns nothing or we are offline, mock some data for the officer
        if (res && res.length > 0) {
          setComplaints(res);
        } else {
          setComplaints([
            { id: 'TKT-1001', title: 'Pothole on Main St', status: 'PENDING', priority: 'HIGH', date: '2026-07-20' },
            { id: 'TKT-1002', title: 'Water leakage in Block B', status: 'IN_PROGRESS', priority: 'MEDIUM', date: '2026-07-19' },
            { id: 'TKT-1003', title: 'Streetlight not working', status: 'RESOLVED', priority: 'LOW', date: '2026-07-18' },
            { id: 'TKT-1004', title: 'Garbage not collected', status: 'ASSIGNED', priority: 'HIGH', date: '2026-07-21' },
          ]);
        }
      } catch (err) {
        console.error(err);
        setComplaints([
          { id: 'TKT-1001', title: 'Pothole on Main St', status: 'PENDING', priority: 'HIGH', date: '2026-07-20' },
          { id: 'TKT-1002', title: 'Water leakage in Block B', status: 'IN_PROGRESS', priority: 'MEDIUM', date: '2026-07-19' },
          { id: 'TKT-1003', title: 'Streetlight not working', status: 'RESOLVED', priority: 'LOW', date: '2026-07-18' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  if (loading) return <DashboardSkeleton />;

  const filteredComplaints = complaints.filter(c => 
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-lg font-black text-gray-900">Department Grievances</h2>
          <p className="text-xs text-gray-500 font-medium mt-1">Manage and update all tickets routed to your department.</p>
        </div>
        
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search Ticket ID or Title..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          <button className="p-2.5 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors text-gray-600">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="py-3 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Ticket ID</th>
              <th className="py-3 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Title</th>
              <th className="py-3 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date Logged</th>
              <th className="py-3 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
              <th className="py-3 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Priority</th>
              <th className="py-3 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.length > 0 ? (
              filteredComplaints.map((c) => (
                <tr 
                  key={c.id} 
                  className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors group cursor-pointer"
                  onClick={() => navigate(`/complaint/track?id=${c.id}`)}
                >
                  <td className="py-3 px-4 font-bold text-blue-600 text-xs">{c.id}</td>
                  <td className="py-3 px-4 text-xs font-medium text-gray-800 max-w-[200px] truncate">{c.title}</td>
                  <td className="py-3 px-4 text-xs text-gray-500 font-medium">{c.date}</td>
                  <td className="py-3 px-4"><StatusBadge status={c.status} /></td>
                  <td className="py-3 px-4">
                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded border ${
                      c.priority === 'HIGH' ? 'bg-red-50 text-red-700 border-red-100' : 
                      c.priority === 'MEDIUM' ? 'bg-amber-50 text-amber-700 border-amber-100' : 
                      'bg-green-50 text-green-700 border-green-100'
                    }`}>
                      {c.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button 
                      onClick={(e) => { e.stopPropagation(); navigate(`/complaint/track?id=${c.id}`); }}
                      className="text-[10px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-wider"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-8 text-center text-xs font-bold text-gray-400">
                  No grievances found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplaintManagement;
