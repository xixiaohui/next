"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  brand: string;
  description?: string;
  imageUrl?: string;
}

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  return (
    <div className="space-y-6">
      {products.map((product) => (
        <Card
          key={product.id}
          className="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          {/* 图片 */}
          <div className="w-full sm:w-40 h-40 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                无图
              </div>
            )}
          </div>

          {/* 信息区域 */}
          <div className="flex-1 space-y-2">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-sm text-muted-foreground">品牌：{product.brand}</p>
            <p className="text-base font-medium text-green-600">${product.price}</p>
            {product.description && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {product.description}
              </p>
            )}
          </div>

          {/* 操作按钮 */}
          <div className="mt-4 sm:mt-0">
            <Link href={`/products/${product.id}`}>
              <Button variant="outline">查看详情</Button>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
}
