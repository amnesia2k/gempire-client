"use client";

import { DataTable } from "@/components/data-table";
import { promoColumns } from "@/components/data-table/columns/promo";
import SplashLoader from "@/components/splash-loader";
import { usePromoCodes } from "@/lib/hooks/usePromo";
import React from "react";

export default function PromoTable() {
  const { data, isLoading } = usePromoCodes();

  const promos = data?.data ?? [];

  console.log("API Raw:", data);
  console.log("Extracted Promos:", promos);

  return (
    <div>
      <div className="mt-8">
        {isLoading ? (
          <SplashLoader
            classes="flex min-h-[calc(70vh-200px)] w-full items-center justify-center"
            text="Loading orders..."
          />
        ) : (
          <DataTable columns={promoColumns} data={promos} />
        )}
      </div>
    </div>
  );
}
