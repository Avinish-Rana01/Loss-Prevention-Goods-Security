import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { TOP_STOLEN_ITEMS_DATA } from '../../data/mockAnalyticsData';

/**
 * TopStolenData Component
 * Displays top stolen merchandise articles and their theft counts.
 * Features full-width progress bars with article number clearly displayed below the bar.
 */
export default function TopStolenData({
  items = TOP_STOLEN_ITEMS_DATA,
  className = '',
}) {
  const maxTheftCount = Math.max(...items.map((i) => i.theftCount), 1);
  const totalThefts = items.reduce((sum, i) => sum + i.theftCount, 0);

  return (
    <div
      className={`bg-white border-2 border-rose-200/80 rounded-2xl overflow-hidden shadow-xs flex flex-col transition-all hover:shadow-sm ${className}`}
    >
      {/* 1. Creative Header Banner (Matching DashboardOverview Theme) */}
      <div className="bg-gradient-to-r from-rose-50 via-rose-50/60 to-white px-3.5 py-2.5 border-b border-rose-100 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-xs shadow-rose-500/25 shrink-0">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block leading-none mb-0.5">
              High Incident Targets
            </span>
            <h3 className="text-xs sm:text-[13px] font-bold text-slate-900 tracking-tight truncate leading-tight">
              Top 5 Stolen Items
            </h3>
          </div>
        </div>

        {/* Count Badge on Right Side with Live Pulsing Dot */}
        <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1.5 shrink-0 shadow-2xs">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500"></span>
          </span>
          {items.length} Articles · {totalThefts} Thefts
        </span>
      </div>

      {/* 2. Compact Full-Width Progress Bar Items (Multi-column when wide) */}
      <div className="p-3 sm:p-3.5 bg-slate-50/20 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5">
          {items.map((item) => {
            const widthPercent = (item.theftCount / maxTheftCount) * 100;

            return (
              <div key={item.articleNumber} className="group flex flex-col gap-1">
                {/* Line 1: Item Description on Left, Theft Count on Right */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span
                      className="w-2 h-2 rounded-full shrink-0 shadow-2xs"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-semibold text-slate-800 text-xs truncate">
                      {item.itemDescription}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 text-xs">
                    <span className="font-bold text-rose-600">
                      {item.theftCount}
                    </span>
                    <span className="text-[10px] font-medium text-slate-500">
                      {item.theftCount === 1 ? 'theft' : 'thefts'}
                    </span>
                  </div>
                </div>

                {/* Line 2: Full-Width Progress Bar */}
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out shadow-2xs"
                    style={{
                      width: `${widthPercent}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>

                {/* Line 3: Article Number below progress bar on Left, Loss Value on Right */}
                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5">
                  <div className="flex items-center gap-1">
                    <span className="text-slate-400 font-medium">Article No:</span>
                    <span className="font-mono font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200/70 text-[9.5px]">
                      {item.articleNumber}
                    </span>
                  </div>

                  <div className="font-medium text-slate-500">
                    Loss: <span className="font-bold text-slate-900 text-[10.5px]">₹{item.lossValue.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

