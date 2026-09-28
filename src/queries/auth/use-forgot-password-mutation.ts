import { useMutation } from "@tanstack/react-query";

import { forgotPassword } from "@/services/auth-service";

export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: forgotPassword,
  });
}
