"use client";

import { useProductBySlug } from "@/app/lib/hooks/useProduct";
import DashHeader from "@/components/dash-header";
import Loader from "@/components/loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cloudinaryBlur } from "@/lib/utils";
import { Edit, MoreVertical, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

export default function Product() {
  const { slug } = useParams();
  const productSlug = typeof slug === "string" ? slug : undefined;

  const { data, isLoading, error } = useProductBySlug(productSlug);

  if (isLoading) return <Loader />;
  if (error) return <p>Error loading product</p>;
  if (!data) return <p>No product found with slug: {productSlug}</p>;

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <DashHeader text={`#${data.productId}`} />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem>
              {" "}
              {/* onClick={handleEdit} */}
              <Pencil className="mr-2 h-4 w-4" />
              Edit Product
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600 focus:text-red-700">
              {" "}
              {/* onClick={handleDelete} */}
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="scrollbar-thin scrollbar-thumb-muted flex gap-4 overflow-x-auto">
        {data.images.map((img) => (
          <div key={img._id} className="flex-shrink-0">
            <Image
              src={img.imageUrl}
              alt={data.name}
              width={200}
              height={200}
              placeholder="blur"
              blurDataURL={cloudinaryBlur(img.imageUrl)}
              className="rounded-md border object-cover"
            />
          </div>
        ))}
      </div>

      {data.category && <Badge>{data.category.name}</Badge>}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="border-t pt-6">
          <p className="text-muted-foreground text-sm font-medium">
            Product Name
          </p>
          <p className="text-lg font-semibold">{data.name}</p>
        </div>

        <div className="border-t pt-6">
          <p className="text-muted-foreground text-sm font-medium">Price</p>
          <p className="text-lg">₦{Number(data.price).toLocaleString()}</p>
        </div>

        <div className="border-t pt-6">
          <p className="text-muted-foreground text-sm font-medium">Stock</p>
          <p className="text-lg">{data.unit}</p>
        </div>

        <div className="border-t pt-6">
          <p className="text-muted-foreground text-sm font-medium">
            Description
          </p>
          <p className="text-lg">{data.description}</p>
        </div>

        {/* <div className="border-t pt-6">
          <p className="text-muted-foreground text-sm font-medium">Category</p>
          <p className="text-lg">{data.category?.name ?? "Uncategorized"}</p>
        </div> */}
      </div>
    </section>
  );
}
