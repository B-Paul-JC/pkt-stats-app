import { LockIcon } from "lucide-react"; // Make sure to import your icon
import { useAppStore, type FACULTY } from "~/store/useAppStore";
import { useState } from "react";

export const EditLogic = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual authentication logic
  const onLogin = () => {
    // Implement your login logic here
  };
  const selectedType = useAppStore((state) => state.selectedType);
  const setSelectedType = useAppStore((state) => state.setSelectedType);
  const department = useAppStore((state) => state.department);
  const setDepartment = useAppStore((state) => state.setDepartment);
  const faculty = useAppStore((state) => state.faculty);
  const setFaculty = useAppStore((state) => state.setFaculty);
  const departments = useAppStore((state) => state.departments);
  const keyValue = useAppStore((state) => state.keyValue);

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

  return (
    <>
      {!!isLoggedIn ? (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <div className="p-4 rounded-full bg-gray-200">
            <LockIcon className="w-12 h-12 text-gray-500" />
          </div>
          <p className="text-lg font-semibold text-gray-700">Login Required</p>
          <button
            onClick={onLogin}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 cursor-pointer"
          >
            Login to Edit Stats
          </button>
        </div>
      ) : (
        <div className="space-y-4 w-full p-4">
          <h3 className="text-lg font-semibold text-gray-700">Filter Data</h3>
          <div className="space-y-3 w-full">
            <div>Chart Type:</div>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              onChange={({ target }) => {
                setSelectedType(target.value);
              }}
            >
              <option value={`${selectedType.value}`}>
                {selectedType.display}
              </option>
              {keys
                ?.filter((key) => key)
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
              onClick={() => {setIsLoggedIn(true);}}
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
