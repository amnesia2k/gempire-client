import { api } from "../axios";

export type Category = {
  _id: string;
  name: string;
  slug: string;
};

export type ProductImage = {
  _id: string;
  imageUrl: string;
  blurUrl: string;
  productId: string;
  createdAt: string;
};

export type Product = {
  _id: string;
  productId: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  unit: number;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  images: ProductImage[];
  category: Category | null;
};

type GetAllProductsResponse = {
  success: boolean;
  message: string;
  data: Product[];
};

type GetProductResponse = {
  success: boolean;
  message: string;
  data: Product;
};

type DeleteResponse = {
  success: boolean;
  message: string;
};

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
    return res.data.data;
  }

  throw new Error(res.data?.message || "Something went wrong");
};

export const editProduct = async (
  slug: string,
  formData: FormData,
): Promise<Product> => {
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
    return res.data.data;
  }

  throw new Error(res.data?.message || "Failed to update product");
};

export const deleteProduct = async (id: string): Promise<string> => {
  const res = await api.delete<DeleteResponse>(`/product/${id}`);

  if (res.data?.success) {
    return res.data.message;
  }

  throw new Error(res.data?.message || "Failed to delete product");
};

// if (res.status !== 200) {
//   throw new Error("Failed to fetch products");
// }
