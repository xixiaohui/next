import BrandProductsClient from "./BrandProductsClient";

export default function BrandPage({ params }: { params: { brand: string } }) {
  return <BrandProductsClient brand={params.brand} />;
}
