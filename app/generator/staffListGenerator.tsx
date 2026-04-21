import React, { useState } from "react";
import {
  Filter,
  Users,
  Search,
  Download,
  RefreshCw,
  Building,
  Building2,
  Heart,
  BadgeCheck,
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

// Pointing to your staff-specific API
const API_URL = "/api/staff_api.php";

interface Props {
  onDataReceived: (data: any) => void;
}

export const StaffListGenerator: React.FC<Props> = ({ onDataReceived }) => {
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [department, setDepartment] = useState("");
  const [faculty, setFaculty] = useState("");
  const [status, setStatus] = useState("");

  const useStore = useAppStore();
  const [isDownloading, setIsDownloading] = useState(false);
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
        action: "generate_staff_list",
        gender,
        marital_status: maritalStatus,
        status,
        data_source: "csv", // Indicate we want CSV data
        department: hasDept ? department_id : getDepartmentId(department),
        faculty: hasFaculty ? faculty_id : getFacultyId(faculty),
        uid: useStore.user?.uid,
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      onDataReceived(data);
    } catch (err) {
      console.error("Staff fetch error:", err);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!useStore.generatedWidgets) return;
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
        link.download = `staff_list_report_${Date.now()}.pdf`;
        link.click();
      }
    } catch (err) {
      console.error("PDF error:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const numFields = 4 + Number(!hasDept) + Number(!hasDept && !hasFaculty);
  const gridsLength = `p-5 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-${numFields} gap-4 items-end`;

  return (
    <Card className="p-0 border-emerald-200 bg-linear-to-br from-emerald-50 to-white mb-6">
      <div className="p-4 border-b border-emerald-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
            <Users size={18} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Staff Directory</h3>
            <p className="text-xs text-slate-500">
              Generate staff lists based on professional and personal data
            </p>
          </div>
        </div>
        <button
          onClick={handleDownloadPDF}
          disabled={!useStore.generatedWidgets || isDownloading}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-emerald-800 bg-emerald-100 rounded-md hover:bg-emerald-200 transition-colors disabled:opacity-50"
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
        {/* Faculty Filter */}
        {!hasDept && !hasFaculty && (
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase flex items-center">
              <Building2 size={12} className="inline mr-1" /> Faculty
            </label>
            <select
              className="w-full pl-2 pr-6 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
            >
              <option value="">All Faculties</option>
              {FACULTIES.map((f, id) => (
                <option key={id} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Department Filter */}
        {!hasDept && (
          <div className="space-y-1.5">
            <label
              className={`text-xs font-bold uppercase flex items-center ${departments.length === 0 ? "text-slate-300" : "text-slate-500"}`}
            >
              <Building size={12} className="inline mr-1" /> Department
            </label>
            <select
              className="w-full pl-2 pr-6 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 outline-none disabled:opacity-50"
              value={department}
              disabled={departments.length === 0}
              onChange={(e) => setDepartment(e.target.value)}
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

        {/* Gender Filter */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
            <Filter size={10} /> Gender
          </label>
          <select
            className="w-full pl-2 pr-6 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Marital Status Filter */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
            <Heart size={10} /> Marital Status
          </label>
          <select
            className="w-full pl-2 pr-6 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500"
            value={maritalStatus}
            onChange={(e) => setMaritalStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Married">Married</option>
            <option value="Single">Single</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
        </div>

        {/* Status (Active/Retired/etc) Filter */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
            <BadgeCheck size={10} /> Employment Status
          </label>
          <select
            className="w-full pl-2 pr-6 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="1">Active</option>
            <option value="0">Inactive/On Leave</option>
          </select>
        </div>

        {/* Search Button */}
        <div>
          <button
            onClick={handleFetch}
            disabled={loading}
            className="w-full h-10.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            {loading ? (
              <RefreshCw size={18} className="animate-spin" />
            ) : (
              <Search size={18} />
            )}
            <span>Find Staff</span>
          </button>
        </div>
      </div>
    </Card>
  );
};
