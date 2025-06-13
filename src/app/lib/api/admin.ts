import { api } from "../axios";

type Login = {
  _id: string;
  owner: string;
};

type LoginResponse = {
  message: string;
  success: boolean;
  valid: boolean;
  data: Login;
};

type LogoutResponse = {
  message: string;
  success: boolean;
};

export type Admin = {
  _id: string;
  owner: string;
};

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
  const res = await api.get<{
    message: string;
    success: boolean;
    data: Admin;
  }>("/admin");

  if (res.status !== 200) {
    throw new Error("Failed to fetch admin data");
  }

  return res.data.data;
};
