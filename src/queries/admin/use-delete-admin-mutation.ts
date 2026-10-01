import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteAdmin } from "@/services/admin-service";

export function useDeleteAdminMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAdmin,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
  });
}
