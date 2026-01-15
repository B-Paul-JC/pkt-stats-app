import React from "react";
import { ChartConf } from "./chartConfig";
import { TypeConf } from "./typeConf";
import { Header } from "./header";

// --- Main Chart Configuration Component ---
export const ChartConfiguration: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="md:grid md:gap-4 lg:grid-cols-2 md:grid-rows-12 mx-auto md:overflow-clip p-4 sm:p-8 max-h-svh h-svh mb-20 sm:mb-0">
        <Header />
        <TypeConf />
        <ChartConf />
      </div>
    </div>
  );
};
