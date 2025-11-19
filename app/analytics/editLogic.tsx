import { LockIcon } from "lucide-react"; // Make sure to import your icon
import { useEffect } from "react";
import { useAppStore, type FACULTY, type k_type } from "~/store/useAppStore";

export const EditLogic = () => {
  const isLoggedIn = useAppStore((state) => state.isLoggedIn);
  const focus = useAppStore((state) => state.focus);
  const setFocus = useAppStore((state) => state.setFocus);
  const department = useAppStore((state) => state.department);
  const setDepartment = useAppStore((state) => state.setDepartment);
  const faculty = useAppStore((state) => state.faculty);
  const setFaculty = useAppStore((state) => state.setFaculty);
  const departments = useAppStore((state) => state.departments);
  const toggleModalTop = useAppStore((state) => state.toggleModalTop);
  const criteria = useAppStore((state) => state.criteria);
  const setCriteria = useAppStore((state) => state.setCriteria);
  const keyValue = useAppStore((state) => state.keyValue);
  const logout = useAppStore((state) => state.logout);
  const cdata = useAppStore((state) => state.cdata);
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

  const focusData = cdata[focus.value as keyof typeof cdata];
  const k_array = Array.isArray(focusData)
    ? Object.keys(focusData[0] || {}).slice(1)
    : [];

  const firstKey = k_array[0];

  useEffect(() => {
    if (keys && keys.length > 0 && !keys.includes(focus.value)) {
      setFocus(keys[0]);
    }
    if (k_array.length > 0 && !k_array.includes(criteria)) {
      setCriteria(firstKey as k_type);
    }
  }, [
    keyValue,
    focus,
    criteria,
    keys,
    k_array,
    setFocus,
    setCriteria,
    firstKey,
  ]);

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
        <div className="space-y-4 w-full p-4 overflow-y-scroll">
          <h3 className="text-lg font-semibold text-gray-700">Filter Data</h3>
          <div className="space-y-3 w-full">
            <div>Chart Focus:</div>
            <div className="space-y-2 p-3 bg-gray-100 rounded-md border border-gray-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {keys?.map((key, i) => (
                  <button
                    key={i}
                    onClick={() => setFocus(key)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                      key === focus.value
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .trim()
                      .replace(/^./, (str) => str.toUpperCase())}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2 p-3 bg-gray-100 rounded-md border border-gray-300">
              <div>Criteria: </div>
              <div className="flex flex-wrap gap-2">
                {k_array.map((key, i) => {
                  return (
                    <button
                      key={i}
                      onClick={() => setCriteria(key as k_type)}
                      className={`flex-1 min-w-[120px] px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                        key === criteria
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {key}
                    </button>
                  );
                })}
              </div>
            </div>
            {accessLevel.level > 49 && (
              <>
                <div> Department: </div>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  onChange={({ target }) => {
                    setDepartment(target.value);
                  }}
                >
                  <option value={`${department}`} defaultValue={department}>
                    {department}
                  </option>
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
                {accessLevel.level > 59 && (
                  <>
                    <div> Faculty: </div>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      onChange={({ target }) => {
                        setFaculty(target.value as FACULTY);
                      }}
                    >
                      <option value={`${faculty}`} defaultValue={faculty}>
                        {faculty}
                      </option>
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
                  </>
                )}
              </>
            )}
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => {
                logout();
                window.location.reload();
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
