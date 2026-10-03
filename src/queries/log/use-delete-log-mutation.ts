import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteLog } from "@/services/log-service";

export function useDeleteLogMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteLog,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["logs"] });
    },
  });
}
