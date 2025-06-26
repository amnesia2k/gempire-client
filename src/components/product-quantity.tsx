"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { Badge } from "./ui/badge";
import { useCartStore } from "@/context/cart-store";
import type { Product } from "@/lib/types";
import { toast } from "sonner";

interface ProductQuantityProps {
  product: Product;
}

export function ProductQuantity({ product }: ProductQuantityProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore();
  // const { toast } = useToast();

  const handleAddToCart = () => {
    if (quantity > product.unit) {
      // toast({
      //   title: "Not enough stock",
      //   description: `Only ${product.unit} items available.`,
      //   variant: "destructive",
      // });
      toast.error(`Only ${product.unit} items available.`);
      return;
    }
    addToCart(product, quantity);
    setQuantity(1);
  };

  const increment = () => {
    if (quantity < product.unit) {
      setQuantity((q) => q + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  if (product.unit === 0) {
    return (
      <Badge variant="destructive" className="px-4 py-2 text-lg">
        Out of Stock
      </Badge>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center rounded-md border">
        <Button
          variant="ghost"
          size="icon"
          onClick={decrement}
          disabled={quantity <= 1}
          className={`${quantity <= 1 ? "cursor-not-allowed" : ""}`}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-12 text-center text-lg font-medium">{quantity}</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={increment}
          disabled={quantity >= product.unit}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Button size="lg" onClick={handleAddToCart}>
        Add to Cart
      </Button>
    </div>
  );
}
