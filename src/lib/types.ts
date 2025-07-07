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

export type CategoryWithProducts = {
  _id: string;
  name: string;
  slug: string;
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
};

export type GetCategoriesResponse = {
  success: boolean;
  message: string;
  data: Category[];
};

export type GetCategoryResponse = {
  data: CategoryWithProducts;
  message: string;
  success: boolean;
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

export type OrderStatus = "ordered" | "shipped" | "delivered" | "cancelled";

export type OrderDeliveryMethod = "delivery" | "pickup";

export type OrderItem = {
  _id: string;
  productId: string;
  quantity: number;
  unitPrice: string;
  product: Product;
};

export type Order = {
  _id: string;
  orderId: string;
  name: string;
  address: string;
  telephone: string;
  email: string;
  note?: string;
  status: OrderStatus;
  deliveryMethod: OrderDeliveryMethod;
  createdAt: string;
  items: OrderItem[];
};

export type GetOrdersResponse = {
  success: boolean;
  message: string;
  data: Order[];
};

export type GetOrderResponse = {
  success: boolean;
  message: string;
  data: Order;
};

export type UpdateOrderStatusResponse = {
  success: boolean;
  message: string;
};

export type DashboardMetrics = {
  totalProducts: string;
  totalOrders: string;
  pendingOrders: string;
  totalSales: string;
};

export type DashboardResponse = {
  message: string;
  success: boolean;
  data: DashboardMetrics;
};

export type SalesDataResponse = {
  message: string;
  success: boolean;
  data: {
    labels: string[];
    values: number[];
  };
};
