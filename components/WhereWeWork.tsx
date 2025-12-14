/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";

interface CountryData {
  name: string;
  region: string;
  regionGroup: "Africa" | "Asia" | "Latin America";
  focus: string;
  lat: number;
  lng: number;
}

const WhereWeWork: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("All Regions");
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const countriesData: CountryData[] = [
    {
      name: "Colombia",
      region: "LATIN AMERICA",
      regionGroup: "Latin America",
      focus: "Sustainable Coffee & Cocoa",
      lat: 4.57,
      lng: -74.29,
    },
    {
      name: "Peru",
      region: "LATIN AMERICA",
      regionGroup: "Latin America",
      focus: "High-Andean Ecosystems",
      lat: -9.19,
      lng: -75.01,
    },
    {
      name: "Tunisia",
      region: "NORTH AFRICA",
      regionGroup: "Africa",
      focus: "Dryland Water Management",
      lat: 33.88,
      lng: 9.53,
    },
    {
      name: "Senegal",
      region: "WEST AFRICA",
      regionGroup: "Africa",
      focus: "Agro-ecological Intensification",
      lat: 14.49,
      lng: -14.45,
    },
    {
      name: "Kenya",
      region: "EAST AFRICA",
      regionGroup: "Africa",
      focus: "Rangeland Restoration",
      lat: -0.02,
      lng: 37.9,
    },
    {
      name: "Tanzania",
      region: "EAST AFRICA",
      regionGroup: "Africa",
      focus: "Climate-Smart Mixed Farming",
      lat: -6.36,
      lng: 34.88,
    },
    {
      name: "Zimbabwe",
      region: "SOUTHERN AFRICA",
      regionGroup: "Africa",
      focus: "Crop-Livestock Systems",
      lat: -19.01,
      lng: 29.15,
    },
    {
      name: "India",
      region: "SOUTH ASIA",
      regionGroup: "Asia",
      focus: "Regenerative Agriculture",
      lat: 20.59,
      lng: 78.96,
    },
    {
      name: "Vietnam",
      region: "SOUTHEAST ASIA",
      regionGroup: "Asia",
      focus: "Low-Emission Rice",
      lat: 14.05,
      lng: 108.27,
    },
  ];

  const filteredCountries = useMemo(() => {
    if (selectedRegion === "All Regions") {
      return countriesData;
    }
    return countriesData.filter(
      (country) => country.regionGroup === selectedRegion
    );
  }, [selectedRegion]);

  // Convert Lat/Lng to CSS Top/Left Percentages for map pins
  const countriesWithPosition = countriesData.map((c) => ({
    ...c,
    top: `${((90 - c.lat) / 180) * 100}%`,
    left: `${((c.lng + 180) / 360) * 100}%`,
  }));

  return (
    <div className="bg-gradient-to-b from-[#F5F7F2] via-white to-[#F0FDF4] min-h-full w-full py-20 px-6 md:px-12 flex flex-col items-center gap-20 animate-fade-in text-slate-800">
      {/* Header Section */}
      <div className="text-center max-w-4xl mx-auto">
        <span className="inline-block py-2 px-4 bg-[#DCFCE7] text-[#166534] font-bold tracking-widest uppercase text-xs mb-6 rounded-full border border-[#166534]/20">
          Global Impact
        </span>
        <h1 className="text-5xl md:text-7xl font-serif text-[#064E3B] mb-6 leading-tight font-bold">
          Where We Work
        </h1>
        <p className="text-slate-600 text-xl font-light leading-relaxed max-w-2xl mx-auto">
          Our work spans 9 priority landscapes across 3 continents. We co-design
          solutions rooted in local contexts to solve global challenges.
        </p>
      </div>

      {/* Interactive Map Section */}
      <div className="w-full max-w-7xl">
        <div className="relative w-full bg-[#E8EBE4] rounded-2xl overflow-hidden shadow-xl border border-[#D1D5DB]">
          {/* Map Container - Aspect Ratio 2:1 for Equirectangular Projection */}
          <div className="relative w-full pb-[50%] bg-[#D6D3D1]">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Blue_Marble_2002.png/2560px-Blue_Marble_2002.png"
              alt="World Map (Equirectangular)"
              className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale contrast-125 brightness-110"
            />

            {/* Grid Overlay for texture - subtle */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-10 mix-blend-multiply"></div>

            {/* Country Pins */}
            {countriesWithPosition.map((country) => {
              const isVisible =
                selectedRegion === "All Regions" ||
                country.regionGroup === selectedRegion;
              return (
                <div
                  key={country.name}
                  className={`absolute group/pin transition-opacity duration-300 ${
                    isVisible ? "opacity-100" : "opacity-30"
                  }`}
                  style={{ top: country.top, left: country.left }}
                >
                  <div className="relative -translate-x-1/2 -translate-y-1/2 cursor-pointer">
                    {/* Pulse Effect */}
                    {isVisible && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#064E3B] rounded-full opacity-20 animate-ping"></div>
                    )}
                    {/* Pin Head */}
                    <div
                      className={`relative z-10 w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-[#F5F7F2] shadow-sm transition-all duration-300 ${
                        hoveredCountry === country.name
                          ? "bg-[#059669] scale-125"
                          : "bg-[#064E3B]"
                      }`}
                      onMouseEnter={() => setHoveredCountry(country.name)}
                      onMouseLeave={() => setHoveredCountry(null)}
                    ></div>

                    {/* Tooltip */}
                    <div
                      className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-xl border border-stone-200 transition-all duration-300 z-20 origin-bottom ${
                        hoveredCountry === country.name
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-90 pointer-events-none"
                      }`}
                    >
                      <h4 className="font-serif font-bold text-[#064E3B] text-lg mb-1">
                        {country.name}
                      </h4>
                      <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400 block mb-2">
                        {country.region}
                      </span>
                      <p className="text-xs text-slate-600 leading-tight">
                        {country.focus}
                      </p>
                      <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white/95"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map Legend/Overlay */}
          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-4 py-3 rounded-lg border border-stone-200 shadow-sm hidden md:block">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#064E3B]"></span>
              <span className="text-[#064E3B] font-bold text-xs uppercase tracking-widest">
                Active Landscapes
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="w-full max-w-7xl">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 border-y border-stone-200 py-6">
          {["All Regions", "Africa", "Asia", "Latin America"].map((filter) => (
            <button
              key={filter}
              onClick={() =>
                setSelectedRegion(
                  filter === "All Regions" ? "All Regions" : filter
                )
              }
              className={`text-sm font-medium tracking-wide px-6 py-2 rounded-full transition-all ${
                selectedRegion === filter ||
                (filter === "All Regions" && selectedRegion === "All Regions")
                  ? "bg-[#064E3B] text-white shadow-md"
                  : "text-slate-500 hover:bg-stone-200 hover:text-slate-800"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Country Cards Grid */}
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCountries.map((country) => (
            <div
              key={country.name}
              className="bg-white rounded-2xl overflow-hidden border-2 border-stone-100 shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col transform hover:scale-[1.02] hover:border-[#064E3B]/20"
              onMouseEnter={() => setHoveredCountry(country.name)}
              onMouseLeave={() => setHoveredCountry(null)}
            >
              <div className="p-10 flex flex-col h-full relative overflow-hidden">
                {/* Decorative Background - Stacked Squares */}
                <div className="absolute top-6 right-6 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-300">
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-1">
                      <div className="w-8 h-8 bg-slate-800 rounded-sm"></div>
                      <div className="w-8 h-8 bg-slate-800 rounded-sm"></div>
                      <div className="w-8 h-8 bg-slate-800 rounded-sm"></div>
                    </div>
                    <div className="flex gap-1 ml-4">
                      <div className="w-8 h-8 bg-slate-800 rounded-sm"></div>
                      <div className="w-8 h-8 bg-slate-800 rounded-sm"></div>
                    </div>
                    <div className="flex gap-1 ml-8">
                      <div className="w-8 h-8 bg-slate-800 rounded-sm"></div>
                    </div>
                  </div>
                </div>

                {/* Region Label */}
                <div className="mb-5 relative z-10">
                  <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#F0FDF4] to-[#DCFCE7] text-[#166534] text-[10px] font-bold uppercase tracking-widest rounded-full border border-[#166534]/10 shadow-sm">
                    {country.region}
                  </span>
                </div>

                {/* Country Name */}
                <h3 className="text-4xl font-serif text-slate-800 mb-4 relative z-10 font-bold group-hover:text-[#064E3B] transition-colors duration-300">
                  {country.name}
                </h3>

                {/* Project Description */}
                <p className="text-slate-600 text-base leading-relaxed mb-10 flex-grow relative z-10 font-medium">
                  {country.focus}
                </p>

                {/* Explore Projects Button */}
                <div className="pt-5 border-t-2 border-stone-100 flex items-center gap-2 text-slate-700 relative z-10 group-hover:text-[#064E3B] transition-colors duration-300">
                  <span className="text-xs font-bold uppercase tracking-widest cursor-pointer">
                    Explore Projects
                  </span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredCountries.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">
            No countries found for the selected region.
          </p>
        </div>
      )}
    </div>
  );
};

export default WhereWeWork;
