"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardMetrics } from "../api/metrics";

export const useDashboardMetrics = () => {
  return useQuery({
    queryKey: ["dashboard-metrics"],
    queryFn: getDashboardMetrics,
    // staleTime: 600_000,
  });
};
