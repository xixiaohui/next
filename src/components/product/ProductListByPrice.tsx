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
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface Props {
  minPrice: number;
  maxPrice: number;
}

export default function ProductListByPrice({ minPrice, maxPrice }: Props) {
  const router = useRouter(); // 新增

  const [products, setProducts] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "products"),
          where("price", ">=", minPrice),
          where("price", "<=", maxPrice)
        );
        const snapshot = await getDocs(q);
        const list: DocumentData[] = [];
        snapshot.forEach((doc) =>
          list.push({
            id: doc.id, // ✅ 关键
            ...doc.data(),
          })
        );

        setProducts(list);
      } catch (err) {
        console.error("获取产品失败:", err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [minPrice, maxPrice]);

  if (loading) return <p>加载中...</p>;

  return (
    <div>
      <div>
        <h1 className="text-lg">产品数量 {products.length}</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product, i) => (
          <Card
            key={i}
            onClick={() => router.push(`/products/${product.id}`)} // 点击跳转
            className="cursor-pointer rounded-2xl shadow-md hover:shadow-xl transition-shadow h-full bg-sky-100"
          >
            <CardContent className="p-4 space-y-2">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-500">价格：${product.price}</p>
              <p className="text-sm text-muted-foreground">
                品牌：{product.brand}
              </p>
              <p className="text-sm text-muted-foreground truncate max-w-xs">id:{product.id}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
