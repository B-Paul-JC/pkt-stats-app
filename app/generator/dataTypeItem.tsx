import { useAppStore } from "~/store/useAppStore";
import type { DATA_TYPES } from "./types";
import { ClickableTag } from "./clickableTag";

// --- Utility Component: Data Type Heading Block (New Structure) ---
interface DataTypeHeadingProps {
  type: (typeof DATA_TYPES)[0];
}

export const DataTypeHeadingBlock: React.FC<DataTypeHeadingProps> = ({
  type,
}) => {
  const Icon = type.icon;
  const departments = useAppStore((state) => state.departments);

  const fields = type.id === "DEPARTMENT" ? departments : type.fieldValues;

  return (
    <div
      className="p-4 mb-4 rounded-xl shadow-lg transition-all duration-300 border-2  
      bg-white border-gray-200 hover:border-gray-300 h-fit break-inside-avoid-column"
    >
      {/* 1. Clickable Header (Heading) */}
      <div className="flex items-center justify-between cursor-pointer">
        <div className="flex items-center">
          <Icon className={`w-6 h-6 mr-3 text-yellow-500`} />
          <h3 className={`text-lg font-bold text-gray-900`}>{type.label}</h3>
        </div>
      </div>

      {/* 2. Available Values (Body) */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex flex-wrap gap-2 transition-all duration-1500">
          {fields.map((value, index) => {
            return (
              <ClickableTag
                {...{
                  value,
                  id: type.id.toLowerCase(),
                  key: index,
                  label: value,
                  isSelected: true
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
