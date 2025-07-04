"use client";

import Loader from "@/components/loader";
import { useProducts } from "@/lib/hooks/useProduct";
import { ProductGrid } from "@/components/product-grid";

export default function PageContent() {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  if (!products || products.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <div className="space-y-5">
      <h1 className="text-center text-4xl">New Arrivals</h1>

      <ProductGrid products={products} />
    </div>
  );
}
