"use client";

import DashHeader from "@/components/dash-header";
import Loader from "@/components/loader";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDashboardMetrics, useSalesData } from "@/lib/hooks/useMetrics";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import React, { useState, type FC } from "react"; // Import FC

// --- Type Definitions ---
interface PeriodInterface {
  value: "month" | "week" | "day";
  label: string;
}

interface YAxisTickPayload {
  value: number | string;
}

interface CustomYAxisTickProps {
  x?: number;
  y?: number;
  payload?: YAxisTickPayload;
}
// --- End Type Definitions ---

export default function AdminDashboardPage() {
  const [period, setPeriod] = useState<"month" | "week" | "day">("month");

  const { data: metrics, isLoading: loadingMetrics } = useDashboardMetrics();
  const { data: salesData, isLoading: loadingChart } = useSalesData(period);

  const formatPrice = (amount: number | string) => {
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
    return num.toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  /**
   * Formats a number into a compact, human-readable string (e.g., 100k, 1.2M).
   * Strips the currency symbol.
   * @param num The number to format.
   * @returns Formatted string.
   */
  const formatCompactPrice = (num: number | string) => {
    const value = typeof num === "string" ? parseFloat(num) : num;
    if (isNaN(value)) {
      return "N/A";
    }

    const absValue = Math.abs(value);
    const sign = value < 0 ? "-" : "";

    if (absValue >= 1_000_000_000) {
      return `${sign}${(absValue / 1_000_000_000).toFixed(1)}B`;
    }
    if (absValue >= 1_000_000) {
      return `${sign}${(absValue / 1_000_000).toFixed(1)}M`;
    }
    if (absValue >= 1_000) {
      return `${sign}${(absValue / 1_000).toFixed(1)}K`;
    }
    if (Number.isInteger(value)) {
      return `${sign}${value.toLocaleString()}`;
    }
    return `${sign}${value.toFixed(2)}`;
  };

  // Custom Y-Axis Tick Component to Slant Text with Proper Types
  const CustomYAxisTick: FC<CustomYAxisTickProps> = ({ x, y, payload }) => {
    if (payload?.value === undefined) {
      return null;
    }

    const formattedValue = formatCompactPrice(payload.value);

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={4}
          textAnchor="end"
          fill="#888888"
          fontSize={12}
          transform="rotate(-25)"
        >
          {formattedValue}
        </text>
      </g>
    );
  };

  return (
    <section className="space-y-5">
      <DashHeader text="Dashboard" />

      {loadingMetrics ? (
        <div className="flex h-64 items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardContent className="space-y-2">
              <h2 className="text-lg font-semibold">
                Total Sales <span className="text-sm">(NGN)</span>
              </h2>
              <p className="text-2xl font-bold">
                {formatPrice(metrics?.data.totalSales ?? 0)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-2">
              <h2 className="text-lg font-semibold">Total Products</h2>
              <p className="text-2xl font-bold">
                {metrics?.data.totalProducts}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-2">
              <h2 className="text-lg font-semibold">Pending Orders</h2>
              <p className="text-2xl font-bold">
                {metrics?.data.pendingOrders}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-2">
              <h2 className="text-lg font-semibold">Total Orders</h2>
              <p className="text-2xl font-bold">{metrics?.data.totalOrders}</p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Sales Overview</h2>

        <Select
          defaultValue={period}
          onValueChange={(val) => setPeriod(val as PeriodInterface["value"])}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">By Month</SelectItem>
            <SelectItem value="week">By Week</SelectItem>
            <SelectItem value="day">By Day</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card text-card-foreground rounded-lg border p-2 shadow-sm">
        {loadingChart ? (
          <div className="flex h-64 items-center justify-center">
            <Loader />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={salesData?.data.labels.map((label, i) => ({
                label,
                value: salesData?.data.values[i],
              }))}
              margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e0e0e0"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                padding={{ left: 5, right: 5 }}
              />
              <YAxis
                tick={<CustomYAxisTick />}
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                cursor={{ strokeDasharray: "3 3", stroke: "#ccc" }}
                contentStyle={{
                  background: "var(--background)",
                  border: "1px solid var(--border)",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                  padding: "0.5rem 0.75rem",
                  boxShadow:
                    "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                }}
                labelStyle={{
                  color: "var(--foreground)",
                  fontWeight: "bold",
                }}
                itemStyle={{ color: "var(--muted-foreground)" }}
                formatter={(value: string | number) => [
                  `${formatPrice(value)}`,
                  "Sales",
                ]}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={false}
                activeDot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}
