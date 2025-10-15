import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router";

// --- Framer Motion Variants ---
// Parent variant for the grid container (for staggered entrance)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.05,
    },
  },
};

// Child variant for each individual button (Entrance: current state)
const itemVariants = {
  // Entrance: Starts off-screen, animates to 'visible' (current state)
  hidden: { y: 20, opacity: 0, scale: 0.8 },
  visible: { y: 0, opacity: 1, scale: 1 },
};

interface ButtonItem {
  id: string;
  label: string;
  color?: string;
}

interface ButtonGridProps {
  buttons: ButtonItem[];
}

const ButtonGrid: React.FC<ButtonGridProps> = ({ buttons }) => {
  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-4 max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible" // Triggers the Entrance animation flow
    >
      <AnimatePresence>
        {buttons.map((button) => (
          <motion.button
            key={button.id}
            className={`
              w-full h-24 
              flex items-center justify-center 
              text-lg font-semibold text-white 
              transition-all duration-200 ease-in-out
              ${button.color || "bg-blue-600 hover:bg-blue-700"} 
              focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500/50 
              shadow-lg
            `}
            variants={itemVariants}
            // --- Hover: Border/Outline Ripple Effect ---
            // We simulate a ripple by expanding the button's shadow and outline ring
            whileHover={{
              scale: 1.05, // Subtle lift
              // box-shadow creates a softer glow/ripple effect
              boxShadow:
                "0 0 0 8px rgba(255, 0, 205, 1), 0 4px 6px rgba(0,0,0,0.1)",
              transition: {
                duration: 0.2,
                type: "spring",
                stiffness: 400,
                damping: 17,
              },
            }}
            // --- Click: Shrink ---
            whileTap={{
              scale: 0.95, // Shrink slightly
              transition: { duration: 0.1 },
            }}
          >
            <NavLink to={`/${button.id}`}>{button.label}</NavLink>
          </motion.button>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default ButtonGrid;
