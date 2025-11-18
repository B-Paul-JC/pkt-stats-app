import React, { useEffect, useState } from "react";
import { useAppStore } from "~/store/useAppStore";

export const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const modalTop = useAppStore((state) => state.modalTop);
  const toggleModalTop = useAppStore((state) => state.toggleModalTop);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    toggleModalTop(); // Close modal after login
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-2xl duration-500 z-50 h-dvh w-screen left-0 transition-top"
      style={{ top: modalTop }}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md px-4 py-2 cursor-pointer"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setPassword("");
                setEmail("");
                toggleModalTop();
              }}
              className="text-gray-700 rounded-md px-4 py-2 cursor-pointer hover:bg-red-400 hover:text-white duration-150 active:bg-red-600"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
