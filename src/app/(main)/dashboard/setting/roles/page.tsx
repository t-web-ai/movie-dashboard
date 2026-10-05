"use client";

import { useEffect, useState } from "react";

import { UserCog } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { useRoleManagment } from "@/hooks/role/use-role-management";

import { TableComponent } from "../../_components/table/table-component";
import TableSkeleton from "../../_components/table/table-skeleton";
import { RoleDeleteModal } from "./_components/role-delete-modal";
import { RoleHeader } from "./_components/role-header";
import { RoleTableColumns } from "./_components/role-table";
import { RoleActionContextProvider } from "./_contexts/role-action-context";

export default function Page() {
  const {
    roles,
    rolesResponseLoading,
    deleteId,
    isDeleting,
    openCreateRolePage,
    selectDeleteId,
    removeDeleteId,
    deleteRole,
  } = useRoleManagment();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (roles) {
      setMounted(true);
    }
  }, [roles]);

  if (!mounted)
    return (
      <div>
        <div className="flex flex-wrap items-center justify-between">
          <Skeleton className="h-8 w-50" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-30" />
          </div>
        </div>
        <TableSkeleton rowCount={10} columnCount={5} />
      </div>
    );
  return (
    <div>
      <RoleHeader openCreateRolePage={openCreateRolePage} />
      {rolesResponseLoading ? (
        <TableSkeleton rowCount={10} columnCount={5} />
      ) : (
        <div className="my-2">
          <RoleActionContextProvider
            openModal={selectDeleteId}
            closeModal={removeDeleteId}
            isDeleting={isDeleting}
            onDelete={deleteRole}
          >
            <TableComponent items={roles} headers={RoleTableColumns} />
            <RoleDeleteModal deleteId={deleteId} />
          </RoleActionContextProvider>
        </div>
      )}
      {!roles?.length && (
        <div className="flex h-[50dvh] flex-col items-center justify-center gap-2 p-5">
          <UserCog size={80} className="text-muted-foreground" />
          <div className="shrink-0 text-sm">Not Found</div>
        </div>
      )}
    </div>
  );
}
