import { api } from "../axios";
import type { DashboardResponse } from "../types";

// 📊 Get admin dashboard metrics
export const getDashboardMetrics = async (): Promise<DashboardResponse> => {
  const res = await api.get<DashboardResponse>("/metrics");

  if (res.data?.success) {
    return res.data;
  }

  throw new Error(res.data?.message || "Failed to fetch dashboard metrics");
};
