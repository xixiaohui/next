"use client";

import { useEffect, useState } from "react";
import { getProductById } from "@/components/getProductById";
import { Card, CardContent } from "@/components/ui/card";

import BrandListClient from "@/components/BrandListClient";

import PriceRangeSelector from "@/components/product/PriceRangeSelector";
import ProductListByPrice from "@/components/product/ProductListByPrice";



export default function ProductDetailClient({
  productId,
}: {
  productId: string;
}) {
  const [product, setProduct] = useState<any>(null);
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
          <Card
            key={product.id}
            className="rounded-2xl shadow-md hover:shadow-xl transition-shadow h-full bg-sky-100"
          >
            <CardContent className="p-5">
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold text-gray-900">
                  {product.name}
                </h2>
                <span className="text-sm text-gray-500">{product.brand}</span>
                <strong>${product.price}</strong>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-4">
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
