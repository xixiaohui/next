"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Product {
  id: string;
  name: string;
  price: number;
}

interface Props {
  data: Product[];
  title?: string;
}

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7f50",
  "#8dd1e1",
  "#a4de6c",
  "#d0ed57",
  "#ffc0cb",
  "#ffb6b9",
  "#b5ead7",
  "#c7ceea",
  "#fbe7c6",
  "#fcd5ce",
  "#d8e2dc",
  "#a2d2ff",
  "#e2f0cb",
  "#ffe5d9",
  "#d0f4de",
  "#ffb5a7",
  "#bdb2ff",
];

const generateRanges = (step: number, max: number) => {
  const ranges = [];
  for (let i = 0; i < max; i += step) {
    ranges.push({ min: i, max: i + step });
  }
  return ranges;
};

export default function ProductPriceSegmentChart({
  data,
  title = "价格区间（¥0–¥200）分布",
}: Props) {
  const step = 10;
  const maxPrice = 200;
  const ranges = generateRanges(step, maxPrice);

  // 初始化统计对象
  const grouped = ranges.map((range) => {
    const label = `¥${range.min}–¥${range.max}`;
    const count = data.filter(
      (item) => item.price >= range.min && item.price < range.max
    ).length;

    return {
      name: label,
      value: count,
    };
  });

  // 过滤掉数量为 0 的区间
  const chartData = grouped.filter((item) => item.value > 0);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[420px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                label={({ name, value }) => `${name} (${value})`}
                outerRadius={120}
                dataKey="value"
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
