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
   * Level 10: Basic authenticated user.
   * Can see all public stats plus (hypothetically) their own personal stats.
   */
  STUDENT: {
    level: 10,
    title: "Student",
    description: "Can view general statistics and personal academic data.",
  },

  /**
   * Level 30: General staff.
   * Can see internal university-wide stats not available to the public.
   */
  STAFF: {
    level: 30,
    title: "Staff",
    description: "Can view general internal university statistics.",
  },

  /**
   * Level 50: Department Head.
   * Can view all detailed statistics for their specific department.
   */
  HOD: {
    level: 50,
    title: "Head of Department",
    description: "Can view all statistics for their specific department.",
  },

  /**
   * Level 60: Faculty Head.
   * Can view all detailed statistics for all departments within their faculty.
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
 * --- HOW TO USE THIS ---
 * * 1. A user logs in, and you assign them a role (e.g., 'DEAN').
 * 2. You get their access level: const userLevel = ACCESS_LEVELS['DEAN'].level; // userLevel is 60
 * * 3. To protect a component or data, you check their level:
 * const requiredLevel = ACCESS_LEVELS['HOD'].level; // requiredLevel is 50
 * * 4. Show/Hide logic:
 * if (userLevel >= requiredLevel) {
 * // Show the component or fetch the data
 * } else {
 * // Show "Access Denied"
 * }
 */
