import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteRole } from "@/services/role-service";

export function useDeleteRoleMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRole,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
}
