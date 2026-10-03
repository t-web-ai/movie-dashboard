import { writeClient } from "@/config/axios-config";
import { LOG } from "@/config/constant";
import type { DeleteAllLogsParams, GetAllLogsParams, GetAllLogsResponse } from "@/types/log";
import type { SuccessResponse } from "@/types/response";

export async function getAllLogs(getAllLogsParams: GetAllLogsParams) {
  const response = await writeClient.get<GetAllLogsResponse>(LOG, {
    params: getAllLogsParams,
  });
  return response.data;
}

export async function deleteLog(id: string) {
  const response = await writeClient.delete<SuccessResponse>(`${LOG}/${id}`);
  return response.data;
}

export async function deleteAllLogs(deleteAllLogsParams: DeleteAllLogsParams) {
  const response = await writeClient.delete<SuccessResponse>(LOG, {
    params: deleteAllLogsParams,
  });
  return response.data;
}
