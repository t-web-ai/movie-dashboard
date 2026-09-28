import type { Permission } from "./permission";

export type RolesResponse = {
  success: true;
  message: string;
  data: {
    roles: Omit<Role, "permissions">[];
  };
};

export type RoleResponse = {
  success: true;
  message: string;
  data: {
    role: Role;
  };
};

export type Role = {
  _id: string;
  name: string;
  permissions: Permission[];
  type: "system" | "custom";
  createdAt: string;
  updatedAt: string;
};
