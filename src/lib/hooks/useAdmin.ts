import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAdmin, loginAdmin, logoutAdmin } from "../api/admin";
import { queryKeys } from "../query-keys";

export const useLoginAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginAdmin,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.admin });
    },
  });
};

export const useLogoutAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logoutAdmin,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.admin });
    },
  });
};

export const useGetAdmin = () =>
  useQuery({
    queryKey: queryKeys.admin,
    queryFn: getAdmin,
    staleTime: 3_600_000, // 1hr
  });
