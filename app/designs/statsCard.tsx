import { type FC } from "react";
// 1. Swapping Font Awesome imports for Lucide React imports
import {
  Users,
  ThumbsUp,
  Rocket,
  AreaChart,
  Bell,
  Wallet,
  Building2,
  Building,
} from "lucide-react";

export interface STCard {
  icon?: string | FC<any>; // Accept either a string key or a React component
  value?: number | string;
  label?: string;
  color?: string; // Tailwind color name (e.g., 'indigo', 'red', etc.)
  unit?: string; // Optional unit to display next to the value
  animationDelay?: string;
}

// 2. Define a mapping for available icons using Lucide components
const iconMap: Record<string, any> = {
  // Mapping string names to Lucide components
  users: Users,
  faculty: Building2,
  dept: Building,
  "thumbs-up": ThumbsUp,
  rocket: Rocket,
  "chart-area": AreaChart,
  bell: Bell,
  wallet: Wallet,
};

export const StatCard: FC<STCard> = ({
  icon = "users",
  value = 680,
  label = "Total Users",
  color = "blue",
  unit,
  animationDelay,
}) => {
  const valueColorClass = `text-${color}-700`;

  const ResolvedIconComponent = typeof icon === "string" ? iconMap[icon] : icon;

  return (
    <div
      className={`relative flex items-center justify-between p-6 rounded-xl
                  bg-linear-to-bl pt-0 bg-blue-400 backdrop-blur-2xl max-h-48 max-w-48
                  shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 glow-pulse-indigo cursor-pointer overflow-clip sclanim`}
      style={{ animationDelay }}
    >
      <div className="flex flex-col mb-2 pt-3 lg:pt-0">
        {/* Icon */}
        {ResolvedIconComponent && (
          // 4. Render the Lucide component and apply size classes (w-12 h-12)
          <div className={`mb-3 text-blue-700`}>
            <ResolvedIconComponent className="w-12 h-12" />
          </div>
        )}

        {/* Value */}
        {/* Label */}
        <p className={`text-xs font-medium text-center`}>{label}</p>
      </div>

      {unit && (
        <span
          className={`ml-2 text-lg font-semibold ${valueColorClass} opacity-75`}
        >
          {unit}
        </span>
      )}
      <span
        className={`text-3xl font-extrabold absolute right-3 text-left bottom-5 `}
      >
        {value}
      </span>
      <div className="absolute w-2xs aspect-square rounded-full bg-white -left-44 md:-left-36 -top-28 -z-30 shadow-2xl inset-1"></div>

      {/* Optional: Add a subtle overlay on hover for extra polish */}
      <div className="absolute inset-0 rounded-xl bg-linear-to-br from-transparent via-transparent to-white opacity-0 hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};
