"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllProducts,
  createProduct as createProductFn,
  getProductBySlug,
} from "../api/product";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProductFn,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useProductBySlug = (slug: string | undefined) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug!),
    enabled: !!slug, // only runs if `slug` is defined
  });
};
