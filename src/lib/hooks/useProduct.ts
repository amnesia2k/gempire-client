"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllProducts,
  createProduct as createProductFn,
  getProductBySlug,
  editProduct as editProductFn,
  deleteProduct as deleteProductFn,
} from "../api/product";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 600_000, // 10 minutes
  });
};

export const useProductBySlug = (slug: string | undefined) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug!),
    enabled: !!slug,
    staleTime: 600_000, // 10 minutes
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProductFn,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["products"] }),
        queryClient.invalidateQueries({ queryKey: ["categories"] }),
      ]);
    },
  });
};

export const useEditProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ slug, formData }: { slug: string; formData: FormData }) =>
      editProductFn(slug, formData),
    onSuccess: async (_, { slug }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["products"] }),
        queryClient.invalidateQueries({ queryKey: ["product", slug] }),
        queryClient.invalidateQueries({ queryKey: ["categories"] }),
      ]);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProductFn(id),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["products"] }),
        queryClient.invalidateQueries({ queryKey: ["categories"] }),
      ]);
    },
  });
};
