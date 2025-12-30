import { Settings2, type LucideProps } from "lucide-react";
import { ChartTypeItem } from "./chartTypeItem";
import { CHART_TYPES } from "./types";
import { useAppStore } from "~/store/useAppStore";
import { useCallback } from "react";

type cnfg =
  | {
      id: string;
      label: string;
      icon: React.ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
      >;
      description: string;
    }
  | undefined;

export const ChartConf = ({
  selectedChartObject,
}: {
  selectedChartObject: cnfg;
}) => {
  const state = useAppStore((state) => state);
  const config = useAppStore((store) => store.config);
  const setConfig = useAppStore((store) => store.setConfig);

  const handleChartTypeSelect = useCallback((id: string) => {
    setConfig({
      ...config,
      preferredChart: id,
    });
  }, []);

  const handleSaveConfig = () => {
    console.log("Saving Chart Configuration:", config);
    console.log("Configuration Saved! Check the console for data.");
  };

  return (
    <section className="p-6 bg-white rounded-xl shadow-lg h-fit md:h-full border col-span-1 row-span-12 border-gray-200">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {CHART_TYPES.map((chart) => (
          <ChartTypeItem
            key={chart.id}
            chart={chart}
            isSelected={config.preferredChart === chart.id}
            onSelect={(id) => {
              handleChartTypeSelect(id);
            }}
          />
        ))}
      </div>
      <div className="mt-8 p-4 bg-gray-100 text-gray-700 rounded">
        <p>
          <strong>Personnel</strong>: {state.personnel}
          <br />
          <strong>Gender</strong>: {state.gender}
          <br />
          <strong>State Of Origin</strong>: {state.stateoforigin}
          <br />
          <strong>Faculty</strong>: {state.faculty}
          <br />
          <strong>Department</strong>: {state.department}
          <br />
          <strong>Academic Year</strong>: {state.yearDisp}
          <br />
        </p>
        <p className="text-gray-700">
          <strong>Preferred Chart:</strong>{" "}
          {selectedChartObject?.label || "None"}
        </p>
      </div>
      <button
        onClick={() => {
          handleSaveConfig();
        }}
        className="fixed md:absolute m-4 bottom-8 right-8 flex items-center px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition duration-200"
      >
        <Settings2 className="w-5 h-5 mr-2" />
        Generate
      </button>
    </section>
  );
};
