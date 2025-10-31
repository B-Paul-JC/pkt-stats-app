import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  type PieLabelRenderProps,
} from "recharts";

// sample data
const data = [
  { name: "Group A", value: 400, fill: "#0088FE" },
  { name: "Group B", value: 300, fill: "#00C49F" },
  { name: "Group C", value: 300, fill: "#FFBB28" },
  { name: "Group D", value: 200, fill: "#FF8042" },
];

const RADIAN = Math.PI / 180;
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

/**
 * Render a custom label for each pie slice.
 * Positions the label midway between innerRadius and outerRadius at the slice's midAngle,
 * and displays the percent value as a whole number followed by '%'.
 */
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  // Ensure required values are present before calculating positions
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }

  // Compute a radius halfway between inner and outer radius for label placement
  const radius = +innerRadius + (+outerRadius - +innerRadius) * 0.5;

  // Normalize center coordinates to numbers
  const ncx = +cx;
  const ncy = +cy;

  // Convert midAngle to radians and compute label x/y coordinates (negate angle to match chart orientation)
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  // Render the label text, anchoring left/right depending on which side of the center it's on
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > ncx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(Number(percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

export const PieCT = () => {
  return (
    <ResponsiveContainer width="90%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="40%"
          cy="50%"
          outerRadius={100}
          isAnimationActive={true}
          label={renderCustomizedLabel}
          labelLine={false}
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
          textAnchor="middle"
          dominantBaseline="central"
          style={{ pointerEvents: "none" }}
        >
          <tspan x="90%" dy="6.7em" fontSize={12} fill="#666">
            Total
          </tspan>
          <tspan x="90%" dy="1.4em" fontSize={18} fontWeight={700} fill="#222">
            {data.reduce((sum, item) => sum + item.value, 0)}
          </tspan>
        </text>

        <Legend layout="vertical" verticalAlign="middle" align="right" />
      </PieChart>
    </ResponsiveContainer>
  );
};
