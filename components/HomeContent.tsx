/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import VoxelGarden from "./VoxelGarden";

interface HomeContentProps {
  onNavigate: (page: "home" | "work" | "innovation") => void;
}

const HomeContent: React.FC<HomeContentProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-gradient-to-b from-[#F0FDF4] to-[#FFFFFF] min-h-full">
      {/* Hero Section */}
      <section className="relative w-full min-h-[85vh] flex flex-col md:flex-row items-center justify-center px-6 md:px-12 pt-8 pb-16 overflow-hidden">
        {/* Left: Text Content */}
        <div className="w-full md:w-1/2 z-10 flex flex-col justify-center animate-fade-in-up">
          <span className="inline-block py-1 px-3 rounded-full bg-[#DCFCE7] text-[#166534] text-xs font-bold tracking-widest uppercase mb-6 w-fit border border-[#166534]/20">
            CGIAR Research Portfolio 2025-2030
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-[#064E3B] leading-[1.1] mb-8">
            Multifunctional <br />
            <span className="text-[#059669]">Landscapes.</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-xl mb-10 border-l-4 border-[#059669] pl-6">
            Balancing competing needs for a sustainable future. We transform how
            land, water, and food systems interact to restore ecosystem health
            while ensuring food security.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate("innovation")}
              className="px-8 py-4 bg-[#064E3B] text-white rounded-xl font-semibold shadow-xl shadow-[#064E3B]/20 hover:bg-[#022C22] hover:shadow-2xl hover:shadow-[#064E3B]/30 transition-all duration-300 flex items-center gap-2 group transform hover:scale-[1.02]"
            >
              Explore Innovations
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
            <a
              href="https://cgspace.cgiar.org/items/f5fb41f0-6ea8-4583-b96d-b72a3fc96187"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-[#064E3B] border-2 border-[#064E3B]/20 rounded-xl font-semibold shadow-md hover:shadow-lg hover:border-[#064E3B] hover:bg-[#064E3B]/5 transition-all duration-300 transform hover:scale-[1.02] inline-block text-center"
            >
              Read the Strategy
            </a>
          </div>
        </div>

        {/* Right: 3D Interactive Scene */}
        <div className="w-full md:w-1/2 h-[500px] md:h-[700px] relative mt-12 md:mt-0 animate-fade-in z-0">
          <div className="absolute inset-0 bg-radial-gradient from-[#059669]/10 to-transparent opacity-50 blur-3xl rounded-full transform scale-75"></div>
          <VoxelGarden />

          {/* Floating Caption */}
          <div className="absolute bottom-10 right-10 bg-white/90 backdrop-blur-lg p-5 rounded-2xl border border-white/50 shadow-2xl max-w-xs hidden md:block animate-slide-up">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-3 h-3 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Live Focus
              </span>
            </div>
            <p className="text-sm font-medium text-[#064E3B] leading-relaxed">
              Mapping 12 priority multifunctional landscapes across the Global
              South.
            </p>
          </div>
        </div>
      </section>

      {/* Impact & Statistics Section */}
      <section className="py-24 px-6 md:px-12 bg-[#064E3B] text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#FFFFFF"
              d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.5,9.4,82.2,23.1,71.2,35.1C60.2,47.1,49.5,57.4,37.3,64.3C25.1,71.2,11.4,74.7,-1.5,77.3C-14.4,79.9,-27.1,81.6,-39,76.6C-50.9,71.6,-62,59.9,-70.3,47.1C-78.6,34.3,-84.1,20.4,-83.4,6.8C-82.7,-6.8,-75.8,-20.1,-66.4,-31.6C-57,-43.1,-45.1,-52.8,-32.8,-61.2C-20.5,-69.6,-7.8,-76.7,3.6,-82.9C15,-89.1,30.5,-74.6,44.7,-76.4Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-serif mb-6">
              Impact Goals for 2030
            </h2>
            <p className="text-gray-300 text-lg font-light">
              Our portfolio is driven by measurable outcomes. By focusing on
              critical "Action Areas," we aim to deliver tangible benefits for
              people and the planet in the regions where we work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                val: "9",
                unit: "Countries",
                desc: "Where we work to transform landscapes",
                icon: (
                  <svg
                    className="w-8 h-8 text-[#34D399]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ),
              },
              {
                val: "9.8",
                unit: "Billion People",
                desc: "fed by 2050 sustainably",
                icon: (
                  <svg
                    className="w-8 h-8 text-[#34D399]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                ),
              },
              {
                val: "34% / 48%",
                unit: "Biodiversity Loss",
                desc: "Plant & animal species loss ending",
                icon: (
                  <svg
                    className="w-8 h-8 text-[#34D399]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
              {
                val: "125-140",
                unit: "Trillion USD",
                desc: "attained in yearly economic benefits",
                icon: (
                  <svg
                    className="w-8 h-8 text-[#34D399]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm group transform hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="mb-5 p-4 bg-white/10 rounded-2xl w-fit group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                  {stat.icon}
                </div>
                <div className="text-5xl font-bold text-[#34D399] mb-2 tracking-tight">
                  {stat.val}
                </div>
                <div className="text-sm font-bold uppercase tracking-wider text-gray-300 mb-4">
                  {stat.unit}
                </div>
                <p className="text-gray-200 text-sm leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Components Grid */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif text-[#064E3B] mb-4">
            Core Components
          </h2>
          <div className="w-24 h-1 bg-[#34D399] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Landscape Assessment & Monitoring",
              desc: "Utilizing advanced satellite imagery, AI-driven analytics, and participatory mapping to monitor ecosystem health in real-time.",
              color: "bg-blue-50",
            },
            {
              title: "Inclusive Governance",
              desc: "Establishing multi-stakeholder platforms that give voice to marginalized communities, ensuring equitable land rights and decision-making.",
              color: "bg-green-50",
            },
            {
              title: "Nature-Positive Solutions",
              desc: "Scaling regenerative agriculture practices that enhance biodiversity, improve soil health, and sequester carbon.",
              color: "bg-amber-50",
            },
            {
              title: "Green Finance Mechanisms",
              desc: "Developing novel financial instruments, such as payments for ecosystem services (PES), to incentivize sustainable stewardship.",
              color: "bg-emerald-50",
            },
          ].map((comp, i) => (
            <div
              key={i}
              className={`${comp.color} p-8 rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex gap-6 items-start group transform hover:scale-[1.01]`}
            >
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#064E3B] to-[#059669] text-white flex items-center justify-center font-bold font-serif text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {i + 1}
                </div>
              </div>
              <div>
                <h4 className="font-serif text-xl text-[#064E3B] mb-3 font-semibold">
                  {comp.title}
                </h4>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  {comp.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeContent;
