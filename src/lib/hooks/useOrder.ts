"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllOrders,
  getOrderById,
  createOrder as createOrderFn,
  updateOrderStatus as updateOrderStatusFn,
} from "../api/order";
import type { OrderStatus } from "../types";
import { queryKeys } from "../query-keys";

export const useOrders = () =>
  useQuery({
    queryKey: queryKeys.orders,
    queryFn: getAllOrders,
    staleTime: 600_000,
  });

export const useOrderById = (id: string | undefined) =>
  useQuery({
    queryKey: id ? queryKeys.order(id) : [],
    queryFn: () => getOrderById(id!),
    enabled: !!id,
    staleTime: 600_000,
  });

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrderFn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.orders });
    },
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
      updateOrderStatusFn(id, status),
    onSuccess: async (_msg, { id }) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.orders });
      await queryClient.invalidateQueries({ queryKey: queryKeys.order(id) });
    },
  });
};
