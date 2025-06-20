import { api } from "../axios";

export type Category = {
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

export const getAllProducts = async (): Promise<Product[]> => {
  const res = await api.get<GetAllProductsResponse>("/product");

  if (res.status !== 200) {
    throw new Error("Failed to fetch products");
  }

  return res.data.data;
};

export const createProduct = async (formData: FormData) => {
  const res = await api.post<GetProductResponse>("/product", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.data;
};

export const getProductBySlug = async (slug: string): Promise<Product> => {
  const res = await api.get<GetProductResponse>(`/product/${slug}`);

  if (res.status !== 200) {
    throw new Error("Failed to fetch products");
  }

  return res.data.data;
};
