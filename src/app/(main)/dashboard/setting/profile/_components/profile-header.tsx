"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/hooks/auth/use-auth-store";
import { getInitials } from "@/lib/utils";

export function ProfileHeader() {
  const { admin } = useAuthStore();

  if (!admin) return <ProfileHeaderSkeleton />;

  return (
    <div className="flex flex-col gap-5 px-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="flex min-w-0 items-center gap-4">
        <div className="grid size-18 shrink-0 place-items-center sm:size-23">
          <Avatar className="col-start-1 row-start-1 size-16 shadow after:border-0 sm:size-20">
            <AvatarFallback>{getInitials(admin?.name)}</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex flex-col gap-0.5">
            <h1 className="truncate font-heading font-semibold text-xl leading-6 tracking-tight sm:text-2xl sm:leading-7">
              {admin.name}
            </h1>
            <p className="truncate text-muted-foreground text-sm leading-5">
              {admin.email} · {admin.role.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileHeaderSkeleton() {
  return (
    <div className="flex flex-col gap-5 px-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="flex min-w-0 items-center gap-4">
        <div className="grid size-18 shrink-0 place-items-center sm:size-23">
          <Skeleton className="col-start-1 row-start-1 size-16 rounded-full sm:size-20" />
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-6 w-40 sm:h-7 sm:w-52" />
            <Skeleton className="h-5 w-56 sm:w-64" />
          </div>
        </div>
      </div>
    </div>
  );
}
