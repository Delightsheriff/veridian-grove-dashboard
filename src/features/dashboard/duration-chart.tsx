"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

// Fallback colors
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Mock data for stay duration, using fallback colors directly
const durationData = [
  { name: "1-2 nights", value: 35, color: COLORS[0] },
  { name: "3-5 nights", value: 45, color: COLORS[1] },
  { name: "6-7 nights", value: 15, color: COLORS[2] },
  { name: "8+ nights", value: 5, color: COLORS[3] },
];

export default function DurationChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stay Duration Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={durationData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {durationData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                color: "#222",
                border: "1px solid #eee",
                borderRadius: "6px",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
