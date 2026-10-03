import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateEmailSetting } from "@/services/email-setting-service";

export function useUpdateEmailSettingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEmailSetting,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["email-setting"] });
    },
  });
}
