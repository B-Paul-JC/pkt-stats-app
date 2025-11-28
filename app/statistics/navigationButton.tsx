import type { LucideIcon } from "lucide-react";

export interface NavigationButtonProps {
  onClick: () => void;
  disabled: boolean;
  icon: LucideIcon; // Type for Lucide component
  label: string;
  // New prop for vertical alignment
  isVertical: boolean;
}

// --- Utility component for styled buttons ---
export const NavigationButton: React.FC<NavigationButtonProps> = ({
  onClick,
  disabled,
  icon: Icon,
  label,
  isVertical,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      // Vertical button styling
      className={`
      flex items-center justify-center p-3 sm:p-4 rounded-full 
      transition-all duration-300 
      ${isVertical ? "h-16 w-16 sm:h-12 sm:w-12 text-white" : "space-x-2 px-4 py-2 text-sm font-medium"}
      ${
        disabled
          ? "bg-gray-300/50 text-gray-500 cursor-not-allowed"
          : "bg-yellow-600 hover:bg-yellow-700 shadow-xl hover:scale-105 cursor-pointer"
      }
      focus:outline-none focus:ring-4 focus:ring-yellow-500/50
    `}
      aria-label={label}
    >
      {/* Icon size adjusted for vertical placement */}
      {Icon && <Icon className={`w-6 h-6 ${disabled ? "opacity-50" : ""}`} />}
      {/* Hide label when vertical */}
      <span className={isVertical ? "sr-only" : "hidden sm:inline"}>
        {label}
      </span>
    </button>
  );
};
