import EmptyResource from "@/components/ui/empty-resource";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import { BedDouble } from "lucide-react";
import SuiteTableRow from "./SuitesTableRow";
import type { Suite } from "@/interface/suites";

export default function SuitesTable() {
  const suites: Suite[] = []; // This should be replaced with actual data fetching logic
  return (
    <>
      {suites.length > 0 ? (
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
              {suites.map((suite) => (
                <SuiteTableRow key={suite.id} suite={suite} />
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="rounded-md border">
          <EmptyResource
            resourceName="suites"
            icon={BedDouble}
            description="There are currently no suites to display. Create your first suite to get started!"
          />
        </div>
      )}
    </>
  );
}
