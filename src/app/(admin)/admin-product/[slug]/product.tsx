"use client";

import { useDeleteProduct, useProductBySlug } from "@/lib/hooks/useProduct";
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
import { MoreVertical, Pencil, Share2, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function Product() {
  const { slug } = useParams();
  const productSlug = typeof slug === "string" ? slug : undefined;

  const { data, isLoading, error } = useProductBySlug(productSlug);

  const { mutate: deleteProduct, isPending } = useDeleteProduct();
  const router = useRouter();

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );
    if (!confirmed || !data?._id) return;

    deleteProduct(data._id, {
      onSuccess: () => {
        toast.success("Product deleted successfully!");
        router.push("/admin-product"); // Change this to wherever the product list is
      },
      onError: (err) => {
        toast.error(err.message || "Failed to delete product");
      },
    });
  };

  const handleShare = () => {
    const message = encodeURIComponent(`Check out this product: ${data?.name}`);
    const url = encodeURIComponent(
      `https://store.olatilewa.dev/product/${data?.slug}`,
    );
    const whatsappUrl = `https://wa.me/?text=${message}%20-%20${url}`;
    window.open(whatsappUrl, "_blank");
  };

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
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild className="cursor-pointer">
              {/* onClick={handleEdit} */}
              <Link href={`/admin-product/${data.slug}/edit`}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Product
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleShare} className="cursor-pointer">
              <Share2 className="mr-2 h-4 w-4" />
              Share Product
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              disabled={isPending}
              className="cursor-pointer text-red-600 focus:text-red-700"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {isPending ? "Deleting..." : "Delete Product"}
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
