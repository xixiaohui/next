"use client"
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function PostsPage() {

  const [products, setProducts] = useState([]);
  const [brand, setBrand] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(productsList);
    };
    fetchProducts();
  }, []);

  const uniqueBrands = Array.from(new Set(products.map((p) => p.brand)));

  const filteredProducts = products.filter((p) => {
    const matchBrand = brand ? p.brand === brand : true;
    const matchSearch = searchTerm ? p.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    return matchBrand && matchSearch;
  });

  return (
    <div className="grid grid-cols-12 gap-4 max-w-[1200px] mx-auto px-4">

      <aside className="col-span-2 bg-white rounded-xl shadow p-4">
        <p className="font-bold">简介/导航</p>
      </aside>

      <main className="col-span-6 bg-white rounded-xl shadow p-4">
        <div className="flex justify-between items-center mb-4 gap-4">
          <Select onValueChange={setBrand}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="选择品牌过滤" />
            </SelectTrigger>
            <SelectContent>
              {uniqueBrands.map((b) => (
                <SelectItem key={b} value={b}>{b}</SelectItem>
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

        <p className="font-bold">动态内容</p>
        <div className="max-w-3xl mx-auto mt-10 space-y-6">
          {filteredProducts.map((product) => (
            <Card key={product.name} className="rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition">
              <CardContent className="p-5">
                <div className="flex flex-col gap-1">
                  <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
                  <span className="text-sm text-gray-500">{product.brand}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <aside className="col-span-4 bg-white rounded-xl shadow p-4">
        <p className="font-bold">推荐/广告</p>
      </aside>
    </div>
  );
}
