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
  note?: string | null;
  status: OrderStatus;
  deliveryMethod: OrderDeliveryMethod;
  createdAt: string;

  // 🧾 Promo-related fields
  promoCodeId: string | null;
  discountAmount: string;
  promoCode?: PromoCode | null;

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

export type PromoCode = {
  _id: string;
  name: string;
  code: string;
  discount: string; // 🧠 string because stored as numeric in DB
  isPercentage: boolean;
  isActive: boolean;
  description: string;
  ctaText: string;
  subtitle: string;
  urgent: boolean;
  createdAt: string;
};

export type GetPromoCodeResponse = {
  success: boolean;
  message: string;
  data: PromoCode;
};

export type GetAllPromoCodesResponse = {
  success: boolean;
  message: string;
  data: PromoCode[];
};

export type CreatePromoCodeResponse = {
  success: boolean;
  message: string;
  data: PromoCode;
};

export type UpdatePromoCodeResponse = {
  success: boolean;
  message: string;
  data: PromoCode;
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

export interface PeriodInterface {
  value: "month" | "week" | "day";
  label: string;
}

export interface YAxisTickPayload {
  value: number | string;
}

export interface CustomYAxisTickProps {
  x?: number;
  y?: number;
  payload?: YAxisTickPayload;
}

export type SendEmailPayload = {
  name: string;
  email: string;
  message: string;
};

export type EmailResponse = {
  message: string;
  success: boolean;
};
