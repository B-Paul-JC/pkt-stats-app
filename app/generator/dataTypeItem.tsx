import React from "react";
import { useAppStore } from "~/store/useAppStore";
import { ClickableTag } from "./clickableTag";
// Ensure you have an icon fallback or imports if your new types don't carry the icon component directly
import { Database } from "lucide-react";

// 1. Define the interface matching the extracted SQL filter structure
interface FilterOption {
  label: string;
  value: any;
}

interface FilterDefinition {
  filter: string; // e.g., 'academic_session_id', 'department_id'
  label: string; // e.g., 'Academic Session'
  type: string;
  possibleValues: (string | FilterOption)[];
  icon?: any; // Optional: The component expects a React component here
}

interface DataTypeHeadingProps {
  type: FilterDefinition;
}

export const DataTypeHeadingBlock: React.FC<DataTypeHeadingProps> = ({
  type,
}) => {
  // Use the icon from the type or a default fallback
  const Icon = type.icon || Database;

  // Access dynamic data from store
  const departments = useAppStore((state) => state.departments);
  // // Add other dynamic lists from store here if needed, e.g.:
  // const faculties = useAppStore((state) => state.facult);

  // 2. Determine which fields to render
  // Default to the static values provided in the JSON
  let fields = type.possibleValues || [];

  // Override with dynamic store data if the filter matches specific IDs
  if (type.filter === "department") {
    fields = departments;
  } else if (type.filter === "faculty") {
    // fields = faculties; // Uncomment if your store has faculties
  }

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
          {fields.map((field, index) => {
            // 3. Normalize the data: Handle both strings and objects { label, value }
            const isObject = typeof field === "object" && field !== null;
            const value = isObject ? (field as FilterOption).value : field;
            const label = isObject ? (field as FilterOption).label : field;

            return (
              <ClickableTag
                key={`${type.filter}-${index}`}
                {...{
                  value,
                  id: type.filter, // Uses the unique filter key (e.g. 'level_id')
                  label: String(label),
                  isSelected: false, // Set defaults to false for a filter list
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
