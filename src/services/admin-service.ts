import { readClient, writeClient } from "@/config/axios-config";
import { ADMIN } from "@/config/constant";
import type { AdminCreateInput, AdminUpdateInput } from "@/schemas/admin-schema";
import type { AdminResponse, AdminsResponse, GetAllAdminsParams } from "@/types/admin";
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

export async function getAllAdmins(getAllAdminsParams: GetAllAdminsParams) {
  const response = await readClient.get<AdminsResponse>(ADMIN, {
    params: getAllAdminsParams,
  });
  return response.data;
}

export async function createAdmin(adminCreateInput: AdminCreateInput) {
  const response = await writeClient.post<SuccessResponse>(ADMIN, adminCreateInput);
  return response.data;
}

export async function deleteAdmin(id: string) {
  const response = await writeClient.delete<SuccessResponse>(`${ADMIN}/${id}`);
  return response.data;
}
