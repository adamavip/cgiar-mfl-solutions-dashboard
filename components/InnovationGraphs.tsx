/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useLayoutEffect, useRef, useMemo } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { InnovationRecord } from "../types";

interface InnovationGraphsProps {
  data: InnovationRecord[];
}

const InnovationGraphs: React.FC<InnovationGraphsProps> = ({ data }) => {
  const pieChartRef = useRef<HTMLDivElement>(null);
  const countryChartRef = useRef<HTMLDivElement>(null);
  const scaleChartRef = useRef<HTMLDivElement>(null);

  // Refs to store chart roots for cleanup
  const pieRootRef = useRef<am5.Root | null>(null);
  const countryRootRef = useRef<am5.Root | null>(null);
  const scaleRootRef = useRef<am5.Root | null>(null);

  // --- Aggregation Logic ---
  const typeData = useMemo(() => {
    const counts: Record<string, number> = {};
    data.forEach((item) => {
      const type =
        item["Type of Innovation / Technology/ Tool"]?.trim() || "Unknown";
      // Basic normalization
      if (type) counts[type] = (counts[type] || 0) + 1;
    });

    // Group small values into "Other"
    const threshold = Math.max(1, data.length * 0.05); // 5% threshold
    const groupedData: { category: string; value: number }[] = [];
    let otherCount = 0;

    Object.entries(counts).forEach(([category, value]) => {
      if (value < threshold && Object.keys(counts).length > 6) {
        otherCount += value;
      } else {
        groupedData.push({ category, value });
      }
    });

    if (otherCount > 0) {
      groupedData.push({ category: "Other", value: otherCount });
    }

    return groupedData.sort((a, b) => b.value - a.value);
  }, [data]);

  const countryData = useMemo(() => {
    const counts: Record<string, number> = {};
    data.forEach((item) => {
      const countryRaw = item.Country || "Unknown";
      const countries = countryRaw
        .split(/[,;]/)
        .map((c) => c.trim())
        .filter((c) => c);
      countries.forEach((c) => {
        counts[c] = (counts[c] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .map(([category, value]) => ({ category, value }))
      .sort((a, b) => b.value - a.value) // Descending for vertical bar chart
      .slice(0, 10); // Top 10
  }, [data]);

  const scaleData = useMemo(() => {
    const counts: Record<string, number> = {};
    data.forEach((item) => {
      let scale = item.Scale?.trim() || "Unknown";
      // Normalize case - preserve original capitalization for known scales
      const scaleLower = scale.toLowerCase();
      const scaleMap: Record<string, string> = {
        plot: "Plot",
        farm: "Farm",
        community: "Community",
        landscape: "Landscape",
        multiscale: "Multiscale",
        national: "National",
        unknown: "Unknown",
      };
      scale =
        scaleMap[scaleLower] ||
        scale.charAt(0).toUpperCase() + scale.slice(1).toLowerCase();
      counts[scale] = (counts[scale] || 0) + 1;
    });

    // Define logical order for scales (smallest to largest)
    const scaleOrder: Record<string, number> = {
      Plot: 1,
      Farm: 2,
      Community: 3,
      Landscape: 4,
      Multiscale: 5,
      National: 6,
      Unknown: 99,
    };

    return Object.entries(counts)
      .map(([category, value]) => ({ category, value }))
      .sort((a, b) => {
        // Sort by logical order first, then by value if order is same
        const orderA = scaleOrder[a.category] || 50;
        const orderB = scaleOrder[b.category] || 50;
        if (orderA !== orderB) return orderA - orderB;
        return b.value - a.value;
      });
  }, [data]);

  // --- Helper to Create Root ---
  const createRoot = (element: HTMLElement) => {
    const root = am5.Root.new(element);
    root.setThemes([am5themes_Animated.new(root)]);
    root.numberFormatter.set("numberFormat", "#.");
    return root;
  };

  // --- Chart 1: Types (Donut) ---
  useLayoutEffect(() => {
    if (!pieChartRef.current) return;

    // Cleanup
    if (pieRootRef.current) {
      pieRootRef.current.dispose();
    }

    const root = createRoot(pieChartRef.current);
    pieRootRef.current = root;

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: am5.percent(50),
      })
    );

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        alignLabels: false,
      })
    );

    // Custom Color Set
    series
      .get("colors")
      ?.set("colors", [
        am5.color(0x064e3b),
        am5.color(0x059669),
        am5.color(0x10b981),
        am5.color(0x34d399),
        am5.color(0x6ee7b7),
        am5.color(0xa7f3d0),
        am5.color(0xd1fae5),
      ]);

    series.labels.template.setAll({
      textType: "circular",
      radius: 4,
      fontSize: 11,
      fill: am5.color(0x374151),
    });

    series.slices.template.setAll({
      stroke: am5.color(0xffffff),
      strokeWidth: 2,
      tooltipText: "{category}: {value}",
    });

    series.data.setAll(typeData);

    // Legend
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15,
        layout: root.gridLayout,
      })
    );

    legend.labels.template.setAll({
      fontSize: 11,
      fill: am5.color(0x374151),
    });
    legend.valueLabels.template.setAll({
      fontSize: 11,
      fill: am5.color(0x374151),
    });
    legend.data.setAll(series.dataItems);

    return () => {
      root.dispose();
      pieRootRef.current = null;
    };
  }, [typeData]);

  // --- Chart 2: Countries (Vertical Bar Chart) ---
  useLayoutEffect(() => {
    if (!countryChartRef.current) return;

    if (countryRootRef.current) countryRootRef.current.dispose();

    const root = createRoot(countryChartRef.current);
    countryRootRef.current = root;

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        layout: root.verticalLayout,
        paddingBottom: 50,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
      })
    );

    // X-Axis (Categories)
    const xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 40,
      cellStartLocation: 0.15,
      cellEndLocation: 0.85,
    });

    xRenderer.labels.template.setAll({
      fontSize: 11,
      fill: am5.color(0x374151),
      rotation: -45,
      centerY: am5.p100,
      centerX: am5.p50,
      paddingTop: 10,
      paddingBottom: 5,
      oversizedBehavior: "wrap",
      maxWidth: 80,
      textAlign: "center",
    });

    // Add more space for rotated labels
    xRenderer.labels.template.adapters.add("dy", () => {
      return 0;
    });

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xAxis.data.setAll(countryData);

    // Y-Axis (Values)
    const yRenderer = am5xy.AxisRendererY.new(root, { strokeOpacity: 0.1 });
    yRenderer.labels.template.setAll({
      fontSize: 10,
      fill: am5.color(0x374151),
    });

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: yRenderer,
        numberFormat: "#.",
      })
    );

    // Series
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Count",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "category",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{category}: {valueY}",
        }),
      })
    );

    // Color gradient for bars
    series.columns.template.setAll({
      width: am5.percent(70),
      cornerRadiusTL: 4,
      cornerRadiusTR: 4,
      fill: am5.color(0x064e3b),
      strokeOpacity: 0,
      tooltipText: "{category}: {valueY}",
    });

    // Add hover effect
    series.columns.template.states.create("hover", {
      fill: am5.color(0x059669),
      stroke: am5.color(0xffffff),
      strokeWidth: 2,
    });

    series.data.setAll(countryData);

    return () => {
      root.dispose();
      countryRootRef.current = null;
    };
  }, [countryData]);

  // --- Chart 3: Scale (Horizontal Bar Chart for better readability) ---
  useLayoutEffect(() => {
    if (!scaleChartRef.current) return;

    if (scaleRootRef.current) scaleRootRef.current.dispose();

    const root = createRoot(scaleChartRef.current);
    scaleRootRef.current = root;

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        layout: root.verticalLayout,
      })
    );

    // Y-Axis (Categories) - Inversed for top-down bar
    const yRenderer = am5xy.AxisRendererY.new(root, {
      minGridDistance: 20,
      inversed: true,
      cellStartLocation: 0.1,
      cellEndLocation: 0.9,
    });

    yRenderer.labels.template.setAll({
      fontSize: 11,
      fill: am5.color(0x374151),
      paddingRight: 10,
      oversizedBehavior: "truncate",
      maxWidth: 120,
    });

    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: yRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    yAxis.data.setAll(scaleData);

    // X-Axis (Values)
    const xRenderer = am5xy.AxisRendererX.new(root, { strokeOpacity: 0.1 });
    xRenderer.labels.template.setAll({
      fontSize: 10,
      fill: am5.color(0x374151),
    });

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: xRenderer,
        numberFormat: "#.",
      })
    );

    // Series
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Count",
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: "value",
        categoryYField: "category",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{category}: {valueX}",
        }),
      })
    );

    // Color mapping for scale categories
    const scaleColors: Record<string, am5.Color> = {
      Plot: am5.color(0x3b82f6), // Blue
      Farm: am5.color(0x60a5fa), // Lighter blue
      Community: am5.color(0x34d399), // Green
      Landscape: am5.color(0x10b981), // Darker green
      Multiscale: am5.color(0xf59e0b), // Orange
      National: am5.color(0xef4444), // Red
      Unknown: am5.color(0x9ca3af), // Gray
    };

    series.columns.template.setAll({
      height: am5.percent(70),
      cornerRadiusTR: 4,
      cornerRadiusBR: 4,
      strokeOpacity: 0,
      tooltipText: "{category}: {valueX}",
    });

    // Apply colors based on category
    series.columns.template.adapters.add("fill", (fill, target) => {
      const dataItem = target.dataItem;
      if (dataItem) {
        const category = dataItem.get("categoryY") as string;
        return scaleColors[category] || am5.color(0x6b7280);
      }
      return fill;
    });

    series.data.setAll(scaleData);

    return () => {
      root.dispose();
      scaleRootRef.current = null;
    };
  }, [scaleData]);

  if (data.length === 0) return null;

  return (
    <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Type Chart */}
      <div className="bg-white/80 border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col h-[450px]">
        <div className="mb-4 border-b border-gray-100 pb-2">
          <h3 className="text-sm font-bold text-[#064E3B] uppercase tracking-wide">
            Top Innovation Types
          </h3>
        </div>
        <div
          id="chart-types"
          ref={pieChartRef}
          className="w-full flex-grow relative"
        ></div>
      </div>

      {/* Country Chart */}
      <div className="bg-white/80 border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col h-[450px]">
        <div className="mb-4 border-b border-gray-100 pb-2">
          <h3 className="text-sm font-bold text-[#064E3B] uppercase tracking-wide">
            Top Countries
          </h3>
        </div>
        <div
          id="chart-countries"
          ref={countryChartRef}
          className="w-full flex-grow relative"
        ></div>
      </div>

      {/* Scale Chart */}
      <div className="bg-white/80 border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col h-[450px]">
        <div className="mb-4 border-b border-gray-100 pb-2">
          <h3 className="text-sm font-bold text-[#064E3B] uppercase tracking-wide">
            Implementation Scale
          </h3>
        </div>
        <div
          id="chart-scale"
          ref={scaleChartRef}
          className="w-full flex-grow relative"
        ></div>
      </div>
    </div>
  );
};

export default InnovationGraphs;
