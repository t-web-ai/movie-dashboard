export type PermissionsResponse = {
  success: true;
  message: string;
  data: {
    permissions: Permission[];
  };
};

export type Action = "read" | "update" | "delete" | "create";

export type Permission = {
  _id: string;
  resource: string;
  action: Action;
};
