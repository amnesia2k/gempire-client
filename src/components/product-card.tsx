// components/product-card.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import CatBadge from "./cat-badge";
import AddToCart from "./atc-btn";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/context/cart-store";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCartStore();
  const handleAdd = () => {
    addToCart(product, 1);
    toast.success(`Added "${product.name}" to cart`);
  };

  const isOut = product.unit === 0;
  const firstImage = product.images?.[0];

  const card = (
    <>
      <div className="relative aspect-square w-full overflow-hidden rounded-t-md">
        {firstImage && (
          <Image
            src={firstImage.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        {product.category?.name && <CatBadge name={product.category.name} />}
      </div>
      <div className="space-y-1 py-2">
        <h2 className="text-foreground truncate font-semibold">
          {product.name}
        </h2>
        <p className="text-muted-foreground text-sm">
          ₦{Number(product.price).toLocaleString("en-NG")}
        </p>
      </div>
    </>
  );

  return (
    <div
      className={cn(
        "group mx-auto w-full max-w-[150px] space-y-2 transition-opacity",
        isOut && "cursor-not-allowed opacity-60",
      )}
    >
      {isOut ? card : <Link href={`/product/${product.slug}`}>{card}</Link>}

      <AddToCart handleAddToCart={handleAdd} size="sm" isOutOfStock={isOut} />
    </div>
  );
}
