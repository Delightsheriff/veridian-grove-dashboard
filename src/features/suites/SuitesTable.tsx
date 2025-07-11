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
import { suitesData } from "../suites-data";
import { useSearchParams } from "react-router";

export default function SuitesTable() {
  const suites: Suite[] = suitesData; // This should be replaced with actual data fetching logic
  const [searchParams] = useSearchParams();

  const filter = searchParams.get("filter") || "all";
  const sort = searchParams.get("sort") || "name-asc";

  // Filter logic
  let filteredSuites = suites;
  if (filter === "with-discount") {
    filteredSuites = suites.filter((suite) => suite.discount > 0);
  } else if (filter === "no-discount") {
    filteredSuites = suites.filter((suite) => suite.discount === 0);
  } else if (filter === "available") {
    filteredSuites = suites.filter((suite) => suite.is_available);
  }

  // Sort logic
  const sortedSuites = [...filteredSuites];
  switch (sort) {
    case "name-asc":
      sortedSuites.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      sortedSuites.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "price-asc":
      sortedSuites.sort((a, b) => a.regular_price - b.regular_price);
      break;
    case "price-desc":
      sortedSuites.sort((a, b) => b.regular_price - a.regular_price);
      break;
    case "capacity-asc":
      sortedSuites.sort((a, b) => a.max_guests - b.max_guests);
      break;
    case "capacity-desc":
      sortedSuites.sort((a, b) => b.max_guests - a.max_guests);
      break;
    default:
      break;
  }

  return (
    <>
      {sortedSuites.length > 0 ? (
        <div className="rounded-md border overflow-x-auto w-full">
          <Table className="min-w-full">
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
              {sortedSuites.map((suite) => (
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
