import { useMutation } from "@tanstack/react-query";

import { resetPassword } from "@/services/auth-service";

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: resetPassword,
  });
}
