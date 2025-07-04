import React, { Suspense } from "react";
import Products from "./products-page";
import Loader from "@/components/loader";

export default function ProductsPage() {
  return (
    <section className="p-5">
      <Suspense fallback={<Loader />}>
        <Products />
      </Suspense>
    </section>
  );
}
