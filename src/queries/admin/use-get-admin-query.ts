import { useQuery } from "@tanstack/react-query";

import { getAdmin } from "@/services/admin-service";

export function useGetAdminQuery(id?: string) {
  return useQuery({
    queryKey: ["admins", id],
    queryFn: () => {
      if (id) {
        return getAdmin(id);
      }
    },
    enabled: !!id,
    staleTime: 60000,
    retry: 2,
  });
}
