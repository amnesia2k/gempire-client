import React from "react";
import ProductPage from "./product-page";
import type { Metadata } from "next";
import type { GetProductResponse } from "@/lib/types";
import { api } from "@/lib/axios";
import { generateMeta } from "@/lib/metadata";

interface Props {
  params: Promise<{ slug: string }>;
}

const gempire = "./gempire-meta.jpeg";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const res = await api.get<GetProductResponse>(`/product/${slug}`);
    const product = res.data.data;

    const firstImage =
      typeof product.images?.[0] === "string"
        ? product.images?.[0]
        : (product.images?.[0]?.imageUrl ?? gempire);

    return generateMeta({
      title: product.name,
      description: product.description,
      image: firstImage,
      url: `https://store.olatilewa.dev/product/${product.slug}`,
    });
  } catch (err) {
    console.error("Error generating metadata:", err);
    return generateMeta({
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
    });
  }
}

export default function PageForProduct() {
  return (
    <div className="p-5 md:px-10 md:py-5">
      <ProductPage />
    </div>
  );
}
