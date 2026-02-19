import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

import LogoFull from "../Picture/Logofixone.png";

const Sidebar = ({ open }) => {
  return (
    <div className={`sidebar ${open ? "open" : "close"}`}>
      <div className="sidebar-logo">
        <img src={LogoFull} alt="Logo" className="logo-full" />
        <small className="logo-text">IT Support</small>
      </div>

      <div className="sidebar-menu">
        <p className="menu-title">MENU</p>

        <NavLink to="/" className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item"
        }>
          🏠 <span>Dashboard</span>
        </NavLink>

        <NavLink to="/ticket" className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item"
        }>
          🧾 <span>Ticket Edit</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
