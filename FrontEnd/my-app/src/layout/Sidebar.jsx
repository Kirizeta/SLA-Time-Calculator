import React from "react";
import { NavLink } from "react-router-dom";
// import "./Sidebar.css";

import LogoFull from "../Picture/Logofix2.png";
import { FiHome, FiPlusCircle, FiList, FiTrash2 } from "react-icons/fi";

const NAV_ITEMS = [
  { to: "/", icon: FiHome, label: "Dashboard", end: true },
  { to: "/ticket/create", icon: FiPlusCircle, label: "Create Ticket" },
  { to: "/ticket", icon: FiList, label: "Ticket Edit", end: true },
  { to: "/ticket/delete", icon: FiTrash2, label: "Delete Ticket", danger: true },
];

const Sidebar = ({ open }) => {
  return (
    <>
      {/* Backdrop mobile */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-56 z-50 flex flex-col
          bg-white shadow-xl border-r border-gray-200
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* ✅ LOGO AREA */}
        <div className="flex flex-col items-center px-5 pt-8 pb-6 border-b border-gray-200">
          
          {/* Logo */}
          <img
            src={LogoFull}
            alt="Logo"
            className="h-12 object-contain mb-3"
          />

          {/* IT Support text */}
          <div className="flex items-center gap-2 font-semibold text-gray-800">
            <span className="text-lg">🛠</span>
            <span>IT Support</span>
          </div>

          <span className="text-gray-400 text-xs tracking-widest uppercase mt-1">
            Helpdesk Portal
          </span>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest px-3 mb-3">
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
                    ? "bg-blue-50 text-blue-600 shadow-sm"
                    : danger
                    ? "text-red-500 hover:bg-red-50"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={17} className="shrink-0" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-200">
          <p className="text-gray-400 text-[10px] text-center">
            v1.0 · IT Support System
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;