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
// import { DeleteBookingDialog } from "./delete-booking-dialog";

interface BookingRowProps {
  booking: Bookings;
}

export default function BookingRow({ booking }: BookingRowProps) {
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
    <TableRow>
      {/* Suite Cell */}
      <TableCell>
        <div className="font-bold text-primary">{booking.suiteName}</div>
      </TableCell>

      {/* Guest Cell */}
      <TableCell>
        <div className="flex flex-col">
          <div className="font-bold">{booking.guest.name}</div>
          <div className="text-sm text-muted-foreground">
            {booking.guest.email}
          </div>
        </div>
      </TableCell>

      {/* Dates Cell */}
      <TableCell>
        <div className="flex flex-col">
          <span>In 3 days → {booking.nights} night stay</span>
          <span className="text-sm text-muted-foreground">
            {formatDate(booking.startDate)} — {formatDate(booking.endDate)}
          </span>
        </div>
      </TableCell>

      {/* Status Cell */}
      <TableCell>{getStatusBadge(booking.status)}</TableCell>

      {/* Amount Cell */}
      <TableCell>
        <div className="font-bold">{formatCurrency(booking.totalAmount)}</div>
      </TableCell>

      {/* Actions Cell */}
      <TableCell className="w-[80px]">
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
            {/* Conditional: Show only if status is unconfirmed */}
            <DropdownMenuItem>
              <LogIn className="mr-2 h-4 w-4" />
              Check in
            </DropdownMenuItem>
            {/* Conditional: Show only if status is checked-in */}
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              Check out
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DeleteBookingDialog booking={booking} onDelete={handleDelete} />
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
