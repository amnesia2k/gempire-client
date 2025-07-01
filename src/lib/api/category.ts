import { api } from "../axios";
import type {
  Category,
  CategoryWithProducts,
  CreateCategoryResponse,
  GetCategoriesResponse,
  GetCategoryResponse,
} from "../types";

export const getAllCategories = async (): Promise<Category[]> => {
  const res = await api.get<GetCategoriesResponse>("/categories");

  if (res.data?.success) {
    return res.data.data;
  }

  throw new Error(res.data?.message || "Something went wrong");
};

export const createCategory = async (name: string) => {
  const res = await api.post<CreateCategoryResponse>("/category", { name });

  if (res.data?.success) {
    return res.data;
  }

  throw new Error(res.data?.message || "Something went wrong");
};

export const getCategoryBySlug = async (
  slug: string,
): Promise<CategoryWithProducts> => {
  const res = await api.get<GetCategoryResponse>(`/category/${slug}`);

  if (res.data?.success) {
    return res.data.data;
  }

  throw new Error(res.data?.message || "Something went wrong");
};
