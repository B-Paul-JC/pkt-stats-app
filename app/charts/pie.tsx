import { use, useEffect, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, type PieLabelRenderProps } from "recharts";
import {
  aggregateAllNumericFields,
  type DataRecord,
} from "~/analytics/pieChartReducer";
import { useAppStore } from "~/store/useAppStore";

// sample data
const data = [
  { name: "Group A", value: 400, fill: "#0088FE" },
  { name: "Group B", value: 300, fill: "#00C49F" },
  { name: "Group C", value: 300, fill: "#FFBB28" },
  { name: "Group D", value: 200, fill: "#FF8042" },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AA336A",
  "#33AA99",
  "#9933AA",
  "#AA9933",
];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = +innerRadius + (+outerRadius - +innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > ncx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(+(percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

export const PieCT = () => {
  const cdata = useAppStore((state) => state.cdata);
  const focus = useAppStore((state) => state.focus);
  const keyValue = useAppStore((state) => state.keyValue);
  const faculty = useAppStore((state) => state.faculty);
  const criteria = useAppStore((state) => state.criteria);
  const [finalData, setFinalData] = useState(data);

  useEffect(() => {
    if (keyValue === "faculty") {
      const udata = (
        typeof cdata === "object" && cdata !== null && focus.value in cdata
          ? cdata[focus.value as keyof typeof cdata]
          : data
      ) as any[];

      if (!focus.value) {
        setFinalData(data);
        return;
      }

      if (faculty === "All") {
        const reducedData = aggregateAllNumericFields(udata, criteria)[0];

        const fData = Object.entries(reducedData).map(([name, value], i) => ({
          name,
          value,
          fill: COLORS[i],
        })) as unknown as { name: string; value: number; fill: string }[];

        setFinalData(fData);
      } else {
        const uData = udata.map((item: DataRecord) => {
          const { Faculty, ...iData2 } = item;
          return { [item.Faculty]: iData2 };
        }) as unknown as DataRecord[];

        const iData = uData.filter(
          (item: {}) => Object.keys(item)[0] === faculty
        )[0];

        const { Faculty, ...iData2 } = iData;

        const filteredData =
          Object.keys(iData2).length < 1 ? {} : (iData2[faculty] as any);

        const fData = Object.entries(filteredData).map(([name, value], i) => ({
          name,
          value,
          fill: COLORS[i],
        })) as { name: string; value: number; fill: string }[];

        setFinalData(fData);
      }
    }
    if (
      keyValue === "students" ||
      keyValue === "staff" ||
      keyValue === "accomodation"
    ) {
      const udata = (
        typeof cdata === "object" && cdata !== null && focus.value in cdata
          ? cdata[focus.value as keyof typeof cdata]
          : data
      ) as any[];

      const reducedData = aggregateAllNumericFields(udata, criteria)[0];

      const fData = Object.entries(reducedData).map(([name, value], i) => ({
        name,
        value,
        fill: COLORS[i],
      })) as unknown as { name: string; value: number; fill: string }[];

      // const uData = udata.map((item: { [x: string]: any; year: any }, i) => {
      //   const { Year, ...rest } = item;
      //   const total = Object.values(rest).reduce(
      //     (sum: number, val) => sum + (+val as number),
      //     0
      //   );
      //   return { name: Year, value: total, fill: COLORS[i] };
      // }) as any[];

      setFinalData(fData);
    }
  }, [keyValue, focus, cdata, faculty, criteria]);

  return (
    <ResponsiveContainer width="90%" height={300}>
      <PieChart>
        <Pie
          data={finalData}
          dataKey="value"
          nameKey="name"
          cx="40%"
          cy="50%"
          innerRadius="30%"
          outerRadius="80%"
          // Corner radius is the rounded edge of each pie slice
          cornerRadius="5%"
          isAnimationActive={true}
          label={renderCustomizedLabel}
          labelLine={false}
        >
          {finalData.map((entry, index) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        {/* Center label */}
        <text
          x="40%"
          y="50%"
          textAnchor="end"
          dominantBaseline="central"
          style={{ pointerEvents: "none" }}
        >
          <tspan x="100%" dy="9em" fontSize={16} fill="#222">
            Total - {finalData.reduce((sum, item) => sum + item.value, 0)}
          </tspan>
        </text>

        <Legend
          content={renderLegend}
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

const renderLegend = (props: any) => {
  const { payload } = props as { payload: any[] };

  return (
    <ul>
      {payload.map((entry, index) => {
        return (
          <li
            key={`item-${index}`}
            className="text-xs"
            style={{ color: entry.color }}
          >
            {entry.value} - {entry.payload.value}
          </li>
        );
      })}
    </ul>
  );
};
