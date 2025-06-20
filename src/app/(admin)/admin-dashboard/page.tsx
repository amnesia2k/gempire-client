import DashHeader from "@/components/dash-header";
import { Card, CardContent } from "@/components/ui/card";
import { ngn } from "@/lib/utils";
import React from "react";

export default function AdminDashboard() {
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
            <p className="text-2xl font-bold">{ngn}0</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-2">
            <h2 className="text-lg font-semibold">Total Products</h2>
            <p className="text-2xl font-bold">0</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-2">
            <h2 className="text-lg font-semibold">Pending Orders</h2>
            <p className="text-2xl font-bold">0</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-2">
            <h2 className="text-lg font-semibold">Total Orders</h2>
            <p className="text-2xl font-bold">0</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
