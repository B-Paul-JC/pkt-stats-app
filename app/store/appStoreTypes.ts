import type { AppRole, IAccessLevel } from "~/auth/accessLevel";
import type { USER } from "~/auth/userSimulation";

export type ChartConfig = {
  title: string;
  description: string;
  selectedDataTypes: string[];
  chartType: string[];
  faculty: FACULTY[];
  department: string[];
  year: number[];
  gender: gender[];
  departments: string[];
  cgm: boolean;
  status: Status[];
  active: boolean[];
  stateoforigin: STATEOFORIGIN[];
  yearDisp: string[];
  personnel: PERSONNEL[];
  hallofresidence: HallOfResidence[];
  programmetype: P_Type[];
  level: Levels[];
};

type gender = "Any" | "Male" | "Female";
// Add User Type
export interface User {
  id: number;
  uid: string;
  role: string;
}

export const API_URL = "/api/backend/oauth/auth.php";

export type PERSONNEL =
  | "Any"
  | "Staff"
  | "Student"
  | "Academic Staff"
  | "Non-Academic Staff"
  | "Post-graduate Student"
  | "Under-graduate Student";
export type STATEOFORIGIN =
  | "Any"
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
  | "Any"
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

export type s_type = "Any" | "Postgraduate" | "Undergraduate" | "International";
export type STAFF_TYPE = "Any" | "Academic" | "Non-Academic";
export type k_type = "Any" | "Staff" | "Student" | s_type | STAFF_TYPE;

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
  isAuthenticated: boolean;
  user: User | null;
  isLoadingAuth: boolean;
}

export type Levels = "Any" | 100 | 200 | 300 | 400 | 500 | 600;

export type Status =
  | "Any"
  | "Active"
  | "Inactive"
  | "Suspended"
  | "Graduated"
  | "Withdrawn";

export type HallOfResidence =
  | "Any"
  | "Sultan Bello Hall"
  | "Nnamdi Azikwe Hall"
  | "Ransome Kuti Hall"
  | "Mellanby Hall"
  | "King Tedder Hall"
  | "Queen Idia Hall"
  | "Queen Elizabeth Hall"
  | "Independence Hall"
  | "Obafemi Awolowo Hall";

export type P_Type =
  | "Any"
  | "Full Time"
  | "Part Time"
  | "Distance Learning"
  | "Direct Entry";

export interface IAppStoreActions {
  // --- ACTIONS ---
  // Functions to update the state
  setConfig: (config: ChartConfig) => void;
  setAppRole: (role: AppRole) => void;
  toggleModalTop: () => void;
  setAccessLevel: (accessLevel: IAccessLevel) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  reset: () => void;
  checkAuth: () => Promise<void>;
  login: (user: User) => void;
  logout: () => void;
}

export interface IAppStore extends IAppStoreVariables, IAppStoreActions {}
