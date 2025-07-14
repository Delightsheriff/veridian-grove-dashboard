import BookingsTable from "@/features/bookings/BookingsTable";
import TableOperations from "@/features/bookings/TableOperations";

export default function Bookings() {
  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">All Bookings</h1>
        </div>

        {/* Table Operations Bar */}
        <TableOperations />

        {/* Table Container */}
        <BookingsTable />
      </div>
    </>
  );
}

// import { Card } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import BookingRow from "./booking-row"
// import Pagination from "./pagination"
// import { bookingsData } from "./bookings-data"

// export default function BookingsPage() {
//   return (
//     <div className="space-y-6">
//       {/* Page Header */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold">All Bookings</h1>
//       </div>

//       {/* Table Operations Bar */}
//       <div className="flex items-center gap-4">
//         {/* Filter by Status */}
//         <Select>
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Filter by status..." />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All</SelectItem>
//             <SelectItem value="unconfirmed">Unconfirmed</SelectItem>
//             <SelectItem value="checked-in">Checked-in</SelectItem>
//             <SelectItem value="checked-out">Checked-out</SelectItem>
//           </SelectContent>
//         </Select>

//         {/* Sort by */}
//         <Select>
//           <SelectTrigger className="w-[220px]">
//             <SelectValue placeholder="Sort by..." />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="start-date-recent">Start date (recent first)</SelectItem>
//             <SelectItem value="start-date-earliest">Start date (earliest first)</SelectItem>
//             <SelectItem value="amount-high-low">Amount (high to low)</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Table Area */}
//       <Card>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Suite</TableHead>
//               <TableHead>Guest</TableHead>
//               <TableHead>Dates</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Amount</TableHead>
//               <TableHead className="w-[80px]"></TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {bookingsData.map((booking) => (
//               <BookingRow key={booking.id} booking={booking} />
//             ))}
//           </TableBody>
//           <TableFooter>
//             <TableRow>
//               <TableCell colSpan={6}>
//                 <Pagination />
//               </TableCell>
//             </TableRow>
//           </TableFooter>
//         </Table>
//       </Card>
//     </div>
//   )
// }
