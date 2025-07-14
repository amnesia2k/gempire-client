import React, { Suspense } from "react";
import Products from "./products-page";
import type { Metadata } from "next";
import { generateMeta } from "@/lib/metadata";
import SplashLoader from "@/components/splash-loader";

export const metadata: Metadata = generateMeta({
  title: "Products | Gempire",
  description: "Browse and shop for products on Gempire",
  canonicalPath: "/products",
});

export default function ProductsPage() {
  return (
    <section className="space-y-5 p-5">
      <h1 className="text-center text-3xl font-bold md:text-4xl">
        Our Collections
      </h1>

      <Suspense
        fallback={
          <SplashLoader classes="flex h-screen w-full items-center justify-center" />
        }
      >
        <Products />
      </Suspense>
    </section>
  );
}
