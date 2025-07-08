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

  const handleAddToCart = () => {
    if (quantity > product.unit) {
      toast.error(`Only ${product.unit} items available.`);
      return;
    }

    const previousQuantity = useCartStore
      .getState()
      .getProductQuantity(product._id);

    addToCart(product, quantity);
    setQuantity(1);

    // ✅ Fire toast here AFTER cart has updated
    const newQuantity = useCartStore.getState().getProductQuantity(product._id);

    if (newQuantity > previousQuantity) {
      toast.success(`Added ${product.name} to cart`);
    }
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
      <div className="flex items-center">
        <Button
          variant="outline"
          size="icon"
          onClick={decrement}
          disabled={quantity <= 1}
          className={`${quantity <= 1 ? "cursor-not-allowed" : ""} border-primary rounded-full`}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-12 text-center text-lg font-medium">{quantity}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={increment}
          disabled={quantity >= product.unit}
          className={`${quantity >= product.unit ? "cursor-not-allowed" : ""} border-primary rounded-full`}
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
