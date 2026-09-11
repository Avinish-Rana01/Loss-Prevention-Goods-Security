import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 px-6 bg-white border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] sm:text-xs text-gray-400">
      <span>© {currentYear} TeCMi Vyapti. All rights reserved.</span>
      <span className="font-semibold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-md shadow-2xs">
        v1.0.0
      </span>
    </footer>
  );
}
export default Footer;
