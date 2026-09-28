import type { Role } from "./role";

export type AdminResponse = {
  success: true;
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
  status: "active" | "suspend";
  createdAt: string;
  updatedAt: string;
};
