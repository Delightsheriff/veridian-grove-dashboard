import { Card } from "@/components/ui/card";
import EmptyResource from "@/components/ui/empty-resource";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Calendar, Loader2 } from "lucide-react";
import Pagination from "@/components/ui/pagination";
import { useBookings } from "./useBookings";
import BookingRow from "./BookingsRow";

export default function BookingsTable() {
  const { isPending, bookings, count } = useBookings();

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <div className="absolute inset-0 h-10 w-10 rounded-full border-2 border-muted animate-pulse"></div>
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm font-medium">Loading Bookings...</p>
            <p className="text-xs text-muted-foreground">
              Please wait while we fetch your data
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      {bookings?.length > 0 ? (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Suite</TableHead>
                <TableHead>Guest</TableHead>
                <TableHead className="hidden md:table-cell">Dates</TableHead>
                <TableHead className="hidden lg:table-cell">Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <BookingRow key={booking.id} booking={booking} />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={6}>
                  <Pagination count={count} />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Card>
      ) : (
        <Card>
          <EmptyResource
            resourceName="bookings"
            icon={Calendar}
            description="There are currently no bookings to display. New bookings will appear here once guests make reservations!"
          />
        </Card>
      )}
    </>
  );
}
