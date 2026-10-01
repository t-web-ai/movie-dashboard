import { useGetAllRolesQuery } from "@/queries/role/use-get-all-roles-query";

export function useRoleManagment() {
  const { data: rolesResponse, isLoading: rolesResponseLoading } = useGetAllRolesQuery();
  const roles = rolesResponse?.data?.roles;
  return { roles, rolesResponse, rolesResponseLoading };
}
