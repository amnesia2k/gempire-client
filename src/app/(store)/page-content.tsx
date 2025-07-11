"use client";

import Loader from "@/components/loader";
import { useProducts } from "@/lib/hooks/useProduct";
import { ProductGrid } from "@/components/product-grid";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function PageContent() {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  const prod = products?.data ?? [];
  console.log("Products:", prod);

  if (!prod || prod.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <div className="space-y-10">
      <h1 className="text-center text-4xl">New Arrivals</h1>

      <ProductGrid products={prod} />

      <div className="flex justify-center">
        <Button asChild variant="outline">
          <Link href="/products" className="inline-flex items-center gap-2">
            <span>View All Products</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
