import { readClient, writeClient } from "@/config/axios-config";
import { ADMIN } from "@/config/constant";
import type { AdminUpdateInput } from "@/schemas/admin-schema";
import type { AdminResponse } from "@/types/admin";
import type { SuccessResponse } from "@/types/response";

export async function getAdmin(id: string) {
  const response = await readClient.get<AdminResponse>(`${ADMIN}/${id}`);
  return response.data;
}

export async function updateAdmin(adminUpdateInput: AdminUpdateInput) {
  const response = await writeClient.put<SuccessResponse>(`${ADMIN}/${adminUpdateInput.id}`, {
    name: adminUpdateInput.name,
    email: adminUpdateInput.email,
    password: adminUpdateInput.password,
    role: adminUpdateInput.role,
    status: adminUpdateInput.status,
  });
  return response.data;
}
