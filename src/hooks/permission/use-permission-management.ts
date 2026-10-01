import { useGetAllPermissionsQuery } from "@/queries/permission/use-get-all-permissions-query";

export function usePermissionManagement() {
  const { data: permissionsResponse, isLoading: permissionsResponseLoading } = useGetAllPermissionsQuery();
  const permissions = permissionsResponse?.data?.permissions;
  return { permissions, permissionsResponse, permissionsResponseLoading };
}
