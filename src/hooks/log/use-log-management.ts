import { useEffect, useState } from "react";

import { toast } from "sonner";

import { useDeleteAllLogsMutation } from "@/queries/log/use-delete-all-logs-mutation";
import { useDeleteLogMutation } from "@/queries/log/use-delete-log-mutation";
import { useGetAllLogsQuery } from "@/queries/log/use-get-all-logs-query";
import { handleResponseError } from "@/utils/handle-error-util";

import { useRoleManagment } from "../role/use-role-management";

export function useLogManagement() {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<string>("all");
  const [deboundSearch, setDeboundSearch] = useState<string>("");
  const [type, setType] = useState<"user" | "audit">("user");

  const [deleteLogType, setDeleteLogType] = useState<"user" | "audit" | undefined>();

  function selectDeleteLogType(logType: "user" | "audit") {
    setDeleteLogType(logType);
  }

  function removeDeleteLogType() {
    setDeleteLogType(undefined);
  }

  const [deleteId, setDeleteId] = useState<string | undefined>(undefined);
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

  function handleType(type: "user" | "audit") {
    setType(type);
    setPage(1);
  }

  function clearFilters() {
    setPage(1);
    setLimit(10);
    setSearch("");
    setDeboundSearch("");
    setRole("all");
  }

  const { data: logsResponse, isLoading: logsResponseLoading } = useGetAllLogsQuery({
    page,
    limit,
    search: deboundSearch ? deboundSearch : undefined,
    role: role !== "all" ? role : undefined,
    type,
  });
  const logs = logsResponse?.data?.logs;
  const logsPaginaton = logsResponse?.data?.pagination;

  const totalPages = logsPaginaton?.totalPages ?? 0;
  const foundCount = logsPaginaton?.foundCount ?? 0;
  const totalCount = logsPaginaton?.totalCount ?? 0;

  const { roles, rolesResponseLoading } = useRoleManagment();

  const deleteLogMutation = useDeleteLogMutation();
  async function deleteLog() {
    if (!deleteId) return null;
    try {
      const response = await deleteLogMutation.mutateAsync(deleteId);
      toast.success(response.message);
      removeDeleteId();
    } catch (error) {
      handleResponseError(error);
    }
  }

  const deleteAllLogsMutation = useDeleteAllLogsMutation();
  async function deleteAllLogs() {
    if (!deleteLogType) return null;
    try {
      const response = await deleteAllLogsMutation.mutateAsync({ type: deleteLogType });
      toast.success(response.message);
      removeDeleteLogType();
    } catch (error) {
      handleResponseError(error);
    }
  }

  return {
    page,
    limit,
    search,
    role,
    type,
    logs,
    logsResponseLoading,
    roles,
    rolesResponseLoading,
    deleteId,
    isLogDeleting: deleteLogMutation.isPending,
    isLogsDeleting: deleteAllLogsMutation.isPending,
    totalPages,
    foundCount,
    totalCount,
    handlePage,
    handleLimit,
    handleSearch,
    handleRole,
    handleType,
    selectDeleteId,
    removeDeleteId,
    deleteLog,
    deleteAllLogs,
    clearFilters,
    deleteLogType,
    selectDeleteLogType,
    removeDeleteLogType,
  };
}
