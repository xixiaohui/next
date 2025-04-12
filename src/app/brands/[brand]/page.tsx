import BrandProductsClient from "./BrandProductsClient";


import { use } from "react";

export default function BrandPage({ params }: { params: Promise<{ brand: string }> }) {

  const { brand } = use(params); // ✅ 解包 Promise

  console.log("品牌",brand)

  const decodedBrand = decodeURIComponent(brand); // 🔥 解码回原样：Shangwei Fiber
  
  console.log("解码回原样",decodedBrand)

  return <BrandProductsClient brand={decodedBrand} />;
}
