import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  type PieLabelRenderProps,
} from "recharts";
import { useAppStore } from "~/store/useAppStore";

// sample data
const data = [
  { name: "Group A", value: 400, fill: "#0088FE" },
  { name: "Group B", value: 300, fill: "#00C49F" },
  { name: "Group C", value: 300, fill: "#FFBB28" },
  { name: "Group D", value: 200, fill: "#FF8042" },
];

const RADIAN = Math.PI / 180;
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

export const PieCT = () => {
  const cdata = useAppStore((state) => state.cdata);
  const selectedType = useAppStore((state) => state.selectedType);
  const keyValue = useAppStore((state) => state.keyValue);
  const faculty = useAppStore((state) => state.faculty);
  const [finalData, setFinalData] = useState(data);

  useEffect(() => {
    if (keyValue === "faculty") {
      const udata = (
        typeof cdata === "object" &&
        cdata !== null &&
        selectedType.value in cdata
          ? cdata[selectedType.value as keyof typeof cdata]
          : data
      ) as any[];

      const filteredData = udata.filter(
        (item) => item.Faculty === faculty
      )[0] as any;
      filteredData.Faculty = "";

      const { Faculty, ...intermediateData } = filteredData;
      const fData = Object.entries(intermediateData).map(([key, value], i) => {
        // The structure you want for each item in the final array
        return {
          name: key,
          value: value,
          fill: COLORS[i],
        };
      }) as { name: string; value: number; fill: string }[];
      setFinalData(fData);
    }
    if (keyValue === "students" || "staff" || "accomodation") {
      const udata = (
        typeof cdata === "object" &&
        cdata !== null &&
        selectedType.value in cdata
          ? cdata[selectedType.value as keyof typeof cdata]
          : data
      ) as any[];

      const uData = udata.map((item: { [x: string]: any; year: any }, i) => {
        const { Year, ...rest } = item;
        const total = Object.values(rest).reduce(
          (sum: number, val) => sum + (+val as number),
          0
        );
        return { name: Year, value: total, fill: COLORS[i] };
      }) as any[];
      console.log({ udata, uData, selectedType, keyValue });

      setFinalData(uData);
    }
  }, [keyValue, selectedType, cdata, faculty]);

  return (
    <ResponsiveContainer width="90%" height={300}>
      <PieChart>
        <Pie
          data={finalData}
          dataKey="value"
          nameKey="name"
          cx="40%"
          cy="50%"
          outerRadius={100}
          isAnimationActive={true}
          label
          labelLine={true}
        >
          {data.map((entry, index) => (
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
          <tspan x="90%" dy="6.7em" fontSize={12} fill="#666">
            Total
          </tspan>
          <tspan x="90%" dy="1.4em" fontSize={18} fontWeight={700} fill="#222">
            {finalData.reduce((sum, item) => sum + item.value, 0)}
          </tspan>
        </text>

        <Legend layout="vertical" verticalAlign="middle" align="right" />
      </PieChart>
    </ResponsiveContainer>
  );
};
