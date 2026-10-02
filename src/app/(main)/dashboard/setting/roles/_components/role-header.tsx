import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCheckPermission } from "@/hooks/auth/use-check-permission";

import { Breadcrumb } from "../../../_components/header/breadcrumb";

interface RoleHeaderProps {
  openCreateRolePage: () => void;
}

export function RoleHeader({ openCreateRolePage }: RoleHeaderProps) {
  const hasCreatePermission = useCheckPermission("role", "create");
  return (
    <div className="flex flex-wrap items-center justify-between">
      <Breadcrumb items={["Setting"]} currentPage="Role Management" />
      <div className="flex gap-2">
        <Button onClick={openCreateRolePage} disabled={!hasCreatePermission}>
          Create New <Plus />
        </Button>
      </div>
    </div>
  );
}
