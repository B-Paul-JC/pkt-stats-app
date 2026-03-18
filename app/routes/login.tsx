import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAppStore } from "~/store/useAppStore";
import {
  Lock,
  Mail,
  Loader2,
  ArrowRight,
  ChevronLeftCircle,
  CheckCircle2,
  KeyRound,
  Timer,
} from "lucide-react";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMode, setAuthMode] = useState<
    | "login"
    | "forgot-request"
    | "forgot-verify"
    | "reset-new-password"
    | "success"
  >("login");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginAction = useAppStore((state) => state.login);
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Timer State
  const [countdown, setCountdown] = useState(0);

  // Timer Logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

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
        body: JSON.stringify({ email, password }),
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
        "Unable to connect to the server. Please check your internet connection.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Changed to send { email }
      const response = await fetch(API_URL + "?action=request-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setAuthMode("forgot-verify");
        setCountdown(300);
      } else {
        setError(data.message || "Email not found.");
      }
    } catch (err) {
      setError("Network error. Could not send code.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Changed to send { email, otp }
      const response = await fetch(API_URL + "?action=verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (data.success) {
        setAuthMode("reset-new-password");
      } else {
        setError(data.message || "Invalid or expired code.");
      }
    } catch (err) {
      setError("Network error. Could not verify code.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Changed to send { email, otp, newPassword }
      const response = await fetch(API_URL + "?action=reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await response.json();

      if (data.success) {
        setAuthMode("success");
        setTimeout(() => {
          setAuthMode("login");
          setPassword("");
          setOtp("");
          setNewPassword("");
          // We keep email in case they want to try again, or clear it if preferred
        }, 3000);
      } else {
        setError(data.message || "Failed to reset password.");
      }
    } catch (err) {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  // --- Render Helpers ---

  const renderError = () =>
    error && (
      <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-100 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
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
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden font-sans">
      {/* Background Decor (Subtle Corporate Pattern) */}
      <div className="absolute inset-0 bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50"></div>
      </div>

      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-[0_20px_50px_rgba(202,138,4,0.07)] overflow-hidden flex flex-col md:flex-row border border-gray-100">
        {/* Left Side: Brand / Logo Area */}
        <div className="w-full md:w-1/2 bg-[#212121] p-12 flex flex-col justify-between relative overflow-hidden">
          {/* Abstract Shapes for visual interest - Using blue/blue tones */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10">
            {/* Logo Placeholder */}
            <div className="h-16 w-16 bg-white rounded-xl mb-6 flex items-center justify-center backdrop-blur-sm border border-white/20">
              <Link to="/">
                <img src={logo} className="w-10 h-12" alt="" />
              </Link>
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
          {/* LOGIN FORM */}
          {authMode === "login" && (
            <>
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
              <form
                onSubmit={handleLogin}
                className="space-y-5"
                autoComplete="off"
              >
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider ml-1">
                    Personnel Email
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all sm:text-sm cursor-text"
                      placeholder="hod_maths@ui.edu.ng"
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
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                    </div>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all sm:text-sm cursor-text"
                      placeholder="••••••••"
                      autoComplete="new-password"
                      name="password_off"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex items-center justify-center py-3 px-4 rounded-xl text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer ${
                    loading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 active:scale-95"
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
                <div className="flex justify-end items-center ml-1">
                  <button
                    onClick={() => {
                      setError("");
                      setAuthMode("forgot-request");
                    }}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
              </form>
            </>
          )}

          {/* FORGOT PASSWORD: STEP 1 (Request with EMAIL) */}
          {authMode === "forgot-request" && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <button
                onClick={() => {
                  setError("");
                  setAuthMode("login");
                }}
                className="mb-6 flex items-center text-xs text-blue-600 hover:text-blue-700 font-medium  transition-colors"
              >
                <ChevronLeftCircle className="w-4 h-4 mr-1" /> Back to Login
              </button>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  Reset Password
                </h2>
                <p className="text-gray-500 text-sm">
                  Enter your registered email to receive a code.
                </p>
              </div>

              {renderError()}

              <form onSubmit={handleRequestReset} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider ml-1">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all sm:text-sm"
                      placeholder="user@ui.edu.ng"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex items-center justify-center py-3 px-4 rounded-xl text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/40 cursor-pointer ${
                    loading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 active:scale-95"
                  }`}
                >
                  {loading ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    "Send Code"
                  )}
                </button>
              </form>
            </div>
          )}

          {/* FORGOT PASSWORD: STEP 2 (Verify OTP) */}
          {authMode === "forgot-verify" && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <button
                onClick={() => {
                  setError("");
                  setAuthMode("forgot-request");
                }}
                className="mb-6 flex items-center text-xs text-blue-600 hover:text-blue-700 font-medium  transition-colors"
              >
                <ChevronLeftCircle className="w-4 h-4 mr-1" /> Change Email
              </button>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  Enter Code
                </h2>
                <p className="text-gray-500 text-sm">
                  We sent a code to{" "}
                  <span className="font-semibold text-gray-700">{email}</span>.
                </p>
              </div>

              {renderError()}

              <form onSubmit={handleVerifyOTP} className="space-y-5">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Verification Code
                    </label>
                    <span
                      className={`text-xs font-medium ${countdown < 60 ? "text-red-500" : "text-blue-600"}`}
                    >
                      {countdown > 0 ? formatTime(countdown) : "Expired"}
                    </span>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Timer className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                    </div>
                    <input
                      type="text"
                      required
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all sm:text-sm tracking-widest"
                      placeholder="123456"
                    />
                  </div>
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={handleRequestReset}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Resend Code
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || countdown === 0}
                  className={`w-full flex items-center justify-center py-3 px-4 rounded-xl text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/40 cursor-pointer ${
                    loading || countdown === 0
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 active:scale-95"
                  }`}
                >
                  {loading ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    "Verify Code"
                  )}
                </button>
              </form>
            </div>
          )}

          {/* FORGOT PASSWORD: STEP 3 (New Password) */}
          {authMode === "reset-new-password" && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  New Password
                </h2>
                <p className="text-gray-500 text-sm">
                  Create a strong password for your account.
                </p>
              </div>

              {renderError()}

              <form onSubmit={handleResetPassword} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider ml-1">
                    New Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <KeyRound className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                    </div>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all sm:text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex items-center justify-center py-3 px-4 rounded-xl text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/40 cursor-pointer ${
                    loading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 active:scale-95"
                  }`}
                >
                  {loading ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    "Set New Password"
                  )}
                </button>
              </form>
            </div>
          )}

          {/* SUCCESS STATE */}
          {authMode === "success" && (
            <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Password Reset!
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Your password has been successfully updated. Redirecting to
                login...
              </p>
              <button
                onClick={() => setAuthMode("login")}
                className="text-blue-600 font-semibold hover:text-blue-700 text-sm"
              >
                Return to Login now
              </button>
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} UI Info Statistics Generator. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
