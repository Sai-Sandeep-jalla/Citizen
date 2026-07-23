/**
 * @file Reports.jsx
 * @description Tab for Officer Dashboard allowing generation and viewing of department performance reports.
 */

import { useState } from 'react';
import { Download, Calendar, Filter, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

export const Reports = () => {
  const [dateRange, setDateRange] = useState('This Month');
  const [reportType, setReportType] = useState('SLA Compliance');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    // Mocking a delay for report generation
    setTimeout(() => {
      setIsGenerating(false);
      toast.success(`${reportType} report generated successfully!`);
      // In a real scenario, this might trigger a file download blob from the backend
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Report Generator Control Panel */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-end">
        <div className="w-full md:w-1/3 space-y-1.5">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Report Type</label>
          <div className="relative">
            <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select 
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="SLA Compliance">SLA Compliance Report</option>
              <option value="Category Breakdown">Category Breakdown Report</option>
              <option value="Staff Performance">Staff Performance Report</option>
              <option value="Monthly Overview">Monthly Overview</option>
            </select>
          </div>
        </div>

        <div className="w-full md:w-1/3 space-y-1.5">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Date Range</label>
          <div className="relative">
            <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="Today">Today</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
              <option value="Last 3 Months">Last 3 Months</option>
              <option value="This Year">This Year</option>
            </select>
          </div>
        </div>

        <div className="w-full md:w-auto mt-4 md:mt-0 ml-auto">
          <button 
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className={`w-full flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
              isGenerating 
                ? 'bg-blue-400 text-white cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-[0.98]'
            }`}
          >
            {isGenerating ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>{isGenerating ? 'Generating...' : 'Download PDF'}</span>
          </button>
        </div>
      </div>

      {/* Report Preview / Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-100 shadow-sm">
          <h4 className="text-[10px] font-black text-green-700 uppercase tracking-widest">SLA Maintained</h4>
          <p className="text-3xl font-black text-green-900 mt-2">84%</p>
          <p className="text-[10px] font-semibold text-green-600 mt-1">+2% from last month</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-5 border border-red-100 shadow-sm">
          <h4 className="text-[10px] font-black text-red-700 uppercase tracking-widest">SLA Breached</h4>
          <p className="text-3xl font-black text-red-900 mt-2">16%</p>
          <p className="text-[10px] font-semibold text-red-600 mt-1">-2% from last month</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100 shadow-sm">
          <h4 className="text-[10px] font-black text-blue-700 uppercase tracking-widest">Avg. Resolution Time</h4>
          <p className="text-3xl font-black text-blue-900 mt-2">4.2 <span className="text-sm">Days</span></p>
          <p className="text-[10px] font-semibold text-blue-600 mt-1">Target is &lt; 5 Days</p>
        </div>
      </div>

      {/* Recent Generated Reports Table */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-gray-100">
         <h3 className="text-sm font-black text-gray-900 mb-4">Recently Generated Reports</h3>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">Report Name</th>
                  <th className="py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">Generated On</th>
                  <th className="py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">Type</th>
                  <th className="py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((item) => (
                  <tr key={item} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 text-xs font-semibold text-gray-800 flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-blue-500" />
                      <span>Dept_Performance_Jul{item}.pdf</span>
                    </td>
                    <td className="py-3 text-[10px] text-gray-500 font-medium">2026-07-{20 - item}</td>
                    <td className="py-3 text-[10px] text-gray-500 font-medium uppercase">PDF Document</td>
                    <td className="py-3 text-right">
                      <button className="text-[10px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-wider">
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default Reports;
