"use client";

import { useProducts } from "@/lib/hooks/useProduct";
import { ProductGrid } from "@/components/product-grid";

export default function PageContent() {
  const { data: products, error } = useProducts();

  if (error) return <div>Error: {error.message}</div>;

  const prod = products?.data ?? [];
  console.log("Products:", prod);

  if (!prod || prod.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <div>
      <ProductGrid products={prod} />
    </div>
  );
}
