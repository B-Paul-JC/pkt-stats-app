import { Settings2, type LucideProps } from "lucide-react";
import { ChartTypeItem } from "./chartTypeItem";
import { CHART_TYPES } from "./types";
import { useAppStore } from "~/store/useAppStore";
import { useCallback, useState } from "react";

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

export const ChartConf = ({
  selectedChartObject,
}: {
  selectedChartObject: cnfg;
}) => {
  const config = useAppStore((store) => store.config);
  const setConfig = useAppStore((store) => store.setConfig);

  const handleChartTypeSelect = useCallback((pnp: string, id: string) => {
    setConfig({
      ...config,
      [pnp]: id,
    });
  }, []);

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
      const response = await fetch("http://insab.test/generate_charts.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

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
            isSelected={config.chartType === chart.id}
            onSelect={(id) => {
              handleChartTypeSelect("chartType", id);
            }}
          />
        ))}
      </div>
      <div className="mt-8 p-4 bg-gray-100 text-gray-700 rounded">
        <p>
          <strong>Personnel</strong>: {config.personnel}
          <br />
          <strong>Gender</strong>: {config.gender}
          <br />
          <strong>State Of Origin</strong>: {config.stateoforigin}
          <br />
          <strong>Faculty</strong>: {config.faculty}
          <br />
          <strong>Department</strong>: {config.department}
          <br />
          <strong>Academic Year</strong>: {config.yearDisp}
          <br />
        </p>
        <p className="text-gray-700">
          <strong>Preferred Chart:</strong>{" "}
          {selectedChartObject?.label || "None"}
        </p>
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
          <div className="bg-white p-4 rounded-xl shadow-2xl border border-gray-200 mb-2 custom-scrollbar w-full animate-in slide-in-from-bottom-5 h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-gray-800">Assets Ready</h3>
              <button
                onClick={() => setResults(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <a
              href={results.pdf_report}
              target="_blank"
              className="block w-full text-center py-2 bg-blue-600 text-white rounded-lg mb-4 text-sm hover:bg-blue-700 transition-colors shadow-sm"
            >
              Download Full PDF Report
            </a>

            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Previews
              </h4>
              {Object.entries(results.images).map(
                ([fname, link]: [string, any]) => (
                  <div
                    key={fname}
                    className="group relative border border-gray-100 rounded-lg overflow-hidden bg-gray-50"
                  >
                    {/* Image Preview */}
                    <img
                      src={link}
                      alt={fname}
                      className="w-full h-auto object-cover min-h-[100px]"
                    />

                    {/* Overlay for download */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                      <a
                        href={link}
                        download
                        className="px-4 py-2 bg-white text-xs font-bold rounded-full hover:bg-gray-100 shadow-lg transform active:scale-95 transition-all"
                      >
                        Download PNG
                      </a>
                    </div>

                    {/* Label */}
                    <div className="px-3 py-2 text-[10px] text-gray-500 bg-white border-t border-gray-100 flex justify-between items-center">
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
