import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createRole } from "@/services/role-service";

export function useCreateRoleMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRole,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
}
