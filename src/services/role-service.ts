import { readClient, writeClient } from "@/config/axios-config";
import { ROLE } from "@/config/constant";
import type { RoleCreateInput, RoleUpdateInput } from "@/schemas/role-schema";
import type { SuccessResponse } from "@/types/response";
import type { RoleResponse, RolesResponse } from "@/types/role";

export async function getAllRoles() {
  const response = await readClient.get<RolesResponse>(ROLE);
  return response.data;
}

export async function getRole(id: string) {
  const response = await readClient.get<RoleResponse>(`${ROLE}/${id}`);
  return response.data;
}

export async function deleteRole(id: string) {
  const response = await writeClient.delete<SuccessResponse>(`${ROLE}/${id}`);
  return response.data;
}

export async function createRole(roleCreateInput: RoleCreateInput) {
  const response = await writeClient.post<SuccessResponse>(ROLE, roleCreateInput);
  return response.data;
}

export async function updateRole(roleUpdateInput: RoleUpdateInput) {
  const response = await writeClient.put<SuccessResponse>(`${ROLE}/${roleUpdateInput.id}`, {
    name: roleUpdateInput.name,
    permissions: roleUpdateInput.permissions,
  });
  return response.data;
}
