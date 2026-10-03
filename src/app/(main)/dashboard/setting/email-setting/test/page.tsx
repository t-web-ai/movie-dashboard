"use client";

import { useRouter } from "next/navigation";

import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useEmailSettingManagement } from "@/hooks/email-setting/use-email-setting-management";

import { Breadcrumb } from "../../../_components/header/breadcrumb";
import { TestEmailSettingForm } from "./_components/test-email-setting-form";

export default function Page() {
  const router = useRouter();
  const { emailSettingTestForm, isTesting, testEmailSetting } = useEmailSettingManagement();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-y-4">
        <Button
          variant={"outline"}
          onClick={() => router.push("/dashboard/setting/email-setting")}
          className="flex gap-2 text-blue-500"
        >
          <ChevronLeft />
          <div>Back</div>
        </Button>
        <Breadcrumb items={["Email Setting"]} currentPage={"Test"} />
      </div>
      <div>
        <TestEmailSettingForm onSubmit={testEmailSetting} form={emailSettingTestForm} isSubmitting={isTesting} />
      </div>
    </div>
  );
}
