"use client";

import { useState } from "react";
import { useCartStore } from "@/context/cart-store";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/components/cart-item";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Loader2, XCircle } from "lucide-react";
import CheckoutForm from "./checkout-form";
import { useApplyPromoCode } from "@/lib/hooks/usePromo";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { extractApiError } from "@/lib/axios";

export default function CartCheckoutPage() {
  const cartItems = useCartStore((state) => state.cartItems);
  const getCartSubtotal = useCartStore((state) => state.getCartSubtotal);
  const getCartTotal = useCartStore((state) => state.getCartTotal);
  const itemCount = useCartStore((state) => state.getItemCount());
  const appliedPromoCode = useCartStore((state) => state.appliedPromoCode);
  const discountAmount = useCartStore((state) => state.discountAmount);
  const applyPromoCodeInStore = useCartStore((state) => state.applyPromoCode);
  const removePromoCodeInStore = useCartStore((state) => state.removePromoCode);

  const [showCheckout, setShowCheckout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">(
    "delivery",
  );

  const { mutateAsync: applyPromoCodeMutation, isPending: isApplyingPromo } =
    useApplyPromoCode();

  const subtotal = getCartSubtotal();
  const totalAfterDiscount = getCartTotal();
  const hasDiscount = appliedPromoCode !== null && discountAmount > 0;

  const handleApplyPromo = async () => {
    if (!promoCodeInput.trim()) {
      toast.error("Please enter a promo code.");
      return;
    }
    if (appliedPromoCode?.code === promoCodeInput.toUpperCase()) {
      toast.info("This promo code is already applied.");
      return;
    }

    try {
      const { promoCode: promo } = await applyPromoCodeMutation(promoCodeInput);

      if (promo) {
        if (!promo.isActive) {
          toast.error("This promo code is not active.");
          removePromoCodeInStore();
          return;
        }

        applyPromoCodeInStore(promo); // Apply to Zustand store
        toast.success(`Promo code ${promo.code} applied!.`);
        //  You saved ₦${discountAmount.toLocaleString("en-NG")}
      } else {
        // This else block might be hit if the API response data.promoCode is null/undefined
        // even if the API call itself was not an error.
        toast.error("Invalid or expired promo code.");
        removePromoCodeInStore();
      }
    } catch (error) {
      // This catch block handles API errors (e.g., 404, 400 from backend)
      toast.error(extractApiError(error));
      removePromoCodeInStore();
    }
  };

  const handleRemovePromo = () => {
    removePromoCodeInStore(); // Use renamed function
    setPromoCodeInput("");
    toast.info("Promo code removed.");
  };

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
    <div>
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
              <span>₦{subtotal.toLocaleString("en-NG")}</span>
            </div>

            {hasDiscount && (
              <div className="mb-2 flex items-center justify-between text-green-600">
                <span className="font-medium">
                  Promo Discount
                  {appliedPromoCode?.code && (
                    <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                      {appliedPromoCode.code}
                    </span>
                  )}
                </span>
                <span>-₦{discountAmount.toLocaleString("en-NG")}</span>
              </div>
            )}

            <div className="mb-4 flex justify-between">
              <p className="text-muted-foreground text-sm italic">
                Delivery cost will be arranged directly with our
                courier/delivery handler.
              </p>
            </div>
            <Separator className="my-4" />

            <div className="mb-6 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span
                className={cn(
                  "flex flex-col items-end",
                  hasDiscount && "text-lg",
                )}
              >
                {hasDiscount && (
                  <span className="text-muted-foreground text-sm line-through">
                    ₦{subtotal.toLocaleString("en-NG")}
                  </span>
                )}
                <span>₦{totalAfterDiscount.toLocaleString("en-NG")}</span>
              </span>
            </div>

            <div className="mb-6 space-y-2">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Enter promo code"
                  value={promoCodeInput}
                  onChange={(e) =>
                    setPromoCodeInput(e.target.value.toUpperCase())
                  }
                  className="flex-grow"
                  disabled={isApplyingPromo}
                />
                {!appliedPromoCode ? (
                  <Button
                    onClick={handleApplyPromo}
                    disabled={isApplyingPromo || !promoCodeInput.trim()}
                    className="shrink-0"
                  >
                    {isApplyingPromo ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Apply"
                    )}
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={handleRemovePromo}
                    className="flex shrink-0 items-center gap-1 text-red-500 hover:text-red-600"
                  >
                    <XCircle className="h-4 w-4" /> Remove
                  </Button>
                )}
              </div>
              {appliedPromoCode && (
                <p className="text-sm text-green-600">
                  Code &quot;{appliedPromoCode.code}&quot; applied successfully!
                </p>
              )}
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
          <CheckoutForm
            deliveryMethod={deliveryMethod}
            setDeliveryMethod={setDeliveryMethod}
            promoCodeId={appliedPromoCode?._id ?? null}
          />
        </>
      )}
    </div>
  );
}
