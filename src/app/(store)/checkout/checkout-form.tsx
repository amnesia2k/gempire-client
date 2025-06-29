"use client";

import { FormField } from "@/components/form-field";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
// import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { useCartStore } from "@/context/cart-store";
import { useCreateOrder } from "@/lib/hooks/useOrder";
import { extractApiError } from "@/lib/axios";

export default function CheckoutForm() {
  // const router = useRouter();
  const { cartItems, clearCart } = useCartStore();
  const { mutateAsync } = useCreateOrder();

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

    formData.append(
      "items",
      JSON.stringify(
        cartItems.map((item) => ({
          productId: item.product._id,
          quantity: item.quantity,
          unitPrice: item.product.price,
        })),
      ),
    );

    const orderPromise = mutateAsync(formData)
      .then((res) => {
        toast.success(res.message);
        clearCart();
        form.reset();
        // You can also redirect somewhere else if needed:
        // router.push(`/orders/${res.data.orderId}`);
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => setIsPending(false));

    toast.promise(orderPromise, {
      loading: "Placing order...",
      error: (err) => extractApiError(err),
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-2">
        <FormField
          label="Your Name"
          id="name"
          name="name"
          placeholder="Enter your name"
          type="text"
          disabled={isPending}
        />
        <FormField
          label="Your Address"
          id="address"
          name="address"
          placeholder="Enter your address"
          type="text"
          disabled={isPending}
        />
      </div>

      <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-2">
        <FormField
          label="Your Email"
          id="email"
          name="email"
          placeholder="Enter your email address"
          type="email"
          disabled={isPending}
        />
        <FormField
          label="Your Contact Number"
          id="telephone"
          name="telephone"
          placeholder="Enter your WhatsApp number, i.e. +2347012345678"
          type="text"
          disabled={isPending}
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

      <Button
        variant="default"
        size="lg"
        type="submit"
        className="w-full justify-center"
        disabled={isPending}
      >
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isPending ? "Checking Out..." : "Proceed to Checkout"}
      </Button>
    </form>
  );
}
