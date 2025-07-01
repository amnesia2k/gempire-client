"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllOrders,
  getOrderById,
  createOrder as createOrderFn,
  updateOrderStatus as updateOrderStatusFn,
} from "../api/order";
import type { OrderStatus } from "../types";

// 📦 Fetch all orders
export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
    staleTime: 600_000,
  });
};

// 🔍 Fetch order by ID (admin detail)
export const useOrderById = (id: string | undefined) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderById(id!),
    enabled: !!id,
    staleTime: 600_000,
  });
};

// 🧾 Create a new order
export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrderFn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

// 🚚 Update order status
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
      updateOrderStatusFn(id, status),

    onSuccess: async (_message, { id }) => {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
      await queryClient.invalidateQueries({ queryKey: ["order", id] });
    },
  });
};
