"use client";

import React, { useMemo } from "react";
import type { Product } from "@/lib/types";
import { useCategoryBySlug } from "@/lib/hooks/useCategory";
import ProductCard from "@/components/product-card"; // or extract card from ProductGrid

type SimilarProductsProps = {
  categorySlug: string;
  excludeProductId: string;
};

export const SimilarProducts = ({
  categorySlug,
  excludeProductId,
}: SimilarProductsProps) => {
  const { data, isLoading, isError } = useCategoryBySlug(categorySlug, 1, 100);

  const similarProducts = useMemo(() => {
    if (!data?.products) return [];

    return data.products
      .filter((p: Product) => p._id !== excludeProductId)
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);
  }, [data, excludeProductId]);

  if (isLoading)
    return <p className="text-muted text-sm">Loading similar products...</p>;
  if (isError)
    return (
      <p className="text-destructive text-sm">
        Failed to load similar products
      </p>
    );
  if (similarProducts.length === 0) return null;

  return (
    <div className="mt-10 space-y-4">
      <h3 className="text-lg font-semibold">You may also like</h3>

      <div className="scrollbar-thin scrollbar-thumb-muted-foreground/30 flex gap-4 overflow-x-auto pb-2">
        {similarProducts.map((product) => (
          <div key={product._id} className="min-w-[170px] flex-shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
