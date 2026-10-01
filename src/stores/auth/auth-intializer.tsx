"use client";

import { useEffect } from "react";

import { createPortal } from "react-dom";

import { Button } from "@/components/ui/button";
import { useAuthManagement } from "@/hooks/auth/use-auth-management";
import { useAuthStore } from "@/hooks/auth/use-auth-store";
import { useProfileManagement } from "@/hooks/auth/use-profile-management";
import { useSessionStore } from "@/hooks/auth/use-session-store";
import { useGetAllPermissionsQuery } from "@/queries/permission/use-get-all-permissions-query";
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

  useGetAllPermissionsQuery();

  useEffect(() => {
    if (!adminResponseLoading && admin) {
      setAdmin(admin);
    }
  }, [admin, adminResponseLoading, setAdmin]);

  if (!expired) return null;

  return createPortal(
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/10 p-4 supports-backdrop-filter:backdrop-blur-xs">
      <div className="w-full max-w-md overflow-hidden rounded-lg border border-white/10 bg-background shadow-2xl">
        <div className="flex flex-col gap-y-5 p-6">
          <div>
            <h2 className="font-medium text-base">Session Expired</h2>
            <p className="mt-2 text-muted-foreground text-sm">Please log in again.</p>
          </div>

          <Button style={{ marginTop: "15px" }} variant="outline" className="ml-auto w-fit" onClick={logoutAdmin}>
            OK
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
