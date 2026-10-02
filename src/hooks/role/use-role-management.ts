import { useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useCreateRoleMutation } from "@/queries/role/use-create-role-mutation";
import { useDeleteRoleMutation } from "@/queries/role/use-delete-role-mutation";
import { useGetAllRolesQuery } from "@/queries/role/use-get-all-roles-query";
import { useUpdateRoleMutation } from "@/queries/role/use-update-role-mutation";
import { type RoleCreateInput, RoleCreateSchema, type RoleUpdateInput, RoleUpdateSchema } from "@/schemas/role-schema";
import { handleResponseError } from "@/utils/handle-error-util";

export function useRoleManagment() {
  const router = useRouter();
  const { data: rolesResponse, isLoading: rolesResponseLoading } = useGetAllRolesQuery();
  const roles = rolesResponse?.data?.roles;

  const [deleteId, setDeleteId] = useState<string | undefined>();

  function selectDeleteId(id: string) {
    setDeleteId(id);
  }
  function removeDeleteId() {
    setDeleteId(undefined);
  }

  const deleteRoleMutation = useDeleteRoleMutation();
  async function deleteRole() {
    if (!deleteId) return null;
    try {
      const response = await deleteRoleMutation.mutateAsync(deleteId);
      toast.success(response.message);
      removeDeleteId();
    } catch (error) {
      handleResponseError(error);
    }
  }

  function openCreateRolePage() {
    router.push("/dashboard/setting/roles/create");
  }

  const roleCreateForm = useForm<RoleCreateInput>({
    defaultValues: {
      name: "",
      permissions: [],
    },
    resolver: zodResolver(RoleCreateSchema),
  });

  const createRoleMutation = useCreateRoleMutation();

  async function createRole(data: RoleCreateInput) {
    try {
      const response = await createRoleMutation.mutateAsync(data);
      toast.success(response.message);
      router.push("/dashboard/setting/roles");
    } catch (error) {
      handleResponseError(error);
    }
  }

  const roleUpdateForm = useForm<RoleUpdateInput>({
    defaultValues: {
      name: "",
      permissions: [],
    },
    resolver: zodResolver(RoleUpdateSchema),
  });

  const updateRoleMutation = useUpdateRoleMutation();
  async function updateRole(roleUpdateInput: RoleUpdateInput) {
    try {
      const response = await updateRoleMutation.mutateAsync(roleUpdateInput);
      toast.success(response.message);
      router.push("/dashboard/setting/roles");
    } catch (error) {
      handleResponseError(error);
    }
  }

  return {
    roles,
    rolesResponse,
    rolesResponseLoading,
    deleteId,
    isDeleting: deleteRoleMutation.isPending,
    isCreating: createRoleMutation.isPending,
    isUpdating: updateRoleMutation.isPending,
    roleCreateForm,
    roleUpdateForm,
    updateRole: roleUpdateForm.handleSubmit(updateRole),
    createRole: roleCreateForm.handleSubmit(createRole),
    removeDeleteId,
    selectDeleteId,
    openCreateRolePage,
    deleteRole,
  };
}
