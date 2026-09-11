import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  ShieldCheck,
  X
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const handleNavClick = () => {
    if (window.innerWidth < 1024 && onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-60 bg-[#0d1b2e] text-slate-300 flex flex-col justify-between border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header & Navigation */}
        <div className="flex flex-col flex-1 overflow-y-auto">
          
          {/* Brand Header with Vyapti Logo covering top left side */}
          <div className="h-20 border-b border-slate-200/80 px-4 sm:px-5 flex items-center justify-between shrink-0">
            <div className="flex items-center">
              <img
                src="/assets/vyapti_logo_white.png"
                alt="Vyapti Logo"
                className="h-12 sm:h-14 w-auto max-w-[210px] object-contain"
              />
            </div>

            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            
            {/* 1. Dashboard Menu */}
            <NavLink
              to="/dashboard"
              onClick={() => handleNavClick('dashboard')}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#1877f2] text-white shadow-lg shadow-[#1877f2]/30 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                }`
              }
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span>Dashboard</span>
            </NavLink>

            {/* 2. Analytics Menu (Single Page) */}
            <NavLink
              to="/analytics"
              onClick={() => handleNavClick('analytics')}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#1877f2] text-white shadow-lg shadow-[#1877f2]/30 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                }`
              }
            >
              <BarChart3 className="w-4 h-4 shrink-0" />
              <span>Analytics</span>
            </NavLink>

            {/* 3. Reports Menu */}
            <NavLink
              to="/reports"
              onClick={() => handleNavClick('reports')}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#1877f2] text-white shadow-lg shadow-[#1877f2]/30 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                }`
              }
            >
              <FileText className="w-4 h-4 shrink-0" />
              <span>Reports</span>
            </NavLink>

          </nav>
        </div>

        {/* Bottom Security Info Card */}
        <div className="p-4 border-t border-slate-800/80">
          
          {/* Security Banner Card */}
          <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-3.5 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00a8e7]/15 text-[#00a8e7] flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-[11.5px] leading-snug">
              <p className="font-semibold text-white">Secure Inventory</p>
              <p className="text-slate-400">Reduce Losses</p>
              <p className="text-slate-400">Increase Profits</p>
            </div>
          </div>

        </div>

      </aside>
    </>
  );
}
