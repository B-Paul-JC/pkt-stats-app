import { type FC } from "react";
import { AlertCircle, Zap, Hammer, Rocket } from "lucide-react";
import { Link } from "react-router";

const UnderConstruction: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Header with Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <Hammer size={80} className="text-yellow-300 animate-bounce" />
            <Zap
              size={40}
              className="text-orange-300 absolute -top-2 -right-2 animate-pulse"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          Under Construction
        </h1>

        {/* Description */}
        <div className="bg-opacity-10 backdrop-blur-md rounded-2xl p-8 mb-8">
          {/* Features List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col items-center ">
              <AlertCircle
                size={32}
                className="text-yellow-300 mb-2 rounded-full w-20 h-14 justify-center mx-auto"
              />
              <p className="font-bold italic text-sm text-white">Stay Tuned</p>
            </div>
            <div className="flex flex-col items-center">
              <Rocket
                size={32}
                className="text-pink-300 mb-2 animate-pulse w-20 h-14 justify-center mx-auto"
              />
              <p className="text-sm text-white italic font-bold">Coming Soon</p>
            </div>
            <div className="flex flex-col items-center">
              <Zap
                size={32}
                className="text-purple-300 mb-2 animate-pulse w-20 h-14 justify-center mx-auto"
              />
              <p className="text-sm text-white italic font-bold">Get Ready</p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-white cursor-pointer text-purple-600 font-bold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
            Notify Me
          </button>
          <Link
            to="/"
            className="px-8 py-3 bg-transparent border-2 cursor-pointer border-white text-white font-bold rounded-lg hover:bg-white hover:text-purple-600 transition-all"
          >
            Go Back
          </Link>
        </div>

        {/* Footer Message */}
        <p className="text-sm text-blue-100 mt-8 opacity-75">
          Thank you for your patience! 🚀
        </p>
      </div>
    </div>
  );
};

export default UnderConstruction;
