import React from 'react';
import { LayoutDashboard, Tag, ShoppingBag, AlertTriangle, ShieldCheck } from 'lucide-react';

const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 text-center shadow-2xs">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#00a8e7] to-[#1877f2] text-white mx-auto flex items-center justify-center shadow-lg shadow-[#00a8e7]/25 mb-4">
          <LayoutDashboard className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">
          Loss Prevention & Goods Security Dashboard
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto mt-2 leading-relaxed">
          Real-time tracking for checkout tags, untagged items, and store theft prevention metrics.
        </p>

        {/* Quick placeholder cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 text-left">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="flex items-center gap-2 text-[#00a8e7] mb-1">
              <Tag className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total EPC Tags</span>
            </div>
            <p className="text-xl font-black text-slate-900">12,568</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="flex items-center gap-2 text-emerald-500 mb-1">
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Checked Out</span>
            </div>
            <p className="text-xl font-black text-slate-900">8,234</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="flex items-center gap-2 text-amber-500 mb-1">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Untagged Items</span>
            </div>
            <p className="text-xl font-black text-slate-900">315</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="flex items-center gap-2 text-rose-500 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Theft Incidents</span>
            </div>
            <p className="text-xl font-black text-slate-900">27</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
