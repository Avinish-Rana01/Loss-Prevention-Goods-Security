import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar, ChevronDown, Check, RotateCcw } from 'lucide-react';
import { DATE_PRESETS, formatDate } from '../../utils/filterConstants';

/**
 * DateFilter Component
 * Standalone, reusable dropdown component for date preset and custom range selection.
 */
export default function DateFilter({
  selectedDate: controlledDate,
  defaultDate = 'Today',
  onDateChange,
  className = '',
}) {
  const [internalDate, setInternalDate] = useState(defaultDate);
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  const dropdownRef = useRef(null);

  const currentDateLabel = controlledDate !== undefined ? controlledDate : internalDate;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Preset Selection Handler
  const handleSelectPreset = (preset) => {
    const today = new Date();
    let start = new Date();
    let end = new Date();

    if (preset === 'Today') {
      start = today;
      end = today;
    } else if (preset === 'Yesterday') {
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      start = yesterday;
      end = yesterday;
    } else if (preset === 'Last 7 Days') {
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 6);
      start = sevenDaysAgo;
      end = today;
    } else if (preset === 'This Month') {
      start = new Date(today.getFullYear(), today.getMonth(), 1);
      end = today;
    } else if (preset === 'Last 30 Days') {
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(today.getDate() - 29);
      start = thirtyDaysAgo;
      end = today;
    }

    setDateRange([start, end]);
    if (controlledDate === undefined) {
      setInternalDate(preset);
    }
    setIsOpen(false);

    if (onDateChange) {
      onDateChange(preset, { startDate: start, endDate: end, preset });
    }
  };

  // React DatePicker Range Change Handler
  const handleDatePickerChange = (update) => {
    const [start, end] = update;
    setDateRange([start, end]);

    // If both dates in range are selected, automatically apply
    if (start && end) {
      const formatted = `${formatDate(start)} - ${formatDate(end)}`;
      if (controlledDate === undefined) {
        setInternalDate(formatted);
      }
      setIsOpen(false);

      if (onDateChange) {
        onDateChange(formatted, { startDate: start, endDate: end });
      }
    }
  };

  // Manual Apply for single or custom selection
  const handleApplyRange = () => {
    if (!startDate) return;
    const formatted = endDate
      ? `${formatDate(startDate)} - ${formatDate(endDate)}`
      : formatDate(startDate);

    if (controlledDate === undefined) {
      setInternalDate(formatted);
    }
    setIsOpen(false);

    if (onDateChange) {
      onDateChange(formatted, { startDate, endDate: endDate || startDate });
    }
  };

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      {/* Date Range Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="h-8.5 px-3 bg-white border border-slate-200/90 hover:border-slate-300 rounded-lg flex items-center gap-2 text-xs font-medium text-slate-700 shadow-2xs transition-all cursor-pointer"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <Calendar className="w-3.5 h-3.5 text-[#00a8e7] shrink-0" />
        <span>{currentDateLabel}</span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
      </button>

      {/* React DatePicker Popover */}
      {isOpen && (
        <div className="absolute right-0 mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-150 overflow-hidden flex flex-col sm:flex-row min-w-[320px] sm:min-w-[420px]">
          {/* Presets Sidebar */}
          <div className="w-full sm:w-36 border-b sm:border-b-0 sm:border-r border-slate-100 bg-slate-50/70 p-2 flex flex-row sm:flex-col gap-1 overflow-x-auto sm:overflow-x-visible shrink-0">
            <p className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 hidden sm:block">
              Presets
            </p>
            {DATE_PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`text-left px-2.5 py-1.5 text-xs rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer flex items-center justify-between ${
                  currentDateLabel === preset
                    ? 'bg-[#00a8e7] text-white font-semibold shadow-xs'
                    : 'text-slate-700 hover:bg-slate-200/70'
                }`}
              >
                <span>{preset}</span>
                {currentDateLabel === preset && (
                  <Check className="w-3 h-3 text-white shrink-0 hidden sm:block" />
                )}
              </button>
            ))}
          </div>

          {/* React DatePicker Inline Calendar */}
          <div className="p-3 flex flex-col flex-1 min-w-[270px]">
            <div className="w-full flex items-center justify-between pb-2 mb-1 border-b border-slate-100 text-xs text-slate-600">
              <span className="font-semibold text-slate-800 text-[11.5px]">Select Custom Range</span>
              <button
                type="button"
                onClick={() => handleSelectPreset('Today')}
                className="text-[#00a8e7] hover:underline flex items-center gap-1 text-[11px] font-medium cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Today
              </button>
            </div>

            <div className="w-full flex justify-center py-1">
              <DatePicker
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={handleDatePickerChange}
                inline
                maxDate={new Date()}
              />
            </div>

            {/* Apply Button (useful if selecting single date) */}
            <div className="w-full pt-2 border-t border-slate-100 mt-1 flex items-center justify-between gap-2">
              <span className="text-[11px] text-slate-500 truncate">
                {startDate ? formatDate(startDate) : 'Start Date'}
                {endDate ? ` → ${formatDate(endDate)}` : ''}
              </span>
              <button
                type="button"
                onClick={handleApplyRange}
                disabled={!startDate}
                className="px-3 py-1 bg-[#00a8e7] hover:bg-[#0092c8] disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
