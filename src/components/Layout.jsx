import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      isActive
        ? "text-primary text-sm font-bold transition-colors"
        : "text-[#6b7280] hover:text-primary text-sm font-medium transition-colors"
    }
  >
    {children}
  </NavLink>
);

export const Layout = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-text-main font-display antialiased min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-[#e8d9ce] dark:border-gray-800 px-6 py-3">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="size-8 flex items-center justify-center text-primary bg-primary/10 rounded-lg">
              <span className="material-symbols-outlined text-2xl">solar_power</span>
            </div>
            <h1 className="text-text-main dark:text-white text-lg font-bold tracking-tight hidden sm:block">Shelly PV Management</h1>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <NavItem to="/">Dashboard</NavItem>
            <NavItem to="/devices">Device & Alarms</NavItem>
            <NavItem to="/scripts">Scripts</NavItem>
            <NavItem to="/analytics">Analytics</NavItem>
            <NavItem to="/reports">Reports</NavItem>
            <NavItem to="/settings">Settings</NavItem>
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden sm:flex items-center justify-center gap-2 h-9 px-4 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-bold transition-colors shadow-sm shadow-orange-200">
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span>Add Device</span>
            </button>
            <div className="h-8 w-px bg-gray-200 mx-1 hidden sm:block"></div>
            <button className="relative text-gray-400 hover:text-primary transition-colors">
                 <span className="material-symbols-outlined">notifications</span>
                 <span className="absolute top-0 right-0 size-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="bg-gray-200 rounded-full size-9 flex items-center justify-center text-gray-500 font-bold border-2 border-white shadow-sm cursor-pointer">
              AD
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};
