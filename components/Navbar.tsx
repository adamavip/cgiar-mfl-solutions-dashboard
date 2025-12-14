/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface NavbarProps {
  currentPage: "home" | "work" | "innovation";
  onNavigate: (page: "home" | "work" | "innovation") => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  return (
    <nav className="bg-white/95 backdrop-blur-md py-4 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-100/50 shadow-sm sticky top-0 relative z-50 transition-all duration-300">
      {/* CGIAR Logo Section */}
      <div
        className="flex h-14 select-none cursor-pointer transition-opacity hover:opacity-95"
        onClick={() => onNavigate("home")}
      >
        <img
          src="/multifunctional-web-logo.jpg"
          alt="CGIAR Multifunctional Landscapes"
          className="h-full w-auto object-contain"
        />
      </div>

      {/* Navigation Pill */}
      <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-1.5 py-1.5 flex items-center shadow-lg shadow-gray-200/50">
        <button
          onClick={() => onNavigate("home")}
          className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
            currentPage === "home"
              ? "text-[#00703c] bg-[#00703c]/10 font-bold shadow-sm"
              : "text-gray-600 hover:text-[#00703c] hover:bg-gray-50"
          }`}
        >
          Home
        </button>
        <button
          onClick={() => onNavigate("work")}
          className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
            currentPage === "work"
              ? "text-[#D97706] bg-[#D97706]/10 font-bold shadow-sm"
              : "text-gray-600 hover:text-[#D97706] hover:bg-gray-50"
          }`}
        >
          Where we work
        </button>
        <button
          onClick={() => onNavigate("innovation")}
          className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
            currentPage === "innovation"
              ? "text-[#DC2626] bg-[#DC2626]/10 font-bold shadow-sm"
              : "text-gray-600 hover:text-[#DC2626] hover:bg-gray-50"
          }`}
        >
          Innovation/Solutions
        </button>
      </div>

      {/* Spacer for centering logic */}
      <div className="w-12 hidden md:block"></div>
    </nav>
  );
};

export default Navbar;
