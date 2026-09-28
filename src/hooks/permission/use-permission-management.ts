import { useGetAllPermissionsQuery } from "@/queries/permission/use-get-all-permissions-query";

export function usePermissionManagement() {
  const { data, isLoading } = useGetAllPermissionsQuery();
  const permissions = data?.data?.permissions;
  return { permissions, permissionsLoading: isLoading };
}
