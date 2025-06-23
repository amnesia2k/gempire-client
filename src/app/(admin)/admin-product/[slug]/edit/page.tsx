import React from "react";
import EditProductWrapper from "./edit-form-wrapper";
import DashHeader from "@/components/dash-header";

/**
 * Asynchronously renders the admin product edit page with a header and product editing form.
 *
 * Displays a section containing a header labeled "Update Product" and the product editing interface.
 */
export default async function EditProduct() {
  return (
    <section className="space-y-5">
      <DashHeader text="Update Product" />

      <EditProductWrapper />
    </section>
  );
}
