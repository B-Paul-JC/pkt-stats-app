import React, { useState, useEffect, useCallback } from "react";
import { ACCESS_LEVELS, type AppRole } from "~/auth/accessLevel";
import { useAppStore } from "~/store/useAppStore";

// --- Reusable Custom Hook for Global Keydown Handling ---

export const useGlobalKeydown = (): void => {
  // Use useCallback to memoize the handler, preventing unnecessary re-creation
  // and ensuring the effect clean-up works correctly.
  const handleKeydown = useCallback((event: KeyboardEvent) => {
    const store = useAppStore.getState();
    // Check if the event target is an input field (to potentially skip the shortcut)
    const isInput = ["INPUT", "TEXTAREA", "SELECT"].includes(
      (event.target as HTMLElement).tagName
    );

    if (event.key === "k") {
      store.setIsLoggedIn(!store.isLoggedIn);
    }
    if (event.key === ";") {
      const currentRole = store.appRole;
      const roles: AppRole[] = [
        "VISITOR",
        "STUDENT",
        "STAFF",
        "HOD",
        "DEAN",
        "PROVOST",
        "ADMIN",
        "VC",
      ]; // adjust to your app's defined access tiers
      const idx = roles.indexOf(currentRole);
      const nextRole =
        idx === -1 || idx === roles.length - 1 ? roles[0] : roles[idx + 1];
      const accessLevel = ACCESS_LEVELS[nextRole];

      store.setAppRole(nextRole);
      store.setAccessLevel(accessLevel);
    }
  }, []); // Dependencies ensure the latest callback and key are used

  useEffect(() => {
    // 1. Attach the listener to the global window object.
    window.addEventListener("keydown", handleKeydown);

    // 2. Cleanup function: This is CRITICAL.
    // It removes the listener when the component unmounts
    // or before the effect re-runs.
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [handleKeydown]); // Only runs if handleKeydown changes (which it won't due to useCallback)
};
