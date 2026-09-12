import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Info } from 'lucide-react';
import { formatDate } from '../../utils/filterConstants';

/**
 * CurrentDateOption Component
 * Renders the active current date indicator/option for views (like DashboardOverview)
 * that specifically show real-time records for the current date only.
 */
export default function CurrentDateOption({
  date,
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);

  const currentDateObj = date ? new Date(date) : new Date();
  const formattedDate = formatDate(currentDateObj);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={popoverRef} className={`relative inline-block ${className}`}>
      {/* Current Date Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="h-8.5 px-3 bg-white border border-slate-200/90 hover:border-slate-300 rounded-lg flex items-center gap-2 text-xs font-medium text-slate-700 shadow-2xs transition-all cursor-pointer select-none"
        aria-label={`Current date: ${formattedDate}`}
        title="Dashboard overview displays real-time records for the current date only"
      >
        <Calendar className="w-3.5 h-3.5 text-[#00a8e7] shrink-0" />
        <span className="font-semibold text-slate-800 tracking-tight">{formattedDate}</span>
        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#007ba8] bg-sky-50 border border-sky-200/80 px-1.5 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00a8e7] animate-pulse" />
          Today
        </span>
      </button>

      {/* Context Popover Explaining Current Date Scope */}
      {isOpen && (
        <div className="absolute right-0 sm:left-0 mt-1.5 w-64 bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-[#00a8e7] flex items-center justify-center shrink-0">
              <Info className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">Current Date</p>
              <p className="text-[10.5px] text-slate-500">{formattedDate} (Live)</p>
            </div>
          </div>
          <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
            The Dashboard Overview monitors real-time events for the <strong>current date only</strong>.
          </p>
          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10.5px]">
            <span className="text-slate-400 font-medium">Locked to Today</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-[#00a8e7] font-semibold hover:underline cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
