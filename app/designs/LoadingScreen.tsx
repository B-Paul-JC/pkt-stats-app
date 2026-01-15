import React from "react";
import logo from "../../public/favicon.ico";

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = "Loading...",
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50/90 backdrop-blur-sm transition-opacity">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-[-1] opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
      </div>

      <div className="flex flex-col items-center justify-center space-y-6 p-8">
        {/* Logo or Brand Icon Placeholder */}
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-xl ring-1 ring-gray-900/5">
          {/* Replace this div with your actual Logo Image if available */}
          <img src={logo} className="w-10 h-12" alt="" />

          {/* Spinner Overlay */}
          <div className="absolute -inset-4">
            <div className="h-24 w-24 rounded-full border-2 border-dashed border-gray-200 animate-spin-slow"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
            Please Wait
          </h3>
          <p className="text-sm text-gray-500 animate-pulse">{message}</p>
        </div>
      </div>
    </div>
  );
};
