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
  });
};

export const useProductBySlug = (slug: string | undefined) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug!),
    enabled: !!slug, // only runs if `slug` is defined
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

export const useEditProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ slug, formData }: { slug: string; formData: FormData }) =>
      editProductFn(slug, formData),
    onSuccess: (_, { slug }) => {
      void queryClient.invalidateQueries({ queryKey: ["products"] });
      void queryClient.invalidateQueries({ queryKey: ["product", slug] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProductFn(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
