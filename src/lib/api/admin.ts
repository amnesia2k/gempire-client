import { api } from "../axios";
import type { AdminResponse, LoginResponse, LogoutResponse } from "../types";

export const loginAdmin = async ({ code }: { code: string }) => {
  const res = await api.post<LoginResponse>("/login", { code });

  if (res.data?.success) {
    return res.data;
  }

  throw new Error(res.data?.message || "Failed to update product");
};

export const logoutAdmin = async () => {
  const res = await api.post<LogoutResponse>("/logout");

  if (res.data?.success) {
    return res.data;
  }

  throw new Error(res.data?.message || "Failed to update product");
};

export const getAdmin = async () => {
  const res = await api.get<AdminResponse>("/admin");

  if (res.data?.success) {
    return res.data.data;
  }

  throw new Error(res.data?.message || "Failed to update product");
};
