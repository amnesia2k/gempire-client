"use client";

import { useCartStore } from "@/context/cart-store";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "@/components/cart-item";

export default function Cart() {
  const cartItems = useCartStore((state) => state.cartItems);
  const cartTotal = useCartStore((state) => state.getCartTotal());
  const itemCount = useCartStore((state) => state.getItemCount());

  if (itemCount === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="font-headline mb-4 text-4xl">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">
          Looks like you haven&apos;t added any scents to your cart yet.
        </p>
        <Button asChild size="lg">
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-headline mb-8 text-4xl">Your Cart</h1>
      <div className="grid gap-12 md:grid-cols-3">
        <div className="space-y-4 md:col-span-2">
          {cartItems.map((item) => (
            <CartItem key={item.product._id} item={item} />
          ))}
        </div>
        <div className="md:col-span-1">
          <div className="bg-card sticky top-24 rounded-lg border p-6">
            <h2 className="font-headline mb-4 text-2xl">Order Summary</h2>
            <div className="mb-2 flex justify-between">
              <span>Subtotal ({itemCount} items)</span>
              <span>
                {/* ${cartTotal.toFixed(2)} */}₦
                {Number(cartTotal).toLocaleString("en-NG")}
              </span>
            </div>
            <div className="mb-4 flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <Separator className="my-4" />
            <div className="mb-6 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₦{Number(cartTotal).toLocaleString("en-NG")}</span>
            </div>
            <Button asChild size="lg" className="w-full">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
