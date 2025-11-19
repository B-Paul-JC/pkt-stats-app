import type { AppRole } from "./accessLevel";

// Defines the shape of the user profile returned after successful login
export interface USER {
  uid?: string;
  email: string;
  userType: AppRole;
  displayName?: string;
  password?: string | number;
}

export const users: USER[] = [
  {
    email: "tp@test.site",
    password: "12349876",
    userType: "ADMIN",
  },
  {
    email: "rv@user.site",
    password: "password123",
    userType: "STAFF",
  },
  {
    email: "cl@student.gems",
    password: "mypassword",
    userType: "STUDENT",
  },
  {
    email: "dean@faculty.edu",
    password: "deanpass",
    userType: "DEAN",
  },
];

/**
 * Simulates an asynchronous login request to a server.
 * Returns a promise that resolves with the USER object upon successful login
 * or rejects with an error message on failure.
 */// --- 2. LOCAL STORAGE UTILITIES ---
export const USER_STORAGE_KEY = 'APP_USER_PROFILE';

export const saveUserToLocalStorage = (profile: USER) => {
  try {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(profile));
  } catch (error) {
    console.error("Error saving to Local Storage:", error);
  }
};

export const loadUserFromLocalStorage = () => {
  try {
    const serializedProfile = localStorage.getItem(USER_STORAGE_KEY);
    if (serializedProfile === null) {
      return null;
    }
    return JSON.parse(serializedProfile);
  } catch (error) {
    console.error("Error loading from Local Storage:", error);
    return null;
  }
};

export const removeUserFromLocalStorage = () => {
  try {
    localStorage.removeItem(USER_STORAGE_KEY);
  } catch (error) {
    console.error("Error removing from Local Storage:", error);
  }
};

export const mockServerLogin = (
  email: string,
  password: string | number
): Promise<USER> => {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      const foundUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (foundUser) {
        // Construct the full USER profile for the successful response
        resolve({
          uid: foundUser.email.split("@")[0].toUpperCase() + "-ID", // Mock UID
          email: foundUser.email,
          userType: foundUser.userType,
          displayName: foundUser.email.split("@")[0].toUpperCase(),
        });
      } else {
        reject("Invalid email or password.");
      }
    }, 500); // 500ms delay for network simulation
  });
};
