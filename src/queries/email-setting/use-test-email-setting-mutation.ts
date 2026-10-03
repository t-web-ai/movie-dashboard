import { useMutation } from "@tanstack/react-query";

import { testEmailSetting } from "@/services/email-setting-service";

export function useTestEmailSetttingMutation() {
  return useMutation({
    mutationFn: testEmailSetting,
  });
}
