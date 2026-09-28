import { useQuery } from "@tanstack/react-query";

import { getRole } from "@/services/role-service";

export function useGetRoleQuery(id?: string) {
  return useQuery({
    queryKey: ["roles", id],
    queryFn: () => {
      if (id) {
        return getRole(id);
      }
    },
    enabled: !!id,
    staleTime: 60000,
    retry: 2,
  });
}
