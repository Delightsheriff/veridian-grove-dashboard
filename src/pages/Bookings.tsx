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
