import React from 'react';
import { FileText, Download, Clock, Calendar } from 'lucide-react';

const ReportsView = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 text-center shadow-2xs">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#00a8e7] to-[#1877f2] text-white mx-auto flex items-center justify-center shadow-lg shadow-[#00a8e7]/25 mb-4">
          <FileText className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">
          Loss Prevention & Goods Security Reports
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto mt-2 leading-relaxed">
          Generate, schedule, and export comprehensive daily, weekly, and hourly loss prevention reports.
        </p>

        {/* Quick report generation cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-left">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#00a8e7] mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Hourly Log Report</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Granular EPC readings and gate alarms per hour.</p>
            </div>
            <button
              type="button"
              className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#00a8e7] bg-[#00a8e7]/10 hover:bg-[#00a8e7]/15 rounded-lg transition-colors cursor-pointer w-fit"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-indigo-500 mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Daily Summary Report</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Daily aggregated store shrinkage and checkout counts.</p>
            </div>
            <button
              type="button"
              className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer w-fit"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export PDF</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-500 mb-1">
                <FileText className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Weekly Audit Report</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Store compliance and inventory discrepancy audit.</p>
            </div>
            <button
              type="button"
              className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer w-fit"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export XLSX</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsView;
