"use client";

import { DataTable } from "@/components/data-table";
import { useOrders } from "@/lib/hooks/useOrder";
import { orderColumns } from "@/components/data-table/columns/order";
import SplashLoader from "@/components/splash-loader";

export default function OrderTable() {
  const { data: orders = [], isLoading } = useOrders();

  return (
    <div className="mt-8">
      {isLoading ? (
        <SplashLoader
          classes="flex min-h-[calc(70vh-200px)] w-full items-center justify-center"
          text="Loading orders..."
        />
      ) : (
        <DataTable columns={orderColumns} data={orders} />
      )}
    </div>
  );
}
