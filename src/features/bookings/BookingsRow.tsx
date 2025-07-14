import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { MoreHorizontal, Eye, LogIn, LogOut } from "lucide-react";
import { DeleteBookingDialog } from "./delete-booking-dialog";
import type { Bookings } from "@/interface/bookings";
import { useState } from "react";

interface BookingRowProps {
  booking: Bookings;
}

export default function BookingRow({ booking }: BookingRowProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusBadge = (status: Bookings["status"]) => {
    switch (status) {
      case "unconfirmed":
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800">
            Unconfirmed
          </Badge>
        );
      case "checked-in":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800">
            Checked In
          </Badge>
        );
      case "checked-out":
        return (
          <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700">
            Checked Out
          </Badge>
        );
    }
  };

  const handleDelete = (bookingId: string) => {
    // Handle booking deletion logic here
    console.log("Deleting booking:", bookingId);
  };

  return (
    <TableRow className="min-w-0">
      {/* Suite Cell */}
      <TableCell className="min-w-0 p-2 max-w-[200px] overflow-hidden">
        <div className="font-bold text-primary truncate max-w-[120px] sm:max-w-[160px] md:max-w-[180px] lg:max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
          {booking.suiteName}
        </div>
      </TableCell>

      {/* Guest Cell */}
      <TableCell className="min-w-0 p-2 max-w-[250px] overflow-hidden">
        <div className="flex flex-col min-w-0">
          <div className="font-bold truncate max-w-[140px] sm:max-w-[180px] md:max-w-[220px] lg:max-w-[250px] overflow-hidden text-ellipsis whitespace-nowrap">
            {booking.guest.name}
          </div>
          <div className="text-sm text-muted-foreground truncate max-w-[140px] sm:max-w-[180px] md:max-w-[220px] lg:max-w-[250px] overflow-hidden text-ellipsis whitespace-nowrap">
            {booking.guest.email}
          </div>
        </div>
      </TableCell>

      {/* Dates Cell - Hidden on small screens */}
      <TableCell className="hidden md:table-cell min-w-0 p-2 max-w-[200px] overflow-hidden">
        <div className="flex flex-col min-w-0">
          <span className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
            In 3 days → {booking.nights} night stay
          </span>
          <span className="text-sm text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
            {formatDate(booking.startDate)} — {formatDate(booking.endDate)}
          </span>
        </div>
      </TableCell>

      {/* Status Cell - Hidden on small screens */}
      <TableCell className="hidden lg:table-cell min-w-0 p-2 max-w-[120px] overflow-hidden">
        <div className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]">
          {getStatusBadge(booking.status)}
        </div>
      </TableCell>

      {/* Amount Cell */}
      <TableCell className="min-w-0 p-2 max-w-[120px] overflow-hidden">
        <div className="font-bold whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]">
          {formatCurrency(booking.totalAmount)}
        </div>
      </TableCell>

      {/* Actions Cell */}
      <TableCell className="min-w-0 p-2 w-8 max-w-[48px] overflow-hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              See details
            </DropdownMenuItem>
            {/* Show Check in only if status is unconfirmed */}
            {booking.status === "unconfirmed" && (
              <DropdownMenuItem>
                <LogIn className="mr-2 h-4 w-4" />
                Check in
              </DropdownMenuItem>
            )}
            {/* Show Check out only if status is checked-in */}
            {booking.status === "checked-in" && (
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Check out
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onSelect={() => setDeleteDialogOpen(true)}
            >
              Delete booking
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DeleteBookingDialog
          booking={booking}
          onDelete={handleDelete}
          open={deleteDialogOpen}
          setOpen={setDeleteDialogOpen}
        />
      </TableCell>
    </TableRow>
  );
}
