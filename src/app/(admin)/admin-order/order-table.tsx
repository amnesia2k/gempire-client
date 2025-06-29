"use client";

import { DataTable } from "@/components/data-table";
import Loader from "@/components/loader";
import { useOrders } from "@/lib/hooks/useOrder";
import { orderColumns } from "@/components/data-table/columns/order";

export default function OrderTable() {
  const { data: orders = [], isLoading } = useOrders();

  return (
    <div className="mt-8">
      {isLoading ? (
        <Loader />
      ) : (
        <DataTable columns={orderColumns} data={orders} />
      )}
    </div>
  );
}
