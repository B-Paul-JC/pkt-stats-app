import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";
import { NavLink } from "react-router";
// Assuming the RandomDirectionButton logic is adapted for static placement here

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger the entrance of each button
    },
  },
};

const itemVariants = {
  // Entrance: Animate from fully hidden/scaled down to its final random position
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

// --- Interface (no change needed here) ---
interface ButtonItem {
  id: string;
  label: string;
  color?: string;
  // initialAngle property is no longer used, but kept in data for safety
  randomX: number; // Percentage (0-100) for horizontal position
  randomY: number; // Percentage (0-100) for vertical position
  randX: number; // For smaller screens (percentage)
  randY: number; // For smaller screens (percentage)
  initialAngle?: number;
}

const TopTextButton: React.FC<{ button: ButtonItem }> = ({ button }) => {
  // 1. We no longer need randomAngle, showText, or handleClick for direction change.
  // The state and handlers are simplified to just manage the click effect if needed.
  // For smaller screens, use the randomX and randomY percentages directly
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
    <motion.div
      style={{ left: leftPos, top: topPos }}
      whileHover={{ color: "rgb(102, 84, 202)" }}
      // Added centering transforms: -translate-x-1/2 -translate-y-1/2
      className="group absolute w-20 h-20 -translate-x-1/2 -translate-y-1/2"
      // Using itemVariants from the parent RandomGrid for staggered entrance
      variants={{
        hidden: { opacity: 0, scale: 0.5 },
        visible: { opacity: 1, scale: 1 },
      }}
    >
      {/* --- Text Positioned Above the Circle --- */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} // Start slightly below
        animate={{ opacity: 1, y: 0 }} // Animate to final position
        transition={{ delay: 0.2 }}
        // Positioning the text:
        // 1. absolute to be removed from flow
        // 2. -top-12 moves it up 3rem (48px) from the button's top edge
        // 3. left-1/2 moves it to 50% of the button's width
        // 4. -translate-x-1/2 centers the text itself
        className="absolute group-hover:-top-0 group-hover:text-transparent transition-all duration-300 -top-12 md:-top-8 md:left-1/3 left-1/2 -translate-x-1/2 
                       text-sm font-bold text-gray-800 whitespace-nowrap pointer-events-none"
      >
        {button.label}
      </motion.div>

      {/* --- Circular Button (Fixed Size) --- */}
      <NavLink to={`/${button.label.toLowerCase()}`}>
        <motion.button
          style={{ cursor: "pointer" }}
          onClick={() => console.log(`Clicked ${button.label}`)}
          className={`
                  w-20 h-20 md:w-15 md:h-15 rounded-full
                  flex items-center justify-center
                  shadow-lg focus:outline-none 
                    z-0 group-hover:z-20 relative 
                    transition-all duration-300
                  ${button.color || "bg-amber-200 hover:bg-indigo-700"}
              `}
          // Click animation (Shrink) remains
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 7px 2px rgba(91, 55, 229, 0.54)",
          }}
          whileTap={{ scale: 0.2 }}
        >
          {/* The circle no longer has an arrow */}
        </motion.button>
      </NavLink>
    </motion.div>
  );
};

// --- Main Grid Component ---
const RandomGrid: React.FC<{ buttons: ButtonItem[] }> = ({ buttons }) => {
  return (
    // The container is relative and given a fixed height/width to define the space
    <motion.div
      className="relative w-full h-[500px] border-gray-400 max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {buttons.map((button) => (
        <TopTextButton key={button.id} button={button} />
      ))}
    </motion.div>
  );
};

export default RandomGrid;
