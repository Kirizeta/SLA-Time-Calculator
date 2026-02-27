import React, { useEffect, useState } from "react";
import axios from "axios";

const Topbar = ({ toggleSidebar, isOpen }) => {
  const [partnerName, setPartnerName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8713/auth/me", {
          withCredentials: true,
        });

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
        { withCredentials: true },
      );

      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed", err);
      window.location.href = "/login";
    }
  };

  return (
    <div
      className="h-[60px] bg-gradient-to-r from-[#1e3a8a] to-[#0ea5e9]
                    text-white flex justify-between items-center px-6"
    >
      {/* LEFT GROUP */}
      <div className="flex items-center gap-3.5">
        {/* HAMBURGER */}
        <div
          onClick={toggleSidebar}
          className="w-[30px] h-[22px] relative cursor-pointer
                     flex flex-col justify-between"
        >
          <span
            className={`block h-[3px] w-full bg-white rounded
                        transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                        ${isOpen ? "translate-y-[9px] rotate-45" : ""}`}
          ></span>

          <span
            className={`block h-[3px] w-full bg-white rounded
                        transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                        ${isOpen ? "opacity-0 scale-x-0" : ""}`}
          ></span>

          <span
            className={`block h-[3px] w-full bg-white rounded
                        transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                        ${isOpen ? "-translate-y-[9px] -rotate-45" : ""}`}
          ></span>
        </div>

        {/* TEXT */}
        <span
          className={`font-semibold text-base whitespace-nowrap
                      transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                      ${isOpen ? "opacity-0 -translate-x-2.5" : "opacity-100 translate-x-0"}`}
        >
          Customer Support
        </span>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <span className="text-sm opacity-95">
          {partnerName || "Loading..."} | Date:{" "}
          {new Date().toLocaleDateString()}
        </span>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg font-semibold text-white
                     transition-all duration-200
                     bg-[rgba(250,0,0,0.8)]
                     hover:-translate-y-0.5"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Topbar;
