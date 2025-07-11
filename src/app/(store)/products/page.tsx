import React, { Suspense } from "react";
import Products from "./products-page";
import Loader from "@/components/loader";
import type { Metadata } from "next";
import { generateMeta } from "@/lib/metadata";

export const metadata: Metadata = generateMeta({
  title: "Products | Gempire",
  description: "Browse and shop for products on Gempire",
  canonicalPath: "/products",
});

export default function ProductsPage() {
  return (
    <section className="space-y-5 p-5">
      <h1 className="text-center text-4xl">Our Collections</h1>

      <Suspense fallback={<Loader />}>
        <Products />
      </Suspense>
    </section>
  );
}
