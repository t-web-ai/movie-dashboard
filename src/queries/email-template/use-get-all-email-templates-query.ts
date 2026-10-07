import { useQuery } from "@tanstack/react-query";

import { getAllEmailTemplates } from "@/services/email-template-service";

export function useGetAllEmailTemplatesQuery() {
  return useQuery({
    queryKey: ["email-templates"],
    queryFn: getAllEmailTemplates,
    staleTime: 60000,
    retry: 2,
  });
}
