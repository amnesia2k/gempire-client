"use client";

import Loader from "@/components/loader";
import { useOrderById, useUpdateOrderStatus } from "@/lib/hooks/useOrder";
import { useParams } from "next/navigation";
import Image from "next/image";
import React, { useState } from "react";
import DashHeader from "@/components/dash-header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { OrderStatus } from "@/lib/types";
import { toast } from "sonner";
import { extractApiError } from "@/lib/axios";

export default function OneOrderPage() {
  const { id } = useParams();
  const orderId = typeof id === "string" ? id : undefined;

  const { data, isLoading, error } = useOrderById(orderId);
  const { mutateAsync } = useUpdateOrderStatus();

  const [isPending, setIsPending] = useState(false);

  if (isLoading) return <Loader />;
  if (error) return <p>Error loading order</p>;
  if (!data) return <p>No order found with ID: {orderId}</p>;

  const order = data.data;

  const total = order.items.reduce((sum, item) => {
    return sum + Number(item.unitPrice) * item.quantity;
  }, 0);

  const handleStatusChange = (newStatus: string) => {
    if (!orderId) return;

    const createPromise = mutateAsync({
      id: orderId,
      status: newStatus as OrderStatus,
    })
      .then((r) => toast.success(r.message))
      .finally(() => setIsPending(false));

    toast.promise(createPromise, {
      loading: "Updating order status...",
      error: (err) => extractApiError(err),
    });
    // updateStatus(
    //   { id: orderId, status: newStatus as OrderStatus },
    //   {
    //     onSuccess: (message) => {
    //       toast.success(message || "Order status updated");
    //     },
    //     onError: (err) => {
    //       toast.error(extractApiError(err));
    //     },
    //   },
    // );
  };

  return (
    <section className="space-y-5">
      <DashHeader text={`#${order.orderId}`} />

      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-3">
        {/* Left: Ordered Items */}
        <div className="space-y-4 md:col-span-2">
          {order.items.map((item) => {
            const product = item.product;
            const image = product.images?.[0]?.imageUrl;

            return (
              <div
                key={item._id}
                className="flex w-full items-center space-x-4 rounded-lg border p-4"
              >
                <div className="relative h-20 w-20 flex-shrink-0">
                  {image && (
                    <Image
                      src={image}
                      alt={product.name}
                      fill
                      className="rounded-md object-cover"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600">
                    ₦{Number(item.unitPrice).toLocaleString()} × {item.quantity}
                  </p>
                  <p className="font-medium text-gray-800">
                    ₦{(Number(item.unitPrice) * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Summary + Shipping + Status */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-2xl font-semibold">Order Summary</h2>
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-2xl font-semibold">Shipping Info</h2>
            <p className="font-medium">{order.name}</p>
            <p>{order.address}</p>
            <p>{order.telephone}</p>
            <p>{order.email}</p>
            {order.note ? (
              <p className="text-muted-foreground italic">{order.note}</p>
            ) : (
              <p className="text-muted-foreground italic">
                Not at the moment, no
              </p>
            )}
          </div>

          {/* Order Status */}
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-2xl font-semibold">Order Status</h2>

            <Select
              onValueChange={handleStatusChange}
              defaultValue={order.status}
              disabled={isPending}
            >
              <SelectTrigger className="capitalize">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ordered">Ordered</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </section>
  );
}
