import Link from "next/link";

import { Edit, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCheckPermission } from "@/hooks/auth/use-check-permission";

import { useAdminActionContext } from "../_contexts/admin-action-context";

interface AdminTableActionProps {
  id: string;
}
export function AdminTableAction({ id }: AdminTableActionProps) {
  const { openModal } = useAdminActionContext();
  const hasDeletePermission = useCheckPermission("admin", "delete");
  const hasUpdatePermission = useCheckPermission("admin", "update");
  return (
    <div className="flex gap-2 capitalize">
      <Button variant="destructive" onClick={() => openModal(id)} disabled={!hasDeletePermission}>
        Delete <Trash />
      </Button>

      {hasUpdatePermission ? (
        <Button variant="outline" asChild>
          <Link href={`/dashboard/setting/admins/${id}`}>
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
