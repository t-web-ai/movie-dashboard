import Link from "next/link";

import { Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCheckPermission } from "@/hooks/auth/use-check-permission";

interface EmailTemplateTableActionProps {
  id: string;
}
export function EmailTemplateTableAction({ id }: EmailTemplateTableActionProps) {
  const hasUpdatePermission = useCheckPermission("email-template", "update");
  return (
    <div className="flex gap-2 capitalize">
      {hasUpdatePermission ? (
        <Button variant="outline" asChild>
          <Link href={`/dashboard/setting/email-templates/${id}`}>
            Edit <Edit />
          </Link>
        </Button>
      ) : (
        <Button variant="outline" disabled>
          Edit <Edit />
        </Button>
      )}
    </div>
  );
}
