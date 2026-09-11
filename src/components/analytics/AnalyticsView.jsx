import React from 'react';
import { BarChart3, TrendingUp, AlertOctagon, Layers } from 'lucide-react';

const AnalyticsView = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 text-center shadow-2xs">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#00a8e7] to-[#1877f2] text-white mx-auto flex items-center justify-center shadow-lg shadow-[#00a8e7]/25 mb-4">
          <BarChart3 className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">
          Loss Prevention & Goods Security Analytics
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto mt-2 leading-relaxed">
          Comprehensive analysis of EPC tag movements, gate trigger anomalies, and shrink prevention insights.
        </p>

        {/* Quick placeholder cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-left">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="flex items-center gap-2 text-[#00a8e7] mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Theft Rate Trend</span>
            </div>
            <p className="text-xl font-black text-slate-900">-12.5%</p>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">Decreased vs previous period</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="flex items-center gap-2 text-rose-500 mb-1">
              <AlertOctagon className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">High Risk Zones</span>
            </div>
            <p className="text-xl font-black text-slate-900">Main Exit Gate</p>
            <p className="text-[11px] text-slate-400 mt-1">18 incidents detected</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="flex items-center gap-2 text-indigo-500 mb-1">
              <Layers className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Tag Compliance</span>
            </div>
            <p className="text-xl font-black text-slate-900">98.4%</p>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">Optimal coverage</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
