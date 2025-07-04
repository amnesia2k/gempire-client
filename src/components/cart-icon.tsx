"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useCartStore } from "@/context/cart-store";

interface ButtonProps {
  variant?: "default" | "outline" | "ghost" | "destructive";
}

export default function CartIcon({ variant = "default" }: ButtonProps) {
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <Button
      asChild
      variant={variant}
      className="relative size-10! rounded-full"
    >
      <Link href="/cart">
        <ShoppingCart className="size-[20px] scale-100 rotate-0 transition-all" />
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
