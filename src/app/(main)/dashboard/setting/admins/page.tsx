"use client";
import { useEffect, useState } from "react";

import { Users } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { useAdminManagement } from "@/hooks/admin/use-admin-management";

import { PaginationFilter } from "../../_components/pagination/pagination-filter";
import { TableComponent } from "../../_components/table/table-component";
import TableSkeleton from "../../_components/table/table-skeleton";
import { AdminDeleteModal } from "./_components/admin-delete-modal";
import { AdminHeader } from "./_components/admin-header";
import { AdminTableColumns } from "./_components/admin-table";
import { AdminActionContextProvider } from "./_contexts/admin-action-context";

export default function Page() {
  const {
    admins,
    adminsResponseLoading,
    status,
    limit,
    totalCount,
    foundCount,
    totalPages,
    page,
    search,
    role,
    roles,
    createdAfter,
    createdBefore,
    deleteId,
    isDeleting,
    handlePage,
    handleStatus,
    handleSearch,
    handleLimit,
    handleRole,
    clearFilters,
    handleDate,
    selectDeleteId,
    removeDeleteId,
    deleteAdmin,
    openCreateAdminPage,
  } = useAdminManagement();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (roles) {
      setMounted(true);
    }
  }, [roles]);

  if (!mounted)
    return (
      <div>
        <div className="my-2">
          <Skeleton className="h-8 w-28" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <TableSkeleton rowCount={limit} columnCount={5} />
        <div className="flex justify-between">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>
    );

  return (
    <div>
      <AdminHeader
        status={status}
        handleStatus={handleStatus}
        handleSearch={handleSearch}
        search={search}
        role={role}
        roleItems={roles}
        handleRole={handleRole}
        clearFilters={clearFilters}
        createdAfter={createdAfter}
        createdBefore={createdBefore}
        handleDate={handleDate}
        openCreateAdminPage={openCreateAdminPage}
      />
      {adminsResponseLoading ? (
        <TableSkeleton rowCount={limit} columnCount={5} />
      ) : (
        <div className="my-2">
          <AdminActionContextProvider
            openModal={selectDeleteId}
            closeModal={removeDeleteId}
            isDeleting={isDeleting}
            onDelete={deleteAdmin}
          >
            <TableComponent items={admins} headers={AdminTableColumns} />
            <AdminDeleteModal deleteId={deleteId} />
          </AdminActionContextProvider>
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

      {!adminsResponseLoading && !foundCount && (
        <div className="flex h-[50dvh] flex-col items-center justify-center gap-2 p-5">
          <Users size={80} className="text-muted-foreground" />
          <div className="shrink-0 text-sm">No Admins</div>
        </div>
      )}
    </div>
  );
}
