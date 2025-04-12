"use client";

import { useState } from "react";
import PriceRangeSelector from "./PriceRangeSelector";
import ProductListByPrice from "./ProductListByPrice";

export default function ProductPriceFilter() {
  const [range, setRange] = useState<[number, number]>([0, 1000]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">价格筛选商品</h1>
      <PriceRangeSelector min={0} max={2000} onChange={setRange} />
      <ProductListByPrice minPrice={range[0]} maxPrice={range[1]} />
    </div>
  );
}