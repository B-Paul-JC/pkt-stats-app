import { useEffect, useState } from "react";
import { NavLink } from "react-router";

interface ButtonItem {
  id: string;
  label: string;
  randomX: number; // Percentage for large screens
  randomY: number; // Percentage for large screens
  randX: number; // Percentage for small screens
  randY: number; // Percentage for small screens
  color?: string; // Optional color class
}

const TopTextButton: React.FC<{
  button: ButtonItem;
  disp: "none" | "absolute";
}> = ({ button, disp }) => {
  const [leftPos, setLeftPos] = useState<string>(`${button.randomX}%`);
  const [topPos, setTopPos] = useState<string>(`${button.randomY}%`);

  useEffect(() => {
    const newLeftPos =
      window.innerWidth < 640 ? `${button.randX}%` : `${button.randomX}%`;
    const newTopPos =
      window.innerWidth < 640 ? `${button.randY}%` : `${button.randomY}%`;
    setLeftPos(newLeftPos);
    setTopPos(newTopPos);
  }, [button.randX, button.randY, button.randomX, button.randomY]);

  return (
    // Button container is centered on its random point
    <div
      style={{ left: leftPos, top: topPos, display: disp }}
      className="group absolute w-20 h-20 -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer transition-all duration-800"
    >
      {/* --- Text Positioned Above the Circle --- */}
      <div
        className="absolute group-hover:-top-0  cursor-pointer group-hover:text-transparent transition-all duration-300 -top-12 md:-top-8 md:left-1/3 left-1/2 -translate-x-1/2 
                       text-sm font-bold text-gray-800 whitespace-nowrap pointer-events-none"
      >
        {button.label}
      </div>

      {/* --- Circular Button (Fixed Size) --- */}
      <NavLink to={`/${button.label.toLowerCase()}`}>
        <button
          className={`
            w-20 h-20 md:w-15 md:h-15 rounded-full
            flex items-center justify-center
            shadow-lg focus:outline-none
            animate-bounce cursor-pointer
            transition-all duration-300
            ${button.color || "bg-amber-200 hover:bg-indigo-700"}
          `}
          onClick={(e) => {
            const { clientX, clientY } = e;
            localStorage.setItem(
              `last-coords`,
              JSON.stringify({ x: clientX, y: clientY })
            );
          }}
          style={{ animationDelay: `${+button.id * 120}ms` }}
        >
          {/* The circle no longer has an arrow */}
        </button>
      </NavLink>
    </div>
  );
};

// --- Main Grid Component ---
const RandomGrid: React.FC<{ buttons: ButtonItem[] }> = ({ buttons }) => {
  return (
    // The container is relative and given a fixed height/width to define the space
    <div className="relative w-full h-[500px] max-w-7xl mx-auto">
      {buttons.map((button) => (
        <TopTextButton
          key={button.id}
          button={button}
          disp={
            ["Students", "Staff", "Accomodation", "Faculty"].includes(button.label)
              ? "absolute"
              : "none"
          }
        />
      ))}
    </div>
  );
};

export default RandomGrid;
