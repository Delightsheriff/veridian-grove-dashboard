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
import { Calendar } from "lucide-react";
import { bookingsData } from "./bookings-data";
import BookingRow from "./BookingsRow";

export default function BookingsTable() {
  return (
    <>
      {bookingsData.length > 0 ? (
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
              {bookingsData.map((booking) => (
                <BookingRow key={booking.id} booking={booking} />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={6}>{/* <Pagination /> */}</TableCell>
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
