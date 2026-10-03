import { useQuery } from "@tanstack/react-query";

import { getAllLogs } from "@/services/log-service";
import type { GetAllLogsParams } from "@/types/log";

export function useGetAllLogsQuery(getAllLogsParams: GetAllLogsParams) {
  return useQuery({
    queryKey: ["logs", getAllLogsParams],
    queryFn: () => getAllLogs(getAllLogsParams),
    staleTime: 60000,
    retry: 2,
  });
}
