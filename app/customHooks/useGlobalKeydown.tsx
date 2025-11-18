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
      if (store.isLoggedIn) {
        // If logging out, set user level to VISITOR
        store.setAccessLevel(ACCESS_LEVELS["VISITOR"]);
        store.setAppRole("VISITOR");
      }
      if (!store.isLoggedIn) {
        // If logging in from VISITOR, set user level to STUDENT
        if (store.appRole === "VISITOR") {
          store.setAccessLevel(ACCESS_LEVELS["STUDENT"]);
          store.setAppRole("STUDENT");
        }
      }
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
      ];

      const idx = roles.indexOf(currentRole);
      const nextRole =
        idx === -1 || idx === roles.length - 1 ? roles[0] : roles[idx + 1];
      const accessLevel = ACCESS_LEVELS[nextRole];

      if (currentRole === "VISITOR") {
        // If switching from VISITOR, mimic user login
        store.setIsLoggedIn(true);
      } else if (nextRole === "VISITOR") {
        // If switching to VISITOR, mimic user logout
        store.setIsLoggedIn(false);
      }

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
