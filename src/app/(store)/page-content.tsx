"use client";

import Loader from "@/components/loader";
import { useProducts } from "../../lib/hooks/useProduct";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function PageContent() {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) return <Loader />;

  if (error) return <div>Error: {error.message}</div>;

  if (!products || products.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <div className="space-y-5 py-5">
      <h1 className="text-center text-4xl">New Arrivals</h1>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {products?.map((p) => {
          const firstImage = p.images?.[0];

          return (
            <Link
              href={`/product/${p.slug}`}
              key={p._id}
              className="group border-muted bg-background mx-auto w-full max-w-[180px] rounded-md border shadow-sm transition hover:shadow-md sm:max-w-[200px]"
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

              <div className="px-2 py-3">
                <h2 className="text-foreground truncate text-sm font-semibold">
                  {p.name}
                </h2>
                <p className="text-muted-foreground mt-1 text-xs">
                  ₦{Number(p.price).toLocaleString("en-NG")}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
