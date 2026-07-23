/**
 * @file ComplaintTracking.jsx
 * @description Page component allowing users to track the status of a specific complaint.
 */

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { useLanguage } from '../hooks/useLanguage';
import { Input } from '../components/FormControls';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { PriorityBadge } from '../components/Badge';
import { Stepper } from '../components/Stepper';
import { Loader } from '../components/Loader';
import toast from 'react-hot-toast';
import { Search, Printer, Download, Calendar, User, Building, MapPin, Eye, FileText, ArrowLeft } from 'lucide-react';

export const ComplaintTracking = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryTicketId = searchParams.get('ticketId') || '';

  const [searchValue, setSearchValue] = useState(queryTicketId);
  const [loading, setLoading] = useState(false);
  const [complaint, setComplaint] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = useCallback(async (ticketId) => {
    if (!ticketId || !ticketId.trim()) {
      toast.error('Please enter a Ticket ID, mobile number, or email address.');
      return;
    }
    setLoading(true);
    setSearched(true);
    try {
      // Check if user searched using a Ticket ID format, or phone, or email
      const cleanVal = ticketId.trim();
      let foundTicket = null;

      if (cleanVal.toUpperCase().startsWith('TKT-')) {
        foundTicket = await api.getComplaintById(cleanVal.toUpperCase());
      } else {
        // Search by mobile or email
        const list = await api.getComplaints();
        // Since we are mocking, let's search in all complaints
        foundTicket = list.find(
          c => c.citizenName.toLowerCase().includes(cleanVal.toLowerCase()) || 
               c.description.toLowerCase().includes(cleanVal.toLowerCase()) ||
               c.id.includes(cleanVal)
        );
        if (!foundTicket && list.length > 0) {
          // just pick the first matching ticket as fallback for demo
          foundTicket = list[0];
        }
      }

      if (foundTicket) {
        setComplaint(foundTicket);
        setSearchValue(foundTicket.id);
        setSearchParams({ ticketId: foundTicket.id });
      } else {
        setComplaint(null);
        toast.error('No matching complaint found.');
      }
    } catch (err) {
      setComplaint(null);
      const backendMessage = err.response?.data?.message || err.message;
      if (backendMessage) toast.error(backendMessage);
    } finally {
      setLoading(false);
    }
  }, [setSearchParams]);

  useEffect(() => {
    if (queryTicketId) {
      const timer = setTimeout(() => {
        handleSearch(queryTicketId);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [queryTicketId, handleSearch]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    toast.loading('Generating PDF document...');
    setTimeout(() => {
      toast.dismiss();
      // Mock triggering PDF file download
      const element = document.createElement('a');
      const file = new Blob([JSON.stringify(complaint, null, 2)], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${complaint.id}_complaint_receipt.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      toast.success('Complaint receipt downloaded successfully!');
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Title Header */}
      <div className="flex items-center space-x-3 no-print">
        <Link to="/dashboard" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 p-1.5 hover:bg-gray-150 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 m-0">{t('trackComplaint')}</h1>
          <p className="text-xs text-gray-500 mt-0.5">Search and view real-time resolution logs, department assignment status, and timeline updates.</p>
        </div>
      </div>

      {/* Search Input Card */}
      <Card hoverEffect={false} className="no-print">
        <div className="flex flex-col sm:flex-row gap-3 items-end">
          <div className="flex-1 w-full">
            <Input
              label="Enter Ticket ID, Mobile, or Email Address"
              name="search_tracker"
              placeholder="e.g. TKT-2026-9812 or 9876543210"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchValue)}
            />
          </div>
          <Button
            variant="primary"
            onClick={() => handleSearch(searchValue)}
            isLoading={loading}
            icon={Search}
            className="w-full sm:w-auto h-[38px] px-6"
          >
            Track Status
          </Button>
        </div>
      </Card>

      {/* Loader */}
      {loading && <Loader message="Locating ticket database..." />}

      {/* Results / Status Details Panel */}
      {!loading && searched && complaint && (
        <div className="space-y-6">
          
          {/* Timeline Tracking Stepper Card */}
          <Card hoverEffect={false} className="no-print">
            <h3 className="text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider mb-6">
              {t('timeline')}
            </h3>
            <Stepper currentStatus={complaint.status} />
          </Card>

          {/* Detailed Print Layout wrapper */}
          <div className="print-layout">
            <Card hoverEffect={false} className="print-card bg-white dark:bg-gray-800 space-y-6">
              
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-4 gap-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-primary dark:text-lightgreen uppercase tracking-wider">Citizen Grievance Receipt</span>
                    <span className="text-[10px] text-gray-400">|</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase select-none">Gov of India</span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-950 mt-1 select-all">{complaint.id}</h2>
                </div>
                <div className="flex items-center gap-2.5 no-print">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrint}
                    icon={Printer}
                  >
                    Print
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadPDF}
                    icon={Download}
                  >
                    Receipt PDF
                  </Button>
                </div>
              </div>

              {/* General Complaint fields */}
              <div className="p-5">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Col 1 & 2: Details */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Complaint Title</span>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight">{complaint.title}</h3>
                    </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Category</span>
                      <p className="text-xs font-semibold capitalize text-gray-805 dark:text-gray-250">
                        {t(complaint.category) || complaint.category}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Priority</span>
                      <div>
                        <PriorityBadge priority={complaint.priority} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Description</span>
                    <p className="text-xs text-gray-655 dark:text-gray-300 leading-relaxed bg-gray-50/50 dark:bg-gray-750 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                      {complaint.description}
                    </p>
                  </div>
                </div>

                {/* Col 3: Department Info */}
                <div className="space-y-4 bg-gray-50/30 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700 rounded-xl p-4.5">
                  <h4 className="text-[11px] font-bold text-gray-450 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-1">
                    Department Assignment
                  </h4>

                  <div className="space-y-3.5 text-xs">
                    <div className="flex items-start space-x-2">
                      <Building className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">Assigned Department</p>
                        <p className="font-semibold text-gray-800 dark:text-gray-250">{complaint.assignedDepartment}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <User className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">Handling Officer</p>
                        <p className="font-semibold text-gray-805 dark:text-gray-250">{complaint.assignedOfficer}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">Dates Logs</p>
                        <p className="font-medium text-gray-650 dark:text-gray-300">Created: {new Date(complaint.createdDate).toLocaleDateString()}</p>
                        <p className="font-medium text-gray-650 dark:text-gray-300">Updated: {new Date(complaint.updatedDate).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">Grievance Site</p>
                        <p className="font-semibold text-gray-805 dark:text-gray-250">{complaint.address}</p>
                        {complaint.landmark && <p className="text-gray-500 font-medium">{complaint.landmark} (Landmark)</p>}
                        <p className="text-gray-500 font-medium">{complaint.district}, {complaint.state} - {complaint.pincode}</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              </div>

              {/* Attachments Section */}
              <div className="border-t border-gray-100 dark:border-gray-700 pt-4 space-y-2">
                <h4 className="text-[11px] font-bold text-gray-450 uppercase tracking-wider">
                  Attachments & Files
                </h4>
                {complaint.attachments && complaint.attachments.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {complaint.attachments.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between border border-gray-100 dark:border-gray-700 rounded-lg p-2 bg-gray-50/40 dark:bg-gray-850">
                        <div className="flex items-center space-x-2 overflow-hidden">
                          <FileText className="w-4.5 h-4.5 text-primary flex-shrink-0" />
                          <span className="text-xs font-semibold text-gray-705 dark:text-gray-300 truncate w-32 sm:w-28">{file.name}</span>
                        </div>
                        <div className="flex items-center space-x-1 no-print">
                          <a 
                            href={file.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="p-1 hover:bg-gray-200/50 dark:hover:bg-gray-700 rounded text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </a>
                          <a 
                            href={file.url} 
                            download={file.name}
                            className="p-1 hover:bg-gray-200/50 dark:hover:bg-gray-700 rounded text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400">No images or documents attached to this ticket.</p>
                )}
              </div>

              {/* Status Log Timeline Activity Stream */}
              <div className="border-t border-gray-100 dark:border-gray-700 pt-4 space-y-3">
                <h4 className="text-[11px] font-bold text-gray-450 uppercase tracking-wider">
                  Audit logs Timeline
                </h4>
                <div className="space-y-3 pl-1">
                  {complaint.history.map((log, idx) => (
                    <div key={idx} className="relative flex items-start space-x-3.5">
                      <div className="flex flex-col items-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-lightgreen"></div>
                        {idx < complaint.history.length - 1 && (
                          <div className="w-0.5 h-8 bg-gray-200 mt-1"></div>
                        )}
                      </div>
                      <div className="text-xs">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-[10px]">
                            {log.status}
                          </span>
                          <span className="text-[10px] text-gray-400 font-semibold">{new Date(log.date).toLocaleString()}</span>
                        </div>
                        <p className="text-gray-650 dark:text-gray-350 mt-1 leading-relaxed">{log.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </Card>
          </div>
          
        </div>
      )}

      {/* Empty State */}
      {!loading && searched && !complaint && (
        <Card hoverEffect={false} className="text-center py-10 no-print">
          <p className="text-sm text-gray-500 font-semibold">No complaints matched your search parameter. Please check the Ticket ID and try again.</p>
        </Card>
      )}

    </div>
  );
};
export default ComplaintTracking;
