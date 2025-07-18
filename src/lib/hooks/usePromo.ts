"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllPromoCodes,
  getPromoCodeById,
  createPromoCode as createPromoCodeFn,
  updatePromoCode as updatePromoCodeFn,
  getPromoCodeByCode as getPromoCodeByCodeFn,
} from "../api/promo";
import { queryKeys } from "../query-keys";
import type { PromoCode } from "../types";
import type { GetPromoCodeResponse } from "../types"; // Import the response type for mutation

// Get all promo codes
export const usePromoCodes = () =>
  useQuery({
    queryKey: queryKeys.promoCodes,
    queryFn: getAllPromoCodes,
    staleTime: 600_000,
  });

// Get single promo by ID
export const usePromoCodeById = (id: string | undefined) =>
  useQuery({
    queryKey: id ? queryKeys.promoCode(id) : [],
    queryFn: () => getPromoCodeById(id!),
    enabled: !!id,
    staleTime: 600_000,
  });

// NEW HOOK: Use mutation for applying promo code by its string code
export const useApplyPromoCode = () => {
  return useMutation<GetPromoCodeResponse, Error, string>({
    mutationFn: getPromoCodeByCodeFn, // The actual API call to fetch by code
  });
};

// Create promo code
export const useCreatePromoCode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<PromoCode>) => createPromoCodeFn(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.promoCodes });
    },
  });
};

// Update promo code
export const useUpdatePromoCode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<PromoCode>;
    }) => updatePromoCodeFn(id, updates),
    onSuccess: async (_msg, { id }) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.promoCodes });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.promoCode(id),
      });
    },
  });
};
