"use client";

import DashHeader from "@/components/dash-header";
import Loader from "@/components/loader";
import { Card, CardContent } from "@/components/ui/card";
import { useDashboardMetrics } from "@/lib/hooks/useMetrics";
import React from "react";

export default function AdminDashboard() {
  const { data: m, isLoading } = useDashboardMetrics();

  console.log(m);

  if (isLoading) {
    return (
      <section className="space-y-5">
        <DashHeader text="Dashboard" />
        <div className="flex h-64 items-center justify-center">
          <Loader />
        </div>
      </section>
    );
  }

  const data = m?.data;

  const formatPrice = (amount: number | string) => {
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
    return num.toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <section className="space-y-5">
      <DashHeader text="Dashboard" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {/* Metric Tiles */}
        <Card>
          <CardContent className="space-y-2">
            <h2 className="text-lg font-semibold">
              Total Sales
              <span className="text-sm"> (NGN)</span>
            </h2>
            <p className="text-2xl font-bold">
              {formatPrice(data?.totalSales ?? 0)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-2">
            <h2 className="text-lg font-semibold">Total Products</h2>
            <p className="text-2xl font-bold">{data?.totalProducts}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-2">
            <h2 className="text-lg font-semibold">Pending Orders</h2>
            <p className="text-2xl font-bold">{data?.pendingOrders}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-2">
            <h2 className="text-lg font-semibold">Total Orders</h2>
            <p className="text-2xl font-bold">{data?.totalOrders}</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
