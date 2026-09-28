import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useUpdateAdminMutation } from "@/queries/admin/use-update-admin-mutation";
import { useGetAllRolesQuery } from "@/queries/role/use-get-all-roles-query";
import { type AdminUpdateInput, AdminUpdateSchema } from "@/schemas/admin-schema";
import type { ErrorResponse } from "@/types/response";

export function useAdminManagement() {
  const { data: roleResponse, isLoading: roleResponseLoading } = useGetAllRolesQuery();
  const roles = roleResponse?.data?.roles;
  const adminUpdateForm = useForm<AdminUpdateInput>({
    defaultValues: {
      id: "",
      name: "",
      email: "",
      password: "",
      role: "",
      status: "active",
    },
    resolver: zodResolver(AdminUpdateSchema),
  });

  const updateAdminMutation = useUpdateAdminMutation();
  async function updateAdmin(data: AdminUpdateInput) {
    try {
      const response = await updateAdminMutation.mutateAsync(data);
      toast.success(response.message);
    } catch (error) {
      console.error(error);
      if (isAxiosError<ErrorResponse>(error)) {
        toast.error(error.response?.data.details?.[0].message);
      }
    }
  }

  return {
    adminUpdateForm,
    updateAdmin: adminUpdateForm.handleSubmit(updateAdmin),
    roles,
    roleResponseLoading,
  };
}
