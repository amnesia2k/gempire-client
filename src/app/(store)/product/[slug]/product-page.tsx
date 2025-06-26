"use client";

import { useProductBySlug } from "@/lib/hooks/useProduct";
import Loader from "@/components/loader";
import ProductImages from "@/components/product-images";
import { useParams } from "next/navigation";
import React from "react";
import { ProductQuantity } from "@/components/product-quantity";
import { Badge } from "@/components/ui/badge";

export default function ProductPage() {
  const { slug } = useParams();
  const productSlug = typeof slug === "string" ? slug : undefined;

  const { data: product, isLoading, error } = useProductBySlug(productSlug);

  if (isLoading) return <Loader />;

  if (error) return <p>Error: {error.message}</p>;

  if (!product) return <p>No product found with slug: {productSlug}</p>;

  return (
    <div className="mx-auto">
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
