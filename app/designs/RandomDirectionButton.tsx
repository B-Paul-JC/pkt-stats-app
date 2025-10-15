import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUp } from "react-icons/fi"; // For a nice arrow icon

interface RandomDirectionButtonProps {
  buttonLabel: string; // The text that appears in the random direction
}

const RandomDirectionButton: React.FC<RandomDirectionButtonProps> = ({
  buttonLabel,
}) => {
  // State to hold the random angle in degrees
  const [randomAngle, setRandomAngle] = useState(0);
  // State to control visibility/position of the text (optional, for animation)
  const [showText, setShowText] = useState(false);

  // Function to generate a random angle in an "upward" direction
  // This means between -90 (left-up) and 90 (right-up) degrees from straight up
  const generateRandomUpwardAngle = () => {
    // Generate angle between -80 and 80 degrees (to avoid perfectly horizontal)
    return Math.random() * 160 - 80;
  };

  // Effect to set an initial random direction when the component mounts
  useEffect(() => {
    setRandomAngle(generateRandomUpwardAngle());
    setShowText(true); // Show text initially
  }, []);

  const handleClick = () => {
    setShowText(false); // Hide text briefly for a re-appear animation
    setTimeout(() => {
      setRandomAngle(generateRandomUpwardAngle()); // Generate new angle
      setShowText(true); // Show text again
    }, 100); // Small delay to see the change
  };

  // Calculate the position for the text based on the angle
  // We'll move the text a certain distance (e.g., 100px) from the center of the button
  // Math.cos for X (horizontal), Math.sin for Y (vertical)
  const textX = Math.cos((randomAngle + 90) * (Math.PI / 180)) * 100; // +90 because 0deg is right
  const textY = Math.sin((randomAngle + 90) * (Math.PI / 180)) * 100; // For Y, it's inverted in screen coords

  return (
    <div className="relative w-full h-96 flex items-end justify-center p-4 overflow-hidden">
      {/* --- Randomly Directed Text --- */}
      <AnimatePresence>
        {showText && (
          <motion.div
            key={buttonLabel + randomAngle} // Key ensures re-mount and re-animation on angle change
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ opacity: 1, x: textX, y: -Math.abs(textY) - 50 }} // Adjusted Y for upward
            exit={{ opacity: 0, x: textX * 0.5, y: -Math.abs(textY) - 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute z-10 text-xl font-bold text-gray-800 pointer-events-none"
            style={{
              transform: `translate(-50%, -50%)`, // Center text correctly on its own point
            }}
          >
            {buttonLabel}
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Fixed Circular Button --- */}
      <motion.button
        onClick={handleClick}
        className="relative z-20 w-20 h-20 rounded-full bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
        whileHover={{
          scale: 1.1,
          boxShadow: "0 0 0 8px rgba(255, 255, 255, 0.3)",
        }} // Ripple effect
        whileTap={{ scale: 0.9 }} // Shrink on click
      >
        {/* --- Rotating Arrow --- */}
        <motion.div
          animate={{ rotate: randomAngle }} // Rotate the arrow
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute text-white text-3xl"
        >
          <FiArrowUp />
        </motion.div>
      </motion.button>
    </div>
  );
};

export default RandomDirectionButton;
