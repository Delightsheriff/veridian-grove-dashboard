import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ConfirmDeleteProps {
  resourceName?: string;
  description?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export default function ConfirmDelete({
  resourceName = "item",
  description,
  onCancel,
  onConfirm,
}: ConfirmDeleteProps) {
  const defaultDescription = `This action cannot be undone. This will permanently delete the ${resourceName} and remove its data from our servers.`;

  return (
    <>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          {description || defaultDescription}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={onConfirm}>
          Yes, delete
        </Button>
      </DialogFooter>
    </>
  );
}
