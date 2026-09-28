import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateAdmin } from "@/services/admin-service";

export function useUpdateAdminMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAdmin,
    onSuccess: async (_, { id }) => {
      await queryClient.invalidateQueries({ queryKey: ["profile", id] });
    },
  });
}
