import { useMutation, useQuery } from "@tanstack/react-query";
import { getAdmin, loginAdmin, logoutAdmin } from "../api/admin";

export const useLoginAdmin = () => {
  return useMutation({
    mutationFn: loginAdmin,
  });
};

export const useLogoutAdmin = () => {
  return useMutation({
    mutationFn: logoutAdmin,
  });
};

export const useGetAdmin = () => {
  return useQuery({
    queryKey: ["admin"],
    queryFn: getAdmin,
  });
};
