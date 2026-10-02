"use client";

import { useParams, useRouter } from "next/navigation";

import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { usePermissionManagement } from "@/hooks/permission/use-permission-management";
import { useRoleManagment } from "@/hooks/role/use-role-management";

import { Breadcrumb } from "../../../_components/header/breadcrumb";
import { RoleCreateForm } from "./_components/role-create-form";
import { RoleUpdateForm } from "./_components/role-update-form";

export default function Page() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { createRole, roleCreateForm, updateRole, roleUpdateForm } = useRoleManagment();
  const { permissions, permissionsResponseLoading } = usePermissionManagement();
  const isEdit = id !== "create";
  const currentPage = isEdit ? "Edit" : "Create";

  return (
    <div className="mx-auto flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-y-4">
        <Button
          variant={"outline"}
          onClick={() => router.push("/dashboard/setting/roles")}
          className="flex gap-2 text-blue-500"
        >
          <ChevronLeft />
          <div>Back</div>
        </Button>
        <Breadcrumb items={["Role Management"]} currentPage={currentPage} />
      </div>
      <div>
        {isEdit ? (
          <RoleUpdateForm
            form={roleUpdateForm}
            onSubmit={updateRole}
            permissionsResponseLoading={permissionsResponseLoading}
            permissions={permissions}
            id={id}
          />
        ) : (
          <RoleCreateForm
            onSubmit={createRole}
            form={roleCreateForm}
            permissions={permissions}
            permissionsResponseLoading={permissionsResponseLoading}
          />
        )}
      </div>
    </div>
  );
}
