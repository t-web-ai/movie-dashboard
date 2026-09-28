import { useGetAdminQuery } from "@/queries/admin/use-get-admin-query";

import { useToken } from "./use-token";

export function useProfileManagement() {
  const jwtToken = useToken();
  const { data: adminResponse, isLoading: adminResponseLoading } = useGetAdminQuery(jwtToken?.id);
  const admin = adminResponse?.data?.admin;
  return {
    admin,
    adminResponseLoading,
  };
}
