import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteAllLogs } from "@/services/log-service";

export function useDeleteAllLogsMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAllLogs,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["logs"] });
    },
  });
}
