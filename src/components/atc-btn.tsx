import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface BtnProps {
  handleAddToCart: () => void;
  size?: "default" | "sm" | "lg";
  isOutOfStock?: boolean;
}

export default function AddToCart({
  handleAddToCart,
  size = "default",
  isOutOfStock,
}: BtnProps) {
  return (
    <Button
      size={size}
      variant={isOutOfStock ? "outline" : "default"}
      onClick={handleAddToCart}
      disabled={isOutOfStock}
      className={cn(
        size === "sm" ? "mx-auto w-full text-xs" : "text-base",
        isOutOfStock &&
          "text-muted-foreground cursor-not-allowed text-base font-bold",
      )}
    >
      {isOutOfStock ? "Out of Stock" : "Add to Cart"}
    </Button>
  );
}
