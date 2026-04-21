import React, { useState, useRef, type ChangeEvent } from "react";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Users,
  Briefcase,
} from "lucide-react";
import { ProtectedRoute } from "~/ProtectedRoute";
import type { Route } from "./+types/upload";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "University of Ibadan Info Statistics" },
    {
      name: "description",
      content: "Upload CSV files for student or staff data",
    },
  ];
}

const API_URL = "/api/upload_handler.php";

type TargetType = "students" | "staff";
type UploadStatus = "idle" | "uploading" | "success" | "error";

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [targetType, setTargetType] = useState<TargetType>("students");
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [message, setMessage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (
        selectedFile.type !== "text/csv" &&
        !selectedFile.name.endsWith(".csv")
      ) {
        setStatus("error");
        setMessage("Please select a valid CSV file.");
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setStatus("idle");
      setMessage("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus("error");
      setMessage("Please select a file first.");
      return;
    }

    setStatus("uploading");
    setMessage("");

    const formData = new FormData();
    formData.append("action", "upload_data");
    formData.append("type", targetType);
    formData.append("csv_file", file);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
        // Omit Content-Type header; fetch sets it automatically with the correct boundary for FormData
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setMessage(data.message || "File uploaded successfully!");
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = ""; // Reset input
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to upload file.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setStatus("error");
      setMessage("Network error. Please ensure the PHP server is running.");
    }
  };

  return (
    <ProtectedRoute>
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-800">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-100">
            {/* Header */}
            <div className="bg-blue-600 p-6 text-white text-center">
              <UploadCloud className="w-12 h-12 mx-auto mb-3 opacity-90" />
              <h1 className="text-2xl font-bold tracking-tight">
                Data Upload Portal
              </h1>
              <p className="text-blue-100 mt-1 text-sm">
                Upload CSV records for students or staff.
              </p>
            </div>
            <div className="p-8">
              {/* Target Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Select Dataset Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setTargetType("students")}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                      targetType === "students"
                        ? "border-blue-600 bg-blue-50 text-blue-700 font-semibold"
                        : "border-slate-200 hover:border-blue-300 text-slate-600"
                    }`}
                  >
                    <Users className="w-5 h-5" />
                    Students
                  </button>
                  <button
                    onClick={() => setTargetType("staff")}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                      targetType === "staff"
                        ? "border-blue-600 bg-blue-50 text-blue-700 font-semibold"
                        : "border-slate-200 hover:border-blue-300 text-slate-600"
                    }`}
                  >
                    <Briefcase className="w-5 h-5" />
                    Staff
                  </button>
                </div>
              </div>
              {/* File Dropzone */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  CSV File
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                    file
                      ? "border-green-400 bg-green-50"
                      : "border-slate-300 hover:border-blue-400 hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="file"
                    accept=".csv"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                  {file ? (
                    <div className="flex flex-col items-center">
                      <FileText className="w-10 h-10 text-green-600 mb-2" />
                      <p className="text-sm font-semibold text-green-800">
                        {file.name}
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-slate-500">
                      <UploadCloud className="w-10 h-10 mb-2 text-slate-400" />
                      <p className="text-sm">Click to browse or drag file here</p>
                      <p className="text-xs mt-1 text-slate-400">
                        Only .csv files are supported
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {/* Status Messages */}
              {status === "success" && (
                <div className="mb-6 p-4 bg-green-50 rounded-lg flex items-start gap-3 text-green-800 border border-green-200">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-green-600" />
                  <p className="text-sm font-medium">{message}</p>
                </div>
              )}
              {status === "error" && (
                <div className="mb-6 p-4 bg-red-50 rounded-lg flex items-start gap-3 text-red-800 border border-red-200">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
                  <p className="text-sm font-medium">{message}</p>
                </div>
              )}
              {/* Submit Button */}
              <button
                onClick={handleUpload}
                disabled={!file || status === "uploading"}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-4 rounded-xl shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === "uploading" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>Upload Dataset</>
                )}
              </button>
            </div>
          </div>
        </div>
    </ProtectedRoute>
  );
}
