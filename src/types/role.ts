import type { Permission } from "./permission";

export type RolesResponse = {
  success: true;
  message: string;
  data: {
    roles: Role[];
  };
};

export type RoleResponse = {
  success: true;
  message: string;
  data: {
    role: Role & {
      permissions: Permission[];
    };
  };
};

export type Role = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};
