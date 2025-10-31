import { LockIcon } from "lucide-react"; // Make sure to import your icon
import { useState } from "react";

export const EditLogic: React.FC<SloppyParams> = ({ defunct }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual authentication logic
  const onLogin = () => {
    // Implement your login logic here
    defunct(true);
  };

  return (
    <>
      {!isLoggedIn ? (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <div className="p-4 rounded-full bg-gray-200">
            <LockIcon className="w-12 h-12 text-gray-500" />
          </div>
          <p className="text-lg font-semibold text-gray-700">Login Required</p>
          <button
            onClick={onLogin}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 cursor-pointer"
          >
            Login to Edit Stats
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="p-3 bg-indigo-50 rounded-lg border border-indigo-200"
            >
              <p className="text-sm font-semibold text-indigo-800">
                Item {i + 1} of Drawer
              </p>
            </div>
          ))}{" "}
          <div className="flex justify-center">
            <button
              onClick={() => defunct(false)}
              className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 cursor-pointer"
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </>
  );
};
