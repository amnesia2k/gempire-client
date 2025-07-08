"use client";

import Image from "next/image";
import Link from "next/link";
import type { CartItem as CartItemType } from "@/lib/types";
import { useCartStore } from "@/context/cart-store";
import { Button } from "./ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCartStore();

  const increment = () => {
    if (item.quantity < item.product.unit) {
      updateQuantity(item.product._id, item.quantity + 1);
    }
  };

  const decrement = () => {
    updateQuantity(item.product._id, item.quantity - 1);
  };

  const handleRemove = () => {
    removeFromCart(item.product._id);
    toast.success(`Removed ${item.product.name} from cart`);
  };

  return (
    <div className="bg-card flex flex-wrap items-center gap-4 rounded-lg border p-4 md:flex-nowrap">
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
        <Image
          src={item.product.images[0]?.imageUrl ?? "/fallback.jpg"}
          alt={item.product.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-grow">
        <Link href={`/product/${item.product.slug}`}>
          <h3 className="font-headline truncate text-lg hover:underline">
            {item.product.name}
          </h3>
        </Link>
        <p className="text-muted-foreground">
          ₦{Number(item.product.price).toLocaleString("en-NG")}
        </p>
      </div>

      <div className="flex items-center">
        <Button
          variant="outline"
          size="icon"
          onClick={decrement}
          className="border-primary rounded-full"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center">{item.quantity}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={increment}
          disabled={item.quantity >= item.product.unit}
          className={`border-primary rounded-full ${
            item.quantity >= item.product.unit ? "cursor-not-allowed" : ""
          }`}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-right">
        <p className="w-20 font-semibold">
          ₦
          {(Number(item.product.price) * item.quantity).toLocaleString("en-NG")}
        </p>
      </div>

      <div>
        <Button variant="ghost" size="icon" onClick={handleRemove}>
          <Trash2 className="text-muted-foreground hover:text-destructive h-5 w-5" />
          <span className="sr-only">Remove item</span>
        </Button>
      </div>
    </div>
  );
}
