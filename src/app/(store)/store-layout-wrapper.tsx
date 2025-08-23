"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import SplashLoader from "@/components/splash-loader";
import { Separator } from "@/components/ui/separator";
import { useCategoryBySlug } from "@/lib/hooks/useCategory";
import { useProducts } from "@/lib/hooks/useProduct";
import { useSearchParams } from "next/navigation";
import React, { type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function StoreLayoutWrapper({ children }: Props) {
  const { data: p, isLoading: pp } = useProducts();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category") ?? "all";
  const currentPage = parseInt(searchParams.get("page") ?? "1", 10);

  const { data: c, isLoading: cc } = useCategoryBySlug(
    selectedCategory,
    currentPage,
    20,
  );

  if (pp || !p || cc || !c) {
    return (
      <SplashLoader
        text="Crafting your scent experience..."
        classes="flex h-screen w-full items-center justify-center"
      />
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* 👇 Full-width navbar with border */}
      <div className="border-border border-b">
        <Navbar />
      </div>

      {/* 👇 Centered content with padding */}
      <main className="mx-auto w-full max-w-7xl flex-grow pt-[100px]">
        {children}
      </main>

      <Separator className="my-5" />
      <Footer />
    </div>
  );
}
