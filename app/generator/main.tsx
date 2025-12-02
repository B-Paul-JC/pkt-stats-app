import React, { useMemo } from "react";
import { CHART_TYPES } from "./types";
import { ChartConf } from "./chartConfig";
import { useAppStore } from "~/store/useAppStore";
import { TypeConf } from "./typeConf";
import { Header } from "./header";

// --- Main Chart Configuration Component ---
export const ChartConfiguration: React.FC = () => {
  const config = useAppStore((store) => store.config);

  // Derived state for display
  const selectedChartObject = useMemo(() => {
    return CHART_TYPES.find((c) => c.id === config.preferredChart);
  }, [config.preferredChart]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="md:grid md:gap-4 lg:grid-cols-2 md:grid-rows-12 mx-auto md:overflow-clip p-4 sm:p-8 max-h-svh h-svh mb-20 sm:mb-0">
        <Header />
        <TypeConf />
        <ChartConf {...{ selectedChartObject }} />
      </div>
    </div>
  );
};
