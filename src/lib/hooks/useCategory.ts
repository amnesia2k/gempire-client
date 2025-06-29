"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllCategories,
  createCategory as createCategoryFn,
  getCategoryBySlug,
} from "../api/category";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategoryFn,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useCategoryBySlug = (slug: string | undefined) => {
  return useQuery({
    queryKey: ["category", slug],
    queryFn: () => getCategoryBySlug(slug!),
    enabled: !!slug, // only runs if `slug` is defined
  });
};
