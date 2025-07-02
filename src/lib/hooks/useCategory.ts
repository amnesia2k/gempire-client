"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllCategories,
  createCategory as createCategoryFn,
  getCategoryBySlug,
} from "../api/category";
import type { Category, CategoryWithProducts } from "../types";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategoryFn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["categories"] });
      await queryClient.invalidateQueries({
        queryKey: ["categories-with-all"],
      });
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    staleTime: 600_000,
  });
};

export const useCategoriesWithAll = () => {
  return useQuery({
    queryKey: ["categories-with-all"],
    queryFn: async (): Promise<Category[]> => {
      const categories = await getAllCategories();
      return [{ name: "All Products", slug: "all", _id: "all" }, ...categories];
    },
    staleTime: 600_000,
  });
};

export const useCategoryBySlug = (
  slug: string | undefined,
  page = 1,
  limit = 12,
) => {
  return useQuery<CategoryWithProducts>({
    queryKey: ["category", slug, page, limit],
    queryFn: () => getCategoryBySlug(slug!, page, limit),
    enabled: !!slug,
    staleTime: 600_000,
  });
};
