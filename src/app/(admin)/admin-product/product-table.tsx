"use client";

import { useProducts } from "@/lib/hooks/useProduct";
import { DataTable } from "@/components/data-table";
import { productColumns } from "@/components/data-table/columns/product";
import React from "react";
import SplashLoader from "@/components/splash-loader";

export default function ProductTable() {
  const { data, isLoading } = useProducts();

  const products = data?.data ?? [];

  return (
    <div className="mt-8">
      {isLoading ? (
        <SplashLoader
          classes="flex min-h-[calc(70vh-200px)] w-full items-center justify-center"
          text="Loading products..."
        />
      ) : (
        <DataTable columns={productColumns} data={products} />
      )}
    </div>
  );
}
