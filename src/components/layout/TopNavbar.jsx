import React, { useState } from 'react';
import {
  Menu,
  Bell,
  ChevronDown,
  LogOut,
  ShieldAlert,
  Clock
} from 'lucide-react';

export default function TopNavbar({ onToggleSidebar, user, onLogout }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const username = user?.username || 'Manish';
  const userInitials = username.slice(0, 2).toUpperCase();

  return (
    <header className="h-20 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      
      {/* Left Section: Menu Toggle (Mobile) & Title with Real-time Text */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        {/* Toggle Sidebar Button */}
        <button
          onClick={onToggleSidebar}
          className="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-200 cursor-pointer shrink-0 active:scale-95"
          title="Toggle Sidebar (Mini / Expanded)"
          aria-label="Toggle Navigation Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Platform Title & Subtitle */}
        <div className="flex flex-col justify-center min-w-0">
          <h1 className="text-base sm:text-lg md:text-xl font-extrabold text-slate-900 tracking-tight leading-tight truncate">
            Loss Prevention & Goods Security
          </h1>
          <p className="text-[11.5px] sm:text-xs text-slate-500 font-medium mt-0.5 leading-snug">
            Real-time monitoring of your store's inventory, tag status and theft analytics
          </p>
        </div>
      </div>

      {/* Right Section: Notifications, User Profile */}
      <div className="flex items-center gap-2.5 sm:gap-4">

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-700 hover:text-slate-900 transition-colors relative cursor-pointer shadow-2xs"
            title="Theft & Security Alerts"
          >
            <Bell className="w-5 h-5 text-slate-700" />
            {/* Notification Badge - Positioned at corner without covering bell */}
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-rose-500 text-white font-extrabold text-[10px] rounded-full flex items-center justify-center ring-2 ring-white shadow-xs">
              2
            </span>
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-bold text-sm text-slate-900">Security Alerts</span>
                <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200/60">2 New</span>
              </div>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-slate-900">Theft Alarm at Emergency Exit</p>
                    <p className="text-slate-600 font-medium text-[11.5px] mt-0.5">Store 101 • Article #AR12345</p>
                    <p className="text-[11px] text-slate-500 font-medium mt-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" /> 2 mins ago
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-slate-900">Untagged item detected</p>
                    <p className="text-slate-600 font-medium text-[11.5px] mt-0.5">Store 102 • Zone Main Gate</p>
                    <p className="text-[11px] text-slate-500 font-medium mt-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" /> 14 mins ago
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2.5 p-1 sm:px-2.5 sm:py-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {/* User Avatar Initials */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#5236df] to-[#7c3aed] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              {userInitials}
            </div>
            
            {/* User Greeting */}
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold text-slate-800 leading-tight">
                Welcome, {username}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-500 hidden sm:block" />
          </button>

          {/* Profile Dropdown Menu */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <p className="font-bold text-xs text-slate-900">{username}</p>
                <p className="text-[11.5px] text-slate-600 font-medium">Store Manager</p>
              </div>
              {onLogout && (
                <button
                  onClick={() => {
                    onLogout();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              )}
            </div>
          )}
        </div>

      </div>

    </header>
  );
}
