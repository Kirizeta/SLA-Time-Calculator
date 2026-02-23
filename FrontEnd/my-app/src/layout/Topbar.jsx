import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Topbar.css";

const Topbar = ({ toggleSidebar, isOpen }) => {

  const [partnerName, setPartnerName] = useState("");


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8713/auth/me",
          { withCredentials: true }
        );

        setPartnerName(res.data);
      } catch (err) {
        console.error("Failed to fetch user", err);

        window.location.href = "/login";
      }
    };

    fetchUser();
  }, []);


  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8713/auth/logout",
        {},
        { withCredentials: true }
      );


      window.location.href = "/login";

    } catch (err) {
      console.error("Logout failed", err);
      window.location.href = "/login"; 
    }
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
          {partnerName || "Loading..."} | Date: {new Date().toLocaleDateString()}
        </span>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

    </div>
  );
};

export default Topbar;