"use client";

import { FormField } from "@/components/form-field";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { useCartStore } from "@/context/cart-store";
import { useCreateOrder } from "@/lib/hooks/useOrder";
import { extractApiError } from "@/lib/axios";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import { initPayment } from "@/lib/api/payment";

type Props = {
  deliveryMethod: "delivery" | "pickup";
  setDeliveryMethod: (val: "delivery" | "pickup") => void;
};

export default function CheckoutForm({
  deliveryMethod,
  setDeliveryMethod,
}: Props) {
  const { cartItems } = useCartStore();
  const { mutateAsync } = useCreateOrder();
  const router = useRouter();

  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Cart is empty 😭");
      return;
    }

    setIsPending(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.append("deliveryMethod", deliveryMethod);
    formData.append(
      "items",
      JSON.stringify(
        cartItems.map((item) => ({
          productId: item.product._id,
          quantity: item.quantity,
          unitPrice: item.product.price, // <-- Use actual price field here
        })),
      ),
    );

    try {
      // Step 1: Create order
      const orderRes = await mutateAsync(formData);
      const orderId = orderRes.data.orderId;
      const name = orderRes.data.name;
      const email = orderRes.data.email;

      // Step 2: Calculate total amount in Naira
      const amount = cartItems.reduce(
        (total, item) => total + Number(item.product.price) * item.quantity,
        0,
      );

      console.log("💰 Calculated total amount:", amount);

      // Step 3: Initialize payment (amount in kobo)
      const paymentRes = await initPayment({
        email,
        amount: amount * 100, // Paystack wants kobo, so multiply by 100
        subaccount: "ACCT_40m22ih8x2mb2b0", // or fetch dynamically
        orderId,
        metadata: {
          name,
          email,
          orderId,
        },
      });

      const { authorization_url } = paymentRes.data;

      // Step 4: Redirect to Paystack
      window.location.href = authorization_url;
    } catch (err) {
      toast.error(extractApiError(err));
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form className="space-y-4 pt-8" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-2">
        <FormField
          label="Your Name"
          id="name"
          name="name"
          placeholder="Enter your name"
          type="text"
          disabled={isPending}
          required
        />
        <FormField
          label="Your Address"
          id="address"
          name="address"
          placeholder="Enter your address"
          type="text"
          disabled={isPending}
          required
        />
      </div>

      <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-2">
        <FormField
          label="Your Email"
          id="email"
          name="email"
          placeholder="Enter your email"
          type="email"
          disabled={isPending}
          required
        />
        <FormField
          label="WhatsApp Number"
          id="telephone"
          name="telephone"
          placeholder="+2347012345678"
          type="text"
          disabled={isPending}
          required
        />
      </div>

      <FormField
        label="Delivery Note"
        id="note"
        name="note"
        placeholder="Any delivery instructions?"
        variant="textarea"
        disabled={isPending}
      />

      <div className="space-y-2">
        <Label className="text-sm font-medium">Delivery Method</Label>
        <RadioGroup
          value={deliveryMethod}
          onValueChange={(val) =>
            setDeliveryMethod(val as "delivery" | "pickup")
          }
          className="flex flex-col space-y-1 md:flex-row md:items-center md:space-y-0 md:space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="delivery"
              id="delivery"
              disabled={isPending}
            />
            <Label htmlFor="delivery">Delivery</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pickup" id="pickup" disabled={isPending} />
            <Label htmlFor="pickup">Pickup</Label>
          </div>
        </RadioGroup>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full justify-center"
        disabled={isPending}
      >
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isPending ? "Checking Out..." : "Place Order"}
      </Button>
    </form>
  );
}
