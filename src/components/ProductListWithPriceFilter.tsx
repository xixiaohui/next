"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";

export default function ProductListWithPriceFilter() {
  const [products, setProducts] = useState<DocumentData[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [loading, setLoading] = useState(true);

  const fetchProductsByPrice = async (min: number, max: number) => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "products"),
        where("price", ">=", min),
        where("price", "<=", max)
      );
      const snapshot = await getDocs(q);
      const list: DocumentData[] = [];
      snapshot.forEach((doc) => list.push(doc.data()));
      setProducts(list);
    } catch (error) {
      console.error("获取产品失败:", error);
    } finally {
      setLoading(false);
    }
  };

  // 初始加载 + 监听价格变化
  useEffect(() => {
    fetchProductsByPrice(priceRange[0], priceRange[1]);
  }, [priceRange]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">按价格筛选产品</h1>

      <div className="space-y-2">
        <p className="text-gray-600">
          当前价格范围：{priceRange[0]} - {priceRange[1]}
        </p>
        <Slider
          defaultValue={[priceRange[0], priceRange[1]]}
          min={0}
          max={2000}
          step={50}
          onValueChange={(val) => setPriceRange([val[0], val[1]])}
        />
      </div>

      {loading ? (
        <p>加载中...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product, index) => (
            <Card key={index} className="rounded-2xl shadow hover:shadow-xl">
              <CardContent className="p-4 space-y-2">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-500">价格：${product.price}</p>
                <p className="text-sm text-muted-foreground">
                  品牌：{product.brand}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
