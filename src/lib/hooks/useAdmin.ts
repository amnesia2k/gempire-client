import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAdmin, loginAdmin, logoutAdmin } from "../api/admin";

export const useLoginAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginAdmin,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
  });
};

export const useLogoutAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logoutAdmin,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
  });
};

export const useGetAdmin = () => {
  return useQuery({
    queryKey: ["admin"],
    queryFn: getAdmin,
    staleTime: 3_600_000, // 1 hour
  });
};
