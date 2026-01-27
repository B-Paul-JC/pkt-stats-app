export type FacultyName =
  | "Agriculture"
  | "Arts"
  | "Basic Medical Sciences"
  | "Clinical Sciences"
  | "Dentistry"
  | "Economics and Management Sciences"
  | "Education"
  | "Environmental Design and Management"
  | "Law"
  | "Pharmacy"
  | "Public Health"
  | "Renewable Natural Resources"
  | "Science"
  | "Technology"
  | "The Social Sciences"
  | "Veterinary Medicine"
  | "Unknown";

export interface Department {
  id: number;
  name: string;
  faculty: FacultyName;
}

export const Faculties = [
  "Agriculture",
  "Arts",
  "Basic Medical Sciences",
  "Clinical Sciences",
  "Dentistry",
  "Economics and Management Sciences",
  "Education",
  "Environmental Design and Management",
  "Law",
  "Pharmacy",
  "Public Health",
  "Renewable Natural Resources",
  "Science",
  "Technology",
  "The Social Sciences",
  "Veterinary Medicine",
  "Unknown",
];

/**
 * Maps a Department Name (case-insensitive) to its ID.
 * Usage: const id = getFacultyId("Computer Science"); // 53
 */
export const getFacultyId = (name: string): number | undefined => {
  const normalized = name.toLowerCase().trim();
  const faculty = Faculties.find((d) => d.toLowerCase() === normalized);
  return faculty ? Faculties.indexOf(faculty) + 1 : undefined;
};

/**
 * Maps a Department ID to the full Department object.
 * Usage: const dept = getDepartment(15); // { id: 15, name: "Computer Science", ... }
 */
export const getFaculty = (id: number | string): FacultyName => {
  const numericId = Number(id);
  return Faculties[numericId - 1] as FacultyName || "Unknown";
};

// Complete Database derived from the provided CSV
export const DEPARTMENTS: Department[] = [
  // Agriculture
  { id: 1, name: "Agricultural Economics", faculty: "Agriculture" },
  { id: 2, name: "Crop and Horticultural Sciences", faculty: "Agriculture" },
  {
    id: 3,
    name: "Agricultural Extension and Rural Development",
    faculty: "Agriculture",
  },
  {
    id: 4,
    name: "Crop Protection and Environmental Biology",
    faculty: "Agriculture",
  },
  { id: 5, name: "Soil Resources Management", faculty: "Agriculture" },
  { id: 6, name: "Animal Science", faculty: "Agriculture" },
  { id: 7, name: "Agronomy", faculty: "Agriculture" },

  // Arts
  { id: 8, name: "Archaeology and Anthropology (Arts)", faculty: "Arts" },
  { id: 9, name: "Theatre Arts", faculty: "Arts" },
  { id: 10, name: "Philosophy", faculty: "Arts" },
  { id: 11, name: "Communication and Language Arts", faculty: "Arts" },
  { id: 12, name: "Arabic and Islamic Studies", faculty: "Arts" },
  { id: 13, name: "English", faculty: "Arts" },
  { id: 14, name: "European Studies", faculty: "Arts" },
  { id: 15, name: "Classical Studies", faculty: "Arts" },
  { id: 16, name: "History", faculty: "Arts" },
  { id: 17, name: "Religious Studies", faculty: "Arts" },
  { id: 18, name: "Linguistics and African Languages", faculty: "Arts" },
  { id: 19, name: "Music", faculty: "Arts" },

  // Basic Medical Sciences
  {
    id: 20,
    name: "BioMedical Laboratory Science",
    faculty: "Basic Medical Sciences",
  },
  { id: 21, name: "Physiology", faculty: "Basic Medical Sciences" },
  { id: 22, name: "Biochemistry", faculty: "Basic Medical Sciences" },

  // Clinical Sciences
  { id: 23, name: "Medicine and Surgery", faculty: "Clinical Sciences" },
  { id: 24, name: "Nursing", faculty: "Clinical Sciences" },
  { id: 25, name: "Physiotherapy", faculty: "Clinical Sciences" },

  // Dentistry
  { id: 26, name: "Dental Surgery", faculty: "Dentistry" },

  // Economics and Management Sciences
  { id: 27, name: "Accounting", faculty: "Economics and Management Sciences" },
  {
    id: 28,
    name: "Marketing and Consumer Studies",
    faculty: "Economics and Management Sciences",
  },
  { id: 29, name: "Economics", faculty: "Economics and Management Sciences" },
  {
    id: 30,
    name: "Banking and Finance",
    faculty: "Economics and Management Sciences",
  },

  // Education
  { id: 31, name: "Arts and Social Sciences Education", faculty: "Education" },
  {
    id: 32,
    name: "Library, Archival and Information Studies",
    faculty: "Education",
  },
  { id: 33, name: "Educational Management", faculty: "Education" },
  { id: 34, name: "Science and Technology Education", faculty: "Education" },
  {
    id: 35,
    name: "Early Childhood and Educational Foundations",
    faculty: "Education",
  },
  { id: 36, name: "Health Education", faculty: "Education" },
  { id: 37, name: "Human Kinetics", faculty: "Education" },
  {
    id: 38,
    name: "Counselling and Human Development Studies",
    faculty: "Education",
  },
  { id: 39, name: "Special Education", faculty: "Education" },
  { id: 40, name: "Adult Education", faculty: "Education" },

  // Environmental Design and Management
  {
    id: 41,
    name: "Architecture",
    faculty: "Environmental Design and Management",
  },
  {
    id: 42,
    name: "Estate Management",
    faculty: "Environmental Design and Management",
  },
  {
    id: 43,
    name: "Quantity Surveying",
    faculty: "Environmental Design and Management",
  },
  {
    id: 44,
    name: "Urban and Regional Planning",
    faculty: "Environmental Design and Management",
  },

  // Law
  { id: 45, name: "Law", faculty: "Law" },

  // Pharmacy
  { id: 46, name: "Pharmacy", faculty: "Pharmacy" },

  // Public Health
  { id: 47, name: "Environmental Health Science", faculty: "Public Health" },
  { id: 48, name: "Human Nutrition and Dietetics", faculty: "Public Health" },

  // Renewable Natural Resources
  {
    id: 49,
    name: "Wildlife and Ecotourism Management",
    faculty: "Renewable Natural Resources",
  },
  {
    id: 50,
    name: "Forest Production and Products",
    faculty: "Renewable Natural Resources",
  },
  {
    id: 51,
    name: "Aquaculture and Fisheries Management",
    faculty: "Renewable Natural Resources",
  },
  {
    id: 52,
    name: "Social and Environmental Forestry",
    faculty: "Renewable Natural Resources",
  },

  // Science
  { id: 53, name: "Computer Science", faculty: "Science" },
  { id: 54, name: "Botany", faculty: "Science" },
  { id: 55, name: "Physics", faculty: "Science" },
  { id: 56, name: "Statistics", faculty: "Science" },
  { id: 57, name: "Chemistry", faculty: "Science" },
  {
    id: 58,
    name: "Archaeology and Anthropology (Science)",
    faculty: "Science",
  },
  { id: 59, name: "Mathematics", faculty: "Science" },
  { id: 60, name: "Geography (Science)", faculty: "Science" },
  { id: 61, name: "Zoology", faculty: "Science" },
  { id: 62, name: "Microbiology", faculty: "Science" },
  { id: 63, name: "Geology", faculty: "Science" },

  // Technology
  { id: 64, name: "Automotive Engineering", faculty: "Technology" },
  {
    id: 65,
    name: "Industrial and Production Engineering",
    faculty: "Technology",
  },
  { id: 66, name: "Civil Engineering", faculty: "Technology" },
  {
    id: 67,
    name: "Agricultural and Environmental Engineering",
    faculty: "Technology",
  },
  { id: 68, name: "Food Technology", faculty: "Technology" },
  { id: 69, name: "Petroleum Engineering", faculty: "Technology" },
  { id: 70, name: "Wood Products Engineering", faculty: "Technology" },
  { id: 71, name: "Mechanical Engineering", faculty: "Technology" },
  {
    id: 72,
    name: "Electrical and Electronics Engineering",
    faculty: "Technology",
  },

  // The Social Sciences
  { id: 73, name: "Sociology", faculty: "The Social Sciences" },
  { id: 74, name: "Psychology", faculty: "The Social Sciences" },
  { id: 75, name: "Political Science", faculty: "The Social Sciences" },
  {
    id: 76,
    name: "Geography (Social Sciences)",
    faculty: "The Social Sciences",
  },

  // Veterinary Medicine
  { id: 77, name: "Veterinary Medicine", faculty: "Veterinary Medicine" },
];

/**
 * Maps a Department ID to the full Department object.
 * Usage: const dept = getDepartment(15); // { id: 15, name: "Computer Science", ... }
 */
export const getDepartment = (id: number | string): Department | undefined => {
  const numericId = Number(id);
  return DEPARTMENTS.find((d) => d.id === numericId);
};

/**
 * Maps a Department Name (case-insensitive) to its ID.
 * Usage: const id = getDepartmentId("Computer Science"); // 53
 */
export const getDepartmentId = (name: string): number | undefined => {
  const normalized = name.toLowerCase().trim();
  const dept = DEPARTMENTS.find((d) => d.name.toLowerCase() === normalized);
  return dept?.id;
};

/**
 * Unified resolver: Accepts ID or Name and returns the full Department object.
 * Useful for search bars or flexible inputs.
 */
export const resolveDepartment = (
  query: number | string,
): Department | undefined => {
  if (typeof query === "number" || (!isNaN(Number(query)) && query !== "")) {
    return getDepartment(query);
  }
  if (typeof query === "string") {
    // Check if it matches a Name
    const byName = DEPARTMENTS.find(
      (d) => d.name.toLowerCase() === query.toLowerCase().trim(),
    );
    if (byName) return byName;
  }
  return undefined;
};

/**
 * Returns all departments belonging to a specific faculty.
 */
export const getDepartmentsByFaculty = (faculty: FacultyName): Department[] => {
  return DEPARTMENTS.filter((d) => d.faculty === faculty);
};

/**
 * Helper to get a display string "Name (Faculty)"
 */
export const getDepartmentLabel = (id: number): string => {
  const dept = getDepartment(id);
  return dept ? `${dept.name} (${dept.faculty})` : `Unknown Dept (${id})`;
};
