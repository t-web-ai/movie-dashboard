import { useQuery } from "@tanstack/react-query";

import { getAllAdmins } from "@/services/admin-service";
import type { GetAllAdminsParams } from "@/types/admin";

export function useGetAllAdminQuery(getAllAdminsParams: GetAllAdminsParams) {
  return useQuery({
    queryKey: ["admins", getAllAdminsParams],
    queryFn: () => getAllAdmins(getAllAdminsParams),
    staleTime: 60000,
    retry: 2,
  });
}
