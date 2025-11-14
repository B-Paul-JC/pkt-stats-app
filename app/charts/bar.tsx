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

// #endregion
export const SimpleBarChart = () => {
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
    <BarChart
      style={{
        width: "100%",
        height: "100%",
        maxWidth: "600px",
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
      <XAxis dataKey={Object.keys(finalData[0] || {})[0]} />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      <Bar
        dataKey={Object.keys(finalData[0] || {})[1]}
        fill="#0088FE"
        activeBar={<Rectangle fill="#0088FE88" stroke="#0088FE33" />}
      />
      <Bar
        dataKey={Object.keys(finalData[0] || {})[2]}
        fill="#00C49F"
        activeBar={<Rectangle fill="#00C49F88" stroke="#00C49F33" />}
      />
    </BarChart>
  );
};
