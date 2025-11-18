import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, LockIcon } from "lucide-react"; // Using Lucide icons for the indicator
import { EditLogic } from "./editLogic";

// --- Main Drawer Component ---
export const BottomDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const drawerHeightClasses = "h-[400px]"; // Define the maximum height of the drawer

  // Framer Motion variants for the smooth slide animation
  const drawerVariants = {
    // Closed state: Translated up by the height minus the 4rem handle area
    closed: {
      y: `calc(100% - 4rem)`,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      },
    },
    // Open state: No translation, showing the full height
    open: {
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      },
    },
  };

  // Toggle function
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    // Outer container: Fixed to bottom, full width, hidden on desktop (md:)
    <div className="md:hidden">
      <motion.div
        className={`fixed inset-x-0 bottom-0 bg-white shadow-2xl rounded-t-2xl z-40 overflow-hidden ${drawerHeightClasses}`}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={drawerVariants}
      >
        {/* --- Drawer Handle/Indicator (Always Visible) --- */}
        <div
          onClick={toggleDrawer}
          className="w-full h-16 p-10 bg-gray-50 border-b border-gray-200 
                     flex flex-row items-center justify-between cursor-pointer 
                     select-none active:bg-gray-100 transition-colors duration-200"
        >
          <h2 className="font-bold text-indigo-700">
            Statistics Control Centre
          </h2>
          {/* Indicator Icon */}
          <div className="p-2 rounded-full bg-gray-200 mb-1">
            {isOpen ? (
              <ChevronDown className="h-5 w-5 text-gray-700" />
            ) : (
              <ChevronUp className="h-5 w-5 text-gray-700" />
            )}
          </div>
          {/* Status Label */}
        </div>

        {/* --- Drawer Content --- */}
        <div className="p-6 pb-16 h-full overflow-y-auto">
          <EditLogic />
        </div>
      </motion.div>
    </div>
  );
};
