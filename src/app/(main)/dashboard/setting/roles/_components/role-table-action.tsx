import Link from "next/link";

import { Edit, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCheckPermission } from "@/hooks/auth/use-check-permission";

import { useRoleActionContext } from "../_contexts/role-action-context";

interface RoleTableActionProps {
  id: string;
  type: "custom" | "system";
}
export function RoleTableAction({ id, type }: RoleTableActionProps) {
  const { openModal } = useRoleActionContext();
  const hasDeletePermission = useCheckPermission("role", "delete");
  const hasUpdatePermission = useCheckPermission("role", "update");
  const isSystemRole = type === "system";
  return (
    <div className="flex gap-2 capitalize">
      <Button variant="destructive" onClick={() => openModal(id)} disabled={!hasDeletePermission || isSystemRole}>
        Delete <Trash />
      </Button>

      {hasUpdatePermission ? (
        <Button variant="outline" asChild>
          <Link href={`/dashboard/setting/roles/${id}`}>
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
