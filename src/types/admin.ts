import type { Pagination } from "./pagination";
import type { Role } from "./role";

export type AdminResponse = {
  success: boolean;
  message: string;
  data: {
    admin: Admin;
  };
};

export type Admin = {
  _id: string;
  name: string;
  email: string;
  role: Role;
  status: AdminAccountStatus;
  createdAt: string;
  updatedAt: string;
};

export type AdminsResponse = {
  success: boolean;
  message: string;
  data: {
    admins: Admin[];
    pagination: Pagination;
  };
};

export interface GetAllAdminsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  role?: string;
  createdBefore?: string;
  createdAfter?: string;
}

export type AdminAccountStatus = "active" | "suspend";
