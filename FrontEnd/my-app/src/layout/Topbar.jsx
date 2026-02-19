import React from "react";
import "./Topbar.css";

const Topbar = ({ toggleSidebar, isOpen }) => {

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="topbar">

      <div className="topbar-left-group">
        <div
          className={`topbar-left ${isOpen ? "open" : ""}`}
          onClick={toggleSidebar}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <span className={`cs-text ${isOpen ? "hide" : "show"}`}>
          Customer Support
        </span>
      </div>

      <div className="topbar-right">
        <span className="topbar-info">
          sysadmin | Date: {new Date().toLocaleDateString()}
        </span>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

    </div>
  );
};

export default Topbar;
