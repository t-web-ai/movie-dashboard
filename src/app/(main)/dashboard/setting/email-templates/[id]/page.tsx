"use client";

import { useParams, useRouter } from "next/navigation";

import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useEmailTemplateManagement } from "@/hooks/email-template/use-email-template-management";

import { Breadcrumb } from "../../../_components/header/breadcrumb";
import { EmailTemplateUpdateForm } from "./_components/email-template-update-form";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { updateEmailTemplate, emailTemplateUpdateForm } = useEmailTemplateManagement();

  return (
    <div className="mx-auto flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-y-4">
        <Button
          variant={"outline"}
          onClick={() => router.push("/dashboard/setting/email-templates")}
          className="flex gap-2 text-blue-500"
        >
          <ChevronLeft />
          <div>Back</div>
        </Button>
        <Breadcrumb items={["Email Template Management"]} currentPage="Edit" />
      </div>
      <div>
        <EmailTemplateUpdateForm onSubmit={updateEmailTemplate} id={id} form={emailTemplateUpdateForm} />
      </div>
    </div>
  );
}
