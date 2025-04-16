"use client";

import { useEffect, useState } from "react";
import { getProductById } from "@/components/getProductById";


import BrandListClient from "@/components/BrandListClient";

import PriceRangeSelector from "@/components/product/PriceRangeSelector";
import ProductListByPrice from "@/components/product/ProductListByPrice";

import ProductCard from "@/components/product/ProductCard";


export default function ProductDetailClient({
  productId,
}: {
  productId: string;
}) {
  const [product, setProduct] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  const [range, setRange] = useState<[number, number]>([0, 1000]);

  useEffect(() => {
    getProductById(productId)
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error loading product:", err))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (!product) return <p className="text-red-500">Product not found</p>;

  return (
    <div className="grid grid-cols-12 gap-4 max-w-[1200px] mx-auto px-4">
      <aside className="col-span-2 bg-white rounded-xl shadow p-4">
        <p className="font-bold">简介/导航</p>
      </aside>

      <main className="col-span-6 bg-white rounded-xl shadow p-4">
        <p className="font-bold">动态内容</p>

        <div>
          
          <ProductCard key={product.id} product={product} />
        </div>

        <div className="mt-4">
          <h2 className="text-3xl font-bold mb-6">当前价格范围产品</h2>
          <ProductListByPrice minPrice={range[0]} maxPrice={range[1]} />
        </div>
        
      </main>

      <aside className="col-span-4 bg-white rounded-xl shadow p-4">
        <p className="font-bold">推荐/广告</p>

        <BrandListClient />

        <PriceRangeSelector min={0} max={100} onChange={setRange} />
        
      </aside>
    </div>
  );
}
