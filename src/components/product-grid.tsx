"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import CatBadge from "./cat-badge";
import AddToCart from "./atc-btn";
import { useCartStore } from "@/context/cart-store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const { addToCart } = useCartStore();

  const handleAdd = (product: Product) => {
    addToCart(product, 1);
    toast.success(`Added "${product.name}" to cart`);
  };

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {products.map((p) => {
        const isOut = p.unit === 0;
        const firstImage = p.images?.[0];

        return (
          <div
            key={p._id}
            className={cn(
              "group mx-auto w-full max-w-[150px] space-y-2 transition-opacity",
              isOut && "cursor-not-allowed opacity-60",
            )}
          >
            {/* Only wrap in <Link> if in stock */}
            {isOut ? (
              <div>
                <div className="relative aspect-square w-full overflow-hidden rounded-t-md">
                  {firstImage && (
                    <Image
                      src={firstImage.imageUrl}
                      alt={p.name}
                      fill
                      className="object-cover"
                    />
                  )}
                  {p.category?.name && <CatBadge name={p.category.name} />}
                </div>
                <div className="space-y-1 py-2">
                  <h2 className="text-foreground truncate font-semibold">
                    {p.name}
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    ₦{Number(p.price).toLocaleString("en-NG")}
                  </p>
                </div>
              </div>
            ) : (
              <Link href={`/product/${p.slug}`}>
                <div className="relative aspect-square w-full overflow-hidden rounded-t-md">
                  {firstImage && (
                    <Image
                      src={firstImage.imageUrl}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                  {p.category?.name && <CatBadge name={p.category.name} />}
                </div>
                <div className="space-y-1 py-2">
                  <h2 className="text-foreground truncate font-semibold">
                    {p.name}
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    ₦{Number(p.price).toLocaleString("en-NG")}
                  </p>
                </div>
              </Link>
            )}

            {/* ✅ Always show the button, let it handle its state */}
            <AddToCart
              handleAddToCart={() => handleAdd(p)}
              size="sm"
              isOutOfStock={isOut}
            />
          </div>
        );
      })}
    </div>
  );
}
