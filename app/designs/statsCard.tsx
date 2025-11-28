import { type FC } from "react";
// 1. Swapping Font Awesome imports for Lucide React imports
import {
  Users,
  LineChart,
  DollarSign,
  ThumbsUp,
  Rocket,
  AreaChart,
  Bell,
  Wallet,
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
  "chart-line": LineChart,
  "dollar-sign": DollarSign, // Using DollarSign
  "thumbs-up": ThumbsUp,
  rocket: Rocket,
  "chart-area": AreaChart,
  bell: Bell,
  // Added a few extra options
  wallet: Wallet,
};

export const StatCard: FC<STCard> = ({
  icon = "users",
  value = 680,
  label = "Total Users",
  color = "yellow",
  unit,
  animationDelay,
}) => {
  // Tailwind classes for dynamic coloring based on the 'color' prop
  const iconColorClass = `text-${color}-500`;
  const valueColorClass = `text-${color}-700`;
  const labelColorClass = `text-${color}-600`;
  const cardGradientFrom = `from-${color}-200`;
  const cardGradientTo = `to-white`; // Keeping the 'to' color consistent for a clean look

  // 3. Resolve the icon component (either a string key or a component passed directly)
  const ResolvedIconComponent = typeof icon === "string" ? iconMap[icon] : icon;

  return (
    <div
      className={`relative flex items-center justify-between p-6 rounded-xl
                  bg-gradient-to-bl pt-0 bg-yellow-400 backdrop-blur-2xl
                  shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 glow-pulse-indigo cursor-pointer overflow-clip sclanim`}
      style={{ animationDelay }}
    >
      <div className="flex flex-col mb-2 pt-3 lg:pt-0">
        {/* Icon */}
        {ResolvedIconComponent && (
          // 4. Render the Lucide component and apply size classes (w-12 h-12)
          <div className={`mb-3 text-yellow-700`}>
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
        className={`text-3xl font-extrabold absolute right-2 -rotate-45 bottom-8 `}
      >
        {value}
      </span>
      <div className="absolute w-2xs aspect-square rounded-full bg-white -left-36 -top-28 -z-30 shadow-2xl inset-1"></div>

      {/* Optional: Add a subtle overlay on hover for extra polish */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-transparent to-white opacity-0 hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};
