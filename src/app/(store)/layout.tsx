import { generateMeta } from "@/lib/metadata";
import { type Metadata } from "next";

import StoreLayoutWrapper from "./store-layout-wrapper";
import { Suspense } from "react";
import SplashLoader from "@/components/splash-loader";

export const metadata: Metadata = generateMeta({
  title: "Gempire",
  description: "Gempire is your one-stop shop for all gem-based products.",
  canonicalPath: "/",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const themeColor = "#000000";

export default function StoreLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div>
        <Suspense fallback={<SplashLoader />}>
          <StoreLayoutWrapper>{children}</StoreLayoutWrapper>
        </Suspense>
      </div>
    </>
  );
}
