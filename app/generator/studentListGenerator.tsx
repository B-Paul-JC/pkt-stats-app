import React, { useState } from "react";
import {
  Filter,
  Users,
  Search,
  MapPin,
  Download,
  RefreshCw,
  Building,
  Hotel,
  Building2,
  Globe2,
} from "lucide-react";
import type { StudentListResponse } from "./types_interfaces";
import { Card } from "./statCard";
import { useAppStore } from "~/store/useAppStore";
import {
  getDepartmentId,
  getDepartmentsByFaculty,
  Faculties as FACULTIES,
  getFacultyId,
} from "./facultiesAndDepartmentsMapper";
import { getHallId, HALLS } from "./hallMapper";

const API_URL = "/api/api.php";

interface Props {
  onDataReceived: (data: StudentListResponse) => void;
}

export const StudentListGenerator: React.FC<Props> = ({ onDataReceived }) => {
  const [zone, setZone] = useState("");
  const [state, setState] = useState("");
  const [gender, setGender] = useState("");
  const [level, setLevel] = useState("");
  const [department, setDepartment] = useState("");
  const [faculty, setFaculty] = useState("");
  const [hall, setHall] = useState("");

  const useStore = useAppStore();
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLocalLoading] = useState(false);

  const { department_id, faculty_id } = useStore.user || {};

  const hasDept = department_id !== 0 && department_id !== undefined;
  const hasFaculty = faculty_id !== 0 && faculty_id !== undefined;

  const efaculty = faculty_id ? FACULTIES[Number(faculty_id)] : faculty;
  const departments = getDepartmentsByFaculty(efaculty as any);

  const handleFetch = async () => {
    setLocalLoading(true);
    try {
      const payload = {
        action: "generate_student_list",
        zone,
        state,
        gender,
        level,
        department: hasDept ? department_id : getDepartmentId(department),
        faculty: hasFaculty ? faculty_id : getFacultyId(faculty),
        hall: getHallId(hall),
        uid: useStore.user?.uid,
        data_source: "csv", // Indicate we want CSV data
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: StudentListResponse = await res.json();

      if (data.error) throw new Error(data.error);
      onDataReceived(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!useStore.generatedWidgets) return;
    setIsDownloading(true);
    setError(null);
    try {
      const res = await fetch("/api/api.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "download_batch_pdf",
          items: useStore.generatedWidgets,
          uid: useStore.user?.uid,
        }),
      });

      const responseData = await res.json();
      if (responseData.error) throw new Error(responseData.error);

      if (responseData.success && responseData.data) {
        const link = document.createElement("a");
        link.href = responseData.data;
        link.download = responseData.filename || "report.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "PDF Generation Failed");
    } finally {
      setIsDownloading(false);
    }
  };

  const numFields = 5 + Number(!hasDept) + Number(!hasDept && !hasFaculty);
  const gridsLength = `p-5 grid grid-cols-1 md:grid-cols-4 ${"lg:grid-cols-" + numFields} gap-4 items-end`;

  return (
    <Card className="p-0 border-blue-200 bg-linear-to-br from-blue-50 to-white mb-6">
      <div className="p-4 border-b border-blue-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
            <Users size={18} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Student Directory</h3>
            <p className="text-xs text-slate-500">
              Generate lists based on demographics
            </p>
          </div>
        </div>
        <button
          onClick={handleDownloadPDF}
          disabled={!useStore.generatedWidgets || isDownloading}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-blue-800 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors disabled:opacity-50 ${!useStore.generatedWidgets || "cursor-not-allowed"}`}
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
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
            <MapPin size={10} /> Geopolitical Zone
          </label>
          <select
            className="w-full pl-2 pr-6 py-2.5 rounded-lg border border-slate-300 text-sm bg-white"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
          >
            <option value="">All Zones</option>
            <option value="South West">South West</option>
            <option value="South East">South East</option>
            <option value="South South">South South</option>
            <option value="North Central">North Central</option>
            <option value="North East">North East</option>
            <option value="North West">North West</option>
          </select>
        </div>

        <div className="space-y-1.5 md:col-span-1">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center">
            <Hotel size={12} className="inline mr-1" /> Hall
          </label>
          <select
            className="w-full pl-2 pr-6 py-2.5 rounded-lg border hover:border-slate-500 cursor-pointer border-slate-300 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
            value={hall}
            onChange={(e) => {
              setHall(e.target.value);
            }}
          >
            <option value="">All Halls</option>
            {HALLS.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {!hasDept && !hasFaculty && (
          <div className="space-y-1.5 md:col-span-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center">
              <Building2 size={12} className="inline mr-1" /> Faculty
            </label>
            <select
              className="w-full pl-2 pr-6 py-2.5 rounded-lg border hover:border-slate-500 cursor-pointer border-slate-300 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
              value={faculty}
              onChange={(e) => {
                setFaculty(e.target.value);
              }}
            >
              <option value="">All Faculties</option>
              {FACULTIES.map((d, id) => (
                <option key={id} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        )}

        {!hasDept && (
          <div className="space-y-1.5 md:col-span-1">
            <label
              className={`text-xs font-bold uppercase tracking-wide flex items-center ${departments.length === 0 ? "text-slate-300" : "text-slate-500"}`}
            >
              <Building size={12} className="inline mr-1" /> Department
            </label>
            <select
              className="w-full pl-2 pr-6 py-2.5 rounded-lg border hover:border-slate-500 cursor-pointer border-slate-300 text-sm bg-white focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-blue-500 outline-none transition-all shadow-sm"
              value={department}
              disabled={departments.length === 0}
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
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

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center">
            <Globe2 size={12} className="inline mr-1" /> State
          </label>
          <input
            type="text"
            placeholder="e.g. Lagos"
            className="w-full pl-3 pr-3 py-2.5 rounded-lg border border-slate-300 text-sm bg-white"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
            <Filter size={10} /> Gender
          </label>
          <select
            className="w-full pl-2 pr-6 py-2.5 rounded-lg border border-slate-300 text-sm bg-white"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
            <Filter size={10} /> Level
          </label>
          <select
            className="w-full pl-2 pr-6 py-2.5 rounded-lg border border-slate-300 text-sm bg-white"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="">All Levels</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="500">500</option>
          </select>
        </div>

        <div>
          <button
            onClick={handleFetch}
            disabled={loading}
            className="w-full h-10.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md flex items-center justify-center gap-2 transition-colors"
          >
            <Search size={18} /> Find
          </button>
        </div>
      </div>
    </Card>
  );
};
