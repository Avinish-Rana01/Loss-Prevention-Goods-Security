import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Store, Calendar, Search, ChevronDown, Check, RotateCcw } from 'lucide-react';

const STORES_LIST = [
  { id: 'all', name: 'All Stores (Overall)', location: 'Global Network' },
  { id: 'store-101', name: 'Store 101 - Downtown Flagship', location: 'New York, NY' },
  { id: 'store-102', name: 'Store 102 - Uptown Retail Mall', location: 'Chicago, IL' },
  { id: 'store-103', name: 'Store 103 - Westside Logistics Hub', location: 'Los Angeles, CA' },
  { id: 'store-104', name: 'Store 104 - Metro City Center', location: 'Dallas, TX' },
  { id: 'store-105', name: 'Store 105 - Airport Terminal', location: 'Miami, FL' },
];

const DATE_PRESETS = [
  'Today',
  'Yesterday',
  'Last 7 Days',
  'This Month',
  'Last 30 Days',
];

// Helper to format Date object into "DD MMM YYYY"
const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
};

/**
 * Common Reusable Header Toolbar & Filter Component
 * - Page Title on the left with brand left-border design
 * - Store & Date Range selection shifted to the right with reduced font size
 * - React DatePicker with range selection and 'Today' as default
 */
export default function StoreDateFilter({
  title,
  subtitle,
  defaultStore = 'all',
  defaultDate = 'Today',
  onStoreChange,
  onDateChange,
  onChange,
}) {
  const location = useLocation();

  // Determine page title automatically from route if not explicitly passed
  const getPageTitle = () => {
    if (title) return title;
    const path = (location?.pathname || '').toLowerCase();
    if (path.includes('analytics')) return 'Analytics';
    if (path.includes('reports')) return 'Reports';
    return 'Dashboard';
  };

  const displayTitle = getPageTitle();

  const [selectedStore, setSelectedStore] = useState(defaultStore);
  const [selectedDateRange, setSelectedDateRange] = useState(defaultDate);
  const [storeSearchQuery, setStoreSearchQuery] = useState('');
  const [storeDropdownOpen, setStoreDropdownOpen] = useState(false);
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);

  // React DatePicker state (default to Today)
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;

  const containerRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setStoreDropdownOpen(false);
        setDateDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectStore = (storeId) => {
    setSelectedStore(storeId);
    setStoreDropdownOpen(false);
    setStoreSearchQuery('');
    if (onStoreChange) onStoreChange(storeId);
    if (onChange) onChange({ storeId, dateRange: selectedDateRange });
  };

  // Preset Selection Handler
  const handleSelectPreset = (range) => {
    const today = new Date();
    let start = new Date();
    let end = new Date();

    if (range === 'Today') {
      start = today;
      end = today;
    } else if (range === 'Yesterday') {
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      start = yesterday;
      end = yesterday;
    } else if (range === 'Last 7 Days') {
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 6);
      start = sevenDaysAgo;
      end = today;
    } else if (range === 'This Month') {
      start = new Date(today.getFullYear(), today.getMonth(), 1);
      end = today;
    } else if (range === 'Last 30 Days') {
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(today.getDate() - 29);
      start = thirtyDaysAgo;
      end = today;
    }

    setDateRange([start, end]);
    setSelectedDateRange(range);
    setDateDropdownOpen(false);

    if (onDateChange) onDateChange(range);
    if (onChange) onChange({ storeId: selectedStore, dateRange: range });
  };

  // React DatePicker Range Change Handler
  const handleDatePickerChange = (update) => {
    const [start, end] = update;
    setDateRange([start, end]);

    // If both dates in range are selected, automatically apply
    if (start && end) {
      const formatted = `${formatDate(start)} - ${formatDate(end)}`;
      setSelectedDateRange(formatted);
      setDateDropdownOpen(false);

      if (onDateChange) onDateChange(formatted);
      if (onChange) onChange({ storeId: selectedStore, dateRange: formatted });
    }
  };

  // Manual Apply for single or custom selection
  const handleApplyRange = () => {
    if (!startDate) return;
    const formatted = endDate
      ? `${formatDate(startDate)} - ${formatDate(endDate)}`
      : formatDate(startDate);

    setSelectedDateRange(formatted);
    setDateDropdownOpen(false);

    if (onDateChange) onDateChange(formatted);
    if (onChange) onChange({ storeId: selectedStore, dateRange: formatted });
  };

  const filteredStores = STORES_LIST.filter(
    (s) =>
      s.name.toLowerCase().includes(storeSearchQuery.toLowerCase()) ||
      s.location.toLowerCase().includes(storeSearchQuery.toLowerCase())
  );

  const currentStore = STORES_LIST.find((s) => s.id === selectedStore) || STORES_LIST[0];

  return (
    <div
      ref={containerRef}
      className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200/80"
    >
      {/* 1. Left Side: Page Title with Accent Left Border Design */}
      <div className="flex items-center">
        <div className="border-l-4 border-[#00a8e7] pl-3 py-0.5">
          <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-tight">
            {displayTitle}
          </h2>
          {subtitle && (
            <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-none">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* 2. Right Side: Store Selection & React DatePicker Filter (Shifted Right + Reduced Font Size) */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 ml-auto">

        {/* Store Selector Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setStoreDropdownOpen(!storeDropdownOpen)}
            className="h-8.5 px-3 bg-white border border-slate-200/90 hover:border-slate-300 rounded-lg flex items-center justify-between gap-2 text-xs font-medium text-slate-700 shadow-2xs transition-all cursor-pointer min-w-[175px] sm:min-w-[210px]"
          >
            <div className="flex items-center gap-2 truncate">
              <Store className="w-3.5 h-3.5 text-[#00a8e7] shrink-0" />
              <span className="truncate">{currentStore.name}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          {/* Store Dropdown Menu */}
          {storeDropdownOpen && (
            <div className="absolute right-0 sm:left-auto mt-1.5 w-72 bg-white border border-slate-200 rounded-xl shadow-xl z-50 animate-in fade-in slide-in-from-top-1 duration-150 overflow-hidden">
              <div className="p-2 border-b border-slate-100 bg-slate-50/70">
                <div className="relative">
                  <Search className="w-3 h-3 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search store name or city..."
                    value={storeSearchQuery}
                    onChange={(e) => setStoreSearchQuery(e.target.value)}
                    className="w-full pl-7 pr-2.5 py-1 text-xs bg-white rounded-md border border-slate-200 outline-none focus:border-[#00a8e7] focus:ring-1 focus:ring-[#00a8e7]/20 transition-all text-slate-900 placeholder-slate-400"
                    autoFocus
                  />
                </div>
              </div>
              <div className="max-h-52 overflow-y-auto py-1">
                {filteredStores.length === 0 ? (
                  <p className="px-3 py-2.5 text-xs text-slate-400 font-medium text-center">
                    No matching stores found
                  </p>
                ) : (
                  filteredStores.map((store) => (
                    <button
                      key={store.id}
                      type="button"
                      onClick={() => handleSelectStore(store.id)}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between cursor-pointer transition-colors ${
                        selectedStore === store.id
                          ? 'bg-[#00a8e7]/10 text-[#00a8e7] font-semibold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <p className="font-semibold text-slate-900 truncate text-xs">{store.name}</p>
                        <p className="text-[10.5px] text-slate-500">{store.location}</p>
                      </div>
                      {selectedStore === store.id && (
                        <Check className="w-3.5 h-3.5 text-[#00a8e7] shrink-0" />
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Date Range Selector with React DatePicker */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setDateDropdownOpen(!dateDropdownOpen)}
            className="h-8.5 px-3 bg-white border border-slate-200/90 hover:border-slate-300 rounded-lg flex items-center gap-2 text-xs font-medium text-slate-700 shadow-2xs transition-all cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#00a8e7] shrink-0" />
            <span>{selectedDateRange}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          {/* React DatePicker Popover */}
          {dateDropdownOpen && (
            <div className="absolute right-0 mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-150 overflow-hidden flex flex-col sm:flex-row">
              
              {/* Presets Sidebar */}
              <div className="w-full sm:w-36 border-b sm:border-b-0 sm:border-r border-slate-100 bg-slate-50/70 p-2 flex flex-row sm:flex-col gap-1 overflow-x-auto sm:overflow-x-visible shrink-0">
                <p className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 hidden sm:block">
                  Presets
                </p>
                {DATE_PRESETS.map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => handleSelectPreset(range)}
                    className={`text-left px-2.5 py-1.5 text-xs rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer flex items-center justify-between ${
                      selectedDateRange === range
                        ? 'bg-[#00a8e7] text-white font-semibold shadow-xs'
                        : 'text-slate-700 hover:bg-slate-200/70'
                    }`}
                  >
                    <span>{range}</span>
                    {selectedDateRange === range && (
                      <Check className="w-3 h-3 text-white shrink-0 hidden sm:block" />
                    )}
                  </button>
                ))}
              </div>

              {/* React DatePicker Inline Calendar */}
              <div className="p-3 flex flex-col items-center">
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

                <DatePicker
                  selectsRange
                  startDate={startDate}
                  endDate={endDate}
                  onChange={handleDatePickerChange}
                  inline
                  maxDate={new Date()}
                />

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

      </div>
    </div>
  );
}
