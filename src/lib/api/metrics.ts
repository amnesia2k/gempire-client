import { api } from "../axios";
import type { DashboardResponse, SalesDataResponse } from "../types";

// 📊 Get admin dashboard metrics
export const getDashboardMetrics = async (): Promise<DashboardResponse> => {
  const res = await api.get<DashboardResponse>("/metrics");

  if (res.data?.success) {
    return res.data;
  }

  throw new Error(res.data?.message || "Failed to fetch dashboard metrics");
};

export const getSalesData = async (
  period: "month" | "week" | "day" = "month",
): Promise<SalesDataResponse> => {
  const res = await api.get<SalesDataResponse>("/metrics/sales", {
    params: { period },
  });

  if (res.data?.success) {
    return res.data;
  }

  throw new Error(res.data?.message || "Failed to fetch sales data");
};
