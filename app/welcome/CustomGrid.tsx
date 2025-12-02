import type { FC } from "react";
import { StatCard } from "~/designs/statsCard";

interface mapCon {
  icon: string | FC<any>;
  value: number;
  label: string;
}

const iconMap: mapCon[] = [
  // Mapping string names to Lucide components
  {
    icon: "users",
    value: Math.round((Math.random() + 1) * 245),
    label: "Students",
  },
  {
    icon: "chart-line",
    value: Math.round((Math.random() + 1) * 245),
    label: "Growth",
  },
  {
    icon: "dollar-sign",
    value: Math.round((Math.random() + 1) * 245),
    label: "Cash Flow",
  }, // Using DollarSign
  {
    icon: "thumbs-up",
    value: Math.round((Math.random() + 1) * 245),
    label: "Likes",
  },
  {
    icon: "rocket",
    value: Math.round((Math.random() + 1) * 245),
    label: "Learning",
  },
  {
    icon: "chart-area",
    value: Math.round((Math.random() + 1) * 245),
    label: "aceptance",
  },
  {
    icon: "bell",
    value: Math.round((Math.random() + 1) * 245),
    label: "Timing",
  },
  {
    icon: "wallet",
    value: Math.round((Math.random() + 1) * 245),
    label: "Spendings",
  },
];

export const CustomGrid = () => {
  return (
    <section className="col-start-2 sm:px-8 lg:p-8 grid grid-cols-2 justify-center items-center col-span-1 lg:row-span-full sm:row-span-1 lg:h-full">
      <section
        className="col-span-2 row-span-full lg:row-span-4 pop-in-animation lg:row-start-2 lg:h-full grid grid-cols-2 lg:grid-cols-3 lg:grid-rows-3 gap-4 p-4"
        style={{ animationDelay: "100ms" }}
      >
        <h3 className="col-span-full text-center lg:absolute lg:-top-10 lg:left-1/3 lg:w-1/3 text-2xl pb-6 italic lg:text-white">
          Quick Statistics
        </h3>
        {iconMap.map(({ icon, value, label }, index) => {
          return (
            <StatCard
              key={index}
              icon={icon}
              label={label.toUpperCase()}
              value={value}
              {...{ animationDelay: `${index * 100}ms` }}
            />
          );
        })}
      </section>
    </section>
  );
};
