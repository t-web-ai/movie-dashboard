import { createPortal } from "react-dom";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { useRoleActionContext } from "../_contexts/role-action-context";

interface DeleteModalProps {
  deleteId?: string;
}

export function RoleDeleteModal({ deleteId }: DeleteModalProps) {
  const { closeModal, onDelete, isDeleting } = useRoleActionContext();
  return (
    deleteId &&
    createPortal(
      <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/10 p-4 supports-backdrop-filter:backdrop-blur-xs">
        <div className="w-full max-w-md overflow-hidden rounded-lg border border-white/10 bg-background shadow-2xl">
          <div className="flex flex-col gap-y-5 p-6">
            <div>
              <h2 className="font-medium text-base">Are you sure you want to delete this?</h2>

              <p className="mt-2 text-muted-foreground text-sm">This action cannot be undone.</p>
            </div>
            <div className="mt-3.75 flex justify-between gap-2">
              <Button variant="outline" className="w-fit" onClick={closeModal} disabled={isDeleting}>
                Cancel
              </Button>
              <Button variant="destructive" className="w-20" onClick={onDelete} disabled={isDeleting}>
                {isDeleting ? <Spinner /> : "Confirm"}
              </Button>
            </div>
          </div>
        </div>
      </div>,
      document.body,
    )
  );
}
