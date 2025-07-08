import React from "react";
import EditProductWrapper from "./edit-form-wrapper";
import DashHeader from "@/components/dash-header";
import type { Metadata } from "next";
import { generateMeta } from "@/lib/metadata";

export const metadata: Metadata = generateMeta({
  title: "Update Product | Gempire Admin",
  description: "Update an existing product in the Gempire Admin Dashboard",
});

export default async function EditProduct() {
  return (
    <section className="space-y-5">
      <DashHeader text="Update Product" />

      <EditProductWrapper />
    </section>
  );
}
