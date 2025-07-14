"use client";

import ConfirmDelete from "@/components/ui/confirm-delete";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface DeleteBookingDialogProps {
  booking: {
    id: string;
    guest: {
      name: string;
    };
  };
  onDelete?: (bookingId: string) => void;
}

export function DeleteBookingDialog({
  booking,
  onDelete,
}: DeleteBookingDialogProps) {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    // Handle the actual deletion logic here
    if (onDelete) {
      onDelete(booking.id);
    }
    setOpen(false);
  };

  return (
    <>
      <DropdownMenuItem
        onSelect={() => setOpen(true)}
        className="text-red-600 dark:text-red-400"
      >
        <Trash2 className="mr-2 h-4 w-4" />
        Delete booking
      </DropdownMenuItem>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <ConfirmDelete
            resourceName={`booking for "${booking.guest.name}"`}
            onCancel={() => setOpen(false)}
            onConfirm={handleDelete}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
