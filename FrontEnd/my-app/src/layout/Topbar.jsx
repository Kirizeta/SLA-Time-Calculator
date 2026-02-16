import React from "react";
import "./Topbar.css";

const Topbar = ({ toggleSidebar }) => {

  const handleLogout = () => {
    // hapus token / session
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // redirect login
    window.location.href = "/login";
  };

  return (
    <div className="topbar">

      <div className="topbar-left" onClick={toggleSidebar}>
        ☰
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

