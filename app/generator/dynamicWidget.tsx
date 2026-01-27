import React, { useState, useEffect, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  Cell,
  PieChart,
  Pie,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";
import {
  Lock,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Sigma,
  TrendingUp,
  Award,
  Activity,
  Maximize2,
  Target,
  Trash2,
} from "lucide-react";
import type { WidgetData } from "./types_interfaces";
import { useAppStore } from "~/store/useAppStore";
import logo from "../../public/favicon.ico";
import { SelfDestructMessage } from "./selfDestructMessageBox";

// Local Card definition
const WidgetCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}
  >
    {children}
  </div>
);

const AccessDeniedWidget: React.FC<{ title: string; message: string }> = ({
  title,
  message,
}) => (
  <WidgetCard className="p-6 h-full flex flex-col print:hidden">
    <div className="mb-4">
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
    </div>
    <div className="flex-1 flex flex-col items-center justify-center text-center bg-slate-50 rounded-lg border border-dashed border-slate-300 p-6">
      <Lock size={32} className="text-slate-400 mb-3" />
      <h4 className="text-sm font-semibold text-slate-600">
        Access Restricted
      </h4>
      <p className="text-xs text-slate-500 mt-1">{message}</p>
    </div>
  </WidgetCard>
);

export const DynamicWidget: React.FC<{ widget: WidgetData }> = ({ widget }) => {
  const store = useAppStore();

  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none");

  useEffect(() => {
    setSortOrder("none");
  }, [widget.id]);

  if (widget.type === "restricted") {
    return (
      <AccessDeniedWidget
        title={widget.title}
        message={widget.message || "Access Denied"}
      />
    );
  }

  const { data, config, print_meta } = widget;
  if (!data || !config) return null;
  if (!data || data.length === 0) {
    if (data && data.length === 0) {
      return (
        <SelfDestructMessage
          message="No students found for the selected criteria."
          duration={9}
          onComplete={() => store.deleteWidget(widget.id)}
        />
      );
    }
    return null;
  }
  // --- Metrics Calculation ---
  const getItemTotal = (item: any) => {
    let itemTotal = 0;
    config.bars?.forEach((b) => (itemTotal += Number(item[b.key]) || 0));
    config.lines?.forEach((l) => (itemTotal += Number(item[l.key]) || 0));
    config.areas?.forEach((a) => (itemTotal += Number(item[a.key]) || 0));
    config.pies?.forEach((p) => (itemTotal += Number(item[p.key]) || 0));
    config.scatters?.forEach((s) => (itemTotal += Number(item[s.key]) || 0));
    return itemTotal;
  };

  const total = useMemo(() => {
    return data.reduce((acc, item) => acc + getItemTotal(item), 0);
  }, [data, config]);

  const sortedData = useMemo(() => {
    if (sortOrder === "none") return data;
    return [...data].sort((a, b) => {
      const valA = getItemTotal(a);
      const valB = getItemTotal(b);
      return sortOrder === "asc" ? valA - valB : valB - valA;
    });
  }, [data, sortOrder, config]);

  const chartMetrics = useMemo(() => {
    if (!sortedData || sortedData.length === 0) return [];
    const values = sortedData.map((d) => getItemTotal(d));
    const maxVal = Math.max(...values);
    const minVal = Math.min(...values);
    const avgVal = total / values.length;

    const metrics = [];
    switch (widget.type) {
      case "pie":
        const sumSqProbs = values.reduce(
          (acc, val) => acc + Math.pow(val / total, 2),
          0,
        );
        const diversity = (1 - sumSqProbs) * 100;
        metrics.push({
          label: "Diversity",
          value: `${diversity.toFixed(1)}%`,
          icon: Activity,
          color: "bg-emerald-100 text-emerald-800",
        });
        const dominance = (maxVal / total) * 100;
        metrics.push({
          label: "Dominance",
          value: `${dominance.toFixed(1)}%`,
          icon: Award,
          color: "bg-orange-100 text-orange-800",
        });
        metrics.push({
          label: "Segments",
          value: values.length,
          icon: Sigma,
          color: "bg-blue-100 text-blue-800",
        });
        break;
      case "bar":
        const topItem = sortedData.find((d) => getItemTotal(d) === maxVal);
        const topName = topItem ? topItem[config.xKey] : "N/A";
        const displayName =
          String(topName).length > 15
            ? String(topName).substring(0, 12) + "..."
            : topName;
        metrics.push({
          label: "Top",
          value: displayName,
          icon: Award,
          color: "bg-blue-100 text-blue-800",
        });
        metrics.push({
          label: "Avg",
          value: avgVal.toFixed(0),
          icon: Target,
          color: "bg-indigo-100 text-indigo-800",
        });
        metrics.push({
          label: "Spread",
          value: (maxVal - minVal).toLocaleString(),
          icon: Activity,
          color: "bg-slate-100 text-slate-800",
        });
        break;
      case "line":
        const first = values[0] || 0;
        const last = values[values.length - 1] || 0;
        const change = first !== 0 ? ((last - first) / first) * 100 : 0;
        metrics.push({
          label: "Trend",
          value: `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`,
          icon: TrendingUp,
          color:
            change >= 0
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800",
        });
        metrics.push({
          label: "Peak",
          value: maxVal.toLocaleString(),
          icon: Maximize2,
          color: "bg-purple-100 text-purple-800",
        });
        break;
      default:
        metrics.push({
          label: "Count",
          value: values.length,
          icon: Sigma,
          color: "bg-slate-100 text-slate-800",
        });
    }
    return metrics;
  }, [sortedData, widget.type, total, config]);

  const toggleSort = () => {
    setSortOrder((prev) => {
      if (prev === "none") return "desc";
      if (prev === "desc") return "asc";
      return "none";
    });
  };
  const SortIcon =
    sortOrder === "asc"
      ? ArrowUp
      : sortOrder === "desc"
        ? ArrowDown
        : ArrowUpDown;

  return (
    <WidgetCard
      className={`widget-card p-6 ${widget.width === "full" ? "lg:col-span-2" : ""}`}
    >
      {/* --- PRINT HEADER (Hidden on Screen) --- */}
      {print_meta && (
        <div className="hidden print:flex flex-col border-b-2 border-blue-500 pb-4 mb-6 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">
                  {print_meta.school_name}
                </h1>
                <p className="text-sm text-slate-500">{print_meta.address}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Generated Report
              </p>
              <p className="text-lg font-mono font-medium text-slate-800">
                {print_meta.generated_at}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* --- SCREEN HEADER --- */}
      <div className="mb-6 flex justify-between items-start w-full">
        <div className="max-w-[70%]">
          <h3 className="text-lg font-bold text-slate-900 mb-1.5">
            {widget.title} || Generated by UID: {useAppStore().user?.uid}
          </h3>

          {chartMetrics && chartMetrics.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {chartMetrics.map((metric, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide shadow-sm ${metric.color}`}
                >
                  <metric.icon size={10} strokeWidth={3} />
                  <span>
                    {metric.label}: {metric.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {widget.subtitle && (
            <p className="text-sm text-slate-500">{widget.subtitle}</p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2 print:hidden">
          <div className="flex items-center gap-2">
            {widget.tag && (
              <span className="px-2 py-1 bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold rounded">
                {widget.tag}
              </span>
            )}
            <button
              onClick={toggleSort}
              className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
            >
              <SortIcon size={16} />
            </button>
            <button
              onClick={() => {
                store.deleteWidget(widget.id);
              }}
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
          <span className="text-sm font-semibold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 whitespace-nowrap">
            Total: {total.toLocaleString()}
          </span>
        </div>
      </div>

      {/* --- CHART CONTAINER --- */}
      <div
        className={`chart-container w-full ${widget.type === "pie" ? "h-128" : "h-128"}`}
      >
        <ResponsiveContainer width="100%" height="100%">
          {(() => {
            switch (widget.type) {
              case "bar":
                return (
                  <BarChart data={sortedData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey={config.xKey}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: "transparent" }} />
                    <Legend />
                    {config.bars?.map((bar, idx) => (
                      <Bar
                        key={idx}
                        dataKey={bar.key}
                        radius={[4, 4, 0, 0]}
                        fill={bar.color || "#eab308"}
                      >
                        {bar.colorKey &&
                          sortedData.map((entry: any, cellIdx: number) => (
                            <Cell
                              key={`cell-${cellIdx}`}
                              fill={entry[bar.colorKey!] || bar.color}
                            />
                          ))}
                      </Bar>
                    ))}
                  </BarChart>
                );
              case "line":
                return (
                  <LineChart data={sortedData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey={config.xKey}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Legend />
                    {config.lines?.map((line, idx) => (
                      <Line
                        key={idx}
                        type="monotone"
                        dataKey={line.key}
                        stroke={line.color || "#eab308"}
                        strokeWidth={3}
                        dot={{ r: 4 }}
                      />
                    ))}
                  </LineChart>
                );
              case "area":
                return (
                  <AreaChart data={sortedData}>
                    <defs>
                      {config.areas?.map((area, idx) => (
                        <linearGradient
                          key={`grad-${widget.id}-${idx}`}
                          id={`grad-${widget.id}-${idx}`}
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor={area.color || "#eab308"}
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor={area.color || "#eab308"}
                            stopOpacity={0}
                          />
                        </linearGradient>
                      ))}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey={config.xKey}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Legend />
                    {config.areas?.map((area, idx) => (
                      <Area
                        key={idx}
                        type="monotone"
                        dataKey={area.key}
                        stroke={area.color || "#eab308"}
                        fill={`url(#grad-${widget.id}-${idx})`}
                        strokeDasharray={area.strokeDash}
                      />
                    ))}
                  </AreaChart>
                );
              case "pie":
                return (
                  <PieChart
                    margin={{ top: 20, bottom: 20, right: 20, left: 20 }}
                  >
                    <Tooltip />
                    <Legend
                      layout="vertical"
                      verticalAlign="middle"
                      align="right"
                      width={520}
                      content={({ payload }) => (
                        <div className="max-h-112.5 overflow-y-auto pr-2 grid grid-cols-2 gap-x-6 gap-y-3">
                          {payload?.map((entry: any, index: number) => {
                            const val = entry.payload.value;
                            const percent =
                              total > 0 ? ((val / total) * 100).toFixed(1) : 0;
                            return (
                              <div
                                key={`item-${index}`}
                                className="flex items-center gap-2 text-xs font-bold text-black whitespace-nowrap"
                              >
                                <div
                                  className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                                  style={{ backgroundColor: entry.color }}
                                />
                                <span>
                                  {entry.value} ({percent}%)
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    />
                    {config.pies?.map((pie, idx) => (
                      <Pie
                        key={idx}
                        data={sortedData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={2}
                        minAngle={5}
                        dataKey={pie.key}
                        nameKey={pie.nameKey}
                      >
                        {sortedData.map((entry: any, index: number) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              pie.colors
                                ? pie.colors[index % pie.colors.length]
                                : "#eab308"
                            }
                          />
                        ))}
                      </Pie>
                    ))}
                  </PieChart>
                );
              case "scatter":
                return (
                  <ScatterChart
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      type="category"
                      dataKey={config.xKey}
                      name="Category"
                      allowDuplicatedCategory={false}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      type="number"
                      name="Count"
                      axisLine={false}
                      tickLine={false}
                    />
                    <ZAxis type="number" range={[100, 500]} name="Value" />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Legend />
                    {config.scatters?.map((scatter, idx) => (
                      <Scatter
                        key={idx}
                        name={scatter.name || scatter.key}
                        data={sortedData.map((item) => ({
                          [config.xKey]: item[config.xKey],
                          value: Number(item[scatter.key] || 0),
                        }))}
                        dataKey="value"
                        fill={scatter.color || "#eab308"}
                      />
                    ))}
                  </ScatterChart>
                );
              default:
                return <div>Unsupported Chart Type</div>;
            }
          })()}
        </ResponsiveContainer>
      </div>

      {/* --- PRINT FOOTER (Hidden on Screen) --- */}
      {print_meta && (
        <div className="hidden print:flex border-t border-slate-200 pt-4 mt-auto w-full justify-between items-center text-xs text-slate-400">
          <span>Generated by {print_meta.generated_by}</span>
          <span className="italic">{print_meta.disclaimer}</span>
          <span>{print_meta.generated_at}</span>
        </div>
      )}
    </WidgetCard>
  );
};
