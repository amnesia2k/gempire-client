import React from "react";
import Cart from "./cart";
import type { Metadata } from "next";
import { generateMeta } from "@/lib/metadata";

export const metadata: Metadata = generateMeta({
  title: "Cart | Gempire",
  description: "View and manage your shopping cart items",
  canonicalPath: "/cart",
});

export default function CartPage() {
  return (
    <section className="p-5">
      <Cart />
    </section>
  );
}
