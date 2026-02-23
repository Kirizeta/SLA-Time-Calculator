import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Topbar.css";

const Topbar = ({ toggleSidebar, isOpen }) => {

  const [partnerName, setPartnerName] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8713/auth/me", {
      withCredentials: true
    })
    .then(res => {
      setPartnerName(res.data);
    })
    .catch(err => {
      console.error("Failed to fetch user", err);
    });
  }, []);

  const handleLogout = () => {
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
          {partnerName} | Date: {new Date().toLocaleDateString()}
        </span>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

    </div>
  );
};

export default Topbar;