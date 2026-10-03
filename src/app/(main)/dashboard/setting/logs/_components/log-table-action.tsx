import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCheckPermission } from "@/hooks/auth/use-check-permission";

import { useLogActionContext } from "../_contexts/log-action-context";

interface LogTableActionProps {
  id: string;
}
export function LogTableAction({ id }: LogTableActionProps) {
  const { openModal } = useLogActionContext();
  const hasDeletePermission = useCheckPermission("log", "delete");
  return (
    <div className="flex gap-2 capitalize">
      <Button variant="destructive" onClick={() => openModal(id)} disabled={!hasDeletePermission}>
        Delete <Trash />
      </Button>
    </div>
  );
}
