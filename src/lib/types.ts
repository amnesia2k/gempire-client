export type Login = {
  _id: string;
  owner: string;
  token: string;
};

export type LoginResponse = {
  message: string;
  success: boolean;
  valid: boolean;
  data: Login;
};

export type LogoutResponse = {
  message: string;
  success: boolean;
};

export type Admin = {
  _id: string;
  owner: string;
};

export type AdminResponse = {
  message: string;
  success: boolean;
  data: Admin;
};

export type Category = {
  _id: string;
  name: string;
  slug: string;
};

export type GetCategoriesResponse = {
  success: boolean;
  message: string;
  data: Category[];
};

export type CreateCategoryResponse = {
  success: boolean;
  message: string;
  data: Category;
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

export type GetAllProductsResponse = {
  success: boolean;
  message: string;
  data: Product[];
};

export type GetProductResponse = {
  success: boolean;
  message: string;
  data: Product;
};

export type DeleteResponse = {
  success: boolean;
  message: string;
};

export interface CartItem {
  product: Product;
  quantity: number;
}
