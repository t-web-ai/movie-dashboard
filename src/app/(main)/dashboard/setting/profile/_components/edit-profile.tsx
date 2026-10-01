"use client";

import { useAdminManagement } from "@/hooks/admin/use-admin-management";
import { useAuthStore } from "@/hooks/auth/use-auth-store";

import { AdminUpdateForm, AdminUpdateFormSkeleton } from "../../admins/[id]/_components/admin-update-form";
export function EditProfile() {
  const { admin } = useAuthStore();
  const { adminUpdateForm, updateAdmin, roles, rolesResponseLoading } = useAdminManagement();

  if (!admin) return <AdminUpdateFormSkeleton />;

  return (
    <AdminUpdateForm
      form={adminUpdateForm}
      onSubmit={updateAdmin}
      id={admin._id}
      roles={roles}
      rolesResponseLoading={rolesResponseLoading}
    />
  );
}
