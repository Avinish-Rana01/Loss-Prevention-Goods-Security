import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import Footer from './Footer';


const DashboardLayout = ({ user, onLogout, children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setMobileSidebarOpen((prev) => !prev);
    } else {
      setSidebarCollapsed((prev) => !prev);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-800 flex">

      <Sidebar
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        isCollapsed={sidebarCollapsed}
      />

      <div
        className={`flex-1 flex flex-col min-w-0 min-h-screen transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-60'
          }`}
      >

        <TopNavbar
          onToggleSidebar={handleToggleSidebar}
          user={user}
          onLogout={onLogout}
        />

        <main className="flex-1 p-4 sm:p-2 lg:p-4 space-y-6">
          {children || <Outlet />}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default DashboardLayout