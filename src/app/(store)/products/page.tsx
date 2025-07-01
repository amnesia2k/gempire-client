import React, { Suspense } from "react";
import Products from "./products-page";
import Loader from "@/components/loader";

export default function ProductsPage() {
  return (
    <div className="p-5 md:px-10 md:py-5">
      <Suspense fallback={<Loader />}>
        <Products />
      </Suspense>
    </div>
  );
}
