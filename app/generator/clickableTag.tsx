import React from "react";
import { CheckCircle } from "lucide-react";
import { DEPARTMENTS, useAppStore } from "~/store/useAppStore";

interface ClickableTagProps {
  id: string; // The field ID (e.g., 'DEPARTMENT')
  value: string; // The specific value (e.g., 'Computer Science')
  label: string; // The text to display in the tag
}

/**
 * A small span component that updates the global Zustand store
 * with its id and value upon click.
 */
export const ClickableTag: React.FC<ClickableTagProps> = ({
  id,
  value,
  label,
}) => {
  // Get the action from the store
  id = id.toLowerCase();

  const config = useAppStore((state) => state.config);
  const setState = useAppStore((state) => state.setConfig);
  const curr = useAppStore((state) => state.config[id as keyof typeof state.config]);

  // Check if this specific tag is currently selected
  const isSelected =
    typeof curr === "boolean" ? curr === Boolean(value) : curr === value;

  const handleClick = () => {
    const changedData: any = {[id]: value};

    if (id === "faculty" && config["department"]) {
      // Reset department if faculty changes
      changedData.department = value;
      changedData.departments = DEPARTMENTS[value as keyof typeof DEPARTMENTS];
    }
    setState({...config, ...changedData});
  };

  return (
    <span
      onClick={handleClick}
      className={`
        inline-flex items-center px-4 py-2 text-xs font-medium rounded-full cursor-pointer 
        transition-all duration-100 shadow-md m-1
        ${
          isSelected
            ? "bg-yellow-600 text-white hover:bg-yellow-700 ring-4 ring-yellow-300"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }
      `}
      role="button"
      aria-pressed={isSelected}
    >
      {isSelected && <CheckCircle className="w-4 h-4 mr-2" />}
      {label}
    </span>
  );
};
