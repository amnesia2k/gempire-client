import { api } from "../axios";
import type {
  Category,
  CreateCategoryResponse,
  GetCategoriesResponse,
} from "../types";

export const getAllCategories = async (): Promise<Category[]> => {
  const res = await api.get<GetCategoriesResponse>("/categories");

  // if (res.status !== 200) {
  //   throw new Error("Failed to fetch categories");
  // }

  if (res.data?.success) {
    return res.data.data;
  }

  throw new Error(res.data?.message || "Something went wrong");
};

export const createCategory = async (name: string) => {
  const res = await api.post<CreateCategoryResponse>("/category", { name });

  // if (res.status !== 201) {
  //   throw new Error("Failed to create category");
  // }

  if (res.data?.success) {
    return res.data;
  }

  throw new Error(res.data?.message || "Something went wrong");
};
