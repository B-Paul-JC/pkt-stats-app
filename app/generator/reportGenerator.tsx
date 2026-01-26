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

const API_URL = "/api/api.php";
// Local Card Component
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

// --- Configuration Logic ---
const REPORT_DOMAINS: ReportConfig[] = [
  {
    id: "students",
    label: "Student Demographics",
    allowed: ["admin", "lecturer", "student"],
    breakdowns: [
      { id: "gender", label: "By Gender" },
      { id: "geopolitical_zone", label: "By Geopolitical Zone (Grouped)" },
      { id: "religion", label: "By Religion" },
      { id: "marital_status", label: "By Marital Status" },
      { id: "level_category", label: "By Level Category (Lower vs Upper)" },
      { id: "department", label: "By Department" },
    ],
  },
  {
    id: "academics",
    label: "Admission & Enrollment",
    allowed: ["admin", "lecturer"],
    breakdowns: [
      { id: "mode_of_admission", label: "Mode of Admission" },
    ],
  },
  {
    id: "staff",
    label: "Regional Analysis",
    allowed: ["admin"],
    breakdowns: [
      { id: "lga", label: "By LGA (Local Govt Area)" },
    ],
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

export const ReportGenerator: React.FC<Props> = ({ role, onGenerate }) => {
  const [domain, setDomain] = useState<Domain | "">("");
  const [breakdown, setBreakdown] = useState<string>("");

  const [genderFilter, setGenderFilter] = useState<string>("");
  const [deptFilter, setDeptFilter] = useState<string>("");
  const [levelFilter, setLevelFilter] = useState<string>("");

  const [chartType, setChartType] = useState<WidgetType>("bar");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const useStore = useAppStore();

  const availableDomains = useMemo(
    () => REPORT_DOMAINS.filter((d) => d.allowed.includes(role)),
    [role],
  );

  const activeConfig = useMemo(
    () => REPORT_DOMAINS.find((d) => d.id === domain),
    [domain],
  );

  const getPayload = () => ({
    domain,
    breakdown,
    type: chartType,
    title: `${activeConfig?.label}: ${activeConfig?.breakdowns.find((b) => b.id === breakdown)?.label}`,
    filter_gender: genderFilter,
    filter_level: levelFilter,
    filter_department: deptFilter,
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
          ...getPayload(),
        }),
      });
      if (!res.ok) throw new Error(`Server Error: ${res.status}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      onGenerate(data);
    } catch (err: any) {
      setError(err.message || "Failed to generate");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!activeConfig || !breakdown) return;
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
    <>
      <style>
        {`
          option {
            cursor: pointer;
          }

          @media print {
            @page {
              size: landscape;
              margin: 1cm;
            }

            body {
              visibility: hidden;
              background-color: white !important;
              -webkit-print-color-adjust: exact;
            }

            main, main * {
              visibility: visible !important;
            }
            
            .report-generator-card, 
            header, 
            aside, 
            .print-hide, 
            .stat-card-row { 
              display: none !important; 
            }

            .grid {
              display: block !important;
            }

            .widget-card {
              visibility: visible !important;
              position: relative;
              
              width: 100% !important;
              height: 18cm !important; /* Fixed print height */
              
              display: flex !important;
              flex-direction: column !important;
              justify-content: space-between !important; /* Push header/footer apart */
              
              margin-bottom: 0 !important;
              padding: 2cm !important;
              border: none !important;
              box-shadow: none !important;
              
              break-inside: avoid !important;
              break-after: page !important;
              page-break-after: always !important;
              
              background-color: white !important;
            }

            .widget-card::after {
              content: "";
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 500px;
              height: 500px;
              background-image: ${logo ? `url(${logo})` : "none"};
              background-repeat: no-repeat;
              background-position: center;
              background-size: contain;
              opacity: 0.05; 
              pointer-events: none;
              z-index: 0;
              display: block !important;
            }

            .widget-card > * {
              position: relative;
              z-index: 1;
            }

            .widget-card:last-child {
              break-after: auto !important;
              page-break-after: auto !important;
            }

            /* Header Section */
            .widget-card > div:first-child {
              width: 100% !important;
              flex: 0 0 auto !important;
            }

            /* Footer Section */
            .widget-card > div:last-child {
              width: 100% !important;
              flex: 0 0 auto !important;
            }

            /* Chart Container - takes remaining space */
            .widget-card .chart-container {
              width: 100% !important;
              flex: 1 1 auto !important;
              min-height: 10cm !important;
            }

            .recharts-responsive-container {
              width: 100% !important;
              height: 100% !important;
            }
          }
        `}
      </style>

      <Card className="report-generator-card p-0 border-yellow-200 bg-linear-to-br from-yellow-50 to-white">
        <div className="p-4 border-b border-yellow-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-yellow-100 rounded-lg text-yellow-700">
              <Layers size={18} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">
                Advanced Chart Generator
              </h3>
              <p className="text-xs text-slate-500">
                Generate charts and analytics based on various student and staff
                demographics.
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

        <div className="p-5 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4 items-end">
          <div className="space-y-1.5 md:col-span-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
              Category
            </label>
            <select
              className="w-full pl-2 pr-6 py-2.5 rounded-lg border hover:border-slate-500 cursor-pointer border-slate-300 text-sm bg-white focus:ring-2 focus:ring-yellow-500 outline-none transition-all shadow-sm"
              value={domain}
              onChange={(e) => {
                setDomain(e.target.value as Domain);
                setBreakdown("");
                setGenderFilter("");
                setLevelFilter("");
              }}
            >
              <option value="">Select...</option>
              {availableDomains.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5 md:col-span-1">
            <label
              className={`text-xs font-bold uppercase tracking-wide ${!domain ? "text-slate-300" : "text-slate-500"}`}
            >
              Field
            </label>
            <select
              className="w-full pl-2 pr-6 py-2.5 rounded-lg border hover:border-slate-500 cursor-pointer border-slate-300 text-sm bg-white focus:ring-2 focus:ring-yellow-500 outline-none transition-all shadow-sm disabled:bg-slate-50"
              value={breakdown}
              onChange={(e) => setBreakdown(e.target.value)}
              disabled={!domain}
            >
              <option value="">Select...</option>
              {activeConfig?.breakdowns.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5 md:col-span-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
              <Filter size={10} /> Gender
            </label>
            <select
              className="w-full pl-2 pr-6 py-2.5 rounded-lg border hover:border-slate-500 cursor-pointer border-slate-300 text-sm bg-white focus:ring-2 focus:ring-yellow-500 outline-none transition-all shadow-sm"
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
            >
              <option value="">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="space-y-1.5 md:col-span-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
              <Filter size={10} /> Level
            </label>
            <select
              className="w-full pl-2 pr-6 py-2.5 rounded-lg border hover:border-slate-500 cursor-pointer border-slate-300 text-sm bg-white focus:ring-2 focus:ring-yellow-500 outline-none transition-all shadow-sm"
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
            >
              <option value="">All Levels</option>
              <option value="100">100 Level</option>
              <option value="200">200 Level</option>
              <option value="300">300 Level</option>
              <option value="400">400 Level</option>
              <option value="500">500 Level</option>
            </select>
          </div>

          <div className="md:col-span-1 lg:col-span-1 space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
              <Filter size={10} /> <Building size={10} /> Dept ID
            </label>
            <input
              type="number"
              className="w-full pl-2 pr-6 py-2.5 rounded-lg border hover:border-slate-500 cursor-pointer border-slate-300 text-sm bg-white focus:ring-2 focus:ring-yellow-500 outline-none transition-all shadow-sm"
              placeholder="ID"
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
            />
          </div>

          <div className="space-y-1.5 md:col-span-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
              View
            </label>
            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
              {CHART_TYPES.map((type) => (
                <button
                  key={type.type}
                  onClick={() => setChartType(type.type)}
                  className={`flex-1 p-1.5 flex justify-center items-center rounded-md transition-all ${chartType === type.type ? "bg-white shadow-sm text-yellow-600" : "text-slate-400 hover:text-slate-600"}`}
                  title={type.label}
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
              className="w-full h-10.5 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <RefreshCw size={18} className="animate-spin" />
              ) : (
                <PieIcon size={18} />
              )}
              <span>Go</span>
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
