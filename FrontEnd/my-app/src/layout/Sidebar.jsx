import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import Logo from "../Picture/abhlogo.png";

const Sidebar = () => {
  return (
    <div className="sidebar">

      {/* LOGO */}
      <div className="sidebar-logo">
        <img src={Logo} alt="Logo" />
        <small>IT Support</small>
      </div>

      {/* MENU */}
      <div className="sidebar-menu">

        <p className="menu-title">MENU</p>

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          🏠 Home
        </NavLink>

        <NavLink
          to="/ticket"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          🧾 Ticket Edit
        </NavLink>

      </div>

    </div>
  );
};

export default Sidebar;
