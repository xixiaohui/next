"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import clsx from "clsx";

// interface Product {
//   [key: string]: unknown;
// }

import { Product } from "@/components/product/ProductCard"

interface Props {
  product1: Product;
  product2: Product;
  fields: string[]; // 需要对比的字段
  fieldLabels?: Record<string, string>; // 可选：字段中文名或别名
}

export default function ProductComparisonTable({ product1, product2, fields, fieldLabels = {} }: Props) {
  return (
    <div className="overflow-auto rounded-lg border border-gray-200">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-40">属性</TableHead>
            <TableHead>产品一</TableHead>
            <TableHead>产品二</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((field) => {
            const value1 = product1[field] ?? "-";
            const value2 = product2[field] ?? "-";
            const isDiff = value1 !== value2;
            return (
              <TableRow key={field} className="even:bg-gray-50">
                <TableCell className="font-medium text-gray-700">{fieldLabels[field] || field}</TableCell>
                <TableCell className={clsx("whitespace-nowrap", isDiff && "text-red-600 font-semibold")}>
                  {value1 as string}
                </TableCell>
                <TableCell className={clsx("whitespace-nowrap", isDiff && "text-red-600 font-semibold")}>
                  {value2 as string}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
