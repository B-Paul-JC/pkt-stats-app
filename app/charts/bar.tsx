import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useAppStore } from "~/store/useAppStore";

// #region Sample data
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const CustomizedAxisTick = ({ x, y, payload }: any) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-45)"
        fontSize={10}
      >
        {payload.value}
      </text>
    </g>
  );
};

// #endregion
export const SimpleBarChart = () => {
  const cdata = useAppStore((state) => state.cdata);
  const focus = useAppStore((state) => state.focus);
  const keyValue = useAppStore((state) => state.keyValue);
  const [finalData, setFinalData] = useState(data as any[]);

  useEffect(() => {
    if (keyValue === "students" || "staff" || "accomodation") {
      const udata = (
        typeof cdata === "object" && cdata !== null && focus.value in cdata
          ? cdata[focus.value as keyof typeof cdata]
          : data
      ) as any[];

      setFinalData(udata);
    }
  }, [cdata, focus, keyValue]);

  return (
    <BarChart
      style={{
        width: "100%",
        height: "100%",
        maxWidth: "920px",
        maxHeight: "90vh",
        aspectRatio: 1.618,
      }}
      responsive
      data={finalData}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey={Object.keys(finalData[0] || {})[0]}
        tick={CustomizedAxisTick}
        height={60}
      />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      {Object.keys(finalData[0] || {})
        .slice(1)
        .map((key, index) => {
          const colors = [
            "#0088FE",
            "#00C49F",
            "#FFBB28",
            "#FF8042",
            "#8884D8",
          ];
          const color = colors[index % colors.length];
          return (
            <Bar
              key={key}
              dataKey={key}
              fill={color}
              activeBar={
                <Rectangle fill={color + "88"} stroke={color + "33"} />
              }
            />
          );
        })}
    </BarChart>
  );
};
