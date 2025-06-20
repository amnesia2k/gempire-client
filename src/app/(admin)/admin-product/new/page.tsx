import React from "react";
import DashHeader from "@/components/dash-header";
import ProductForm from "./product-form";

export default function NewProductPage() {
  return (
    <section className="space-y-5">
      <DashHeader text="Add New Product" />

      <ProductForm />
    </section>
  );
}
