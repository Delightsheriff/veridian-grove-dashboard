import ConfirmDelete from "@/components/ui/confirm-delete";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface DeleteSuiteDialogProps {
  suite: {
    id: string;
    name: string;
  };
  onDelete?: (suiteId: string) => void;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export function DeleteSuiteDialog({
  suite,
  onDelete,
  open,
  setOpen,
}: DeleteSuiteDialogProps) {
  // If open/setOpen are provided, use them; otherwise, manage local state
  const [internalOpen, internalSetOpen] = useState(false);
  const isControlled = open !== undefined && setOpen !== undefined;
  const dialogOpen = isControlled ? open : internalOpen;
  const handleSetOpen = isControlled ? setOpen! : internalSetOpen;

  const handleDelete = () => {
    // Handle the actual deletion logic here
    if (onDelete) {
      onDelete(suite.id);
    }
    handleSetOpen(false);
  };

  return (
    <>
      {!isControlled && (
        <DropdownMenuItem
          onSelect={() => handleSetOpen(true)}
          className="text-red-600 dark:text-red-400"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete suite
        </DropdownMenuItem>
      )}
      <Dialog open={dialogOpen} onOpenChange={handleSetOpen}>
        <DialogContent>
          <ConfirmDelete
            resourceName={`suite "${suite.name}"`}
            onCancel={() => handleSetOpen(false)}
            onConfirm={handleDelete}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
