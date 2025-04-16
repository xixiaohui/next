"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Card, CardContent } from "@/components/ui/card";

import { useRouter } from "next/navigation";

import BrandListClient from "@/components/BrandListClient";



import ProductFilterControls from "@/components/ProductFilterControls";
import ProductListWithCatelog from "@/components/ProductListWithCatelog";

import AddFiled from "@/components/AddField";

import FilterButtonGroup from "@/components/FilterButtonGroup";
import FilteredProductList from "@/components/FilteredProductList";
import FilteredProductListByCategory from "@/components/FilteredProductListByCategory";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";


export default function PostsPage() {
  const router = useRouter(); // 新增

  const [products, setProducts] = useState([]);
  const [brand, setBrand] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [filters, setFilters] = useState({
    category: "E-glass Fabric",
    brand: "AGY",
    priceRange: "all",
  });

  const [process, setProcess] = useState("Pultrusion");

  const [catelog, setCatelog] = useState("Yarn");

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    };
    fetchProducts();
  }, []);

  const uniqueBrands = Array.from(new Set(products.map((p) => p.brand)));

  const filteredProducts = products.filter((p) => {
    const matchBrand = brand ? p.brand === brand : true;
    const matchSearch = searchTerm
      ? p.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchBrand && matchSearch;
  });

  return (
    <div className="grid grid-cols-12 gap-4 max-w-[1200px] mx-auto px-4">
      <aside className="col-span-2 bg-white rounded-xl shadow p-4">
        <p className="font-bold">简介/导航</p>

        <div>
          {/* <h1 className="text-3xl font-bold mb-6">产品类型</h1>
          <Button className="m-2">yarn</Button>
          <Button className="m-2">Direct Roving</Button>
          <Button className="m-2 max-w-full">
            <p className="truncate max-w-5/6">Assembled Roving</p>
          </Button>
          <Button className="m-2 max-w-full">
            <p className="truncate max-w-5/6">Chopped Strand Mat</p>
          </Button>
          <Button className="m-2">Chopped Strand</Button>
          <Button className="m-2 max-w-full">
            <p className="truncate max-w-5/6">Stitched Mat / Combo Mat</p>
          </Button>
          <Button className="m-2">E-glass Fabric</Button>
          <Button className="m-2">Mesh</Button> */}


          <h1 className="text-3xl font-bold mb-6 mt-6 text-fuchsia-400">产品类型</h1>
          <FilterButtonGroup
            options={[
              "All",
              "Yarn",
              "Direct Roving",
              "Assembled Roving",
              "Chopped Strand Mat",
              "Chopped Strand",
              "Stitched Mat",
              "Combo Mat",
              "E-glass Fabric",
              "Mesh",
            ]}
            active={catelog}
            onChange={setCatelog}
          />

          {/* 多重筛选部分组件 */}
          <ProductFilterControls filters={filters} onChange={setFilters} />

          <AddFiled></AddFiled>
        </div>
      </aside>

      <main className="col-span-6 bg-white rounded-xl shadow p-4">
        <p className="font-bold">动态内容</p>

        {/* <div className="mb-6">
          <BrandPriceChart brand="所有产品" products={products} />
        </div> */}

        <div className="flex justify-between items-center mb-4 gap-4">
          <Select onValueChange={setBrand}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="选择品牌过滤" />
            </SelectTrigger>
            <SelectContent>
              {uniqueBrands.map((b) => (
                <SelectItem key={b} value={b}>
                  {b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="text"
            placeholder="搜索产品名称"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-sm"
          />
        </div>

        <div className="max-w-3xl mx-auto mt-10 space-y-6">
          {/* 根据category筛选的产品 */}
          <FilteredProductListByCategory category={catelog} />

          {/* 工艺对应产品 */}
          <FilteredProductList process={process} />

          

          {/* 多重筛选对应产品 */}
          <ProductListWithCatelog filters={filters} />

          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              onClick={() => router.push(`/products/${product.id}`)} // 点击跳转
              className="cursor-pointer rounded-2xl shadow-md hover:shadow-xl transition-shadow h-full bg-sky-100"
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
          ))}
        </div>
      </main>

      <aside className="col-span-4 bg-white rounded-xl shadow p-4">
        <p className="font-bold">推荐/广告</p>

        <BrandListClient />

        <div>
          {/* <h1 className="text-3xl font-bold mb-6">工艺列表</h1>
          <Button className="m-2">手糊成型（Hand Lay-Up）</Button>
          <Button className="m-2">喷射成型（Spray-Up）</Button>
          <Button className="m-2">RTM（树脂传递模塑）</Button>
          <Button className="m-2">拉挤成型（Pultrusion）</Button>
          <Button className="m-2">缠绕成型（Filament Winding）</Button>
          <Button className="m-2">热压模压（SMC / BMC）</Button>
          <Button className="m-2">真空导入成型（VARTM / Vacuum Infusion）</Button>
          <Button className="m-2">3D 编织（3D Weaving）</Button> */}

          <h1 className="text-3xl font-bold mb-6 mt-6 text-emerald-400">工艺列表</h1>
          <FilterButtonGroup
            options={[
              "All",
              "Hand Lay-Up",
              "Spray-Up",
              "RTM",
              "Pultrusion",
              "Filament Winding",
              "SMC",
              "BMC",
              "VARTM",
              "3D Weaving",
            ]}
            active={process}
            onChange={setProcess}
          />
        </div>
      </aside>
    </div>
  );
}
