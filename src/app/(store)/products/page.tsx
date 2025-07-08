import React, { Suspense } from "react";
import Products from "./products-page";
import Loader from "@/components/loader";
import type { Metadata } from "next";
import { generateMeta } from "@/lib/metadata";

export const metadata: Metadata = generateMeta({
  title: "Products | Gempire",
  description: "Browse and shop for products on Gempire",
  url: "https://store.olatilewa.dev/products",
});

export default function ProductsPage() {
  return (
    <section className="p-5">
      <Suspense fallback={<Loader />}>
        <Products />
      </Suspense>
    </section>
  );
}
