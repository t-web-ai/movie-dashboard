import { useQuery } from "@tanstack/react-query";

import { getEmailTemplate } from "@/services/email-template-service";

export function useGetEmailTemplateQuery(id: string) {
  return useQuery({
    queryKey: ["email-templates", id],
    queryFn: () => getEmailTemplate(id),
    staleTime: 60000,
    retry: 2,
  });
}
