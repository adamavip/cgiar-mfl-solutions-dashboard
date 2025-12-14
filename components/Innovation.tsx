/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from "react";
import Assistant from "./Assistant";
import InnovationGraphs from "./InnovationGraphs";
import { JSON_DATA_URL } from "../constants";
import { InnovationRecord } from "../types";
import { generateInnovationSummary } from "../services/geminiService";
import * as XLSX from "xlsx";

// Filter Configuration Mapping
// Label: The text displayed to the user
// Key: The exact column header in the CSV
const FILTER_CONFIG = [
  { label: "Centre (s) involved", key: "Centre (s) involved" },
  {
    label: "Type of innovations/solutions",
    key: "Type of Innovation / Technology/ Tool",
  },
  { label: "Scale", key: "Scale" },
  { label: "Climate Classification", key: "Climate Classification" },
];

// Helper to get the centre field value, handling both possible field names
const getCentreValue = (item: InnovationRecord): string => {
  return (
    item["Centre (s) involved"] || (item as any)["Centre (s) involved "] || ""
  );
};

const Innovation: React.FC = () => {
  const [data, setData] = useState<InnovationRecord[]>([]);
  const [rawJsonData, setRawJsonData] = useState<string>("");

  // Initialize filters based on config
  const [filters, setFilters] = useState<{ [key: string]: string }>(() => {
    const initial: { [key: string]: string } = {};
    FILTER_CONFIG.forEach((f) => (initial[f.key] = "All"));
    return initial;
  });

  const [aiSummary, setAiSummary] = useState<string>(
    "Loading AI analysis of current view..."
  );
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to map JSON fields to InnovationRecord format
  const mapJsonToRecord = (jsonRecord: any): InnovationRecord => {
    // Create a description from available fields
    const descriptionParts: string[] = [];
    if (jsonRecord["Challenge it was addressing"]) {
      descriptionParts.push(
        `Challenge: ${jsonRecord["Challenge it was addressing"]}`
      );
    }
    if (jsonRecord["Data collected"]) {
      descriptionParts.push(`Data: ${jsonRecord["Data collected"]}`);
    }
    if (jsonRecord.Site) {
      descriptionParts.push(`Site: ${jsonRecord.Site}`);
    }
    const description =
      descriptionParts.length > 0
        ? descriptionParts.join(". ")
        : jsonRecord["Innovation/ Technology/ Tool"] ||
          "No description available";

    return {
      Innovation: jsonRecord["Innovation/ Technology/ Tool"] || "",
      "Type of Innovation / Technology/ Tool":
        jsonRecord["Type of Innovation / Technology/ Tool"] || "",
      Scale: jsonRecord.Scale || "",
      "Production system": jsonRecord["Production system"] || "",
      "Climate Classification": jsonRecord["Climate Classification"] || "",
      Country: jsonRecord.Country || "",
      Description: description,
      "Centre (s) involved":
        jsonRecord["Centre (s) involved "] ||
        jsonRecord["Centre (s) involved"] ||
        "",
      // Include all other fields for compatibility
      ...jsonRecord,
    };
  };

  // Load Data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(JSON_DATA_URL);
        if (!response.ok) throw new Error("Failed to fetch data");

        const text = await response.text();
        setRawJsonData(text);

        // Parse NDJSON (newline-delimited JSON)
        const lines = text.split("\n").filter((line) => line.trim());
        const parsedData = lines
          .map((line) => {
            try {
              return JSON.parse(line);
            } catch (e) {
              console.warn("Failed to parse JSON line:", line);
              return null;
            }
          })
          .filter((record) => record !== null);

        // Map JSON records to InnovationRecord format
        const mappedData = parsedData.map(mapJsonToRecord);

        setData(mappedData);
      } catch (error) {
        console.error("Error loading JSON:", error);
        setAiSummary("Error loading dataset. Please try refreshing.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log(Object.keys(data));

  // Dynamic Filter Options
  const filterOptions = useMemo(() => {
    const options: { [key: string]: Set<string> } = {};

    FILTER_CONFIG.forEach((config) => {
      options[config.key] = new Set(["All"]);
    });

    data.forEach((item) => {
      FILTER_CONFIG.forEach((config) => {
        let rawVal: any;
        // Special handling for 'Centre (s) involved' to handle both field name variations
        if (config.key === "Centre (s) involved") {
          rawVal = getCentreValue(item);
        } else {
          rawVal = item[config.key];
        }

        if (rawVal) {
          // Special handling for 'Centre (s) involved' to split multiple values
          if (config.key === "Centre (s) involved") {
            // Split by comma or semicolon, trim whitespace
            const centers = String(rawVal)
              .split(/[,;]/)
              .map((s) => s.trim())
              .filter((s) => s);
            centers.forEach((c) => options[config.key].add(c));
          } else {
            options[config.key].add(String(rawVal));
          }
        }
      });
    });

    // Sort options alphabetically
    Object.keys(options).forEach((key) => {
      const sorted = Array.from(options[key]).sort();
      options[key] = new Set(["All", ...sorted]);
    });

    return options;
  }, [data]);

  // Filtered Data Logic
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return FILTER_CONFIG.every((config) => {
        const filterValue = filters[config.key];
        let itemValue: any;

        // Special handling for 'Centre (s) involved' to handle both field name variations
        if (config.key === "Centre (s) involved") {
          itemValue = getCentreValue(item);
        } else {
          itemValue = item[config.key];
        }

        if (filterValue === "All") return true;

        if (config.key === "Centre (s) involved") {
          if (!itemValue) return false;
          // Check if the selected center is present in the item's list
          const centers = String(itemValue)
            .split(/[,;]/)
            .map((s) => s.trim());
          return centers.includes(filterValue);
        }

        return String(itemValue) === filterValue;
      });
    });
  }, [data, filters]);

  // Trigger AI Summary on Filter Change
  useEffect(() => {
    let isMounted = true;
    const fetchSummary = async () => {
      if (filteredData.length === 0) {
        setAiSummary("No innovations match the selected criteria.");
        return;
      }
      setIsSummarizing(true);
      setAiSummary("Gemini is analyzing the filtered data...");

      // Debounce slightly to avoid rapid API calls during selection
      await new Promise((r) => setTimeout(r, 800));

      if (!isMounted) return;

      const summary = await generateInnovationSummary(filteredData);
      if (isMounted) {
        setAiSummary(summary);
        setIsSummarizing(false);
      }
    };

    if (!isLoading && data.length > 0) {
      fetchSummary();
    }
    return () => {
      isMounted = false;
    };
  }, [filteredData, isLoading, data.length]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Download functions
  const downloadCSV = () => {
    if (filteredData.length === 0) {
      alert("No data to download.");
      return;
    }

    // Prepare data for CSV
    const csvData = filteredData.map((item) => ({
      Innovation: item.Innovation || "",
      "Centre (s) involved": getCentreValue(item) || "",
      "Type of Innovation / Technology/ Tool":
        item["Type of Innovation / Technology/ Tool"] || "",
      Scale: item.Scale || "",
      "Climate Classification": item["Climate Classification"] || "N/A",
      Country: item.Country || "",
      Description: item.Description || "",
    }));

    // Convert to CSV string
    const headers = Object.keys(csvData[0]);
    const csvRows = [
      headers.join(","),
      ...csvData.map((row) =>
        headers
          .map((header) => {
            const value = row[header as keyof typeof row] || "";
            // Escape quotes and wrap in quotes if contains comma, newline, or quote
            const stringValue = String(value);
            if (
              stringValue.includes(",") ||
              stringValue.includes("\n") ||
              stringValue.includes('"')
            ) {
              return `"${stringValue.replace(/"/g, '""')}"`;
            }
            return stringValue;
          })
          .join(",")
      ),
    ];

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `innovations_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadExcel = () => {
    if (filteredData.length === 0) {
      alert("No data to download.");
      return;
    }

    // Prepare data for Excel
    const excelData = filteredData.map((item) => ({
      Innovation: item.Innovation || "",
      "Centre (s) involved": getCentreValue(item) || "",
      "Type of Innovation / Technology/ Tool":
        item["Type of Innovation / Technology/ Tool"] || "",
      Scale: item.Scale || "",
      "Climate Classification": item["Climate Classification"] || "N/A",
      Country: item.Country || "",
      Description: item.Description || "",
    }));

    // Create workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Innovations");

    // Set column widths
    const columnWidths = [
      { wch: 30 }, // Innovation
      { wch: 25 }, // Centre (s) involved
      { wch: 30 }, // Type of Innovation
      { wch: 15 }, // Scale
      { wch: 20 }, // Climate Classification
      { wch: 15 }, // Country
      { wch: 50 }, // Description
    ];
    worksheet["!cols"] = columnWidths;

    // Download
    XLSX.writeFile(
      workbook,
      `innovations_${new Date().toISOString().split("T")[0]}.xlsx`
    );
  };

  return (
    <div className="bg-gradient-to-b from-[#B0F6C0] via-[#C6F6D5] to-[#D1FAE5] min-h-full w-full py-12 px-4 md:px-12 flex flex-col items-center gap-10 animate-fade-in relative">
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#064E3B] mb-4">
          Innovation / Solutions
        </h1>
        <p className="text-slate-600 text-lg">
          Explore our comprehensive database of agricultural innovations and
          solutions
        </p>
      </div>

      {/* Dynamic Filters Grid */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {FILTER_CONFIG.map((config) => (
          <div key={config.key} className="relative flex flex-col gap-1">
            <label className="text-xs font-bold text-[#064E3B] uppercase tracking-wide ml-1">
              {config.label}
            </label>
            <div className="relative">
              <select
                value={filters[config.key]}
                onChange={(e) => handleFilterChange(config.key, e.target.value)}
                className="w-full appearance-none bg-[#FFF2A7] border-2 border-black/80 rounded-xl py-3.5 px-4 shadow-md text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00703c] focus:border-[#00703c] transition-all duration-200 hover:shadow-lg"
              >
                {Array.from(filterOptions[config.key] || []).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Row */}
      <div className="w-full max-w-7xl flex flex-wrap justify-between gap-4">
        {[
          { num: filteredData.length.toString(), text: "Innovations Shown" },
          {
            num: new Set(filteredData.map((d) => d.Country)).size.toString(),
            text: "Countries",
          },
          {
            num: new Set(
              filteredData.flatMap((d) =>
                String(getCentreValue(d) || "")
                  .split(/[,;]/)
                  .map((s) => s.trim())
                  .filter((s) => s)
              )
            ).size.toString(),
            text: "Centers",
          },
          { num: "AI", text: "Powered Analysis" },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-white/90 backdrop-blur-sm border-2 border-white/50 rounded-2xl px-8 py-4 flex flex-col items-center justify-center flex-1 min-w-[140px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <span className="text-3xl font-bold text-[#064E3B] mb-1">
              {stat.num}
            </span>
            <span className="text-xs text-slate-600 font-semibold uppercase tracking-wider">
              {stat.text}
            </span>
          </div>
        ))}
      </div>

      {/* AI Summary Box */}
      <div className="w-full max-w-7xl">
        <div className="w-full bg-gradient-to-br from-[#FFF2A7] to-[#FEF3C7] border-2 border-[#FCD34D]/50 rounded-2xl p-10 min-h-[180px] shadow-xl flex flex-col items-center justify-center relative overflow-hidden">
          <span className="font-bold text-[#B8860B] mb-2 uppercase tracking-widest text-xs flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
            Gemini AI Summary
          </span>
          <p
            className={`text-slate-700 text-sm md:text-base text-center max-w-3xl leading-relaxed transition-opacity duration-500 ${
              isSummarizing ? "opacity-50 blur-sm" : "opacity-100"
            }`}
          >
            {aiSummary}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <InnovationGraphs data={filteredData} />

      {/* List View of Innovations */}
      <div className="w-full max-w-7xl bg-white/90 backdrop-blur-sm border-2 border-white/50 rounded-2xl p-8 overflow-hidden shadow-xl">
        {/* Download Buttons */}
        <div className="flex justify-end gap-3 mb-4">
          <button
            onClick={downloadCSV}
            disabled={filteredData.length === 0}
            className="px-5 py-2.5 bg-[#064E3B] text-white rounded-xl text-sm font-semibold hover:bg-[#022C22] hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transform hover:scale-105 disabled:hover:scale-100"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download CSV
          </button>
          <button
            onClick={downloadExcel}
            disabled={filteredData.length === 0}
            className="px-5 py-2.5 bg-[#059669] text-white rounded-xl text-sm font-semibold hover:bg-[#047857] hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transform hover:scale-105 disabled:hover:scale-100"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download Excel
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-200 bg-slate-50/50">
                <th className="py-4 px-5 font-bold text-[#064E3B] uppercase text-xs tracking-wider">
                  Innovation
                </th>
                <th className="py-4 px-5 font-bold text-[#064E3B] uppercase text-xs tracking-wider">
                  Centre (s)
                </th>
                <th className="py-4 px-5 font-bold text-[#064E3B] uppercase text-xs tracking-wider">
                  Type
                </th>
                <th className="py-4 px-5 font-bold text-[#064E3B] uppercase text-xs tracking-wider">
                  Scale
                </th>
                <th className="py-4 px-5 font-bold text-[#064E3B] uppercase text-xs tracking-wider">
                  Climate
                </th>
                <th className="py-4 px-5 font-bold text-[#064E3B] uppercase text-xs tracking-wider">
                  Country
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-slate-100 hover:bg-[#F0FDF4] transition-all duration-200 group"
                  >
                    <td className="py-4 px-5 font-semibold text-[#064E3B] group-hover:text-[#059669] transition-colors">
                      {item.Innovation}
                    </td>
                    <td className="py-4 px-5 text-slate-700 text-sm font-medium">
                      {getCentreValue(item)}
                    </td>
                    <td className="py-4 px-5 text-slate-700 text-sm font-medium">
                      {item["Type of Innovation / Technology/ Tool"]}
                    </td>
                    <td className="py-4 px-5 text-slate-700 text-sm">
                      <span className="inline-block px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
                        {item.Scale}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-slate-700 text-sm font-medium">
                      {item["Climate Classification"] || "N/A"}
                    </td>
                    <td className="py-4 px-5 text-slate-700 text-sm font-medium">
                      {item.Country}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="py-8 text-center text-slate-500 italic"
                  >
                    {isLoading
                      ? "Loading dataset..."
                      : "No innovations found matching filters."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Chatbot */}
      <Assistant contextData={rawJsonData} />
    </div>
  );
};

export default Innovation;
