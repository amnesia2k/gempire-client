"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../api/category";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
};
