"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import ProductAttributesTable from "@/components/product/ProductAttributesTable";

export interface Product {
  id: string;
  name: string;
  price: number;
  brand: string;
  description?: string;
  imageUrl?: string;
  chemicalResistance: string;
  density: number;
  ecoCertification: string;
  elongation: number;
  expiryDate: string;
  fiberType: string;
  flexuralStrength: number;
  manufactureDate: string;
  tensileStrength: number;
  unit: string;
  waterAbsorption: number;
  tds: {
    [key: string]: string;
  };
}

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const attributes = {
    Brand: product.brand,
    Price: product.price,
    ChemicalResistance: product.chemicalResistance,
    Density: product.density,
    EcoCertification: product.ecoCertification,
    Elongation: product.elongation,
    ExpiryDate: product.expiryDate,
    FiberType: product.fiberType,
    FlexuralStrength: product.flexuralStrength,
    ManufactureDate: product.manufactureDate,
    TensileStrength: product.tensileStrength,
    Unit: product.unit,
    WaterAbsorption: product.waterAbsorption,
  };
  return (
    <Card
      key={product.id}
      className="cursor-pointer rounded-2xl shadow-md hover:shadow-xl transition-shadow h-full bg-sky-100"
    >
      <CardContent className="p-5">
        {/* 产品图 */}
        <div className="w-full sm:w-full h-40 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative mt-2">
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

        {/* 产品信息 */}
        <div className="flex-1 space-y-2 mt-8 mb-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">{product.name}</h2>
          </div>
          
          {/*
          <p className="text-sm text-muted-foreground">品牌：{product.brand}</p>
          <p className="text-base font-medium text-green-600">
            ${product.price}
          </p>
          {product.description && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {product.description}
            </p>
          )}
           <p className="text-base font-medium">
            chemicalResistance: {product.chemicalResistance}
          </p>
          <p className="text-base font-medium">density: {product.density}</p>
          <p className="text-base font-medium">
            ecoCertification: {product.ecoCertification}
          </p>
          <p className="text-base font-medium">
            elongation: {product.elongation}
          </p>
          <p className="text-base font-medium">
            expiryDate: {product.expiryDate}
          </p>
          <p className="text-base font-medium">
            fiberType: {product.fiberType}
          </p>
          <p className="text-base font-medium">
            flexuralStrength: {product.flexuralStrength}
          </p>
          <p className="text-base font-medium">
            tensileStrength: {product.tensileStrength}
          </p>
          <p className="text-base font-medium">unit: {product.unit}</p>
          <p className="text-base font-medium">
            waterAbsorption: {product.waterAbsorption}
          </p> */}

          <ProductAttributesTable attributes={attributes} />
        </div>

        {/* 查看详情按钮 */}
        <div className="mt-8 sm:mt-0 ">
          <Link href={`/products/${product.id}`}>
            <Button variant="outline">More Info</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
