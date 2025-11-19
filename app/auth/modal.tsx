import React, { useState } from "react";
// Import the actual store and authentication files
import { useAppStore } from "~/store/useAppStore";
import { mockServerLogin, saveUserToLocalStorage, type USER } from "./userSimulation";

export const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // New loading state for async request
  const [error, addError] = useState({ exists: false, message: "" });

  // Destructure state and actions from the store
  const modalTop = useAppStore((state) => state.modalTop);
  const toggleModalTop = useAppStore((state) => state.toggleModalTop);
  const setAuthenticatedUser = useAppStore(
    (state) => state.setAuthenticatedUser
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple submissions

    addError({ exists: false, message: "" });

    // Client-side email validation
    const emailIsInvalid = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (emailIsInvalid) {
      addError({
        exists: true,
        message: "That is not a valid email address!",
      });
      return;
    }

    setLoading(true);

    try {
      // 1. ASYNCHRONOUS LOGIN
      const user = await mockServerLogin(email, password);

      // 2. SUCCESS: UPDATE STORE AND LOCAL STORAGE

      // Update the global store state
      setAuthenticatedUser(user);

      // Persist user data for session continuity
      saveUserToLocalStorage(user);

      // Clear fields and close modal on successful login
      setPassword("");
      setEmail("");
      toggleModalTop();
      window.location.reload();
    } catch (err) {
      // 3. ERROR: Display error message
      const errorMessage =
        typeof err === "string" ? err : "An unknown login error occurred.";
      addError({ exists: true, message: errorMessage });
      console.error("Login failed:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Check if modal is visible using the '0vh' state
  if (modalTop === "-100vh") {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300"
      style={{
        opacity: modalTop === "0vh" ? 1 : 0,
        pointerEvents: modalTop === "0vh" ? "auto" : "none",
      }}
    >
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm transform transition-all duration-300 scale-100">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-4 border-b pb-2">
          User Login
        </h2>

        {/* Mock Credentials Reminder */}
        <div className="text-xs p-3 mb-4 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg">
          <p className="font-semibold mb-1">Mock Credentials:</p>
          <ul className="list-disc list-inside space-y-0.5">
            <li>
              ADMIN: <code className="font-mono">tp@test.site</code> /{" "}
              <code className="font-mono">12349876</code>
            </li>
            <li>
              DEAN: <code className="font-mono">dean@faculty.edu</code> /{" "}
              <code className="font-mono">deanpass</code>
            </li>
            <li>
              STAFF: <code className="font-mono">rv@user.site</code> /{" "}
              <code className="font-mono">password123</code>
            </li>
            <li>
              STUDENT: <code className="font-mono">cl@student.gems</code> /{" "}
              <code className="font-mono">mypassword</code>
            </li>
          </ul>
        </div>

        {error.exists && (
          <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 border border-red-400 rounded-lg font-medium">
            {error.message}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => {
                setPassword("");
                setEmail("");
                setLoading(false);
                addError({ exists: false, message: "" });
                toggleModalTop();
              }}
              className="text-gray-600 rounded-lg px-4 py-2 cursor-pointer hover:bg-red-50 hover:text-red-600 transition duration-150 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center justify-center text-white rounded-lg px-6 py-3 font-semibold transition duration-200 shadow-md cursor-pointer ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-blue-500/50 hover:shadow-lg"
              }`}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Log In"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
