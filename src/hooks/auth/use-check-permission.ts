import { useGetRoleQuery } from "@/queries/role/use-get-role-query";
import type { Action } from "@/types/permission";

import { useToken } from "./use-token";

export function useCheckPermission(resource: string, action: Action): boolean {
  const jwtToken = useToken();
  const { data: roleResponse } = useGetRoleQuery(jwtToken?.role);

  const permissions = roleResponse?.data?.role?.permissions;

  if (!permissions) return false;

  const hasPermission = permissions.some((permission) => {
    return permission.resource === resource && permission.action === action;
  });

  if (!hasPermission) return false;

  return true;
}
