import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface SelfDestructMessageProps {
  message: string;
  duration?: number; // Duration in seconds (default: 5)
  onComplete?: () => void; // Callback to remove component from DOM
}

export const SelfDestructMessage: React.FC<SelfDestructMessageProps> = ({
  message,
  duration = 5,
  onComplete,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isExiting, setIsExiting] = useState(false);

  // Constants for the circular progress
  const radius = 15;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (timeLeft / duration) * circumference;

  useEffect(() => {
    // 1. Timer Logic
    if (timeLeft <= 0) {
      // Trigger exit animation
      setIsExiting(true);

      // Wait for animation to finish before calling parent callback
      const exitTimer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 500); // Matches CSS transition duration

      return () => clearTimeout(exitTimer);
    }

    // Decrement timer every 100ms for smooth progress bar
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 0.1, 0));
    }, 100);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete, duration]);

  // Handle manual dismissal
  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 500);
  };

  return (
    <div
      className={`
        fixed bottom-4 right-4 z-50 flex items-center gap-3 
        bg-white text-red-100 px-4 py-3 rounded-lg shadow-lg border border-red-700/50
        backdrop-blur-sm transition-all duration-500 ease-in-out
        ${isExiting ? "opacity-0 translate-y-4 scale-95" : "opacity-100 translate-y-0 scale-100"}
      `}
      role="alert"
    >
      {/* Icon */}
      <button
        onClick={handleDismiss}
        className="inset-0 flex items-center justify-center h-8 w-8 bg-red-400 rounded-full hover:text-white transition-colors"
        aria-label="Dismiss now"
      >
        <span className="w-5 h-5 text-white shrink-0">
          !
        </span>
      </button>

      {/* Message Content */}
      <div className="flex flex-col mr-2">
        <span className="text-sm font-medium text-red-800">{message}</span>
        <span className="text-[10px] text-red-500 font-mono uppercase tracking-wide">
          Message Clears in {Math.ceil(timeLeft)} seconds
        </span>
      </div>

      {/* Circular Timer & Close Button */}
      <div className="relative w-8 h-8 flex items-center justify-center">
        {/* Background Circle */}
        <svg className="absolute w-full h-full -rotate-90">
          <circle
            cx="16"
            cy="16"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-red-900/50"
          />
          {/* Progress Circle */}
          <circle
            cx="16"
            cy="16"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="text-red-600 transition-[stroke-dashoffset] duration-100 ease-linear"
          />
        </svg>

        {/* Dismiss Button (Center of circle) */}

        <p className="w-fit text-center h-6 text-red-500">{Math.ceil(timeLeft)}</p>
      </div>
    </div>
  );
};
