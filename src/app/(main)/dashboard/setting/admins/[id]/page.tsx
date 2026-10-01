"use client";

import { useParams, useRouter } from "next/navigation";

import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAdminManagement } from "@/hooks/admin/use-admin-management";

import { Breadcrumb } from "../../../_components/header/breadcrumb";
import { AdminCreateForm } from "./_components/admin-create-form";
import { AdminUpdateForm } from "./_components/admin-update-form";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const { adminCreateForm, adminUpdateForm, createAdmin, updateAdmin, roles, rolesResponseLoading } =
    useAdminManagement();
  const isEdit = id !== "create";
  const router = useRouter();
  const currentPage = isEdit ? "Edit" : "Create";

  return (
    <div className="mx-auto flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-y-4">
        <Button
          variant={"outline"}
          onClick={() => router.push("/dashboard/setting/admins")}
          className="flex gap-2 text-blue-500"
        >
          <ChevronLeft />
          <div>Back</div>
        </Button>
        <Breadcrumb items={["Admin Management"]} currentPage={currentPage} />
      </div>
      <div>
        {isEdit ? (
          <AdminUpdateForm
            form={adminUpdateForm}
            onSubmit={updateAdmin}
            roles={roles}
            id={id}
            rolesResponseLoading={rolesResponseLoading}
          />
        ) : (
          <AdminCreateForm
            form={adminCreateForm}
            onSubmit={createAdmin}
            roles={roles}
            rolesResponseLoading={rolesResponseLoading}
          />
        )}
      </div>
    </div>
  );
}
