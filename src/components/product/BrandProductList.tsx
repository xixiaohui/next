// components/product/BrandProductList.tsx
"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import { Product } from "./ProductCard";


interface Props {
  brand: string;
}

export default function BrandProductList({ brand }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(6);

  const totalPages = Math.ceil(products.length / perPage);
  const currentData = products.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  useEffect(() => {
    async function fetchProducts() {
      const q = query(collection(db, "products"), where("brand", "==", brand));
      const querySnapshot = await getDocs(q);
      const result: Product[] = [];
      querySnapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() } as Product);
      });
      setProducts(result);
    }
    fetchProducts();
  }, [brand]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">品牌：{brand} 的产品列表分页</h2>
        <Select
          value={String(perPage)}
          onValueChange={(val) => {
            setPerPage(Number(val));
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-24">
            <span>{perPage} / 页</span>
          </SelectTrigger>
          <SelectContent>
            {[6, 12, 18, 24].map((n) => (
              <SelectItem key={n} value={String(n)}>
                {n} / 页
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 产品卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentData.map((product) => (
          <Card
            key={product.id}
            className="hover:shadow-lg transition-transform hover:scale-[1.02] cursor-pointer bg-sky-50"
          >
            <Link href={`/products/${product.id}`} className="block p-4">
              <CardHeader className="p-0">
                <CardTitle className="text-base">{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-2">
                <p className="text-green-600 font-semibold">
                  $ {product.price}
                </p>
               
              </CardContent>
            </Link>
          </Card>
            // <ProductCard key={product.id} product={product}/>
        ))}
      </div>

      {/* 分页控件 */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span>
            第 <strong>{currentPage}</strong> / {totalPages} 页
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
