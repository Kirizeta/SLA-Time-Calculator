import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

import LogoFull from "../Picture/Logofixone.png";
import { FiHome, FiPlusCircle, FiList, FiTrash2 } from "react-icons/fi";

const NAV_ITEMS = [
  { to: "/", icon: FiHome, label: "Dashboard", end: true },
  { to: "/ticket/create", icon: FiPlusCircle, label: "Create Ticket" },
  { to: "/ticket", icon: FiList, label: "Ticket Edit", end: true },
  { to: "/ticket/delete", icon: FiTrash2, label: "Delete Ticket", danger: true },
];

/**
 * Sidebar
 * Fixed left navigation panel with gradient background.
 * Props:
 *   open (bool) — whether sidebar is visible (toggle for mobile)
 */
const Sidebar = ({ open }) => {
  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar Panel */}
      <aside
        className={`fixed left-0 top-0 h-screen w-56 z-50 flex flex-col
          bg-gradient-to-b from-[#1e3a8a] via-[#1d4ed8] to-[#0ea5e9]
          shadow-2xl transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo */}
        <div className="flex flex-col items-center px-5 pt-8 pb-6 border-b border-white/10">
          {/* Placeholder logo area — replace img src as needed */}
          <div className="w-full bg-white/15 rounded-xl p-3 flex items-center justify-center mb-3">
            <span className="text-white font-bold text-lg tracking-wide">🛠 IT Support</span>
          </div>
          <span className="text-white/60 text-xs tracking-widest uppercase">Helpdesk Portal</span>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest px-3 mb-3">
            Navigation
          </p>
          {NAV_ITEMS.map(({ to, icon: Icon, label, end, danger }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? "bg-white/20 text-white shadow-sm"
                    : danger
                    ? "text-red-300 hover:bg-red-500/20 hover:text-red-200"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon size={17} className="shrink-0" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-white/10">
          <p className="text-white/30 text-[10px] text-center">v1.0 · IT Support System</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;