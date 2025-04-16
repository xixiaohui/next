"use client";

import { useEffect, useState } from "react";
import { getProductByBrand } from "@/components/getProductByBrand";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import BrandListClient from "@/components/BrandListClient";
import { useRouter } from "next/navigation";

import BrandPriceChart from "@/components/charts/BrandPriceChart";
import BrandProductList from "@/components/product/BrandProductList"

import ProductPricePieChart from "@/components/charts/ProductPricePieChart";
import ProductPriceLineChart from "@/components/charts/ProductPriceLineChart";

import { Product} from "@/components/product/ProductCard"


export default function BrandProductsClient({ brand }: { brand: string }) {

  const router = useRouter(); // 新增

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    getProductByBrand(brand)
      .then((data) => setProducts(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [brand]);

  if (loading) return <p className="text-gray-500">加载中...</p>;

  return (
    <div className="grid grid-cols-12 gap-4 max-w-[1200px] mx-auto px-4">
      <aside className="col-span-2 bg-white rounded-xl shadow p-4">
        <p className="font-bold">简介/导航</p>
      </aside>

      <main className="col-span-6 bg-white rounded-xl shadow p-4">
        <h1 className="text-2xl font-bold mb-6">价格图</h1>
        <BrandPriceChart brand={brand} products={products} />

        <div className="mb-6 mt-6">
          <BrandProductList brand={brand} />
        </div>
        
        {/*显示此品牌产品的价格饼状图 */}
        <ProductPricePieChart data={ products} />

        {/*显示此品牌产品的价格走势图 */}
        <div className="mb-6 mt-6">
          <ProductPriceLineChart data={products} title={`${brand} 玻纤系列产品价格走势`} />
        </div>
        

        <h1 className="text-2xl font-bold mb-6 mt-6">品牌：{brand}</h1>
        {products.length === 0 ? (
          <p className="text-gray-500">暂无此品牌的产品。</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-2 shadow">
            {products.map((product) => (
              <Card
                key={product.id}
                onClick={() => router.push(`/products/${product.id}`)} // 点击跳转
                className="cursor-pointer rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    {product.brand || "暂无描述"}
                  </p>
                  <p className="text-green-600 font-bold">${product.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <aside className="col-span-4 bg-white rounded-xl shadow p-4">
        <p className="font-bold">推荐/广告</p>

        <BrandListClient />
      </aside>
    </div>
  );
}
