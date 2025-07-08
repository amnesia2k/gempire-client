import React, { Suspense } from "react";
import Success from "./success";
import Loader from "@/components/loader";
import type { Metadata } from "next";
import { generateMeta } from "@/lib/metadata";

export const metadata: Metadata = generateMeta({
  title: "Order Success | Gempire",
  description: "Your order has been successfully placed",
  url: "https://store.olatilewa.dev/success",
});

export default function SuccessPage() {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Success />
      </Suspense>
    </div>
  );
}
