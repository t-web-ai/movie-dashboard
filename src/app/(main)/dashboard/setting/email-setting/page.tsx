"use client";

import { useEffect, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { useEmailSettingManagement } from "@/hooks/email-setting/use-email-setting-management";

import { EmailSettingHeader } from "./_components/email-setting-header";
import { EmailSettingUpdateForm } from "./_components/email-setting-update-form";

export default function Page() {
  const { updateEmailSetting, emailSettingUpdateForm, isUpdating, emailSetting, emailSettingResponseLoading } =
    useEmailSettingManagement();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (emailSetting && !emailSettingResponseLoading) {
      setMounted(true);
    }
  }, [emailSetting, emailSettingResponseLoading]);

  if (!mounted) return <EmailSettingSkelegon />;

  return (
    <div className="flex flex-col gap-4">
      <EmailSettingHeader />
      <EmailSettingUpdateForm onSubmit={updateEmailSetting} form={emailSettingUpdateForm} isSubmitting={isUpdating} />
    </div>
  );
}

function EmailSettingSkelegon() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Skeleton className="h-7 w-30" />
        <Skeleton className="h-7 w-30" />
      </div>
      <div className="w-full space-y-6">
        <div className="space-y-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-y-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-10" />
            </div>
            <div className="flex flex-col gap-y-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-10" />
            </div>
            <div className="flex flex-col gap-y-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-10" />
            </div>
            <div className="flex flex-col gap-y-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-10" />
            </div>
            <div className="mt-4">
              <Skeleton className="h-6 w-45" />
            </div>
          </div>

          <div className="flex justify-end">
            <Skeleton className="h-10 min-w-40" />
          </div>
        </div>
      </div>
    </div>
  );
}
