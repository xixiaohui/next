"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { Product } from "@/components/product/ProductCard"

interface Props {
  category: string;
}

export default function FilteredProductListByCategory({ category }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const q =
        category === "All"
            ? query(collection(db, "products"))
            : query(collection(db, "products"), where("category", "==", category));

        const snapshot = await getDocs(q);
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];

        setProducts(list);
      } catch (e) {
        console.error("Fetch error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [category]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
      {loading
        ? Array.from({ length: 6 }).map((_, i) => (
            <Card 
            key={i}
            className="bg-fuchsia-50">
              <CardContent className="p-4 space-y-2">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))
        : products.map((product) => (
            <Card 
            key={product.id}
            className="bg-fuchsia-50">
              <CardContent className="p-4 space-y-1 ">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-muted-foreground text-sm">Category: {product.category}</p>
                <p className="text-primary font-medium">${product.price}</p>
              </CardContent>
            </Card>
          ))}
    </div>
  );
}
