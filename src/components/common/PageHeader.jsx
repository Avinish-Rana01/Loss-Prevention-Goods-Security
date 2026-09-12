import React from 'react';
import { useLocation } from 'react-router-dom';

export default function PageHeader({
  title,
  subtitle,
  children,
  className = '',
}) {
  const location = useLocation();

  // Auto-detect page title if not explicitly provided
  const getPageTitle = () => {
    if (title) return title;
    const path = (location?.pathname || '').toLowerCase();
    if (path.includes('analytics')) return 'Analytics';
    if (path.includes('reports')) return 'Reports';
    return 'Dashboard';
  };

  const displayTitle = getPageTitle();

  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-slate-200/80 ${className}`}
    >
      {/* 1. Left Side: Page Title with Accent Left Border Design */}
      <div className="flex items-center">
        <div className="border-l-4 border-[#00a8e7] pl-3 py-0.5">
          <h1 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-tight">
            {displayTitle}
          </h1>
          {subtitle && (
            <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-none">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* 2. Right Side: Filters / Actions Slot */}
      {children && (
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 ml-auto">
          {children}
        </div>
      )}
    </div>
  );
}
