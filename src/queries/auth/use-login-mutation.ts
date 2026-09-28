import { useMutation } from "@tanstack/react-query";

import { loginAdmin } from "@/services/auth-service";

export function useLoginMutation() {
  return useMutation({
    mutationFn: loginAdmin,
  });
}
