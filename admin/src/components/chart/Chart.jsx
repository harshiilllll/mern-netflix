import "./chart.css";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Chart({ title, data, dataKey, grid }) {

  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="var(--line-color)" />
          <Line type="monotone" dataKey={dataKey} stroke="var(--line-color)"  />
          <Tooltip />
          {grid && <CartesianGrid stroke="#8f94c0" horizontal={false} vertical={false} strokeDasharray="2 2" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
