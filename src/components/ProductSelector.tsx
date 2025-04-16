"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Product } from "./product/ProductCard";

interface Props {
  onSelect: (p1: Product , p2: Product) => void;
}

export default function ProductSelector({ onSelect }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected1, setSelected1] = useState<string | null>(null);
  const [selected2, setSelected2] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(list as Product[]);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const p1 = products.find((p) => p.id === selected1) || null;
    const p2 = products.find((p) => p.id === selected2) || null;
    onSelect(p1, p2);
  }, [selected1, selected2, products]);

  return (
    <div className="flex gap-4 mb-6">
      <div className="w-1/2">
        <Select onValueChange={setSelected1}>
          <SelectTrigger>
            <SelectValue placeholder="选择产品一" />
          </SelectTrigger>
          <SelectContent>
            {products.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-1/2">
        <Select onValueChange={setSelected2}>
          <SelectTrigger>
            <SelectValue placeholder="选择产品二" />
          </SelectTrigger>
          <SelectContent>
            {products.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
