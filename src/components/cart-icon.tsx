"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useCartStore } from "@/context/cart-store";

export default function CartIcon() {
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <Button asChild variant="ghost" className="relative">
      <Link href="/cart">
        <ShoppingCart className="h-6 w-6" />
        {itemCount > 0 && (
          <span className="bg-destructive absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-xs font-bold text-white">
            {itemCount}
          </span>
        )}
        <span className="sr-only">View your shopping cart</span>
      </Link>
    </Button>
  );
}
