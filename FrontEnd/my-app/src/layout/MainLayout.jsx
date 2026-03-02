import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex min-h-screen bg-[#eef2f6]">
      <Sidebar open={sidebarOpen} />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          sidebarOpen ? "ml-[220px]" : "ml-0"
        }`}
      >
        <Topbar toggleSidebar={toggleSidebar} isOpen={sidebarOpen} />

        <div className="p-[25px] w-full overflow-x-hidden">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
