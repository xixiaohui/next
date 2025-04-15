"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { Product } from "@/components/product/ProductCard"

import { useRouter } from "next/navigation";

export default function ProductListWithCatelog({ filters  }: { filters : Filters }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // 新增

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const conditions = [];
        if (filters.category !== "all") {
          conditions.push(where("category", "==", filters.category));
        }
        if (filters.brand !== "all") {
          conditions.push(where("brand", "==", filters.brand));
        }

        // Price range (custom range logic)
        let priceMin = 0, priceMax = Infinity;
        if (filters.priceRange === "0-50") {
          priceMax = 50;
        } else if (filters.priceRange === "50-100") {
          priceMin = 50;
          priceMax = 100;
        } else if (filters.priceRange === "100-1000") {
          priceMin = 100;
          priceMax = 1000;
        }

        const baseQuery = collection(db, "products");
        let q = conditions.length
          ? query(baseQuery, ...conditions)
          : query(baseQuery);

        const snapshot = await getDocs(q);
        const list = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }) as Product)
          .filter((p) => p.price >= priceMin && p.price <= priceMax);

        setProducts(list);
      } catch (e) {
        console.error("Fetch error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [filters]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
      {loading
        ? Array.from({ length: 6 }).map((_, i) => (
            <Card 
            key={i}
            className="bg-amber-100"
            >
              <CardContent className="p-4 space-y-2 ">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
              </CardContent>
            </Card>
          ))
        : products.map((product) => (
            <Card 
              key={product.id}
              onClick={() => router.push(`/products/${product.id}`)} // 点击跳转
              className="bg-amber-100"
            >
              <CardContent className="p-4 space-y-1">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-muted-foreground text-sm">Category: {product.category}</p>
                <p className="text-primary font-medium">${product.price}</p>
                <p className="text-primary font-medium">Brand: {product.brand}</p>
              </CardContent>
            </Card>
          ))}
    </div>
  );
}
