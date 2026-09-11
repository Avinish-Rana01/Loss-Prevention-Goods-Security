import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import Footer from './Footer';
import { Store, Calendar, Search, ChevronDown, Check } from 'lucide-react';

const STORES_LIST = [
  { id: 'all', name: 'All Stores (Overall)', location: 'Global Network' },
  { id: 'store-101', name: 'Store 101 - Downtown Flagship', location: 'New York, NY' },
  { id: 'store-102', name: 'Store 102 - Uptown Retail Mall', location: 'Chicago, IL' },
  { id: 'store-103', name: 'Store 103 - Westside Logistics Hub', location: 'Los Angeles, CA' },
  { id: 'store-104', name: 'Store 104 - Metro City Center', location: 'Dallas, TX' },
  { id: 'store-105', name: 'Store 105 - Airport Terminal', location: 'Miami, FL' },
];

export default function DashboardLayout({ user, onLogout, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState('all');
  const [storeSearchQuery, setStoreSearchQuery] = useState('');
  const [storeDropdownOpen, setStoreDropdownOpen] = useState(false);
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('01 Sep 2026 - 10 Sep 2026');

  // Close dropdowns on clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('#store-filter-container') && !e.target.closest('#date-filter-container')) {
        setStoreDropdownOpen(false);
        setDateDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredStores = STORES_LIST.filter((s) =>
    s.name.toLowerCase().includes(storeSearchQuery.toLowerCase()) ||
    s.location.toLowerCase().includes(storeSearchQuery.toLowerCase())
  );

  const currentStore = STORES_LIST.find((s) => s.id === selectedStore) || STORES_LIST[0];

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-800 flex">
      {/* 1. Left Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* 2. Main Shell (offset by 64 / 256px on desktop) */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-60 min-h-screen">
        {/* Top Navbar */}
        <TopNavbar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          user={user}
          onLogout={onLogout}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-2 sm:p-4 lg:p-6 space-y-6">
          
          {/* Properly Aligned Store Search Filter & Date Range Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200/80">
            <div className="flex flex-wrap items-center gap-3">
              
              {/* Searchable Store Filter */}
              <div id="store-filter-container" className="relative">
                <button
                  type="button"
                  onClick={() => setStoreDropdownOpen(!storeDropdownOpen)}
                  className="h-10 px-3.5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-slate-800 shadow-2xs transition-all cursor-pointer min-w-[210px] sm:min-w-[250px]"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Store className="w-4 h-4 text-[#00a8e7] shrink-0" />
                    <span className="truncate">{currentStore.name}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                </button>

                {/* Dropdown with Search Input */}
                {storeDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 animate-in fade-in slide-in-from-top-1 duration-150 overflow-hidden">
                    <div className="p-2.5 border-b border-slate-100 bg-slate-50/70">
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Search store by name, ID or city..."
                          value={storeSearchQuery}
                          onChange={(e) => setStoreSearchQuery(e.target.value)}
                          className="w-full pl-8 pr-3 py-1.5 text-xs bg-white rounded-lg border border-slate-200 outline-none focus:border-[#00a8e7] focus:ring-2 focus:ring-[#00a8e7]/15 transition-all text-slate-900 placeholder-slate-500 font-medium"
                          autoFocus
                        />
                      </div>
                    </div>
                    <div className="max-h-56 overflow-y-auto py-1">
                      {filteredStores.length === 0 ? (
                        <p className="px-4 py-3 text-xs text-slate-500 font-medium text-center">No matching stores found</p>
                      ) : (
                        filteredStores.map((store) => (
                          <button
                            key={store.id}
                            type="button"
                            onClick={() => {
                              setSelectedStore(store.id);
                              setStoreDropdownOpen(false);
                              setStoreSearchQuery('');
                            }}
                            className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between cursor-pointer transition-colors ${
                              selectedStore === store.id
                                ? 'bg-[#00a8e7]/10 text-[#00a8e7] font-semibold'
                                : 'text-slate-800 hover:bg-slate-50'
                            }`}
                          >
                            <div className="min-w-0 pr-2">
                              <p className="font-semibold text-slate-900 truncate">{store.name}</p>
                              <p className="text-[11px] text-slate-600 font-medium">{store.location}</p>
                            </div>
                            {selectedStore === store.id && (
                              <Check className="w-4 h-4 text-[#00a8e7] shrink-0" />
                            )}
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Date Range Selector */}
              <div id="date-filter-container" className="relative">
                <button
                  type="button"
                  onClick={() => setDateDropdownOpen(!dateDropdownOpen)}
                  className="h-10 px-3.5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800 shadow-2xs transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#00a8e7] shrink-0" />
                  <span>{selectedDateRange}</span>
                  <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                </button>

                {/* Preset Date Range Options */}
                {dateDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    {['Today', 'Yesterday', 'Last 7 Days', '01 Sep 2026 - 10 Sep 2026', 'This Month', 'Last 30 Days'].map((range) => (
                      <button
                        key={range}
                        type="button"
                        onClick={() => {
                          setSelectedDateRange(range);
                          setDateDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs font-semibold cursor-pointer transition-colors ${
                          selectedDateRange === range
                            ? 'bg-[#00a8e7]/10 text-[#00a8e7] font-bold'
                            : 'text-slate-800 hover:bg-slate-50'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Live Monitoring Badge */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-white border border-slate-200/80 px-3 py-2 rounded-xl shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-slate-800">Live RFID Stream</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500">All Gates Online</span>
            </div>
          </div>

          {/* Routed Page Content via Outlet or Passed Children */}
          {children || <Outlet context={{ selectedStore, selectedDateRange }} />}

        </main>

        {/* 3. Footer */}
        <Footer />
      </div>
    </div>
  );
}
