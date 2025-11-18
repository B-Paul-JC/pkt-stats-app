import { Link, useLocation } from "react-router";

export default function NotFound() {
  const location = useLocation();

  return (
    <div className="flex flex-col items-center justify-center p-12 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 h-svh transition-all duration-500">
      {/* Decorative SVG Icon */}
      <div className="mb-8 animate-bounce">
        <svg
          className="w-32 h-32 text-indigo-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <h1 className="text-8xl font-black bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
        404
      </h1>
      <h2 className="text-4xl font-bold text-gray-800 mt-4 mb-4">
        Page Not Found
      </h2>
      <p className="text-lg text-gray-600 text-center max-w-md mb-2">
        Oops! We couldn't find the page at
      </p>
      <code className="bg-indigo-100 px-4 py-2 rounded-lg font-mono text-indigo-700 font-semibold mb-8">
        {location.pathname}
      </code>

      <Link
        to="/"
        className="mt-8 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
      >
        ← Return Home
      </Link>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-indigo-200 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-pink-200 rounded-full opacity-20 blur-xl"></div>
    </div>
  );
}
