import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

import LogoFull from "../Picture/Logofixone.png";
import LogoMini from "../Picture/Logo2.png";

const Sidebar = ({ open }) => {
  return (
    <div className={`sidebar ${open ? "open" : "close"}`}>

      {/* LOGO AREA */}
      <div className="sidebar-logo">

        <img
          src={LogoFull}
          alt="Logo Full"
          className={`logo logo-full ${open ? "show" : "hide"}`}
        />

        <img
          src={LogoMini}
          alt="Logo Mini"
          className={`logo logo-mini ${open ? "hide" : "show"}`}
        />

        <small className={`logo-text ${open ? "show" : "hide"}`}>
          IT Support
        </small>

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
          🏠 <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/ticket"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          🧾 <span>Ticket Edit</span>
        </NavLink>

      </div>

    </div>
  );
};

export default Sidebar;
