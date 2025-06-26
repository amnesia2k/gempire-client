"use client";

import { createContext, useContext } from "react";
import type { Admin } from "../lib/api/admin";
import { useGetAdmin } from "../lib/hooks/useAdmin";

type AdminContextType = {
  admin: Admin | null;
  isLoading: boolean;
  isError: boolean;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, isError } = useGetAdmin();

  return (
    <AdminContext.Provider
      value={{
        admin: data ?? null,
        isLoading,
        isError,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
