"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { Pencil, Share2, Trash2, MoreVertical } from "lucide-react";

import { useDeleteProduct, useProductBySlug } from "@/lib/hooks/useProduct";
import { cloudinaryBlur } from "@/lib/utils";
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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { extractApiError } from "@/lib/axios";

export default function Product() {
  const { slug } = useParams();
  const productSlug = typeof slug === "string" ? slug : undefined;

  const { data, isLoading, error } = useProductBySlug(productSlug);
  const { mutateAsync } = useDeleteProduct();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleDeleteConfirmed = () => {
    if (!data?._id) return;

    const createPromise = mutateAsync(data._id)
      // .then((message) => toast.success(message))
      .finally(() => setIsPending(false));

    toast.promise(createPromise, {
      success: (message) => {
        setOpen(false);
        router.push("/admin-product");
        return message;
      },
      loading: "Deleting product...",
      error: (err) => extractApiError(err),
    });
  };

  const handleShare = () => {
    const rawMessage = `Check out this product on our store:\n${data?.name} - https://store.olatilewa.dev/product/${data?.slug}\nPrice: *₦${Number(data?.price).toLocaleString()}*`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(rawMessage)}`;
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
              <Link href={`/admin-product/${data.slug}/edit`}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Product
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleShare} className="cursor-pointer">
              <Share2 className="mr-2 h-4 w-4" />
              Share Product
            </DropdownMenuItem>

            <Dialog open={open} onOpenChange={setOpen}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <DialogTrigger asChild>
                  <button className="flex w-full items-center text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Product
                  </button>
                </DialogTrigger>
              </DropdownMenuItem>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Product</DialogTitle>
                  <p className="text-muted-foreground text-sm">
                    This action cannot be undone. Type{" "}
                    <span className="font-semibold">{data.name}</span> to
                    confirm.
                  </p>
                </DialogHeader>

                <Input
                  placeholder="Enter product name"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                />

                <DialogFooter className="mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setOpen(false)}
                    disabled={isPending}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    disabled={confirmText.trim() !== data.name || isPending}
                    onClick={handleDeleteConfirmed}
                  >
                    {isPending ? "Deleting..." : "Delete"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
      </div>
    </section>
  );
}
