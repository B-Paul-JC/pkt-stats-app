import type { CHART_TYPES } from "./types";

export interface ChartTypeItemProps {
  chart: (typeof CHART_TYPES)[0];
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const ChartTypeItem: React.FC<ChartTypeItemProps> = ({
  chart,
  isSelected,
  onSelect,
}) => {
  const Icon = chart.icon;
  return (
    <div
      onClick={() => onSelect(chart.id)}
      className={`
        flex flex-col p-4 rounded-xl shadow-xl transition-all duration-300 cursor-pointer border-4
        ${
          isSelected
            ? "bg-yellow-100 border-yellow-500 ring-4 ring-yellow-500/30"
            : "bg-white border-gray-200 hover:border-yellow-500 hover:bg-gray-100"
        }
      `}
    >
      <div className="flex items-center mb-2">
        <Icon
          className={`w-6 h-6 mr-2 ${isSelected ? "text-yellow-600" : "text-gray-500"}`}
        />
        <h4
          className={`text-lg font-bold truncate transition-colors duration-200 ${isSelected ? "text-gray-900" : "text-gray-800"}`}
        >
          {chart.label}
        </h4>
      </div>
      <p className="text-xs text-gray-500 min-h-[30px]">{chart.description}</p>
    </div>
  );
};
