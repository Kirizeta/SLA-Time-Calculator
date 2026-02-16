import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./MainLayout.css";

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <div className="layout">
      <Sidebar open={sidebarOpen} />

      <div className={`layout-right ${sidebarOpen ? "" : "full"}`}>
        <Topbar
          toggleSidebar={toggleSidebar}
          isOpen={sidebarOpen}
        />

        <div className="layout-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
