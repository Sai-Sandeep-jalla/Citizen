import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';
import { Table } from '../components/Table';
import { Pagination } from '../components/Pagination';
import { Button } from '../components/Button';
import { Dropdown, SearchBox, TextArea } from '../components/FormControls';
import { Card } from '../components/Card';
import { StatusBadge, PriorityBadge } from '../components/Badge';
import { Modal, ConfirmationDialog } from '../components/Modal';
import { useMetadata } from '../hooks/useMetadata';
import toast from 'react-hot-toast';
import { 
  Eye, 
  Trash2, 
  RefreshCcw, 
  FileSpreadsheet, 
  LayoutGrid, 
  List,
  SlidersHorizontal,
  X,
  AlertTriangle
} from 'lucide-react';

export const ComplaintHistory = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const { metadata } = useMetadata();
  const COMPLAINT_CATEGORIES = metadata?.COMPLAINT_CATEGORIES || [];
  const [loading, setLoading] = useState(true);
  const [complaints, setComplaints] = useState([]);
  
  // View controls
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  
  // Filters & Sorting state
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [sortField] = useState('createdDate');
  const [sortOrder] = useState('desc');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Dialog / Modal state
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [reopenModalOpen, setReopenModalOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [reopenComment, setReopenComment] = useState('');

  // Mobile filters panel toggle
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const fetchComplaints = useCallback(async () => {
    setLoading(true);
    try {
      // If citizen, filter list by their ID. Otherwise (officer/admin), fetch all.
      const queryParams = user?.role === 'CITIZEN' ? { citizenId: user.id } : {};
      const list = await api.getComplaints(queryParams);
      setComplaints(list);
    } catch {
      toast.error('Failed to load complaints logs.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchComplaints();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchComplaints]);

  // Handle Action: Delete Pending Draft
  const handleDeleteTrigger = (complaintObj, e) => {
    e.stopPropagation();
    setSelectedComplaint(complaintObj);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setActionLoading(true);
    try {
      await api.deleteComplaint(selectedComplaint.id);
      toast.success('Complaint draft deleted successfully.');
      setDeleteConfirmOpen(false);
      fetchComplaints();
    } catch {
      toast.error('Failed to delete complaint.');
    } finally {
      setActionLoading(false);
    }
  };

  // Handle Action: Reopen ticket
  const handleReopenTrigger = (complaintObj, e) => {
    e.stopPropagation();
    setSelectedComplaint(complaintObj);
    setReopenComment('');
    setReopenModalOpen(true);
  };

  const handleReopenSubmit = async (e) => {
    e.preventDefault();
    if (!reopenComment.trim() || reopenComment.trim().length < 15) {
      toast.error('Please describe your reason for reopening in at least 15 characters.');
      return;
    }

    setActionLoading(true);
    try {
      await api.updateComplaint(selectedComplaint.id, {
        status: 'ASSIGNED',
        comment: `Reopened by Citizen: ${reopenComment}`
      });
      toast.success('Complaint reopened successfully.');
      setReopenModalOpen(false);
      fetchComplaints();
    } catch {
      toast.error('Failed to reopen complaint.');
    } finally {
      setActionLoading(false);
    }
  };

  // Handle Action: Export CSV
  const handleExportCSV = () => {
    if (filteredComplaints.length === 0) {
      toast.error('No complaints to export.');
      return;
    }
    
    const headers = ['Ticket ID', 'Complaint Title', 'Category', 'Priority', 'Status', 'Site Address', 'Handling Officer', 'Date Filed'];
    const rows = filteredComplaints.map(c => [
      c.id,
      `"${c.title.replace(/"/g, '""')}"`,
      c.category,
      c.priority,
      c.status,
      `"${c.address.replace(/"/g, '""')}"`,
      c.assignedOfficer,
      new Date(c.createdDate).toLocaleDateString()
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CitizenPortal_Complaints_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Complaints history exported successfully!');
  };

  // Filter complaints based on Search, Status, Category, Priority
  const filteredComplaints = complaints.filter(c => {
    const matchesSearch = search.trim() === '' || 
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    const matchesCategory = categoryFilter === 'ALL' || c.category === categoryFilter;
    const matchesPriority = priorityFilter === 'ALL' || c.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
  }).sort((a, b) => {
    let fieldA = a[sortField];
    let fieldB = b[sortField];
    
    if (sortField === 'createdDate') {
      fieldA = new Date(fieldA);
      fieldB = new Date(fieldB);
    }

    if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination logic
  const totalItems = filteredComplaints.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentData = filteredComplaints.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowClick = (ticketId) => {
    navigate(`/complaint/track?ticketId=${ticketId}`);
  };

  // Reset page index on filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
    }, 0);
    return () => clearTimeout(timer);
  }, [search, statusFilter, categoryFilter, priorityFilter, sortField, sortOrder]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Title & Actions bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 m-0">{t('complaintHistory')}</h1>
          <p className="text-xs text-gray-500 mt-1">Review previously submitted complaints, reopen cases, delete drafts, and export full reports.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            icon={FileSpreadsheet}
            className="border-green-600 text-green-700 hover:bg-green-50"
          >
            Export CSV
          </Button>

          {/* Toggle list view modes */}
          <div className="hidden sm:flex bg-gray-150 p-1 rounded-lg border border-gray-200">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md ${viewMode === 'table' ? 'bg-white text-primary shadow-xs' : 'text-gray-500 hover:text-gray-700'}`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-white text-primary shadow-xs' : 'text-gray-500 hover:text-gray-700'}`}
              title="Card View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Filter Panel */}
      <Card hoverEffect={false} className="hidden md:block py-4">
        <div className="grid grid-cols-5 gap-3.5 items-end">
          <div className="col-span-2">
            <SearchBox
              value={search}
              onChange={setSearch}
              onClear={() => setSearch('')}
              placeholder="Search by ID, title, description..."
            />
          </div>
          
          <Dropdown
            label="Category"
            name="categoryFilter"
            options={[{ value: 'ALL', label: 'All Categories' }, ...COMPLAINT_CATEGORIES.map(c => ({ value: c.id, label: t(c.id) || c.label }))]}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            emptyOption={null}
          />

          <Dropdown
            label="Status"
            name="statusFilter"
            options={[
              { value: 'ALL', label: 'All Statuses' },
              { value: 'PENDING', label: 'Pending' },
              { value: 'ASSIGNED', label: 'Assigned' },
              { value: 'IN_PROGRESS', label: 'In Progress' },
              { value: 'RESOLVED', label: 'Resolved' },
              { value: 'CLOSED', label: 'Closed' },
              { value: 'REJECTED', label: 'Rejected' }
            ]}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            emptyOption={null}
          />

          <Dropdown
            label="Priority"
            name="priorityFilter"
            options={[
              { value: 'ALL', label: 'All Priorities' },
              { value: 'LOW', label: 'Low' },
              { value: 'MEDIUM', label: 'Medium' },
              { value: 'HIGH', label: 'High' },
              { value: 'CRITICAL', label: 'Critical' }
            ]}
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            emptyOption={null}
          />
        </div>
      </Card>

      {/* Mobile filter buttons trigger */}
      <div className="md:hidden flex items-center space-x-2">
        <div className="flex-1">
          <SearchBox
            value={search}
            onChange={setSearch}
            onClear={() => setSearch('')}
            placeholder="Search grievances..."
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setMobileFiltersOpen(true)}
          icon={SlidersHorizontal}
          className="p-2.5 h-[38px]"
        />
      </div>

      {/* Mobile Filters Overlay Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex justify-end no-print">
          <div className="fixed inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)}></div>
          <div className="relative w-80 max-w-sm bg-white dark:bg-gray-800 h-full p-5 flex flex-col justify-between border-l border-gray-100 shadow-xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-bold text-sm text-gray-800">Advanced Filters</h3>
                <button onClick={() => setMobileFiltersOpen(false)} className="p-1 rounded hover:bg-gray-100">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                <Dropdown
                  label="Category"
                  options={[{ value: 'ALL', label: 'All Categories' }, ...COMPLAINT_CATEGORIES.map(c => ({ value: c.id, label: t(c.id) || c.label }))]}
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  emptyOption={null}
                />
                
                <Dropdown
                  label="Status"
                  options={[
                    { value: 'ALL', label: 'All Statuses' },
                    { value: 'PENDING', label: 'Pending' },
                    { value: 'ASSIGNED', label: 'Assigned' },
                    { value: 'IN_PROGRESS', label: 'In Progress' },
                    { value: 'RESOLVED', label: 'Resolved' },
                    { value: 'CLOSED', label: 'Closed' },
                    { value: 'REJECTED', label: 'Rejected' }
                  ]}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  emptyOption={null}
                />

                <Dropdown
                  label="Priority"
                  options={[
                    { value: 'ALL', label: 'All Priorities' },
                    { value: 'LOW', label: 'Low' },
                    { value: 'MEDIUM', label: 'Medium' },
                    { value: 'HIGH', label: 'High' },
                    { value: 'CRITICAL', label: 'Critical' }
                  ]}
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  emptyOption={null}
                />
              </div>
            </div>

            <Button
              variant="primary"
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}

      {/* Render Lists depending on View Mode */}
      {viewMode === 'table' && !loading ? (
        <Table
          headers={['Ticket ID', 'Complaint Title', 'Category', 'Date Filed', 'Priority', 'Status', 'Actions']}
          data={currentData}
          emptyMessage="No complaints match your active filter settings."
          renderRow={(item) => (
            <tr 
              key={item.id} 
              onClick={() => handleRowClick(item.id)} 
              className="hover:bg-gray-50/70 dark:hover:bg-gray-700/20 transition cursor-pointer"
            >
              <td className="px-6 py-4 whitespace-nowrap font-bold text-xs text-primary dark:text-lightgreen">
                {item.id}
              </td>
              <td className="px-6 py-4 max-w-xs truncate font-medium text-xs text-gray-800 dark:text-gray-250">
                {item.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-600 dark:text-gray-300 capitalize">
                {t(item.category) || item.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                {new Date(item.createdDate).toLocaleDateString('en-IN')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <PriorityBadge priority={item.priority} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={item.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-xs font-semibold space-x-1.5" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => handleRowClick(item.id)}
                  className="text-gray-500 hover:text-primary p-1 hover:bg-gray-100 rounded"
                  title="View details"
                >
                  <Eye className="w-4 h-4" />
                </button>
                
                {/* Reopen action triggers only if resolved or closed */}
                {(item.status === 'RESOLVED' || item.status === 'CLOSED') && (
                  <button
                    onClick={(e) => handleReopenTrigger(item, e)}
                    className="text-orange-500 hover:text-orange-600 p-1 hover:bg-orange-50 rounded"
                    title="Reopen Grievance"
                  >
                    <RefreshCcw className="w-4 h-4" />
                  </button>
                )}

                {/* Delete Draft triggers only if PENDING (mocking draft removal) */}
                {item.status === 'PENDING' && (
                  <button
                    onClick={(e) => handleDeleteTrigger(item, e)}
                    className="text-red-500 hover:text-red-650 p-1 hover:bg-red-50 rounded"
                    title="Delete Draft"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </td>
            </tr>
          )}
        />
      ) : viewMode === 'grid' && !loading ? (
        currentData.length === 0 ? (
          <div className="bg-white border border-gray-100 p-10 text-center text-sm text-gray-400 rounded-xl">No complaints matches.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentData.map((item) => (
              <Card 
                key={item.id} 
                onClick={() => handleRowClick(item.id)} 
                className="space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs text-primary">{item.id}</span>
                    <StatusBadge status={item.status} />
                  </div>
                  <h4 className="text-xs font-bold text-gray-800 line-clamp-1">{item.title}</h4>
                  <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">{item.description}</p>
                </div>

                <div className="border-t border-gray-100 pt-3 flex justify-between items-center text-[10px] text-gray-400">
                  <span>Filed: {new Date(item.createdDate).toLocaleDateString()}</span>
                  <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                    {(item.status === 'RESOLVED' || item.status === 'CLOSED') && (
                      <button onClick={e => handleReopenTrigger(item, e)} className="text-orange-500 font-semibold flex items-center gap-0.5 hover:underline">
                        <RefreshCcw className="w-3 h-3" /> Reopen
                      </button>
                    )}
                    {item.status === 'PENDING' && (
                      <button onClick={e => handleDeleteTrigger(item, e)} className="text-red-500 font-semibold flex items-center gap-0.5 hover:underline">
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )
      ) : (
        <div className="space-y-4">
          <div className="h-10 bg-gray-150 rounded w-full animate-pulse"></div>
          <div className="h-32 bg-gray-150 rounded w-full animate-pulse"></div>
        </div>
      )}

      {/* Pagination controls */}
      {!loading && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
        />
      )}

      {/* Delete Draft Confirmation */}
      <ConfirmationDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Complaint Draft?"
        message="Are you sure you want to delete this complaint draft? This action is permanent and cannot be undone."
        confirmText="Delete Draft"
        isLoading={actionLoading}
      />

      {/* Reopen Request Modal */}
      <Modal
        isOpen={reopenModalOpen}
        onClose={() => setReopenModalOpen(false)}
        title="Request Grievance Reopen"
        size="md"
      >
        <form onSubmit={handleReopenSubmit} className="space-y-4">
          <div className="bg-orange-50 border border-orange-200/60 p-3 rounded-lg flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-orange-550 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-orange-800 leading-relaxed font-semibold">
              Reopening a closed grievance requires validation. Please outline exactly why the previous resolution was unsatisfactory (e.g. leaking resumed, officer did not visit).
            </p>
          </div>

          <TextArea
            label="Explain Reopen Reason"
            placeholder="Please detail why the previous resolution was incomplete (minimum 15 characters)..."
            value={reopenComment}
            onChange={(e) => setReopenComment(e.target.value)}
            rows={4}
            required
          />

          <div className="flex justify-end gap-2.5">
            <Button
              variant="outline"
              onClick={() => setReopenModalOpen(false)}
              disabled={actionLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="secondary"
              isLoading={actionLoading}
            >
              Confirm Reopen
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
export default ComplaintHistory;
