import { api } from "../axios";
import type {
  GetOrderResponse,
  GetOrdersResponse,
  Order,
  OrderStatus,
  UpdateOrderStatusResponse,
} from "../types";

// 🧾 Create a new order (for customer-facing form)
// export const createOrder = async (formData: FormData): Promise<CreateOrderResponse["data"]> => {
export const createOrder = async (
  formData: FormData,
): Promise<GetOrderResponse> => {
  const res = await api.post<GetOrderResponse>("/order", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (res.data?.success) {
    return res.data;
  }

  throw new Error(res.data?.message || "Failed to place order");
};

// 📦 Get all orders (for admin order table)
export const getAllOrders = async (): Promise<Order[]> => {
  const res = await api.get<GetOrdersResponse>("/orders");

  if (res.data?.success) {
    return res.data.data;
  }

  throw new Error(res.data?.message || "Failed to fetch orders");
};

// 🔍 Get single order by ID (admin view)
export const getOrderById = async (id: string): Promise<GetOrderResponse> => {
  const res = await api.get<GetOrderResponse>(`/order/${id}`);

  if (res.data?.success) {
    return res.data;
  }

  throw new Error(res.data?.message || "Failed to fetch order");
};

// 🔁 Update order status (PATCH)
export const updateOrderStatus = async (
  id: string,
  status: OrderStatus,
): Promise<UpdateOrderStatusResponse> => {
  const res = await api.patch<UpdateOrderStatusResponse>(
    `/order/${id}/status`,
    { status },
  );

  if (res.data?.success) {
    return res.data;
  }

  throw new Error(res.data?.message || "Failed to update order status");
};
