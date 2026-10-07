import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateEmailTemplate } from "@/services/email-template-service";

export function useUpdateEmailTemplateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEmailTemplate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["email-templates"] });
    },
  });
}
