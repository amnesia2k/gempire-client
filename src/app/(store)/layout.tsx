import { generateMeta } from "@/lib/metadata";
import { type Metadata } from "next";

import { Inter, Poppins } from "next/font/google";
import StoreLayoutWrapper from "./store-layout-wrapper";
import { Suspense } from "react";
import SplashLoader from "@/components/splash-loader";

const inter = Inter({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--display-family",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--text-family",
});

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
      <div className={`${inter.variable} ${poppins.variable}`}>
        <Suspense fallback={<SplashLoader />}>
          <StoreLayoutWrapper>{children}</StoreLayoutWrapper>
        </Suspense>
      </div>
    </>
  );
}
