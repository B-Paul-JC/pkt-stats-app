import React, { useState } from "react";
import type { StudentListResponse } from "./types_interfaces";
import { Card } from "./statCard";
import { Download, SkipForwardIcon, Trash2 } from "lucide-react";
import { useAppStore } from "~/store/useAppStore";
import { SelfDestructMessage } from "./selfDestructMessageBox";

interface Props {
  data: StudentListResponse | null;
}

export const StudentListTable: React.FC<Props> = ({ data }) => {
  const rowsPerPage = 10;
  const [minRow, setMinRow] = useState(0);
  const maxRow =
    data?.count! < minRow + rowsPerPage ? data?.count! : minRow + rowsPerPage;
  const store = useAppStore();
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!data || !data.data || data.data.length === 0) {
    if (data && data.data && data.data.length === 0) {
      return (
        <SelfDestructMessage
          message="No student records found for the selected criteria."
          duration={9}
          onComplete={() => store.deleteWidget(data.id)}
        />
      );
    }
    return null;
  }

  const headers = Object.keys(data.data[0]);

  const formatHeader = (key: string) => {
    return key.replace(/_/g, " ").replace("staff", "").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const handleDownload = async (format: string) => {
    if (!store.generatedWidgets) return;
    setIsDownloading(true);
    setError(null);

    try {
      const res = await fetch("/api/api.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "download_table_export",
          data,
          uid: store.user?.uid,
          format,
        }),
      });

      // 1. Check for HTTP errors first
      if (!res.ok) {
        // Try to parse error message if server returns JSON error
        try {
          const errData = await res.json();
          throw new Error(errData.error || "Server error");
        } catch (e) {
          throw new Error(`Export failed: ${res.statusText}`);
        }
      }

      // 2. Get the raw binary data (Blob) instead of JSON
      const blob = await res.blob();

      // 3. CRITICAL: Check if the blob is actually a JSON error from PHP
      // Sometimes PHP sends 'application/json' even with attachment headers if an error occurs early
      if (blob.type === "application/json") {
        const text = await blob.text();
        try {
          const json = JSON.parse(text);
          if (json.error) throw new Error(json.error);
        } catch (e) {
          // Not JSON, continue
        }
      }

      // 4. Create a temporary URL for the Blob
      const url = window.URL.createObjectURL(blob);

      // 5. Trigger download programmatically
      const link = document.createElement("a");
      link.href = url;

      // Set filename dynamically based on format
      const timestamp = new Date().getTime();
      const ext = format === "xlsx" ? "xlsx" : format; // csv, pdf, xlsx
      link.download = `export_${timestamp}.${ext}`;

      document.body.appendChild(link);
      link.click();

      // 6. Cleanup memory
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error("Download Error:", err);
      setError(err.message || "File Generation Failed");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Card className="p-0 border border-slate-200 col-span-full">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
        <div>
          <h3 className="font-bold text-lg text-slate-900">
            {data.title || "Student List"}
          </h3>
          <p className="text-xs text-slate-500">{data.count} records found</p>
        </div>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => {
              handleDownload("csv");
            }}
            disabled={isDownloading}
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors flex items-center gap-1"
          >
            <Download size={16} /> .csv
          </button>
          <button
            onClick={() => {
              handleDownload("xlsx");
            }}
            disabled={true}
            style={{ cursor: "not-allowed !important" }}
            className="opacity-50 p-1.5 text-slate-600 hover:bg-green-50 rounded transition-colors flex items-center gap-1 cursor-not-allowed"
          >
            <Download size={16} /> .xlsx
          </button>
          <button
            onClick={() => {
              handleDownload("pdf");
            }}
            disabled={isDownloading}
            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors flex items-center gap-1"
          >
            <Download size={16} /> .pdf
          </button>
          <button
            onClick={() => {
              store.deleteWidget(data.id);
            }}
            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
          >
            <Trash2 size={16} />
          </button>
          <span className="text-xs text-slate-800">
            Records {minRow + 1} - {maxRow}{" "}
          </span>
          {/* Pagination Buttons */}
          <button
            onClick={() => setMinRow(0)}
            disabled={minRow === 0}
            className="px-3 rotate-180 py-1 text-xs bg-slate-200 text-slate-700 rounded disabled:opacity-50"
          >
            <SkipForwardIcon size={12} />
          </button>
          <button
            onClick={() => setMinRow(Math.max(0, minRow - rowsPerPage))}
            disabled={minRow === 0}
            className="px-3 py-1 text-xs bg-slate-200 text-slate-700 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setMinRow(minRow + rowsPerPage)}
            disabled={minRow >= data.data.length - rowsPerPage}
            className="px-3 py-1 text-xs bg-slate-200 text-slate-700 rounded disabled:opacity-50"
          >
            Next
          </button>
          <button
            onClick={() => setMinRow(data.data.length - rowsPerPage)}
            disabled={minRow >= data.data.length - rowsPerPage}
            className="px-3 py-1 text-xs bg-slate-200 text-slate-700 rounded disabled:opacity-50"
          >
            <SkipForwardIcon size={12} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-600">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 font-semibold whitespace-nowrap">S/N</th>
              {headers.map((key) => (
                <th
                  key={key}
                  className="px-6 py-3 font-semibold whitespace-nowrap"
                >
                  {formatHeader(key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.data.map(
              (row: any, idx: number) =>
                idx > minRow - 1 &&
                idx < maxRow && (
                  <tr
                    key={idx}
                    className="bg-white border-b border-slate-100 odd:bg-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-3 whitespace-nowrap">{idx + 1}.</td>
                    {headers.map((key) => (
                      <td
                        key={`${idx}-${key}`}
                        className="px-6 py-3 whitespace-nowrap"
                      >
                        {row[key] !== null && row[key] !== undefined
                          ? String(row[key])
                          : "-"}
                      </td>
                    ))}
                  </tr>
                ),
            )}
          </tbody>
        </table>
      </div>

      {/* Print Footer */}
      {data.print_meta && (
        <div className="hidden print:flex flex-col mt-8 pt-4 border-t border-slate-300 text-xs text-slate-500">
          <div className="flex justify-between">
            <span>Generated by: {data.print_meta.generated_by}</span>
            <span>{data.print_meta.generated_at}</span>
          </div>
          <div className="text-center mt-2 italic">
            {data.print_meta.disclaimer}
          </div>
        </div>
      )}
    </Card>
  );
};
