"use client";  // 这是一个客户端组件

import { useState } from "react";
import { Input } from "@/components/ui/input";
import ChartComponent from "@/components/ChartComponent";

const DataTable = ({ initialData }) => {
  const [globalFilter, setGlobalFilter] = useState("");

  const filteredData = initialData.filter(product =>
    product.name.toLowerCase().includes(globalFilter.toLowerCase())
  );

  return (
    <div>
      <Input placeholder="Search..." value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} className="mb-4" />

      {/* 显示图表 */}
      <ChartComponent data={filteredData} />

      {/* 显示数据表格 */}
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(product => (
            <tr key={product.id}>
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
