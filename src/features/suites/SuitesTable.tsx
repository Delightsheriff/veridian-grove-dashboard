import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/components/ui/table";

export default function SuitesTable() {
  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>IMAGE</TableHead>
              <TableHead>SUITE NAME</TableHead>
              <TableHead>CAPACITY</TableHead>
              <TableHead>PRICE</TableHead>
              <TableHead>DISCOUNT</TableHead>
              <TableHead>AVAILABILITY</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* SuiteRow components will be rendered here */}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
