import { readClient } from "@/config/axios-config";
import { PERMISSION } from "@/config/constant";
import type { PermissionsResponse } from "@/types/permission";

export async function getAllPermissions() {
  const response = await readClient.get<PermissionsResponse>(PERMISSION);
  return response.data;
}
