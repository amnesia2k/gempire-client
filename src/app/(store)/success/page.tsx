import React, { Suspense } from "react";
import Success from "./success";
import type { Metadata } from "next";
import { generateMeta } from "@/lib/metadata";
import SplashLoader from "@/components/splash-loader";

export const metadata: Metadata = generateMeta({
  title: "Order Success | Gempire",
  description: "Your order has been successfully placed",
  canonicalPath: "/success",
});

export default function SuccessPage() {
  return (
    <div>
      <Suspense
        fallback={
          <SplashLoader classes="flex h-screen w-full items-center justify-center" />
        }
      >
        <Success />
      </Suspense>
    </div>
  );
}
