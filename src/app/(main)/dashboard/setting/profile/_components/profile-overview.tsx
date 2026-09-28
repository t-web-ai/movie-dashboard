"use client";

import { Check, X } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/hooks/auth/use-auth-store";
import { usePermissionManagement } from "@/hooks/permission/use-permission-management";

type MappedPermission = {
  _id: string;
  resource: string;
  action: string;
  match: boolean;
};

export function ProfileOverview() {
  const { admin } = useAuthStore();
  const { permissions } = usePermissionManagement();

  if (!admin || !permissions) return <ProfileOverviewSkeleton />;

  const adminPermissions = admin?.role?.permissions ?? [];
  const adminPermissionIds = new Set(adminPermissions.map((permission) => permission._id));

  const allPermissions: Partial<Record<string, MappedPermission[]>> = Object.groupBy(
    permissions.map(
      ({ _id, resource, action }): MappedPermission => ({
        _id,
        resource: resource.split("-").join(" "),
        action,
        match: adminPermissionIds.has(_id),
      }),
    ),
    (item) => item.resource,
  );

  const permissionResources = Object.keys(allPermissions);

  return (
    <div className="w-full space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {permissionResources.map((resource) => {
          const rawPermission = allPermissions[resource] ?? [];

          const permissions = [...rawPermission].sort((firstPermission, secondPermission) => {
            return firstPermission.action.localeCompare(secondPermission.action);
          });

          return (
            <div
              key={resource}
              className="flex flex-col justify-between rounded-xl border bg-card p-4 text-card-foreground shadow-xs transition-colors hover:border-muted-foreground/30"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="font-medium text-foreground/90 capitalize">{resource}</span>
                <span className="text-muted-foreground text-xs">
                  {permissions.filter((permission) => permission.match).length} / {permissions.length} active
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {permissions.map((permission) => (
                  <div
                    key={permission._id}
                    className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 font-medium text-xs transition-colors ${
                      permission.match
                        ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                        : "border border-transparent bg-muted/60 text-muted-foreground"
                    }`}
                  >
                    <span className="uppercase tracking-wider">{permission.action}</span>
                    {permission.match ? (
                      <Check className="size-3 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <X className="size-3 opacity-40" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProfileOverviewSkeleton() {
  return (
    <div className="w-full space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 6 }).map(() => (
          <div key={Math.random() * 1000} className="flex flex-col space-y-3 rounded-xl border bg-card p-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-4 w-12" />
            </div>

            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 4 }).map(() => (
                <Skeleton key={Math.random() * 1000} className="h-7 w-16 rounded-md" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
