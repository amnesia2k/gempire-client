import DashHeader from "@/components/dash-header";
import React from "react";
import OrderTable from "./order-table";
import type { Metadata } from "next";
import { generateMeta } from "@/lib/metadata";

export const metadata: Metadata = generateMeta({
  title: "Gempire Orders",
  description: "Manage all orders in the Gempire Admin Dashboard",
  canonicalPath: "/admin-order",
});

export default function AdminOrder() {
  return (
    <section>
      <div className="">
        <DashHeader text="All Orders" />
      </div>

      <OrderTable />
    </section>
  );
}
