"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Fallback colors
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Mock data for sales
const salesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 4500 },
  { month: "May", sales: 6000 },
  { month: "Jun", sales: 5500 },
  { month: "Jul", sales: 7000 },
  { month: "Aug", sales: 6500 },
  { month: "Sep", sales: 8000 },
  { month: "Oct", sales: 7500 },
  { month: "Nov", sales: 9000 },
  { month: "Dec", sales: 8500 },
];

export default function SalesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart
            data={salesData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS[0]} stopOpacity={0.6} />
                <stop offset="95%" stopColor={COLORS[0]} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              tick={{
                fill: "#64748b",
                fontSize: 12,
              }}
              tickLine={{ stroke: "#e2e8f0" }}
              axisLine={{ stroke: "#e2e8f0" }}
            />
            <YAxis
              tick={{
                fill: "#64748b",
                fontSize: 12,
              }}
              tickLine={{ stroke: "#e2e8f0" }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              opacity={0.5}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                color: "#0f172a",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow:
                  "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
              }}
              labelStyle={{
                color: "#0f172a",
                fontWeight: "500",
              }}
              formatter={(value: number) => [
                `$${value.toLocaleString()}`,
                "Sales",
              ]}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke={COLORS[0]}
              strokeWidth={3}
              fill="url(#colorSales)"
              dot={{
                fill: COLORS[0],
                strokeWidth: 2,
                stroke: "#ffffff",
                r: 4,
              }}
              activeDot={{
                r: 6,
                fill: COLORS[0],
                stroke: "#ffffff",
                strokeWidth: 3,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
