import { useQuery } from "@tanstack/react-query";

import { getAllRoles } from "@/services/role-service";

export function useGetAllRolesQuery() {
  return useQuery({
    queryKey: ["roles"],
    queryFn: getAllRoles,
    staleTime: 60000,
    retry: 2,
  });
}
