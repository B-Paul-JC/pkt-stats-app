import React, { useState, useMemo } from "react";
import {
  Filter,
  RefreshCw,
  Layers,
  PieChart as PieIcon,
  BarChart as BarIcon,
  Activity,
  Printer,
  AlertCircle,
  Circle,
  Download,
  Building,
  Building2,
  User2,
  Briefcase,
  Heart,
} from "lucide-react";
import type {
  Role,
  WidgetData,
  Domain,
  ReportConfig,
  WidgetType,
} from "./types_interfaces";
import logo from "../../public/favicon.ico";
import { useAppStore } from "~/store/useAppStore";
import {
  getDepartmentId,
  getDepartmentsByFaculty,
  Faculties,
  getFacultyId,
} from "./facultiesAndDepartmentsMapper";

// Pointing to the staff API
const API_URL = "/api/staff_api.php";

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div
    className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}
  >
    {children}
  </div>
);

// --- Staff-Specific Configuration ---
const STAFF_REPORT_DOMAINS: ReportConfig[] = [
  {
    id: "staff_demographics",
    label: "Staff Demographics",
    breakdowns: [
      { id: "gender", label: "By Gender" },
      { id: "marital_status", label: "By Marital Status" },
      { id: "department", label: "By Department" },
    ],
  },
  {
    id: "career_analytics",
    label: "Career & Roles",
    breakdowns: [
      { id: "designation", label: "By Designation/Rank" },
      { id: "employment_type", label: "By Employment Status" },
    ],
  },
  {
    id: "geographic",
    label: "Origin Analysis",
    breakdowns: [{ id: "state_of_origin", label: "By State of Origin" }],
  },
];

const CHART_TYPES: { type: WidgetType; label: string; icon: any }[] = [
  { type: "bar", label: "Bar Chart", icon: BarIcon },
  { type: "pie", label: "Pie Chart", icon: PieIcon },
  { type: "line", label: "Line Chart", icon: Activity },
  { type: "area", label: "Area Chart", icon: Layers },
  { type: "scatter", label: "Scatter Plot", icon: Circle },
];

interface Props {
  role: Role;
  onGenerate: (widget: WidgetData) => void;
}

export const StaffReportGenerator: React.FC<Props> = ({ role, onGenerate }) => {
  const [domain, setDomain] = useState<string>("");
  const [breakdown, setBreakdown] = useState<string>("");

  // Filter States
  const [genderFilter, setGenderFilter] = useState<string>("");
  const [deptFilter, setDeptFilter] = useState<string>("");
  const [facultyFilter, setFacultyFilter] = useState<string>("");
  const [maritalFilter, setMaritalFilter] = useState<string>("");

  const [chartType, setChartType] = useState<WidgetType>("bar");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const useStore = useAppStore();
  const { department_id, faculty_id } = useStore.user || {};

  const faculty = faculty_id ? Faculties[Number(faculty_id)] : facultyFilter;
  const departments = getDepartmentsByFaculty(faculty as any);

  const activeConfig = useMemo(
    () => STAFF_REPORT_DOMAINS.find((d) => d.id === domain),
    [domain],
  );

  const hasDept = department_id !== 0 && department_id !== undefined;
  const hasFaculty = faculty_id !== 0 && faculty_id !== undefined;

  const getPayload = () => ({
    domain,
    breakdown,
    type: chartType,
    title: `Staff Report: ${activeConfig?.breakdowns.find((b) => b.id === breakdown)?.label}`,
    filter_gender: genderFilter,
    filter_marital_status: maritalFilter,
    filter_department: hasDept ? department_id : getDepartmentId(deptFilter),
    filter_faculty: hasFaculty ? faculty_id : getFacultyId(facultyFilter),
  });

  const handleGenerate = async () => {
    if (!activeConfig || !breakdown) return;
    setIsGenerating(true);
    setError(null);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "generate_report",
          uid: useStore.user?.uid,
          data_source: "csv", // Indicate we want CSV data
          ...getPayload(),
        }),
      });
      if (!res.ok) throw new Error(`Server Error: ${res.status}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      onGenerate(data);
    } catch (err: any) {
      setError(err.message || "Failed to generate staff report");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!useStore.generatedWidgets.length) return;
    setIsDownloading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "download_batch_pdf",
          items: useStore.generatedWidgets,
          uid: useStore.user?.uid,
        }),
      });

      const responseData = await res.json();
      if (responseData.success && responseData.data) {
        const link = document.createElement("a");
        link.href = responseData.data;
        link.download = `staff_report_${Date.now()}.pdf`;
        link.click();
      }
    } catch (err) {
      setError("PDF Generation Failed");
    } finally {
      setIsDownloading(false);
    }
  };

  // Field count adjustment for grid responsiveness
  const numFields = 5 + Number(!hasDept) + Number(!hasDept && !hasFaculty);
  const gridsLength = `p-5 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-${numFields} gap-4 items-end`;

  return (
    <>
      <Card className="p-0 border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
        <div className="p-4 border-b border-emerald-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
              <Briefcase size={18} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">
                Staff Analytics Engine
              </h3>
              <p className="text-xs text-slate-500">
                Analyze staff distribution by department, gender, and marital
                status.
              </p>
            </div>
          </div>
          <button
            onClick={handleDownloadPDF}
            disabled={!useStore.generatedWidgets.length || isDownloading}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-emerald-800 bg-emerald-100 rounded-md hover:bg-emerald-200 disabled:opacity-50"
          >
            {isDownloading ? (
              <RefreshCw size={14} className="animate-spin" />
            ) : (
              <Download size={14} />
            )}
            Download PDF
          </button>
        </div>

        <div className={gridsLength}>
          {/* Domain Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
              <Filter size={10} /> Domain
            </label>
            <select
              className="w-full p-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
              value={domain}
              onChange={(e) => {
                setDomain(e.target.value);
                setBreakdown("");
              }}
            >
              <option value="">Select Domain...</option>
              {STAFF_REPORT_DOMAINS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          {/* Breakdown Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
              <Layers size={10} /> Breakdown
            </label>
            <select
              className="w-full p-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 outline-none disabled:opacity-50"
              value={breakdown}
              disabled={!domain}
              onChange={(e) => setBreakdown(e.target.value)}
            >
              <option value="">Select Field...</option>
              {activeConfig?.breakdowns.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>

          {/* Gender Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
              <User2 size={10} /> Gender
            </label>
            <select
              className="w-full p-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500"
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
            >
              <option value="">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Marital Status Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
              <Heart size={10} /> Status
            </label>
            <select
              className="w-full p-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500"
              value={maritalFilter}
              onChange={(e) => setMaritalFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Married">Married</option>
              <option value="Single">Single</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>

          {/* Faculty/Dept logic mirrors the student list but applies to Staff data */}
          {!hasDept && !hasFaculty && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase flex items-center">
                <Building2 size={12} className="mr-1" /> Faculty
              </label>
              <select
                className="w-full p-2.5 rounded-lg border border-slate-300 text-sm bg-white"
                value={facultyFilter}
                onChange={(e) => {
                  setFacultyFilter(e.target.value);
                  setDeptFilter("");
                }}
              >
                <option value="">All Faculties</option>
                {Faculties.map((f, i) => (
                  <option key={i} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
          )}

          {!hasDept && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase flex items-center">
                <Building size={12} className="mr-1" /> Dept
              </label>
              <select
                className="w-full p-2.5 rounded-lg border border-slate-300 text-sm bg-white disabled:opacity-50"
                value={deptFilter}
                disabled={departments.length === 0}
                onChange={(e) => setDeptFilter(e.target.value)}
              >
                <option value="">All Departments</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Chart View Toggle */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">
              View
            </label>
            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
              {CHART_TYPES.map((type) => (
                <button
                  key={type.type}
                  onClick={() => setChartType(type.type)}
                  className={`flex-1 p-1.5 flex justify-center items-center rounded-md transition-all ${chartType === type.type ? "bg-white shadow-sm text-emerald-600" : "text-slate-400"}`}
                >
                  <type.icon size={16} />
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-1">
            <button
              onClick={handleGenerate}
              disabled={!domain || !breakdown || isGenerating}
              className="w-full h-10.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <RefreshCw size={18} className="animate-spin" />
              ) : (
                <PieIcon size={18} />
              )}
              <span>Generate</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="mx-5 mb-5 p-3 bg-red-50 border border-red-200 rounded text-xs text-red-600 flex items-center">
            <AlertCircle size={14} className="mr-2" />
            {error}
          </div>
        )}
      </Card>
    </>
  );
};
