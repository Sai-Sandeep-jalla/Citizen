import React, { useState } from 'react';
import { 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  User, 
  ArrowRightLeft, 
  Upload, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Send, 
  Sparkles, 
  ShieldAlert,
  Building2,
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function ComplaintDetailModal({ 
  complaint, 
  onClose, 
  onUpdateStatus, 
  onAddNote, 
  onShiftDepartment,
  onUploadResolution,
  onAcceptReject 
}) {
  const [noteText, setNoteText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(complaint?.status || '');
  const [targetDept, setTargetDept] = useState('');
  const [shiftReason, setShiftReason] = useState('');
  const [showShiftForm, setShowShiftForm] = useState(false);
  const [showOverrideUpload, setShowOverrideUpload] = useState(false);
  const [resolutionNote, setResolutionNote] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');

  if (!complaint) return null;

  const departmentsList = [
    { code: 'REVENUE', label: 'REVENUE' },
    { code: 'VILLAGE', label: 'VILLAGE' },
    { code: 'SCHOOLS', label: 'SCHOOLS' },
    { code: 'HOUSING', label: 'HOUSING' },
    { code: 'LAND', label: 'LAND' },
    { code: 'OTHERS', label: 'OTHERS' },
  ].filter(d => d.code !== complaint.department);

  const handleAddNoteSubmit = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    onAddNote(complaint.id, noteText);
    setNoteText('');
  };

  const handleStatusChangeSubmit = (e) => {
    e.preventDefault();
    onUpdateStatus(complaint.id, selectedStatus);
  };

  const handleShiftSubmit = (e) => {
    e.preventDefault();
    if (!targetDept) return;
    onShiftDepartment(complaint.id, targetDept, shiftReason);
    setShowShiftForm(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFileName(file.name);
    }
  };

  const handleResolutionSubmit = (e) => {
    e.preventDefault();
    if (!uploadedFileName && !resolutionNote) return;
    onUploadResolution(complaint.id, uploadedFileName || 'Resolution_Document_Attached.pdf', resolutionNote);
    setResolutionNote('');
    setUploadedFileName('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      
      {/* Modal Container: Clean White Surface, Deep Blue Header, Vibrant Orange Focal Points */}
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
        
        {/* Deep Blue Header with Orange Ticket Highlight */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 text-white p-4 md:p-5 flex items-center justify-between border-b border-orange-500/50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-500 text-white rounded-xl shadow-md font-mono font-black text-xs">
              TICKET
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono font-black text-lg md:text-xl text-white">
                  {complaint.ticketNo}
                </span>
                <span className="bg-orange-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded shadow-xs uppercase tracking-wider">
                  {complaint.department}
                </span>
                <span className={`text-[10px] font-black px-2.5 py-0.5 rounded shadow-xs uppercase tracking-wider ${
                  complaint.priority === 'High' ? 'bg-red-600 text-white' : complaint.priority === 'Medium' ? 'bg-yellow-400 text-slate-950 font-black' : 'bg-emerald-600 text-white'
                }`}>
                  {complaint.priority || 'Low'} Priority
                </span>
              </div>
              <p className="text-xs text-blue-200 font-medium mt-0.5">
                Registered on: {complaint.registeredDate} | District: <strong className="text-white font-bold">{complaint.district}</strong>
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 text-blue-200 hover:text-white hover:bg-blue-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 md:p-6 space-y-6 overflow-y-auto flex-1">

          {/* Decision Bar */}
          {complaint.status === 'Pending' && (
            <div className="bg-orange-50 border-2 border-orange-300 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-orange-600 shrink-0" />
                <div>
                  <span className="text-xs font-black text-blue-950 uppercase tracking-wider">Pending Initial Review</span>
                  <p className="text-[11px] text-slate-700 font-medium">
                    Accept grievance into department queue or reject with official reasoning.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 shrink-0">
                <button 
                  onClick={() => onAcceptReject(complaint.id, 'Accept')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center space-x-1.5 shadow-sm transition-all"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Accept Grievance</span>
                </button>
                <button 
                  onClick={() => onAcceptReject(complaint.id, 'Reject')}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center space-x-1.5 shadow-sm transition-all"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject</span>
                </button>
              </div>
            </div>
          )}

          {/* Grid: 2 Cols Main Info vs 1 Col Actions & Citizen Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left 2 Cols */}
            <div className="lg:col-span-2 space-y-5">
              
              {/* Title & Description Box */}
              <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-xs">
                <h3 className="text-base font-black text-blue-950 leading-snug mb-2">
                  {complaint.title}
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-3 rounded-xl border border-slate-200 font-medium">
                  {complaint.description}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-orange-500" />
                    <span>Location: {complaint.village}, {complaint.mandal}</span>
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="font-mono text-[11px] text-blue-800 font-bold">
                    GPS: {complaint.latitude}, {complaint.longitude}
                  </span>
                </div>
              </div>

              {/* AI Analysis Box */}
              <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="w-4 h-4 text-orange-500" />
                  <span className="text-xs font-black uppercase text-blue-950 tracking-wider">
                    AI Auto-Analysis & Routing Summary
                  </span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-blue-100 text-xs space-y-1.5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">AI Suggested Category:</span>
                    <strong className="text-blue-900 font-extrabold">{complaint.aiCategory}</strong>
                  </div>
                  <div className="text-slate-700">
                    <span className="text-slate-500">AI Insights: </span>
                    <span className="font-medium">{complaint.aiSummary}</span>
                  </div>
                </div>
              </div>

              {/* Department Shift Form */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <ArrowRightLeft className="w-4 h-4 text-orange-500" />
                    <h4 className="font-extrabold text-xs uppercase text-blue-950">
                      Reassign / Shift to Other Department
                    </h4>
                  </div>
                  <button 
                    onClick={() => setShowShiftForm(!showShiftForm)}
                    className="text-xs font-extrabold text-orange-600 hover:text-orange-700 underline"
                  >
                    {showShiftForm ? 'Close Form' : 'Shift Department'}
                  </button>
                </div>

                {showShiftForm && (
                  <form onSubmit={handleShiftSubmit} className="mt-3 bg-orange-50 p-3.5 rounded-xl border border-orange-200 space-y-3">
                    <p className="text-[11px] text-slate-700 font-medium">
                      Select target department to route case directly to their work queue.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                          Target Department
                        </label>
                        <select 
                          required
                          value={targetDept}
                          onChange={(e) => setTargetDept(e.target.value)}
                          className="w-full bg-white border border-slate-300 text-xs rounded-xl p-2 font-bold text-blue-950"
                        >
                          <option value="">Select Target...</option>
                          {departmentsList.map(d => (
                            <option key={d.code} value={d.code}>{d.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                          Transfer Reason
                        </label>
                        <input 
                          type="text"
                          required
                          placeholder="Reason for shifting..."
                          value={shiftReason}
                          onChange={(e) => setShiftReason(e.target.value)}
                          className="w-full bg-white border border-slate-300 text-xs rounded-xl p-2"
                        />
                      </div>
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs py-2 rounded-xl transition-colors shadow-sm"
                    >
                      Confirm Shift
                    </button>
                  </form>
                )}
              </div>

              {/* Official Resolution Proof & Inspection Status */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-blue-700" />
                    <h4 className="font-extrabold text-xs uppercase text-blue-950">
                      Official Resolution Proof & Inspection Status
                    </h4>
                  </div>
                  {!complaint.resolutionProof && (
                    <button 
                      onClick={() => setShowOverrideUpload(!showOverrideUpload)}
                      className="text-[11px] font-bold text-orange-600 hover:text-orange-700 underline"
                    >
                      {showOverrideUpload ? 'Cancel Override' : 'Admin Upload Override'}
                    </button>
                  )}
                </div>

                {complaint.resolutionProof ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-emerald-900 font-bold space-x-1.5">
                        <CheckCircle className="w-4.5 h-4.5 text-emerald-600" />
                        <span>Field Resolution Document Attached</span>
                      </div>
                      <span className="bg-emerald-200/60 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                        Verified
                      </span>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-emerald-100 space-y-1">
                      <p className="text-slate-700 font-mono text-[11px] font-semibold flex items-center space-x-1">
                        <FileText className="w-3.5 h-3.5 text-slate-500" />
                        <span>Document: {complaint.resolutionProof.documentName}</span>
                      </p>
                      <p className="text-[10px] text-slate-500">
                        Uploaded on: {complaint.resolutionProof.uploadedAt || 'Recently'}
                      </p>
                      <p className="text-slate-800 italic font-medium pt-1 text-[11px] border-t border-slate-100">
                        "{complaint.resolutionProof.notes}"
                      </p>
                    </div>
                  </div>
                ) : showOverrideUpload ? (
                  <form onSubmit={handleResolutionSubmit} className="space-y-3 bg-orange-50/50 p-3 rounded-xl border border-orange-200">
                    <p className="text-[11px] text-orange-950 font-bold">
                      Admin Override: Upload inspection report or proof on behalf of assigned department officer.
                    </p>
                    <div className="border-2 border-dashed border-orange-200 hover:border-orange-500 rounded-xl p-3 text-center cursor-pointer bg-white transition-colors relative">
                      <input 
                        type="file" 
                        accept="image/*,.pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <Upload className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                      <span className="text-xs font-bold text-blue-950 block">
                        {uploadedFileName ? `Attached: ${uploadedFileName}` : 'Select inspection photo or PDF'}
                      </span>
                      <span className="text-[10px] text-slate-400">JPG, PNG, PDF up to 10MB</span>
                    </div>

                    <input 
                      type="text"
                      placeholder="Admin notes on resolution proof..."
                      value={resolutionNote}
                      onChange={(e) => setResolutionNote(e.target.value)}
                      className="w-full bg-white border border-slate-300 text-xs rounded-xl p-2.5"
                    />

                    <button 
                      type="submit"
                      disabled={!uploadedFileName && !resolutionNote}
                      className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold text-xs py-2 rounded-xl transition-all shadow-sm"
                    >
                      Upload & Save Resolution Proof
                    </button>
                  </form>
                ) : (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-extrabold text-blue-950 block">
                        Awaiting Field Officer Resolution Proof
                      </span>
                      <p className="text-slate-600 text-[11px] mt-0.5 leading-relaxed font-medium">
                        Inspection reports and resolution media will be uploaded by the assigned field officer upon completing site action.
                      </p>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: Applicant & Actions (Orange Action Highlights) */}
            <div className="space-y-5">
              
              {/* Applicant Card with Bright Orange Call Person Action */}
              <div className="bg-gradient-to-br from-blue-950 to-blue-900 text-white p-4 rounded-xl shadow-md border border-blue-800">
                <div className="flex items-center space-x-2 text-orange-400 font-extrabold text-xs uppercase tracking-wider mb-3">
                  <User className="w-4 h-4 text-orange-400" />
                  <span>Applicant Contact Info</span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div>
                    <span className="text-blue-300 text-[10px] uppercase font-bold block">Full Name</span>
                    <strong className="text-base text-white">{complaint.citizen.name}</strong>
                  </div>

                  <div>
                    <span className="text-blue-300 text-[10px] uppercase font-bold block">Mobile Phone</span>
                    <span className="font-mono text-white text-xs">{complaint.citizen.mobile}</span>
                  </div>

                  <div>
                    <span className="text-blue-300 text-[10px] uppercase font-bold block">Address</span>
                    <span className="text-blue-100 text-[11px] leading-tight block">{complaint.citizen.address}</span>
                  </div>

                  {/* Highlighted Orange Call Trigger */}
                  <div className="pt-3 border-t border-blue-800 flex items-center space-x-2">
                    <a 
                      href={`tel:${complaint.citizen.mobile.replace(/\s+/g, '')}`}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-extrabold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-md transition-all"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call Citizen Person</span>
                    </a>
                    <a 
                      href={`mailto:${complaint.citizen.email}`}
                      className="bg-blue-800 hover:bg-blue-700 text-white p-2.5 rounded-xl transition-colors"
                      title="Send Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Status Update Select Box */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <h4 className="font-extrabold text-xs uppercase text-blue-950 mb-2">
                  Update Official Case Status
                </h4>
                <form onSubmit={handleStatusChangeSubmit} className="space-y-3">
                  <select 
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full bg-white border border-slate-300 text-xs rounded-xl p-2.5 font-bold text-blue-950 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  >
                    <option value="Pending">Pending Review</option>
                    <option value="Assigned">Assigned to Officer</option>
                    <option value="In Progress">In Progress / Field Work</option>
                    <option value="Resolved">Resolved (Proof Uploaded)</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Closed">Closed</option>
                  </select>

                  <button 
                    type="submit"
                    className="w-full bg-blue-950 hover:bg-blue-900 text-white font-extrabold text-xs py-2.5 rounded-xl transition-colors shadow-sm"
                  >
                    Apply Status Change
                  </button>
                </form>
              </div>

              {/* Remarks & Internal Timeline */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 shadow-xs">
                <h4 className="font-extrabold text-xs uppercase text-blue-950 flex items-center space-x-1.5">
                  <FileText className="w-4 h-4 text-orange-500" />
                  <span>Internal Notes & Remarks Log</span>
                </h4>

                <form onSubmit={handleAddNoteSubmit} className="flex space-x-2">
                  <input 
                    type="text"
                    required
                    placeholder="Official remark..."
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-300 text-xs rounded-xl px-3 py-2"
                  />
                  <button 
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-xl transition-colors shadow-sm shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                {/* Audit Timeline */}
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {complaint.history.map((log) => (
                    <div key={log.id} className="bg-blue-50/50 p-2.5 rounded-xl border border-blue-100 text-[11px] space-y-1">
                      <div className="flex items-center justify-between text-slate-500 font-medium">
                        <span className="font-bold text-blue-900">{log.changedBy}</span>
                        <span className="text-[10px] font-mono">{log.timestamp}</span>
                      </div>
                      <div className="text-slate-800 font-medium">
                        Action: <strong className="text-orange-600">{log.action}</strong>
                      </div>
                      {log.remarks && (
                        <p className="text-slate-600 italic text-[10px]">
                          "{log.remarks}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs">
          <span className="text-slate-500 font-medium">
            Ticket ID: <strong className="text-blue-950 font-mono">{complaint.id}</strong>
          </span>
          <button 
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-4 py-2 rounded-xl transition-colors"
          >
            Close Inspector Window
          </button>
        </div>

      </div>

    </div>
  );
}
