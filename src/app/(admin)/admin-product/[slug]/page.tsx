import React from "react";
import Product from "./product";
import type { Metadata } from "next";
import { api } from "@/lib/axios";
import type { GetProductResponse } from "@/lib/types";
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
      url: `https://store.olatilewa.dev/admin-product/${product.slug}`,
    });
  } catch (error) {
    console.error("Error generating metadata:", error);
    return generateMeta({
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
    });
  }
}

export default function ProductPage() {
  return (
    <div>
      <Product />
    </div>
  );
}
