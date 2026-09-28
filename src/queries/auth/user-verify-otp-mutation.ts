import { useMutation } from "@tanstack/react-query";

import { verifyOTPCode } from "@/services/auth-service";

export function useVerifyOTPMutation() {
  return useMutation({
    mutationFn: verifyOTPCode,
  });
}
