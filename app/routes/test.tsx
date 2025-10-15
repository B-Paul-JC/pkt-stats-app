import React from "react";
import RandomDirectionButton from "../designs/RandomDirectionButton"; // Adjust path
import { NavLink } from "react-router";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        <NavLink to="/">Random Direction Selector</NavLink>
      </h1>
      <RandomDirectionButton buttonLabel="Explore More!" />
      {/* You can add more instances if needed, but they won't interact with each other without more logic */}
    </div>
  );
};

export default App;
