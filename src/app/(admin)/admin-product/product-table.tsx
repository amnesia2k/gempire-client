"use client";

import { useProducts } from "@/lib/hooks/useProduct";
import { DataTable } from "@/components/data-table";
import { productColumns } from "@/components/data-table/columns/product";
import Loader from "@/components/loader";
import React from "react";

export default function ProductTable() {
  const { data: products = [], isLoading } = useProducts();

  return (
    <div className="mt-8">
      {isLoading ? (
        <Loader />
      ) : (
        <DataTable columns={productColumns} data={products} />
      )}
    </div>
  );
}
