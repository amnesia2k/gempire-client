// import "server-only";
import { api } from "../axios";

type Category = {
  _id: string;
  name: string;
  slug: string;
};

type GetCategoriesResponse = {
  success: boolean;
  message: string;
  data: Category[];
};

export const getAllCategories = async (): Promise<Category[]> => {
  const res = await api.get<GetCategoriesResponse>("/category");

  if (res.status !== 200) {
    throw new Error("Failed to fetch categories");
  }

  return res.data.data;
};
