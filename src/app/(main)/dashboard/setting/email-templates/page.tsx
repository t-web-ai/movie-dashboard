"use client";

import { Mails } from "lucide-react";

import { useEmailTemplateManagement } from "@/hooks/email-template/use-email-template-management";

import { TableComponent } from "../../_components/table/table-component";
import TableSkeleton from "../../_components/table/table-skeleton";
import { EmailTemmplateHeader } from "./_components/email-template-header";
import { EmailTemplateTableColumns } from "./_components/email-template-table";

export default function Page() {
  const { emailTemplates, emailTemplatesResponseLoading } = useEmailTemplateManagement();
  return (
    <div>
      <EmailTemmplateHeader />
      {emailTemplatesResponseLoading ? (
        <TableSkeleton rowCount={4} columnCount={4} />
      ) : (
        <div className="my-2">
          <TableComponent items={emailTemplates} headers={EmailTemplateTableColumns} />
        </div>
      )}

      {!emailTemplatesResponseLoading && !emailTemplates?.length && (
        <div className="flex h-[50dvh] flex-col items-center justify-center gap-2 p-5">
          <Mails size={80} className="text-muted-foreground" />
          <div className="shrink-0 text-sm">No Email Templates</div>
        </div>
      )}
    </div>
  );
}
