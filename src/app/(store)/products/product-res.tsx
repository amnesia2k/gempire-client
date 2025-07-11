"use client";

import { useSearchParams } from "next/navigation";
import { useCategoryBySlug } from "@/lib/hooks/useCategory";
import Loader from "@/components/loader";
import { ProductGrid } from "@/components/product-grid";

export function ProductResults() {
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category") ?? "all";
  const currentPage = parseInt(searchParams.get("page") ?? "1", 10);

  const {
    data: categoryData,
    isLoading,
    error,
  } = useCategoryBySlug(selectedCategory, currentPage);

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  const products = categoryData?.products ?? [];

  if (products.length === 0) {
    return (
      <div className="text-muted-foreground text-center">
        No products found in this category
      </div>
    );
  }

  return <ProductGrid products={products} />;
}
