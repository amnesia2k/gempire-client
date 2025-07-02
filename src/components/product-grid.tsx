"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/types";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {products.map((p) => {
        const firstImage = p.images?.[0];

        return (
          <Link
            href={`/product/${p.slug}`}
            key={p._id}
            className="group bg-background border-muted mx-auto w-full max-w-[200px] rounded-md border shadow-sm transition hover:shadow-md"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-t-md">
              {firstImage && (
                <Image
                  src={firstImage.imageUrl}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
              {p.category?.name && (
                <Badge className="absolute top-2 left-2 z-10 text-xs font-medium capitalize">
                  {p.category.name}
                </Badge>
              )}
            </div>

            <div className="space-y-1 px-2 py-3">
              <h2 className="text-foreground truncate text-lg font-semibold">
                {p.name}
              </h2>
              <p className="text-muted-foreground">
                ₦{Number(p.price).toLocaleString("en-NG")}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
