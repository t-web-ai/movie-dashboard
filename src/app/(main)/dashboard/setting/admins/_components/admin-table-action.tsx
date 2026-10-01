import Link from "next/link";

import { Edit, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useAdminActionContext } from "../_contexts/admin-action-context";

interface AdminTableActionProps {
  id: string;
}
export function AdminTableAction({ id }: AdminTableActionProps) {
  const { openModal } = useAdminActionContext();
  return (
    <div className="flex gap-2 capitalize">
      <Button variant="destructive" onClick={() => openModal(id)}>
        Delete <Trash />
      </Button>

      <Button variant="outline" asChild>
        <Link href={`/dashboard/setting/admins/${id}`}>
          Edit <Edit />
        </Link>
      </Button>
    </div>
  );
}
