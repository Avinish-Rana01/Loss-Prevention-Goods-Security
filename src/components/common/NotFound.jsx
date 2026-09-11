import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col justify-between items-center px-4 py-6 select-none relative overflow-hidden">
      
      {/* Background ambient glow accents */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-gradient-to-tr from-[#00a8e7]/15 to-[#5236df]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header with Vyapti Logo */}
      <header className="w-full max-w-5xl flex items-center justify-between z-10">
        <Link to="/dashboard" className="transition-transform hover:scale-105 duration-200">
          <img
            src="/assets/vyapti_logo.png"
            alt="Vyapti Logo"
            className="h-9 sm:h-11 w-auto object-contain"
          />
        </Link>
        <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200/80 px-3 py-1 rounded-full shadow-2xs">
          Loss Prevention & Goods Security
        </span>
      </header>

      {/* Center Content: Attractive Vector Art + Oops Page Not Found + Back to Dashboard */}
      <main className="flex flex-col items-center justify-center text-center my-auto py-4 z-10 max-w-lg mx-auto">
        
        {/* Animated Vector Illustration */}
        <div className="relative mb-4">
          <img
            src="/assets/404_vector.jpg"
            alt="404 Page Not Found"
            className="w-72 sm:w-80 md:w-88 h-auto object-contain mx-auto rounded-3xl mix-blend-multiply drop-shadow-xl animate-float-slow"
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Oops! Page Not Found
        </h1>

        {/* Action Button: Back to Dashboard */}
        <div className="mt-6">
          <Link
            to="/dashboard"
            className="px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-white text-sm sm:text-base tracking-wide bg-gradient-to-r from-[#00a8e7] via-[#2672e5] to-[#5236df] hover:from-[#0097cf] hover:to-[#4428cb] shadow-lg shadow-[#00a8e7]/25 hover:shadow-xl hover:shadow-[#5236df]/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200 cursor-pointer inline-flex items-center gap-2.5"
          >
            <Home className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

      </main>

      {/* Bottom Footer */}
      <footer className="w-full max-w-5xl flex items-center justify-between pt-4 border-t border-slate-200/80 text-[11px] sm:text-xs text-gray-400 z-10">
        <span>© {currentYear} TeCMi Vyapti. All rights reserved.</span>
        <span className="font-semibold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-md shadow-2xs">
          v1.0.0
        </span>
      </footer>

    </div>
  );
};

export default NotFound;
