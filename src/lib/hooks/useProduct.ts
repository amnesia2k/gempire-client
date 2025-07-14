"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllProducts,
  createProduct as createProductFn,
  getProductBySlug,
  editProduct as editProductFn,
  deleteProduct as deleteProductFn,
} from "../api/product";
import { queryKeys } from "../query-keys";

export const useProducts = () =>
  useQuery({
    queryKey: queryKeys.products,
    queryFn: getAllProducts,
    staleTime: 600_000,
  });

export const useProductBySlug = (slug: string | undefined) =>
  useQuery({
    queryKey: slug ? queryKeys.product(slug) : [],
    queryFn: () => getProductBySlug(slug!),
    enabled: !!slug,
    staleTime: 600_000,
  });

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProductFn,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.products }),
        queryClient.invalidateQueries({ queryKey: queryKeys.categories }),
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
        queryClient.invalidateQueries({ queryKey: queryKeys.products }),
        queryClient.invalidateQueries({ queryKey: queryKeys.product(slug) }),
        queryClient.invalidateQueries({ queryKey: queryKeys.categories }),
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
        queryClient.invalidateQueries({ queryKey: queryKeys.products }),
        queryClient.invalidateQueries({ queryKey: queryKeys.categories }),
      ]);
    },
  });
};
