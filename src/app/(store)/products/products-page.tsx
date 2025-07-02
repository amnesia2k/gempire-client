"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCategoryBySlug } from "@/lib/hooks/useCategory";
import Loader from "@/components/loader";
import { CategoryFilter } from "@/components/category-filter";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductGrid } from "@/components/product-grid";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedCategory = searchParams.get("category") ?? "all";
  const currentPage = parseInt(searchParams.get("page") ?? "1", 10);

  const {
    data: categoryData,
    isLoading,
    error,
  } = useCategoryBySlug(selectedCategory, currentPage);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  const products = categoryData?.products ?? [];
  const totalPages = categoryData?.totalPages ?? 1;

  return (
    <div className="space-y-6 py-6">
      <h1 className="text-center text-4xl font-bold">Our Collections</h1>

      <div className="flex items-center justify-between">
        <CategoryFilter />
        <div className="space-x-2">
          <Button
            variant="outline"
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="rounded-full"
          >
            <ChevronLeft />
          </Button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="rounded-full"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-muted-foreground text-center">
          No products found in this category
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}
