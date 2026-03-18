import { create } from "zustand";
import {
  API_URL,
  type FACULTY,
  type IAppStore,
  type IAppStoreVariables,
} from "./appStoreTypes";

export const DEPARTMENTS: Record<FACULTY, string[]> = {
  Any: ["Any"],
  Agriculture: [
    "Any",
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
    "Any",
    "Arabic and Islamic Studies",
    "Archaeology and Anthropology",
    "Classics",
    "Communication and Language Arts",
    "English Language and Literature",
    "European Studies",
  ],
  "Basic Medical Sciences": [
    "Any",
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
    "Any",
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
    "Any",
    "Cyber Security",
    "Software Engineering",
    "Data Science",
    "Information Communication Technology",
  ],
  Dentistry: [
    "Any",
    "Child Oral Health",
    "Oral and Maxillofacial Surgery",
    "Oral Pathology",
    "Periodontology and Community Dentistry",
    "Restorative Dentistry",
  ],
  Economics: ["Any", "Economics"],
  Education: [
    "Any",
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
    "Any",
    "Architecture",
    "Estate Management",
    "Urban and Regional Planning",
  ],
  Law: ["Any", "Public Law", "Private and Property Law"],
  Pharmacy: [
    "Any",
    "Pharmaceutical Chemistry",
    "Pharmaceutics and Industrial Pharmacy",
    "Pharmacognosy",
    "Pharmacology and Toxicology",
    "Clinical Pharmacy and Pharmacy Administration",
  ],
  "Public Health": [
    "Any",
    "Health Policy and Management",
    "Epidemiology and Medical Statistics",
    "Environmental Health Sciences",
    "Health Promotion and Education",
    "Human Nutrition and Dietetics",
  ],
  Science: [
    "Any",
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
    "Any",
    "Agricultural and Environmental Engineering",
    "Civil Engineering",
    "Electrical and Electronic Engineering",
    "Food Technology",
    "Industrial and Production Engineering",
    "Mechanical Engineering",
    "Petroleum Engineering",
  ],
  "Veterinary Medicine": [
    "Any",
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
    chartType: [],
    personnel: ["Any"],
    stateoforigin: ["Any"],
    title: "",
    description: "",
    year: [1],
    yearDisp: [years[1]],
    faculty: ["Any"],
    cgm: false,
    active: [true],
    department: [DEPARTMENTS["Any"][0]],
    status: ["Any"],
    departments: DEPARTMENTS["Any"],
    hallofresidence: ["Any"],
    programmetype: ["Any"],
    level: ["Any"],
    gender: ["Any"],
  },
  generatedWidgets: [],
  // Auth Initial State (Hydrated from Local Storage)
  modalTop: "-100vh",
  // --- AUTH STATE ---
  isAuthenticated: false,
  user: null,
  isLoadingAuth: true,
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
  toggleModalTop() {
    set((turnip) => {
      let newModalTop: IAppStoreVariables["modalTop"] = "-100vh";
      if (turnip.modalTop === "-100vh") {
        newModalTop = "0vh";
      }
      return { ...turnip, modalTop: newModalTop };
    });
  },
  setGeneratedWidgets: (widgets) =>
    set((state) => ({
      generatedWidgets:
        typeof widgets === "function"
          ? widgets(state.generatedWidgets)
          : widgets,
    })),
  checkAuth: async () => {
    try {
      const response = await fetch(`${API_URL}?action=check`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // CRITICAL: Sends the PHP Session Cookie
      });
      const data = await response.json();

      if (data.authenticated) {
        console.log(data)
        set({ isAuthenticated: true, user: data.user, isLoadingAuth: false });
      } else {
        set({ isAuthenticated: false, user: null, isLoadingAuth: false });
      }
    } catch (e) {
      set({ isAuthenticated: false, user: null, isLoadingAuth: false });
    }
  },

  login: (user) => set({ isAuthenticated: true, user }),

  deleteWidget: (id: string) =>
    set((state) => ({
      generatedWidgets: state.generatedWidgets.filter(
        (widget) => widget.id !== id,
      ),
    })),

  logout: async () => {
    try {
      await fetch(`${API_URL}?action=logout`, {
        method: "POST",
        credentials: "include",
      });
      set({ isAuthenticated: false, user: null, generatedWidgets: [] });
      window.location.href = "/login"; // Redirect
    } catch (e) {
      console.error("Logout failed", e);
    }
  },

  ...INITIAL_STATE,
}));
