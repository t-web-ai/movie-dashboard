import { useQuery } from "@tanstack/react-query";

import { getEmailSetting } from "@/services/email-setting-service";

export function useGetEmailSettingQuery() {
  return useQuery({
    queryKey: ["email-setting"],
    queryFn: getEmailSetting,
    staleTime: 60000,
    retry: 2,
  });
}
