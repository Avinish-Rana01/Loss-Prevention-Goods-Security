import React from 'react';
import { BarChart3 } from 'lucide-react';
import { CATEGORY_LOSS_DATA } from '../../data/mockAnalyticsData';

/**
 * CategoryWiseLoss Component
 * Displays horizontal bar breakdown of losses across retail merchandise categories.
 */
export default function CategoryWiseLoss({
  categories = CATEGORY_LOSS_DATA,
  className = '',
}) {
  const maxCount = Math.max(...categories.map((c) => c.lossCount), 1);

  return (
    <div
      className={`bg-white border-2 border-sky-200/70 rounded-2xl overflow-hidden shadow-xs flex flex-col transition-all hover:shadow-sm ${className}`}
    >
      {/* 1. Creative Header Banner (Matching DashboardOverview Theme) */}
      <div className="bg-gradient-to-r from-sky-50 via-sky-50/60 to-white px-3.5 py-2.5 border-b border-sky-100 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-[#00a8e7] text-white flex items-center justify-center shadow-xs shadow-sky-500/25 shrink-0">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0084b6] block leading-none mb-0.5">
              Merchandise Breakdown
            </span>
            <h3 className="text-xs sm:text-[13px] font-bold text-slate-900 tracking-tight truncate leading-tight">
              Category Wise Loss
            </h3>
          </div>
        </div>

        {/* Count Badge on Right Side */}
        <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-sky-100 text-[#006e96] border border-sky-200 shrink-0 shadow-2xs">
          {categories.length} Categories
        </span>
      </div>

      {/* 2. Compact Full-Width Progress Bars List */}
      <div className="p-3 sm:p-3.5 flex flex-col gap-2.5 flex-1 justify-center bg-slate-50/20">
        {categories.map((item) => {
          const widthPercent = (item.lossCount / maxCount) * 100;

          return (
            <div key={item.category} className="group flex flex-col gap-1">
              {/* Line 1: Name on Left, Count on Right (Small Crisp Font) */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span
                    className="w-2 h-2 rounded-full shrink-0 shadow-2xs"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-semibold text-slate-800 text-xs truncate">
                    {item.category}
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0 text-xs">
                  <span className="font-bold text-slate-900">
                    {item.lossCount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] font-normal text-slate-400">
                    items
                  </span>
                </div>
              </div>

              {/* Line 2: Compact Full-Width Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-1.5 sm:h-2 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out shadow-2xs"
                  style={{
                    width: `${widthPercent}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
