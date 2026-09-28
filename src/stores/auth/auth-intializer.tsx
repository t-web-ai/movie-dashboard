"use client";

import { useEffect } from "react";

import { createPortal } from "react-dom";

import { Button } from "@/components/ui/button";
import { useAuthManagement } from "@/hooks/auth/use-auth-management";
import { useAuthStore } from "@/hooks/auth/use-auth-store";
import { useProfileManagement } from "@/hooks/auth/use-profile-management";
import { useSessionStore } from "@/hooks/auth/use-session-store";
import { useGetRoleQuery } from "@/queries/role/use-get-role-query";
export function AuthInitializer() {
  const { logoutAdmin } = useAuthManagement();

  const { expired, showExpiredModal } = useSessionStore();

  useEffect(() => {
    window.addEventListener("session-expired", showExpiredModal);
    return () => {
      window.removeEventListener("session-expired", showExpiredModal);
    };
  }, [showExpiredModal]);

  const { setAdmin } = useAuthStore();
  const { admin, adminResponseLoading } = useProfileManagement();

  useGetRoleQuery(admin?.role?._id);

  useEffect(() => {
    if (!adminResponseLoading && admin) {
      setAdmin(admin);
    }
  }, [admin, adminResponseLoading, setAdmin]);

  if (!expired) return null;

  return createPortal(
    <div style={{ zIndex: 100 }} className="fixed inset-0 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-lg border border-white/10 bg-background shadow-2xl">
        <div className="flex flex-col gap-y-5 p-6">
          <div>
            <h2 className="font-semibold text-xl tracking-tight">Session Expired</h2>

            <p className="mt-2 text-muted-foreground text-sm">Please log in again</p>
          </div>

          <Button variant="default" className="ml-auto w-fit" onClick={logoutAdmin}>
            OK
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
