// @/components/cart-icon.tsx - NO CHANGES NEEDED
"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button"; // Assuming this is your shadcn/ui Button component
import { useCartStore } from "@/context/cart-store";

interface ButtonProps {
  variant?: "default" | "outline" | "ghost" | "destructive";
  // Add onClick to the interface if you explicitly want to type it,
  // but it's typically already covered by React.ComponentProps<typeof Button>
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function CartIcon({
  variant = "default",
  onClick,
  ...props
}: ButtonProps) {
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <Button
      asChild
      variant={variant}
      className="relative size-10! rounded-full"
      onClick={onClick} // Pass the onClick prop down to the Button
      {...props}
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
