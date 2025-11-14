import { create } from "zustand";
import students from "~/dummyData/students.json";
import staff from "~/dummyData/staff.json";
import faculty from "~/dummyData/faculty.json";
import accomodation from "~/dummyData/accomodation.json";

const sdatasets: Record<string, any> = {
  students,
  staff,
  faculty,
  accomodation,
};

const DEPARTMENTS: Record<FACULTY, string[]> = {
  Agriculture: [
    "Agricultural Economics",
    "Agricultural Extension and Rural Development",
    "Agronomy",
    "Animal Science",
    "Crop Protection and Environmental Biology",
    "Aquaculture and Fisheries Management",
    "Forest Production and Products",
    "Social and Environmental Forestry",
    "Wildlife and Ecotourism Management",
  ],
  Arts: [
    "Arabic and Islamic Studies",
    "Archaeology and Anthropology",
    "Classics",
    "Communication and Language Arts",
    "English Language and Literature",
    "European Studies",
  ],
  "Basic Medical Sciences": [
    "Anatomy",
    "Biochemistry",
    "Biomedical Laboratory Sciences",
    "Chemical Pathology",
    "Haematology",
    "Medical Microbiology and Parasitology",
    "Pathology",
    "Pharmacology and Therapeutics",
    "Physiology",
    "Virology",
  ],
  "Clinical Sciences": [
    "Anaesthesia",
    "Chemical Pathology",
    "Haematology",
    "Medical Microbiology and Parasitology",
    "Medicine",
    "Nursing",
    "Obstetrics and Gynaecology",
    "Ophthalmology",
    "Oto-Rhino-Laryngology",
    "Paediatrics",
    "Pathology",
    "Psychiatry",
    "Radiology",
    "Surgery",
  ],
  Computing: [
    "Cyber Security",
    "Software Engineering",
    "Data Science",
    "Information Communication Technology",
  ],
  Dentistry: [
    "Child Oral Health",
    "Oral and Maxillofacial Surgery",
    "Oral Pathology",
    "Periodontology and Community Dentistry",
    "Restorative Dentistry",
  ],
  Economics: ["Economics"],
  Education: [
    "Adult Education",
    "Counselling and Human Development Studies",
    "Educational Management",
    "Human Kinetics",
    "Health Education",
    "Library, Archival and Information Studies",
    "Social Work",
    "Special Education",
  ],
  "Environmental Design and Management": [
    "Architecture",
    "Estate Management",
    "Urban and Regional Planning",
  ],
  Law: ["Public Law", "Private and Property Law"],
  Pharmacy: [
    "Pharmaceutical Chemistry",
    "Pharmaceutics and Industrial Pharmacy",
    "Pharmacognosy",
    "Pharmacology and Toxicology",
    "Clinical Pharmacy and Pharmacy Administration",
  ],
  "Public Health": [
    "Health Policy and Management",
    "Epidemiology and Medical Statistics",
    "Environmental Health Sciences",
    "Health Promotion and Education",
    "Human Nutrition and Dietetics",
  ],
  Science: [
    "Botany",
    "Chemistry",
    "Geology",
    "Mathematics",
    "Microbiology",
    "Physics",
    "Statistics",
    "Zoology",
  ],
  Technology: [
    "Agricultural and Environmental Engineering",
    "Civil Engineering",
    "Electrical and Electronic Engineering",
    "Food Technology",
    "Industrial and Production Engineering",
    "Mechanical Engineering",
    "Petroleum Engineering",
  ],
  "Veterinary Medicine": [
    "Veterinary Anatomy",
    "Veterinary Medicine",
    "Veterinary Microbiology and Parasitology",
    "Veterinary Pathology",
    "Veterinary Physiology and Biochemistry",
    "Veterinary Public Health and Preventive Medicine",
    "Veterinary Surgery and Reproduction",
  ],
};

export type IChartDataPoint = Record<string, any>;
export type IChartDataPointObj = Record<string, IChartDataPoint[]>;
export type FACULTY =
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

export interface IAppStoreVariables {
  // --- STATE ---
  // Store the raw data from your JSON files
  cdata: IChartDataPointObj | IChartDataPoint[];
  // Store the user's filter selection
  selectedType:
    | { value: string; display: string }
    | { value: ""; display: "Select a type..." };
  keyValue: "" | string;
  faculty: FACULTY;
  department: string;
  departments: string[];
}
export interface IAppStoreActions {
  // --- ACTIONS ---
  // Functions to update the state
  setSelectedType: (type: string | null) => void;
  setKeyValue: (keyValue: string) => void;
  setFaculty: (faculty: FACULTY) => void;
  setDepartment: (department: string) => void;
  reset: () => void;
}
export interface IAppStore extends IAppStoreVariables, IAppStoreActions {}

const INITIAL_STATE: IAppStoreVariables = {
  // --- INITIAL STATE ---
  cdata: sdatasets, // Load initial data
  selectedType: { value: "", display: "Select a type..." }, // No year selected by default
  keyValue: "",
  faculty: "Arts",
  department: DEPARTMENTS["Arts"][0],
  departments: DEPARTMENTS["Arts"],
};

export const useAppStore = create<IAppStore>((set) => ({
  // --- ACTIONS ---
  // This is how you define a function that updates the state
  reset: () => set({ ...INITIAL_STATE }),
  setSelectedType: (type: any) =>
    set({
      selectedType: {
        value: type,
        display: type
          .replace(/([A-Z])/g, " $1")
          .trim()
          .replace(/^./, (str: string) => str.toUpperCase()),
      },
    }),
  setFaculty(faculty) {
    set({
      faculty,
      departments: DEPARTMENTS[faculty] || [],
      department: DEPARTMENTS[faculty][0],
    });
  },
  setDepartment(department) {
    set({ department });
  },
  setKeyValue(keyValue) {
    const data = sdatasets[keyValue as keyof typeof sdatasets] || [];
    set({ keyValue, cdata: data });
  },

  ...INITIAL_STATE,
}));
