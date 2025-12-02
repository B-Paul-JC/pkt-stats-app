import type { AppRole, IAccessLevel } from "~/auth/accessLevel";
import type { USER } from "~/auth/userSimulation";

export type ChartConfig = {
  selectedDataTypes: string[];
  preferredChart: string;
};

export type PERSONNEL =
  | "Staff"
  | "Student"
  | "Academic Staff"
  | "Non-Academic Staff"
  | "Post-graduate Student"
  | "Under-graduate Student";
export type STATEOFORIGIN =
  | "Abia"
  | "Adamawa"
  | "Akwa Ibom"
  | "Anambra"
  | "Bauchi"
  | "Bayelsa"
  | "Benue"
  | "Borno"
  | "Cross River"
  | "Delta"
  | "Ebonyi"
  | "Edo"
  | "Ekiti"
  | "Enugu"
  | "Gombe"
  | "Imo"
  | "Jigawa"
  | "Kaduna"
  | "Kano"
  | "Katsina"
  | "Kebbi"
  | "Kogi"
  | "Kwara"
  | "Lagos"
  | "Nasarawa"
  | "Niger"
  | "Ogun"
  | "Ondo"
  | "Osun"
  | "Oyo"
  | "Plateau"
  | "Rivers"
  | "Sokoto"
  | "Taraba"
  | "Yobe"
  | "Zamfara";

export type IChartDataPoint = Record<string, any>;
export type IChartDataPointObj = Record<string, IChartDataPoint[]>;
export type FACULTY =
  | "All"
  | "Agriculture"
  | "Arts"
  | "Basic Medical Sciences"
  | "Clinical Sciences"
  | "Computing"
  | "Dentistry"
  | "Economics"
  | "Education"
  | "Environmental Design and Management"
  | "Law"
  | "Pharmacy"
  | "Public Health"
  | "Science"
  | "Technology"
  | "Veterinary Medicine";

export type s_type = "Postgraduate" | "Undergraduate" | "International";
export type STAFF_TYPE = "Academic" | "Non-Academic";
export type k_type = "All" | "Staff" | "Student" | s_type | STAFF_TYPE;

interface UserProfile {
  uid: string;
  email: string;
  userType: "ADMIN" | "STAFF" | "STUDENT" | "GUEST";
  displayName: string;
}

export interface IAppStoreVariables {
  // --- STATE ---
  // Store the raw data from your JSON files
  config: ChartConfig;
  // Store the user's filter selection
  appRole: AppRole;
  userProfile: USER | null; // The authenticated user's details
  isLoggedIn: boolean;
  accessLevel: IAccessLevel;
  modalTop: "0vh" | "-100vh";
  faculty: FACULTY;
  department: string;
  year: string;
  gender: "Male" | "Female";
  departments: string[];
  stateoforigin: STATEOFORIGIN;
  personnel: PERSONNEL;
}

export interface IAppStoreActions {
  // --- ACTIONS ---
  // Functions to update the state
  setConfig: (config: ChartConfig) => void;
  setAuthenticatedUser: (user: USER) => void;
  setStateoforigin: (stateoforigin: STATEOFORIGIN) => void;
  setAppRole: (role: AppRole) => void;
  toggleModalTop: () => void;
  setAccessLevel: (accessLevel: IAccessLevel) => void;
  setFaculty: (faculty: FACULTY) => void;
  setDepartment: (department: string) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  reset: () => void;
  setYear: (year: string) => void;
  setGender: (gender: "Male" | "Female") => void;
  logout: () => void;
  setPersonnel: (personnel: PERSONNEL) => void;
}

export interface IAppStore extends IAppStoreVariables, IAppStoreActions {}
