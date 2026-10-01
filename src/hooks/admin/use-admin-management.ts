import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import type { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useCreateAdminMutation } from "@/queries/admin/use-create-admin-mutation";
import { useDeleteAdminMutation } from "@/queries/admin/use-delete-admin-mutation";
import { useGetAllAdminQuery } from "@/queries/admin/use-get-all-admin-query";
import { useUpdateAdminMutation } from "@/queries/admin/use-update-admin-mutation";
import {
  type AdminCreateInput,
  AdminCreateSchema,
  type AdminUpdateInput,
  AdminUpdateSchema,
} from "@/schemas/admin-schema";
import { handleResponseError } from "@/utils/handle-error-util";

import { useRoleManagment } from "../role/use-role-management";

export function useAdminManagement() {
  const router = useRouter();

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [role, setRole] = useState<string>("all");
  const [deboundSearch, setDeboundSearch] = useState<string>("");
  const [status, setStatus] = useState<string>("all");
  const [createdBefore, setCreatedBefore] = useState<string>("");
  const [createdAfter, setCreatedAfter] = useState<string>("");

  const [deleteId, setDeleteId] = useState<string | undefined>();
  function selectDeleteId(id: string) {
    setDeleteId(id);
  }
  function removeDeleteId() {
    setDeleteId(undefined);
  }

  function handlePage(page: number) {
    if (page >= 1) {
      setPage(page);
    }
  }
  function handleLimit(limit: number) {
    if (limit >= 1) {
      setLimit(limit);
      setPage(1);
    }
  }
  function handleSearch(search: string) {
    setSearch(search);
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setDeboundSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  function handleRole(role: string) {
    setRole(role);
    setPage(1);
  }

  function handleDate(dateRange?: DateRange) {
    if (dateRange?.from) {
      setCreatedAfter(dateRange.from.toDateString());
    }
    if (dateRange?.to) {
      setCreatedBefore(dateRange.to.toDateString());
    }
  }

  function handleStatus(status: string) {
    setStatus(status);
    setPage(1);
  }

  function clearFilters() {
    setPage(1);
    setLimit(10);
    setSearch("");
    setStatus("all");
    setRole("all");
    setCreatedAfter("");
    setCreatedBefore("");
  }

  const { data: adminsResponse, isLoading: adminsResponseLoading } = useGetAllAdminQuery({
    page: page,
    limit: limit,
    status: status !== "all" ? status : undefined,
    search: deboundSearch ? deboundSearch : undefined,
    role: role !== "all" ? role : undefined,
    createdBefore: createdBefore ? createdBefore : undefined,
    createdAfter: createdAfter ? createdAfter : undefined,
  });

  const admins = adminsResponse?.data?.admins;
  const adminsPaginaton = adminsResponse?.data?.pagination;

  const totalPages = adminsPaginaton?.totalPages ?? 0;
  const foundCount = adminsPaginaton?.foundCount ?? 0;
  const totalCount = adminsPaginaton?.totalCount ?? 0;

  const { roles, rolesResponseLoading } = useRoleManagment();

  const adminCreateForm = useForm<AdminCreateInput>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
      status: "active",
    },
    resolver: zodResolver(AdminCreateSchema),
  });

  const createAdminMutation = useCreateAdminMutation();
  async function createAdmin(data: AdminCreateInput) {
    try {
      const response = await createAdminMutation.mutateAsync(data);
      toast.success(response.message);
      router.push("/dashboard/setting/admins");
    } catch (error) {
      handleResponseError(error);
    }
  }

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
      router.push("/dashboard/setting/admins");
    } catch (error) {
      handleResponseError(error);
    }
  }

  const deleteAdminMutation = useDeleteAdminMutation();
  async function deleteAdmin() {
    if (!deleteId) return null;
    try {
      const response = await deleteAdminMutation.mutateAsync(deleteId);
      toast.success(response.message);
      removeDeleteId();
    } catch (error) {
      handleResponseError(error);
    }
  }

  function openCreateAdminPage() {
    router.push("/dashboard/setting/admins/create");
  }

  return {
    adminCreateForm,
    createAdmin: adminCreateForm.handleSubmit(createAdmin),

    adminUpdateForm,
    updateAdmin: adminUpdateForm.handleSubmit(updateAdmin),
    roles,
    rolesResponseLoading,

    admins,
    adminsResponseLoading,
    adminsPaginaton,

    page,
    limit,
    search,
    status,
    totalPages,
    foundCount,
    totalCount,
    role,
    createdAfter,
    createdBefore,

    deleteId,
    selectDeleteId,
    removeDeleteId,
    deleteAdmin,
    isDeleting: deleteAdminMutation.isPending,

    handlePage,
    handleLimit,
    handleSearch,
    handleRole,
    handleStatus,
    handleDate,
    clearFilters,

    openCreateAdminPage,
  };
}
