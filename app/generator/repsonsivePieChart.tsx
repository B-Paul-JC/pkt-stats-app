import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// --- Types & Interfaces ---

export interface PieChartConfigItem {
  key: string;
  nameKey: string;
  colors?: string[];
}

export interface PieChartConfig {
  pies?: PieChartConfigItem[];
}

export interface ResponsivePieChartProps {
  sortedData: Record<string, any>[];
  config: PieChartConfig;
  total: number;
}

interface LegendEntry {
  value: any; // The label (name)
  color?: string;
  payload?: {
    value: number;
    [key: string]: any;
  };
}

// --- Component ---

export const ResponsivePieChart = ({
  sortedData,
  config,
  total,
}: ResponsivePieChartProps) => {
  // State to track screen size for layout adjustments
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      // Breakpoint at 1024px (standard tablet/desktop boundary)
      setIsMobile(window.innerWidth < 1024);
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    // 1. Parent div must have a defined height for ResponsiveContainer
    <div className="w-full h-125">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 20, bottom: 20, right: 20, left: 20 }}>
          <Tooltip />

          <Legend
            // 2. Switch Layout based on screen size
            layout={isMobile ? "horizontal" : "vertical"}
            verticalAlign={isMobile ? "bottom" : "middle"}
            align={isMobile ? "center" : "right"}
            // Remove fixed width on mobile so it centers properly
            width={isMobile ? undefined : 520}
            // Add padding on mobile to separate from chart
            wrapperStyle={isMobile ? { paddingTop: "20px" } : {}}
            content={({ payload }) => (
              <div
                className={`
                  max-h-112.5 overflow-y-auto pr-2 grid gap-x-6 gap-y-3
                  ${/* 3. Adjust Grid Columns: 1 col on mobile, 3 on desktop */ ""}
                  ${isMobile ? "grid-cols-2 sm:grid-cols-3 text-center w-full" : "grid-cols-3 text-left"}
                `}
              >
                {/* Cast payload to our known interface since Recharts types can be loose */}
                {(payload as LegendEntry[])?.map((entry, index) => {
                  const val = entry.payload?.value || 0;
                  const percent =
                    total > 0 ? ((val / total) * 100).toFixed(1) : "0";

                  return (
                    <div
                      key={`item-${index}`}
                      className={`
                        flex items-center gap-2 text-xs font-bold text-black whitespace-nowrap
                        ${isMobile ? "justify-start" : ""}
                      `}
                    >
                      <div
                        className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span>
                        {entry.value} ({percent}%)
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          />

          {config.pies?.map((pie, idx) => (
            <Pie
              key={idx}
              data={sortedData}
              cx="50%"
              cy="50%"
              // 4. Adjust Radius to prevent overlapping with Legend on small screens
              innerRadius={isMobile ? 60 : 80}
              outerRadius={isMobile ? 90 : 120}
              paddingAngle={2}
              minAngle={5}
              dataKey={pie.key}
              nameKey={pie.nameKey}
            >
              {sortedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    pie.colors
                      ? pie.colors[index % pie.colors.length]
                      : "#eab308"
                  }
                />
              ))}
            </Pie>
          ))}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
