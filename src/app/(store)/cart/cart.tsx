"use client";

import { Suspense, useState } from "react";
import { useCartStore } from "@/context/cart-store";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/components/cart-item";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import CheckoutForm from "./checkout-form";
import Loader from "@/components/loader";

export default function CartCheckoutPage() {
  const cartItems = useCartStore((state) => state.cartItems);
  const cartTotal = useCartStore((state) => state.getCartTotal());
  const itemCount = useCartStore((state) => state.getItemCount());

  const [showCheckout, setShowCheckout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">(
    "delivery",
  );

  const DELIVERY_FEE = 2000;
  const shipping = deliveryMethod === "delivery" ? DELIVERY_FEE : 0;
  const total = cartTotal + shipping;

  if (itemCount === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="font-headline mb-4 text-4xl">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">
          Looks like you haven&apos;t added any scents yet.
        </p>
        <Button asChild size="lg">
          <a href="/products">Start Shopping</a>
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
              <span>₦{cartTotal.toLocaleString("en-NG")}</span>
            </div>
            <div className="mb-4 flex justify-between">
              <span>Delivery Fee</span>
              <span>
                {shipping === 0
                  ? "Free"
                  : `₦${shipping.toLocaleString("en-NG")}`}
              </span>
            </div>
            <Separator className="my-4" />
            <div className="mb-6 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₦{total.toLocaleString("en-NG")}</span>
            </div>
            <Button
              size="lg"
              className="w-full"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setShowCheckout(true);
                  setLoading(false);
                }, 600);
              }}
              disabled={loading || showCheckout}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : showCheckout ? (
                "Continue Below"
              ) : (
                "Proceed to Checkout"
              )}
            </Button>
          </div>
        </div>
      </div>

      {showCheckout && (
        <>
          <Separator className="my-12" />
          <h2 className="font-headline mb-6 text-2xl">Checkout Details</h2>
          <Suspense fallback={<Loader />}>
            <CheckoutForm
              deliveryMethod={deliveryMethod}
              setDeliveryMethod={setDeliveryMethod}
            />
          </Suspense>
        </>
      )}
    </div>
  );
}
