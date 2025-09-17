"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCategoryBySlug } from "@/lib/hooks/useCategory";
import { CategoryFilter } from "@/components/category-filter";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductGrid } from "@/components/product-grid";
import { Suspense, useEffect } from "react";
import { CategoryFilterSkeleton } from "@/components/category-filter-skeleton";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedCategory = searchParams.get("category") ?? "all";
  const rawPage = parseInt(searchParams.get("page") ?? "1", 10);

  // 🧹 sanitize page immediately
  const currentPage = Number.isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

  const {
    data: categoryData,
    error,
    isLoading,
  } = useCategoryBySlug(selectedCategory, currentPage, 20);

  const totalPages = categoryData?.totalPages ?? 1;

  // 🪄 clamp page if it's out of range
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      params.set("page", "1");
      router.replace(`?${params.toString()}`);
    }
  }, [currentPage, totalPages, searchParams, router]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  if (error) return <div>Error: {error.message}</div>;

  const products = categoryData?.products ?? [];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <Suspense fallback={<CategoryFilterSkeleton />}>
          <CategoryFilter />
        </Suspense>

        <div className="space-x-2">
          <Button
            variant="outline"
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="border-primary rounded-full"
          >
            <ChevronLeft />
          </Button>

          <span>
            {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="border-primary rounded-full"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-muted-foreground text-center">Loading...</div>
      ) : products.length === 0 ? (
        <div className="text-muted-foreground text-center">
          No products found in this category
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}
