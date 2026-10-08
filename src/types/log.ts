import type { Pagination } from "./pagination";
import type { Action } from "./permission";

export type GetAllLogsParams = {
  type?: "user" | "audit";
  search?: string;
  role?: string;
  page?: number;
  limit?: number;
  createdBefore?: string;
  createdAfter?: string;
};

export type DeleteAllLogsParams = {
  type: "user" | "audit";
};

export type GetAllLogsResponse = {
  success: boolean;
  message: string;
  data: {
    logs: Log[];
    pagination: Pagination;
  };
};

export type Log = {
  _id: string;
  admin: {
    name: string;
    email: string;
    role: {
      name: string;
    };
  };
  action: Action;
  resource: string;
  ip: string;
  platform: string;
  agent: string;
  createdAt: string;
  updatedAt: string;
};
