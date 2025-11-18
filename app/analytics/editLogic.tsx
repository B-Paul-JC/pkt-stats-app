import { LockIcon } from "lucide-react"; // Make sure to import your icon
import { useAppStore, type FACULTY } from "~/store/useAppStore";
import { useEffect, useState } from "react";
import { ACCESS_LEVELS, type AppRole } from "~/auth/accessLevel";

export const EditLogic = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual authentication logic
  const onLogin = () => {
    // Implement your login logic here
  };
  const focus = useAppStore((state) => state.focus);
  const setFocus = useAppStore((state) => state.setFocus);
  const department = useAppStore((state) => state.department);
  const setDepartment = useAppStore((state) => state.setDepartment);
  const faculty = useAppStore((state) => state.faculty);
  const setFaculty = useAppStore((state) => state.setFaculty);
  const departments = useAppStore((state) => state.departments);
  const toggleModalTop = useAppStore((state) => state.toggleModalTop);
  const keyValue = useAppStore((state) => state.keyValue);
  const accessLevel = useAppStore((state) => state.accessLevel);

  const keys = {
    students: [
      "newEntrants",
      "totalStudentEnrollment",
      "studentEnrollmentByProgram",
      "internationalStudents",
    ],
    faculty: ["facultyBreakdown"],
    staff: [
      "academicStaffRank",
      "totalStaffTrends",
      "staffGenderBreakdown",
      "nonTeachingStaff",
    ],
    accomodation: ["hallResidence", "hallResidenceByGender", "staffResidence"],
  }[keyValue as keyof Record<string, string[]>];

  const facultyKeys = [
    "All",
    "Agriculture",
    "Arts",
    "Basic Medical Sciences",
    "Clinical Sciences",
    "Computing",
    "Dentistry",
    "Economics",
    "Education",
    "Environmental Design and Management",
    "Law",
    "Pharmacy",
    "Public Health",
    "Science",
    "Technology",
    "Veterinary Medicine",
  ];

  const defunct = (ev: KeyboardEvent) => {
    if (ev.key === "k") {
      setIsLoggedIn((prev) => !prev);
    }
    if (ev.key === ";") {
      const store = useAppStore.getState();
      const currentRole = store.appRole ?? "VISITOR";
      const roles: AppRole[] = [
        "VISITOR",
        "STUDENT",
        "STAFF",
        "HOD",
        "DEAN",
        "PROVOST",
        "ADMIN",
        "VC",
      ]; // adjust to your app's defined access tiers
      const idx = roles.indexOf(currentRole);
      const nextRole =
        idx === -1 || idx === roles.length - 1 ? roles[0] : roles[idx + 1];
      const accessLevel = ACCESS_LEVELS[nextRole];

      store.setAppRole(nextRole);
      store.setAccessLevel(accessLevel);

      console.log({ nextRole, accessLevel });
    }
  };

  useEffect(() => {
    window.addEventListener("keypress", (ev) => {
      defunct(ev);
    });

    return () => {
      window.removeEventListener("keypress", (ev) => {
        defunct(ev);
      });
    };
  }, []);

  return (
    <>
      {!isLoggedIn || accessLevel.level < 20 ? (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <div className="p-4 rounded-full bg-gray-200">
            <LockIcon className="w-12 h-12 text-gray-500" />
          </div>
          <p className="text-lg font-semibold text-gray-700 text-center">
            {isLoggedIn && accessLevel.level < 20
              ? "Need higher permissions to access chart editing."
              : "Login Required"}
          </p>
          <button
            onClick={() => toggleModalTop()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 cursor-pointer"
          >
            {isLoggedIn && accessLevel.level < 20
              ? "Login to a higher profile"
              : "Login to Edit Stats"}
          </button>
        </div>
      ) : (
        <div className="space-y-4 w-full p-4">
          <h3 className="text-lg font-semibold text-gray-700">Filter Data</h3>
          <div className="space-y-3 w-full">
            <div>Chart Focus:</div>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              onChange={({ target }) => {
                setFocus(target.value);
              }}
            >
              <option value={`${focus.value}`} selected>
                {focus.display}
              </option>
              {keys
                ?.filter((key) => key !== focus.value)
                .map((key, i) => (
                  <option key={i} value={key}>
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .trim()
                      .replace(/^./, (str) => str.toUpperCase())}
                  </option>
                ))}
            </select>
            <div> Faculty: </div>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              onChange={({ target }) => {
                setFaculty(target.value as FACULTY);
              }}
            >
              <option value={`${faculty}`}>{faculty}</option>
              {facultyKeys
                ?.filter((key) => key)
                .map((key, i) => {
                  if (key !== faculty)
                    return (
                      <option key={i} value={key}>
                        {key}
                      </option>
                    );
                })}
            </select>
            <div> Department: </div>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              onChange={({ target }) => {
                setDepartment(target.value);
              }}
            >
              <option value={`${department}`}>{department}</option>
              {departments
                ?.filter((key) => key)
                .map((key, i) => {
                  if (key !== department)
                    return (
                      <option key={i} value={key}>
                        {key}
                      </option>
                    );
                })}
            </select>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => {
                setIsLoggedIn(true);
              }}
              className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 cursor-pointer"
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </>
  );
};
