import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateRole } from "@/services/role-service";

export function useUpdateRoleMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateRole,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
}
