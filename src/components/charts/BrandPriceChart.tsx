// components/charts/BrandPriceChart.tsx
"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { Product } from "../product/ProductCard";


interface Props {
  brand: string;
  products: Product[];
}

const COLORS = [
  "#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#8dd1e1", "#a4de6c", "#d0ed57", "#f08080",
];

export default function BrandPriceChart({ brand, products }: Props) {
  const data = products.map(p => ({
    name: p.name,
    price: p.price,
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{brand} 产品价格图</CardTitle>
      </CardHeader>
      <CardContent className="h-[600px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
          >
            <XAxis type="number" tick={{ fontSize: 12 }} />
            <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={100} />
            <Tooltip />
            <Bar dataKey="price" fill="#8884d8">
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
