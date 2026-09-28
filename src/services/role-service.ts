import { readClient } from "@/config/axios-config";
import { ROLE } from "@/config/constant";
import type { RoleResponse, RolesResponse } from "@/types/role";

export async function getAllRoles() {
  const response = await readClient.get<RolesResponse>(ROLE);
  return response.data;
}

export async function getRole(id: string) {
  const response = await readClient.get<RoleResponse>(`${ROLE}/${id}`);
  return response.data;
}
