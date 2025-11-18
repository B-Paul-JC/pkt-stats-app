import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAppStore } from "~/store/useAppStore";

const data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
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

export const StackedAreaChart = () => {
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
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={finalData}>
        <XAxis
          dataKey={Object.keys(finalData[0] || {})[0]}
          tick={CustomizedAxisTick}
          height={60}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        {Object.keys(finalData[0] || {})
          .slice(1, 6)
          .map((key, index) => {
            const colors = [
              "#8884d8",
              "#82ca9d",
              "#ffc658",
              "#ff7c7c",
              "#8dd1e1",
            ];
            return (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stackId="1"
                stroke={colors[index]}
                fill={colors[index]}
              />
            );
          })}
      </AreaChart>
    </ResponsiveContainer>
  );
};
