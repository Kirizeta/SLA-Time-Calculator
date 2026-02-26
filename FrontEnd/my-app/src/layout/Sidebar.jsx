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

        {/* DASHBOARD */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          🏠 <span>Dashboard</span>
        </NavLink>

        {/* CREATE TICKET */}
        <NavLink
          to="/ticket/create"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          📝 <span>Create Ticket</span>
        </NavLink>

        {/* EDIT / LIST TICKET */}
        <NavLink
          to="/ticket"
            end
              className={({ isActive }) =>
           isActive ? "menu-item active" : "menu-item"
          }
        >
          🧾 <span>Ticket Edit</span>
        </NavLink>

        {/* DELETE TICKET */}
        <NavLink
          to="/ticket/delete"
          className={({ isActive }) =>
            isActive ? "menu-item active danger" : "menu-item danger"
          }
        >
          🗑️ <span>Delete Ticket</span>
        </NavLink>

      </div>
    </div>
  );
};

export default Sidebar;