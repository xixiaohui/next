"use client";

import { use } from "react";

import ProductDetailClient from "./ProductDetailClient";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = use(params); // ✅ 解包 Promise

  return <ProductDetailClient productId={id} />;
}