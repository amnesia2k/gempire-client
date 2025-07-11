import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface BtnProps {
  handleAddToCart: () => void;
  size?: "default" | "sm" | "lg";
}

export default function AddToCart({ handleAddToCart, size }: BtnProps) {
  return (
    <Button
      size={size}
      onClick={handleAddToCart}
      className={cn(size === "sm" ? "mx-auto w-full text-xs" : "text-base")}
    >
      Add to Cart
    </Button>
  );
}
