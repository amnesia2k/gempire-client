"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllCategories,
  createCategory as createCategoryFn,
  getCategoryBySlug,
} from "../api/category";
import type { Category, CategoryWithProducts } from "../types";
import { queryKeys } from "../query-keys";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategoryFn,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.categories }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.categoriesWithAll,
        }),
        queryClient.invalidateQueries({ queryKey: queryKeys.products }),
      ]);
    },
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: getAllCategories,
    staleTime: 600_000,
  });
};

export const useCategoriesWithAll = () => {
  return useQuery({
    queryKey: queryKeys.categoriesWithAll,
    queryFn: async (): Promise<Category[]> => {
      const categories = await getAllCategories();
      return [{ name: "All Products", slug: "all", _id: "all" }, ...categories];
    },
    staleTime: 600_000,
  });
};

export const useCategoryBySlug = (
  slug: string | undefined,
  page: number,
  limit: number,
) => {
  return useQuery<CategoryWithProducts>({
    queryKey: slug ? queryKeys.category(slug, page, limit) : [],
    queryFn: () => getCategoryBySlug(slug!, page, limit),
    enabled: !!slug,
    staleTime: 600_000,
  });
};
