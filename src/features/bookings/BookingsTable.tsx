import { Card } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

export default function BookingsTable() {
  return (
    <>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Suite</TableHead>
              <TableHead>Guest</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {bookingsData.map((booking) => (
              <BookingRow key={booking.id} booking={booking} />
            ))} */}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6}>{/* <Pagination /> */}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Card>
    </>
  );
}
