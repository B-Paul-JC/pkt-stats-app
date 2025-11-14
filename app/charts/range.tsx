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

export const StackedAreaChart = () => {
  const cdata = useAppStore((state) => state.cdata);
  const selectedType = useAppStore((state) => state.selectedType);
  const keyValue = useAppStore((state) => state.keyValue);
  const [finalData, setFinalData] = useState(data as any[]);

  useEffect(() => {
    if (keyValue === "students" || "staff" || "accomodation") {
      const udata = (
        typeof cdata === "object" &&
        cdata !== null &&
        selectedType.value in cdata
          ? cdata[selectedType.value as keyof typeof cdata]
          : data
      ) as any[];

      setFinalData(udata);
    }
  }, [cdata, selectedType, keyValue]);
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={finalData}>
        <XAxis dataKey={Object.keys(finalData[0] || {})[0]} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey={Object.keys(finalData[0] || {})[1]}
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Area
          type="monotone"
          dataKey={Object.keys(finalData[0] || {})[2]}
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
