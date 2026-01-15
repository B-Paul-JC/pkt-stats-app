import React, { useCallback } from "react";
import { CheckCircle } from "lucide-react";
import { useAppStore } from "~/store/useAppStore";
import type { ChartConfig } from "~/store/appStoreTypes";
import {
  areArraysIdentical,
  removeStringFromArray,
} from "~/store/storeFunctions";
import { DATA_TYPES } from "./types";

interface ClickableTagProps {
  id: string; // The field ID (e.g., 'DEPARTMENT')
  value: string; // The specific value (e.g., 'Computer Science')
  label: string; // The text to display in the tag
  numId: number;
}

/**
 * A small span component that updates the global Zustand store
 * with its id and value upon click.
 */
export const ClickableTag: React.FC<ClickableTagProps> = ({
  id,
  value,
  label,
  numId,
}) => {
  // Get the action from the store
  id = id.toLowerCase();

  const config = useAppStore((state) => state.config);
  const setConfig = useAppStore((state) => state.setConfig);
  const curr = useAppStore(
    (state) => state.config[id as keyof typeof state.config]
  ) as string[];

  // Check if this specific tag is currently selected
  const isSelected =
    typeof curr === "boolean" ? curr === Boolean(value) : curr.includes(value);

  const handleClick = useCallback(() => {
    const pnp = id as keyof ChartConfig;
    const currentValue = config[pnp];

    // Update the store based on whether the current value is an array or a single value

    const arrayValue = currentValue as string[];
    const finalArr = arrayValue.includes(value)
      ? arrayValue.filter((ct) => ct !== value)
      : [...arrayValue, value];

    const pValues = DATA_TYPES[numId].possibleValues;

    console.log({finalArr, pValues});

    if (Array.isArray(pValues)) {
      if (areArraysIdentical(finalArr, removeStringFromArray(pValues, "Any"))) {
        setConfig({ ...config, [pnp]: ["Any"] });
        return;
      }
    }
    if (finalArr.length === 0) {
      setConfig({ ...config, [pnp]: ["Any"] });
      return;
    }
    setConfig({
      ...config,
      [pnp]: removeStringFromArray(finalArr, "Any"),
    });
  }, [config, setConfig]);

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
