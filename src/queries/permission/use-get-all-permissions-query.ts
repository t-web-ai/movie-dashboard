import { useQuery } from "@tanstack/react-query";

import { getAllPermissions } from "@/services/permission-service";

export function useGetAllPermissionsQuery() {
  return useQuery({
    queryKey: ["permissions"],
    queryFn: getAllPermissions,
    staleTime: 60000,
    retry: 2,
  });
}
