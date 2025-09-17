"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllCategories,
  createCategory as createCategoryFn,
  getCategoryBySlug,
} from "../api/category";
import type { Category, CategoryWithProducts } from "../types";
import { queryKeys } from "../query-keys";
import { getAllProducts } from "../api/product";

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
    queryFn: async () => {
      if (slug === "all") {
        // ✅ Adapt getAllProducts result to match CategoryWithProducts type
        const res = await getAllProducts();

        return {
          _id: "all",
          name: "All Products",
          slug: "all",
          products: res.data.slice((page - 1) * limit, page * limit), // manual pagination
          total: res.data.length,
          page,
          totalPages: Math.ceil(res.data.length / limit),
        } satisfies CategoryWithProducts;
      }

      return getCategoryBySlug(slug!, page, limit);
    },
    enabled: !!slug,
    staleTime: 600_000,
  });
};
