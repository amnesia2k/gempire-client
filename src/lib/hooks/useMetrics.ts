"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardMetrics, getSalesData } from "../api/metrics";

export const useDashboardMetrics = () => {
  return useQuery({
    queryKey: ["dashboard-metrics"],
    queryFn: getDashboardMetrics,
    // staleTime: 600_000,
  });
};

export const useSalesData = (period: "month" | "week" | "day" = "month") => {
  return useQuery({
    queryKey: ["sales-data", period],
    queryFn: () => getSalesData(period),
  });
};
