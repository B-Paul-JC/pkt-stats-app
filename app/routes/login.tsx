import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAppStore } from "~/store/useAppStore";
import { Lock, Mail, Loader2, ArrowRight } from "lucide-react";
import type { Route } from "../+types/root";
import logo from "../../public/favicon.ico";
import { API_URL } from "~/store/appStoreTypes";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "University of Ibadan Info Statistics" },
    {
      name: "description",
      content: "Login to access generation feature",
    },
  ];
}

export default function Login() {
  const [uid, setUID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginAction = useAppStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Point this to your actual backend URL
      const response = await fetch(API_URL + "?action=login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ uid, password }),
      });

      const data = await response.json();

      if (data.success) {
        loginAction(data.user);
        navigate("/generate-stats");
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError(
        "Unable to connect to the server. Please check your internet connection."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden font-sans">
      {/* Background Decor (Subtle Corporate Pattern) */}
      <div className="absolute inset-0 bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50"></div>
      </div>

      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-[0_20px_50px_rgba(202,138,4,0.07)] overflow-hidden flex flex-col md:flex-row border border-gray-100">
        {/* Left Side: Brand / Logo Area */}
        <div className="w-full md:w-1/2 bg-[#212121] p-12 flex flex-col justify-between relative overflow-hidden">
          {/* Abstract Shapes for visual interest - Using Yellow/Amber tones */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10">
            {/* Logo Placeholder */}
            <div className="h-16 w-16 bg-white rounded-xl mb-6 flex items-center justify-center backdrop-blur-sm border border-white/20">
              <Link to="/"><img src={logo} className="w-10 h-12" alt="" /></Link>
            </div>

            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
              Generate Statistics
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              Generate statistics based on your selections and interests. 
            </p>
          </div>

          <div className="relative z-10 mt-12 md:mt-0">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              System Operational
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 p-12 bg-white">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Welcome Back
            </h2>
            <p className="text-gray-500 text-sm">
              Please sign in to your account
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-100 flex items-start gap-3">
              <div className="mt-0.5 text-red-500">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-xs text-red-600 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5" autoComplete="off">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider ml-1">
                USer ID (Staff Id / Matric Number)
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-yellow-600 transition-colors" />
                </div>
                <input
                  type="text"
                  required
                  value={uid}
                  onChange={(e) => setUID(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all sm:text-sm cursor-text"
                  placeholder="000000"
                  autoComplete="off"
                  name="userid_off"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs text-yellow-600 hover:text-yellow-700 font-medium cursor-pointer"
                >
                  Forgot?
                </a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-yellow-600 transition-colors" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all sm:text-sm cursor-text"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  name="password_off"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center py-3 px-4 rounded-xl text-sm font-semibold text-white shadow-lg shadow-yellow-500/30 transition-all hover:shadow-yellow-500/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 cursor-pointer ${
                loading
                  ? "bg-yellow-400 cursor-not-allowed"
                  : "bg-yellow-600 hover:bg-yellow-700 active:scale-95"
              }`}
            >
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                <>
                  Sign In <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} UI Info Statistics Generator. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
