import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./MainLayout.css";

const MainLayout = ({ children }) => {
  return (
    <div className="layout-root">

      <Sidebar />

      <div className="layout-main">
        <Topbar />

        <div className="layout-content">
          {children}
        </div>
      </div>

    </div>
  );
};

export default MainLayout;