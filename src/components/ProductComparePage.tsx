"use client";

import { useState } from "react";
import ProductSelector from "./ProductSelector";
import ProductComparisonTable from "./ProductComparisonTable";

import { Product } from "@/components/product/ProductCard";

export default function ProductComparePage() {
  const [p1, setP1] = useState<Product>();
  const [p2, setP2] = useState<Product>();

  const handleSelect = (product1: Product, product2: Product) => {
    setP1(product1);
    setP2(product2);
  };

  const fields = [
    "name",
    "brand",
    "price",
    "chemicalResistance",
    "density",
    "ecoCertification",
    "elongation",
    "expiryDate",
    "fiberType",
    "flexuralStrength",
    "manufactureDate",
    "tensileStrength",
    "unit",
    "waterAbsorption",
  ]; // 根据你的数据结构自定义

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">产品对比</h2>
      <ProductSelector onSelect={handleSelect} />
      {p1 && p2 ? (
        <ProductComparisonTable
          product1={p1}
          product2={p2}
          fields={fields}
          fieldLabels={{
            name: "产品名称",
            brand: "品牌",
            price: "价格",
            density: "密度",
            ecoCertification: "ecoCertification",
            elongation: "elongation",
            expiryDate: "expiryDate",
            fiberType: "fiberType",
            flexuralStrength: "flexuralStrength",
            manufactureDate: "manufactureDate",
            tensileStrength: "tensileStrength",
            unit: "unit",
            waterAbsorption: "waterAbsorption",
          }}
        />
      ) : (
        <p className="text-gray-500">请选择两个产品进行对比。</p>
      )}
    </div>
  );
}
