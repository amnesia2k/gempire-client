import { api } from "../axios";
import type { AdminResponse, LoginResponse, LogoutResponse } from "../types";

export const loginAdmin = async ({ code }: { code: string }) => {
  const res = await api.post<LoginResponse>("/login", { code });

  if (res.status !== 200) {
    throw new Error("Failed to Login");
  }

  return res.data;
};

export const logoutAdmin = async () => {
  const res = await api.post<LogoutResponse>("/logout");

  if (res.status !== 200) {
    throw new Error("Failed to Logout");
  }

  return res;
};

export const getAdmin = async () => {
  const res = await api.get<AdminResponse>("/admin");

  if (res.status !== 200) {
    throw new Error("Failed to fetch admin data");
  }

  return res.data.data;
};
