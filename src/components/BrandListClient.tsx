"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function BrandListClient() {
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBrands() {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const brandSet = new Set<string>();
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.brand) {
            brandSet.add(data.brand);
          }
        });
        setBrands(Array.from(brandSet));
      } catch (err) {
        console.error("🔥 获取品牌失败:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBrands();
  }, []);

  if (loading) return <p className="p-4">加载中...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">品牌列表</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
        {brands.map((brand) => (
          <Link
            key={brand}
            href={`/brands/${encodeURIComponent(brand)}`}
            className="hover:scale-105 transition-transform"
          >
            <Card className="rounded-2xl shadow-md hover:shadow-xl transition-shadow h-full bg-sky-50">
              <CardContent className="p-1 text-center text-sm font-medium">
                {brand}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
