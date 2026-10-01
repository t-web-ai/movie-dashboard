import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createAdmin } from "@/services/admin-service";

export function useCreateAdminMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAdmin,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
  });
}
