import React from "react";
import EditProductWrapper from "./edit-form-wrapper";
import DashHeader from "@/components/dash-header";

export default async function EditProduct() {
  return (
    <section className="space-y-5">
      <DashHeader text="Update Product" />

      <EditProductWrapper />
    </section>
  );
}
