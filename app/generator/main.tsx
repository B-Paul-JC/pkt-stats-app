import { LogOut, UserCircle } from "lucide-react";
import logo from "../../public/favicon.ico";
import type { Role, StudentListResponse, WidgetData } from "./types_interfaces";
import { DynamicWidget } from "./dynamicWidget";
import { ReportGenerator } from "./reportGenerator";
import { Link } from "react-router";
import { useAppStore } from "~/store/useAppStore";
import { StudentListTable } from "./studentListTable";
import { StudentListGenerator } from "./studentListGenerator";
import { useState } from "react";
import { getDepartment, getFaculty } from "./facultiesAndDepartmentsMapper";
import { StaffReportGenerator } from "./staffGenerator";
import { StaffListGenerator } from "./staffListGenerator";

type View = "Analysis" | "Data Finder";
type Persona = "Student" | "Staff";

export function SchoolStatsApp() {
  const generatedWidgets = useAppStore((state) => state.generatedWidgets);
  const setGeneratedWidgets = useAppStore((state) => state.setGeneratedWidgets);
  const store = useAppStore();

  const { role, uid, department_id, faculty_id } = store.user || {};

  const handleReportGenerated = (newWidget: WidgetData) => {
    setGeneratedWidgets((prev) => [newWidget, ...prev]);
  };

  const [currentView, setCurrentView] = useState<View>("Data Finder");
  const views: View[] = ["Data Finder", "Analysis"];

  const [currentPersona, setCurrentPersona] = useState<Persona>("Student");
  const personas: Persona[] = ["Student", "Staff"];

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans text-slate-800">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10 p-4 px-10 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg">
              <Link to="/">
                <img src={logo} alt="" className="w-10 h-12" />
              </Link>
            </div>
            <span className="text-lg leading-tight">
              University Of Ibadan
              <br />
              <span className="font-bold">Analytics</span>
            </span>
          </div>

          <div className="flex items-center gap-5 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-200">
            <div className="flex items-center gap-3">
              <UserCircle size={32} className="text-slate-400" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-blue-400">
                  {role}
                </p>
                {!!department_id && (
                  <p className="text-sm font-medium">
                    Department: {getDepartment(department_id)?.name}
                  </p>
                )}
                {!!faculty_id && (
                  <p className="text-sm font-medium">
                    Faculty: {getFaculty(faculty_id)}
                  </p>
                )}
              </div>
            </div>
            <div className="flex bg-white rounded-md shadow-sm border border-slate-200 p-0.5">
              {views.map((r) => (
                <button
                  key={r}
                  onClick={() => setCurrentView(r)}
                  className={`px-3 py-1 text-xs font-bold rounded-sm capitalize transition-all ${currentView === r ? "bg-blue-500 text-white shadow-sm" : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"}`}
                >
                  {r}
                </button>
              ))}
            </div>
            <div className="flex bg-white rounded-md shadow-sm border border-slate-200 p-0.5">
              {personas.map((r) => (
                <button
                  key={r}
                  onClick={() => setCurrentPersona(r)}
                  className={`px-3 py-1 text-xs font-bold rounded-sm capitalize transition-all ${currentPersona === r ? "bg-blue-500 text-white shadow-sm" : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"}`}
                >
                  {r}
                </button>
              ))}
            </div>
            <button
              onClick={store.logout}
              className="cursor-pointer hover:text-white hover:bg-red-500 duration-300 p-2 rounded-2xl"
            >
              <LogOut size={32} />
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* VIEW 1: STUDENT ANALYSIS */}
          {currentView === "Analysis" && currentPersona === "Student" && (
            <ReportGenerator
              role={role as Role}
              onGenerate={handleReportGenerated}
            />
          )}

          {/* VIEW 2: STUDENT DIRECTORY */}
          {currentView === "Data Finder" && currentPersona === "Student" && (
            <div className="print-hide">
              <StudentListGenerator
                onDataReceived={(data) => {
                  setGeneratedWidgets((prev) => [data, ...prev]);
                }}
              />
            </div>
          )}

          {/* VIEW 3: STAFF ANALYSIS */}
          {currentView === "Analysis" && currentPersona === "Staff" && (
            <div className="print-hide">
              <StaffReportGenerator
                role={role as Role}
                onGenerate={handleReportGenerated}
              />
            </div>
          )}

          {/* VIEW 3: STAFF DIRECTORY */}
          {currentView === "Data Finder" && currentPersona === "Staff" && (
            <div className="print-hide">
              <StaffListGenerator
                onDataReceived={(data) => {
                  setGeneratedWidgets((prev) => [data, ...prev]);
                }}
              />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {generatedWidgets.map((widget) =>
              widget.is_chart ? (
                <DynamicWidget key={widget.id} widget={widget as WidgetData} />
              ) : (
                <StudentListTable
                  key={widget.id}
                  data={widget as StudentListResponse}
                />
              ),
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
