"use client";

import { useEffect, useMemo, useState } from "react";

import { Logs } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { useLogManagement } from "@/hooks/log/use-log-management";

import { PaginationFilter } from "../../_components/pagination/pagination-filter";
import { TableComponent } from "../../_components/table/table-component";
import TableSkeleton from "../../_components/table/table-skeleton";
import { LogDeleteModal } from "./_components/log-delete-modal";
import { LogHeader } from "./_components/log-header";
import { LogTableColums } from "./_components/log-table";
import { LogsDeleteModal } from "./_components/logs-delete-modal";
import { LogActionContextProvider } from "./_contexts/log-action-context";

export default function Page() {
  const {
    type,
    handleType,
    search,
    handleSearch,
    role,
    handleRole,
    roles,
    clearFilters,
    logsResponseLoading,
    deleteAllLogs,
    limit,
    handleLimit,
    selectDeleteId,
    removeDeleteId,
    deleteLog,
    isLogDeleting,
    logs,
    deleteId,
    page,
    handlePage,
    foundCount,
    totalCount,
    totalPages,
    deleteLogType,
    selectDeleteLogType,
    removeDeleteLogType,
    isLogsDeleting,
  } = useLogManagement();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (roles) {
      setMounted(true);
    }
  }, [roles]);

  const LogTableColumnsModified = useMemo(() => {
    return LogTableColums.flatMap((column) => {
      if (type !== "audit" && column.label === "Actions") {
        return [];
      }

      let label = column.label;
      if (type === "user" && label === "Created At") label = "Login Time";
      if (type === "audit" && label === "Login Time") label = "Created At";

      return [{ ...column, label }];
    });
  }, [type]);

  if (!mounted)
    return (
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between">
          <Skeleton className="h-8 w-50" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-30" />
          </div>
        </div>
        <div>
          <div className="flex gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <TableSkeleton rowCount={limit} columnCount={11} />
          <div className="flex justify-between">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-20" />
          </div>
        </div>
      </div>
    );

  return (
    <div>
      <LogHeader
        type={type}
        handleType={handleType}
        search={search}
        handleSearch={handleSearch}
        role={role}
        handleRole={handleRole}
        roleItems={roles}
        clearFilters={clearFilters}
        openDeleteAllLogsModal={selectDeleteLogType}
      />
      {logsResponseLoading ? (
        <TableSkeleton rowCount={limit} columnCount={11} />
      ) : (
        <div className="my-2">
          <LogActionContextProvider
            openModal={selectDeleteId}
            closeModal={removeDeleteId}
            isDeleting={isLogDeleting}
            onDelete={deleteLog}
          >
            <TableComponent items={logs} headers={LogTableColumnsModified} />
            <LogDeleteModal deleteId={deleteId} />
            <LogsDeleteModal
              deleteLogType={deleteLogType}
              closeModal={removeDeleteLogType}
              onDelete={deleteAllLogs}
              isDeleting={isLogsDeleting}
            />
          </LogActionContextProvider>
        </div>
      )}

      {Boolean(foundCount) && (
        <PaginationFilter
          totalPages={totalPages}
          page={page}
          handlePage={handlePage}
          limit={limit}
          handleLimit={handleLimit}
          foundCount={foundCount}
          totalCount={totalCount}
        />
      )}

      {!logsResponseLoading && !foundCount && (
        <div className="flex h-[50dvh] flex-col items-center justify-center gap-2 p-5">
          <Logs size={80} className="text-muted-foreground" />
          <div className="shrink-0 text-sm">No Logs</div>
        </div>
      )}
    </div>
  );
}
