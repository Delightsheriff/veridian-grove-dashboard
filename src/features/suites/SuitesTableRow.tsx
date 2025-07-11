import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Suite } from "@/interface/suites";
import { MoreHorizontal, Copy, Trash2 } from "lucide-react";
import { EditSuiteDialog } from "./suite-dialog";

interface SuiteTableRowProps {
  suite: Suite;
}

export default function SuiteTableRow({ suite }: SuiteTableRowProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <TableRow>
      {/* Image Cell */}
      <TableCell>
        <img
          src={suite.images[0] || "/placeholder.svg"}
          alt={suite.name}
          className="w-16 h-16 object-cover rounded-md"
        />
      </TableCell>

      {/* Suite Cell */}
      <TableCell>
        <div>
          <div className="font-bold">{suite.name}</div>
          <div className="text-sm text-muted-foreground">
            Max guests: {suite.max_guests}
          </div>
        </div>
      </TableCell>

      {/* Capacity Cell */}
      <TableCell>
        <div className="font-medium">{suite.max_guests}</div>
      </TableCell>

      {/* Price Cell */}
      <TableCell>
        <div className="font-medium">{formatCurrency(suite.regular_price)}</div>
      </TableCell>

      {/* Discount Cell */}
      <TableCell>
        {suite.discount === 0 ? (
          <span className="text-muted-foreground">—</span>
        ) : (
          <span className="text-green-600 dark:text-green-400 font-medium">
            {formatCurrency(suite.discount)}
          </span>
        )}
      </TableCell>

      {/* Status Cell */}
      <TableCell>
        <Badge
          variant="outline"
          className={
            suite.is_available
              ? "border-green-200 text-green-700 bg-green-50 dark:border-green-800 dark:text-green-400 dark:bg-green-950"
              : "border-gray-200 text-gray-700 bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-900"
          }
        >
          {suite.is_available ? "Available" : "Booked"}
        </Badge>
      </TableCell>

      {/* Actions Cell */}
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <EditSuiteDialog
                suite={suite}
                onSubmit={(data) => {
                  console.log("Edited suite:", data);
                }}
              />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy className="mr-2 h-4 w-4" />
              Duplicate suite
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600 dark:text-red-400">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete suite
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
