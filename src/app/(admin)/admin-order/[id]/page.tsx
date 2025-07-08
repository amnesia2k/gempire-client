import React from "react";
import OneOrderPage from "./order-page";
import type { Metadata } from "next";
import type { GetOrderResponse } from "@/lib/types";
import { api } from "@/lib/axios";
import { generateMeta } from "@/lib/metadata";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    const res = await api.get<GetOrderResponse>(`/order/${id}`);
    const product = res.data.data;

    return generateMeta({
      title: `${product.name} - Order Details (#${product.orderId})`,
      description: `Details for order #${product.orderId} placed by ${product.name}.`,
      canonicalPath: `/admin-order/${product._id}`,
    });
  } catch (error) {
    console.error("Error generating metadata:", error);
    return generateMeta({
      title: "Order Not Found",
      description: "The order you are looking for does not exist.",
    });
  }
}

export default function OrderPage() {
  return (
    <div>
      <OneOrderPage />
    </div>
  );
}
