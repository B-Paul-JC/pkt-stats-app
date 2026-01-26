import React, { useState } from "react";
import {
  Filter,
  Users,
  Search,
  MapPin,
  Download,
  Building,
  RefreshCw,
} from "lucide-react";
import type { StudentListResponse } from "./types_interfaces";
import { Card } from "./statCard";
import { useAppStore } from "~/store/useAppStore";

const API_URL = "/api/api.php";

interface Props {
  onDataReceived: (data: StudentListResponse) => void;
}

export const StudentListGenerator: React.FC<Props> = ({
  onDataReceived,
}) => {
  const [zone, setZone] = useState("");
  const [state, setState] = useState("");
  const [gender, setGender] = useState("");
  const [level, setLevel] = useState("");
  const [department, setDepartment] = useState("");

  const useStore = useAppStore();
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLocalLoading] = useState(false);

  const handleFetch = async () => {
    setLocalLoading(true);
    try {
      const payload = {
        action: "generate_student_list",
        zone,
        state,
        gender,
        level,
        department,
        uid: useStore.user?.uid,
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

  return (
    <Card className="p-0 border-yellow-200 bg-linear-to-br from-yellow-50 to-white mb-6">
      <div className="p-4 border-b border-yellow-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-yellow-100 rounded-lg text-yellow-700">
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
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-md hover:bg-yellow-200 transition-colors disabled:opacity-50 ${!useStore.generatedWidgets || "cursor-not-allowed"}`}
        >
          {isDownloading ? (
            <RefreshCw size={14} className="animate-spin" />
          ) : (
            <Download size={14} />
          )}
          Download PDF
        </button>
      </div>

      <div className="p-5 grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
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
          <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
            <Building size={10} /> Department
          </label>
          <input
            type="number"
            placeholder="Dept ID"
            className="w-full pl-3 pr-3 py-2.5 rounded-lg border border-slate-300 text-sm bg-white"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase">
            State
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
            <option value="">All</option>
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
            <option value="">All</option>
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
            className="w-full h-10.5 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-md flex items-center justify-center gap-2 transition-colors"
          >
            <Search size={18} /> Find
          </button>
        </div>
      </div>
    </Card>
  );
};
