/**
 * Defines the string union of all possible role keys
 * for strong type-checking in the application.
 */
export type AppRole =
  | "VISITOR"
  | "STUDENT"
  | "STAFF"
  | "HOD"
  | "DEAN"
  | "PROVOST"
  | "ADMIN"
  | "VC";

/**
 * Defines the structure for a single access level object.
 */
export interface IAccessLevel {
  /**
   * The numerical weight of the role. Higher numbers = more permissions.
   */
  level: number;

  /**
   * The human-readable title for this role.
   */
  title: string;

  /**
   * A brief description of what this role can generally access.
   */
  description: string;
}

/**
 * Main application access level configuration.
 * Maps role keys (AppRole) to their permission details.
 * This object is used to determine what data a user can see.
 */
export const ACCESS_LEVELS: Record<AppRole, IAccessLevel> = {
  /**
   * Level 1: Public access.
   * Can only see general, non-sensitive, published statistics.
   */
  VISITOR: {
    level: 1,
    title: "Public Visitor",
    description: "Can view public-facing statistics only.",
  },

  /**
   * Level 10: Student access.
   * Can view general public data plus student-specific data (e.g., student enrolment trends).
   */
  STUDENT: {
    level: 10,
    title: "Student",
    description: "Can view student-specific statistics and public data.",
  },

  /**
   * Level 20: General staff access.
   * Can view departmental summary statistics.
   */
  STAFF: {
    level: 20,
    title: "General Staff",
    description: "Can view departmental summary statistics and public data.",
  },

  /**
   * Level 50: Head of Department (HOD).
   * Can view all detailed statistics for their department.
   */
  HOD: {
    level: 50,
    title: "Head of Department",
    description: "Can view all detailed statistics for their department.",
  },

  /**
   * Level 60: Dean of Faculty.
   * Can view all statistics for their entire faculty.
   */
  DEAN: {
    level: 60,
    title: "Dean of Faculty",
    description: "Can view all statistics for their entire faculty.",
  },

  /**
   * Level 70: College Head (e.g., College of Medicine).
   * Can view all detailed statistics for all faculties within their college.
   */
  PROVOST: {
    level: 70,
    title: "Provost of College",
    description: "Can view all statistics for their entire college.",
  },

  /**
   * Level 90: Top-level administration (DVC, Registrar, Bursar).
   * Can view and manage statistics for the entire university.
   */
  ADMIN: {
    level: 90,
    title: "Administrator",
    description: "Can view and manage all statistics across the university.",
  },

  /**
   * Level 100: The Vice-Chancellor.
   * Super-administrator with full access to everything, including settings.
   */
  VC: {
    level: 100,
    title: "Vice-Chancellor",
    description:
      "Has full super-administrator access to all data and settings.",
  },
};

/**
 * Maps the AppRole string to its numerical access level.
 */
export type IAccessLevelMap = {
  [key in AppRole]: number;
};

export const ACCESS_LEVEL_MAP: IAccessLevelMap = (
  Object.keys(ACCESS_LEVELS) as AppRole[]
).reduce((acc, role) => {
  acc[role] = ACCESS_LEVELS[role].level;
  return acc;
}, {} as IAccessLevelMap);
