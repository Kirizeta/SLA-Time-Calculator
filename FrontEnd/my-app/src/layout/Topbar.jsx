import React from "react";
import "./layout.css";
import "./Topbar.css";

const Topbar = () => {
  return (
    <div className="topbar">

      <div className="topbar-left">
        ☰
      </div>

      <div className="topbar-right">
        sysadmin | Date: {new Date().toLocaleDateString()}
      </div>

    </div>
  );
};

export default Topbar;
