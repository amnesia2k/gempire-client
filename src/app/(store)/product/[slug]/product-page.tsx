"use client";

import { useProductBySlug } from "@/lib/hooks/useProduct";
import ProductImages from "@/components/product-images";
import { useParams } from "next/navigation";
import React from "react";
import { ProductQuantity } from "@/components/product-quantity";
import { Badge } from "@/components/ui/badge";
import Script from "next/script";
import SplashLoader from "@/components/splash-loader";

export default function ProductPage() {
  const { slug } = useParams();
  const productSlug = typeof slug === "string" ? slug : undefined;

  const { data: product, isLoading, error } = useProductBySlug(productSlug);

  if (isLoading)
    return (
      <SplashLoader classes="flex min-h-[calc(100vh-200px)] w-full items-center justify-center" />
    );
  if (error) return <p>Error: {error.message}</p>;
  if (!product) return <p>No product found with slug: {productSlug}</p>;

  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images?.map((img) => img.imageUrl) || ["/fallback.jpg"],
    description: product.description,
    sku: product.productId || product._id,
    brand: {
      "@type": "Brand",
      name: "Gempire",
    },
    offers: {
      "@type": "Offer",
      url: `https://store.olatilewa.dev/product/${product.slug}`,
      priceCurrency: "NGN",
      price: product.price,
      itemCondition: "https://schema.org/NewCondition",
      availability:
        product.unit > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div className="mx-auto">
      {/* JSON-LD Structured Data */}
      <Script
        id="jsonld-product"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="grid items-start gap-6 lg:grid-cols-2">
        <ProductImages images={product.images} alt={product.name} />

        <div>
          <h1 className="mb-2 text-4xl md:text-5xl">{product.name}</h1>

          {product.category?.name && (
            <Badge className="mb-4 text-sm capitalize">
              {product.category.name}
            </Badge>
          )}

          <p className="text-primary mb-6 text-3xl font-semibold">
            ₦{Number(product.price).toLocaleString("en-NG")}
          </p>

          <div className="prose text-foreground/80 max-w-none">
            <p>{product.description}</p>
          </div>

          <div className="mt-8">
            <ProductQuantity product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
