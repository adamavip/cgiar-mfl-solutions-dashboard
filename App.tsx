/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import HomeContent from "./components/HomeContent";
import WhereWeWork from "./components/WhereWeWork";
import Innovation from "./components/Innovation";
import Footer from "./components/Footer";

type PageType = "home" | "work" | "innovation";

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />

      <main className="flex-grow">
        {currentPage === "home" && <HomeContent onNavigate={setCurrentPage} />}
        {currentPage === "work" && <WhereWeWork />}
        {currentPage === "innovation" && <Innovation />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
