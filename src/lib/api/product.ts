import { api } from "../axios";
import type {
  DeleteResponse,
  GetAllProductsResponse,
  GetProductResponse,
  Product,
} from "../types";

export const getAllProducts = async (): Promise<Product[]> => {
  const res = await api.get<GetAllProductsResponse>("/products");

  if (res.data?.success) {
    return res.data.data;
  }

  throw new Error(res.data?.message || "Something went wrong");
};

export const getProductBySlug = async (slug: string): Promise<Product> => {
  const res = await api.get<GetProductResponse>(`/product/${slug}`);

  if (res.data?.success) {
    return res.data.data;
  }

  throw new Error(res.data?.message || "Something went wrong");
};

export const createProduct = async (formData: FormData) => {
  const res = await api.post<GetProductResponse>("/product", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (res.data?.success) {
    return res.data;
  }

  throw new Error(res.data?.message || "Failed to create product");
};

export const editProduct = async (
  slug: string,
  formData: FormData,
): Promise<GetProductResponse> => {
  const res = await api.patch<GetProductResponse>(
    `/product/${slug}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  if (res.data?.success) {
    return res.data;
  }

  throw new Error(res.data?.message || "Failed to update product");
};

export const deleteProduct = async (id: string): Promise<DeleteResponse> => {
  const res = await api.delete<DeleteResponse>(`/product/${id}`);

  if (res.data?.success) {
    return res.data;
  }

  throw new Error(res.data?.message || "Failed to delete product");
};

// if (res.status !== 200) {
//   throw new Error("Failed to fetch products");
// }
