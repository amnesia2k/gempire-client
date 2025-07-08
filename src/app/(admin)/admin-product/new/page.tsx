import React from "react";
import DashHeader from "@/components/dash-header";
import ProductForm from "./product-form";
import type { Metadata } from "next";
import { generateMeta } from "@/lib/metadata";

export const metadata: Metadata = generateMeta({
  title: "Create New Product | Gempire Admin",
  description: "Add a new product to the Gempire Admin Dashboard",
  canonicalPath: "/admin-product/new",
});

export default function NewProductPage() {
  return (
    <section className="space-y-5">
      <DashHeader text="Add New Product" />

      <ProductForm />
    </section>
  );
}
