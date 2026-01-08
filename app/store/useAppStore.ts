import { create } from "zustand";
import { ACCESS_LEVELS, type AppRole } from "~/auth/accessLevel";
import {
  loadUserFromLocalStorage as LUFLS,
  USER_STORAGE_KEY,
  type USER,
} from "~/auth/userSimulation";
import type { FACULTY, IAppStore, IAppStoreVariables } from "./appStoreTypes";

export const DEPARTMENTS: Record<FACULTY, string[]> = {
  All: ["All"],
  Agriculture: [
    "All",
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
    "All",
    "Arabic and Islamic Studies",
    "Archaeology and Anthropology",
    "Classics",
    "Communication and Language Arts",
    "English Language and Literature",
    "European Studies",
  ],
  "Basic Medical Sciences": [
    "All",
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
    "All",
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
    "All",
    "Cyber Security",
    "Software Engineering",
    "Data Science",
    "Information Communication Technology",
  ],
  Dentistry: [
    "All",
    "Child Oral Health",
    "Oral and Maxillofacial Surgery",
    "Oral Pathology",
    "Periodontology and Community Dentistry",
    "Restorative Dentistry",
  ],
  Economics: ["All", "Economics"],
  Education: [
    "All",
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
    "All",
    "Architecture",
    "Estate Management",
    "Urban and Regional Planning",
  ],
  Law: ["All", "Public Law", "Private and Property Law"],
  Pharmacy: [
    "All",
    "Pharmaceutical Chemistry",
    "Pharmaceutics and Industrial Pharmacy",
    "Pharmacognosy",
    "Pharmacology and Toxicology",
    "Clinical Pharmacy and Pharmacy Administration",
  ],
  "Public Health": [
    "All",
    "Health Policy and Management",
    "Epidemiology and Medical Statistics",
    "Environmental Health Sciences",
    "Health Promotion and Education",
    "Human Nutrition and Dietetics",
  ],
  Science: [
    "All",
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
    "All",
    "Agricultural and Environmental Engineering",
    "Civil Engineering",
    "Electrical and Electronic Engineering",
    "Food Technology",
    "Industrial and Production Engineering",
    "Mechanical Engineering",
    "Petroleum Engineering",
  ],
  "Veterinary Medicine": [
    "All",
    "Veterinary Anatomy",
    "Veterinary Medicine",
    "Veterinary Microbiology and Parasitology",
    "Veterinary Pathology",
    "Veterinary Physiology and Biochemistry",
    "Veterinary Public Health and Preventive Medicine",
    "Veterinary Surgery and Reproduction",
  ],
};

const years = ["", "2024/2025", "2023/2024", "2022/2023"];

const INITIAL_STATE: IAppStoreVariables = {
  // --- INITIAL STATE ---
  config: {
    selectedDataTypes: ["GRADE", "DEPARTMENT"],
    chartType: "bar",
    personnel: "Staff",
    stateoforigin: "Oyo",
    title: "",
    year: 1,
    yearDisp: years[1],
    faculty: "All",
    cgm: false,
    active: true,
    department: DEPARTMENTS["All"][0],
    status: "Active",
    departments: DEPARTMENTS["All"],
    hallofresidence: "Queen Elizabeth Hall",
    programmetype: "Full Time",
    level: 100,
    gender: "Male",
  },
  // Auth Initial State (Hydrated from Local Storage)
  modalTop: "-100vh",
  userProfile: LUFLS(),
  isLoggedIn: !!LUFLS(),
  appRole: LUFLS() ? LUFLS().userType : "VISITOR",
  accessLevel: LUFLS()
    ? ACCESS_LEVELS[LUFLS().userType as string as AppRole]
    : ACCESS_LEVELS["VISITOR"],
};

export const useAppStore = create<IAppStore>((set) => ({
  // --- ACTIONS ---
  // This is how you define a function that updates the state
  reset: () => set({ ...INITIAL_STATE }),
  setConfig(config) {
    set({
      config,
    });
  },
  // --- AUTHENTICATION ACTIONS ---
  setAuthenticatedUser: (user: USER) =>
    set({
      userProfile: user,
      isLoggedIn: true,
      accessLevel: ACCESS_LEVELS[user.userType],
      appRole: user.userType,
    }),
  logout: () => {
    localStorage.removeItem(USER_STORAGE_KEY);
    set({
      ...INITIAL_STATE,
      userProfile: null,
      isLoggedIn: false,
      appRole: "VISITOR",
      accessLevel: ACCESS_LEVELS["VISITOR"],
    });
  },
  setAppRole(appRole) {
    set({ appRole });
  },
  setAccessLevel(accessLevel) {
    set({ accessLevel });
  },
  setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
  toggleModalTop() {
    set((turnip) => {
      let newModalTop: IAppStoreVariables["modalTop"] = "-100vh";
      if (turnip.modalTop === "-100vh") {
        newModalTop = "0vh";
      }
      return { ...turnip, modalTop: newModalTop };
    });
  },

  ...INITIAL_STATE,
}));
