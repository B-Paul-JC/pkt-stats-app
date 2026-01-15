import { Settings2, type LucideProps } from "lucide-react";
import { ChartTypeItem } from "./chartTypeItem";
import { CHART_TYPES } from "./types";
import { useAppStore } from "~/store/useAppStore";
import { useCallback, useState } from "react";
import type { ChartConfig } from "~/store/appStoreTypes";

type cnfg =
  | {
      id: string;
      label: string;
      icon: React.ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
      >;
      description: string;
    }
  | undefined;

export const ChartConf = () => {
  const config = useAppStore((store) => store.config);
  const setConfig = useAppStore((store) => store.setConfig);

  const handleChartTypeSelect = useCallback(
    (pnp: keyof ChartConfig, id: string) => {
      const currentValue = config[pnp];
      if (!Array.isArray(currentValue)) {
        return;
      }
      const arrayValue = currentValue as string[];
      setConfig({
        ...config,
        [pnp]: arrayValue.includes(id)
          ? arrayValue.filter((ct) => ct !== id)
          : [...arrayValue, id],
      });
    },
    [config, setConfig]
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<any>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      // --- SIMPLIFIED FRONTEND LOGIC ---
      // We no longer send the raw data. We only send the configuration.
      // The PHP backend will "fetch" the data from the database.

      // Send to PHP Backend
      const data = {
        uid: useAppStore.getState().user?.uid || "guest",
        ...config,
      };
      const response = await fetch(
        "http://exinsab.test/insab/generate_charts.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.error || "Failed to generate assets");
      }

      setResults(json.data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mb-10 p-6 bg-white rounded-xl col-span-1 row-span-11 md:overflow-y-scroll transition-all duration-100 custom-scrollbar shadow-lg border border-gray-200 h-fit md:h-full">
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
        {CHART_TYPES.map((chart) => (
          <ChartTypeItem
            key={chart.id}
            chart={chart}
            isSelected={config.chartType.includes(chart.id)}
            onSelect={(id) => {
              handleChartTypeSelect("chartType", id);
            }}
          />
        ))}
      </div>
      <div
        className="mt-6 flex flex-col p-4 rounded-xl shadow-xl transition-all duration-300 cursor-pointer border-4
        bg-white border-gray-200 hover:border-yellow-500"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Report Title
          </label>
          <input
            type="text"
            value={config.title}
            onChange={(e) => setConfig({ ...config, title: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Report Description
          </label>
          <textarea
            value={config.description}
            onChange={(e) =>
              setConfig({ ...config, description: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      {/* --- Backend Integration Section --- */}
      <div className="p-8 rounded-3xl bg-[#2a2a2a] border border-[#333] shadow-lg mt-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Export & Generate</h2>
            <p className="text-gray-400 mt-1">
              Render this configuration into high-quality PDF reports and images
              via Python.
            </p>
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className={`px-3 py-3 rounded-xl font-semibold text-white transition-all shadow-md ${
              loading
                ? "bg-gray-600 cursor-not-allowed opacity-70"
                : "bg-blue-600 hover:bg-blue-500 cursor-pointer hover:shadow-blue-500/20 active:scale-95"
            }`}
          >
            {loading ? (
              "Generating..."
            ) : (
              <span className="flex items-center justify-center flex-row">
                Generate Assets <Settings2 className="w-5 h-5 ml-2 -mt-1" />
              </span>
            )}
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-200 flex items-center">
            <span className="mr-2">⚠️</span> {error}
          </div>
        )}

        {results && (
          <div className="bg-white p-4 rounded-xl shadow-2xl border border-gray-200 mb-2 w-full animate-in slide-in-from-bottom-5 overflow-y-auto flex flex-col custom-scrollbar">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-gray-800">Assets Ready</h3>
              <button
                onClick={() => setResults(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            {/* Download Main Report */}
            <a
              href={results.pdf_report}
              target="_blank"
              className="block w-full text-center py-2 bg-blue-600 text-white rounded-lg mb-4 text-sm hover:bg-blue-700 transition-colors shadow-sm font-medium"
            >
              Download PDF Report
            </a>

            {/* Source Data Preview Table */}
            {results.source_data && results.source_data.Labels && (
              <div className="mb-4 bg-gray-50 border border-gray-100 rounded-lg p-2">
                <div className="text-[10px] font-bold text-gray-500 uppercase mb-1 tracking-wider">
                  Data from Database
                </div>
                <div className="max-h-32 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-200">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-gray-400 border-b border-gray-100">
                        <th className="text-left font-medium pb-1">Label</th>
                        <th className="text-right font-medium pb-1">Value</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      {results.source_data.Labels.map(
                        (label: string, i: number) => (
                          <tr
                            key={i}
                            className="border-b border-gray-100/50 last:border-0 hover:bg-white"
                          >
                            <td className="py-1">{label}</td>
                            <td className="py-1 text-right font-mono text-gray-900">
                              {results.source_data.Count[i]}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Image Previews */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Image Previews
              </h4>
              {Object.entries(results.images).map(
                ([fname, link]: [string, any]) => (
                  <div
                    key={fname}
                    className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm flex flex-col"
                  >
                    {/* Image Area */}
                    <div className="relative bg-gray-50 border-b border-gray-100">
                      <img
                        src={link}
                        alt={fname}
                        className="w-full h-auto object-contain min-h-[120px]"
                      />
                    </div>

                    {/* Info Row */}
                    <div className="px-3 py-2 text-[10px] text-gray-500 bg-white border-b border-gray-100 flex justify-between items-center">
                      <span
                        className="truncate max-w-[150px] font-medium"
                        title={fname}
                      >
                        {fname}
                      </span>
                      <span
                        className={`uppercase text-[9px] px-1.5 py-0.5 rounded border ${fname.includes("table") ? "bg-purple-50 text-purple-600 border-purple-100" : "bg-blue-50 text-blue-600 border-blue-100"}`}
                      >
                        {fname.includes("table") ? "Table" : "Chart"}
                      </span>
                    </div>

                    {/* Download Button (Permanent) */}
                    <a
                      href={link}
                      download
                      className="block w-full text-center py-2 bg-yellow-500 hover:bg-yellow-700 text-xs font-bold text-white transition-colors"
                    >
                      Download Image
                    </a>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
