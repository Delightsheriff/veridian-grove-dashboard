import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Suite, SuiteFormValues } from "@/interface/suites";
import { MoreHorizontal, Copy, Trash2, Edit } from "lucide-react";
import { EditSuiteDialog } from "./suite-dialog";
import { DeleteSuiteDialog } from "./delete-suite-dialog";
import { useCreateEditSuite, useDeleteSuite } from "./useSuites";
import { useState } from "react";

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

  const { deleteSuite } = useDeleteSuite();
  const { createEditSuite, isPending: isUpdating } = useCreateEditSuite();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false); // NEW
  const [menuOpen, setMenuOpen] = useState(false);

  const handleEditSuite = (data: SuiteFormValues) => {
    createEditSuite({
      suiteData: data,
      id: suite.id,
    });
  };

  return (
    <TableRow className="min-w-0">
      {/* Image Cell - Hidden on small and medium screens */}
      <TableCell className="hidden lg:table-cell min-w-0 p-2">
        <img
          src={suite.images[0] || "/placeholder.svg"}
          alt={suite.name}
          className="w-12 h-12 object-cover rounded-md"
        />
      </TableCell>
      {/* Suite Name Cell */}
      <TableCell className="min-w-0 p-2 max-w-[320px] overflow-hidden">
        <div className="min-w-0">
          <div className="font-semibold truncate max-w-[120px] sm:max-w-[180px] md:max-w-[240px] lg:max-w-[320px] overflow-hidden text-ellipsis whitespace-nowrap">
            {suite.name}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px]">
            Max guests: {suite.max_guests}
          </div>
        </div>
      </TableCell>
      {/* Capacity Cell - Hidden on small and medium screens */}
      <TableCell className="hidden lg:table-cell min-w-0 p-2 max-w-[80px] overflow-hidden">
        <div className="font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[80px]">
          {suite.max_guests}
        </div>
      </TableCell>
      {/* Price Cell */}
      <TableCell className="min-w-0 p-2 max-w-[120px] overflow-hidden">
        <div className="font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]">
          {formatCurrency(suite.regular_price)}
        </div>
      </TableCell>
      {/* Discount Cell - Hidden on small and medium screens */}
      <TableCell className="hidden lg:table-cell min-w-0 p-2 max-w-[120px] overflow-hidden">
        {suite.discount === 0 ? (
          <span className="text-muted-foreground">—</span>
        ) : (
          <span className="text-green-600 dark:text-green-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]">
            {formatCurrency(suite.discount)}
          </span>
        )}
      </TableCell>
      {/* Status Cell */}
      <TableCell className="min-w-0 p-2 max-w-[120px] overflow-hidden">
        <Badge
          variant="outline"
          className={
            suite.is_available
              ? "border-green-200 text-green-700 bg-green-50 dark:border-green-800 dark:text-green-400 dark:bg-green-950 whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]"
              : "border-gray-200 text-gray-700 bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-900 whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]"
          }
        >
          {suite.is_available ? "Available" : "Booked"}
        </Badge>
      </TableCell>
      {/* Actions Cell */}
      <TableCell className="min-w-0 p-2 w-8 max-w-[48px] overflow-hidden">
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onSelect={() => {
                setEditDialogOpen(true);
                setMenuOpen(false);
              }}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit suite
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setMenuOpen(false)}>
              <Copy className="mr-2 h-4 w-4" />
              Duplicate suite
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600 dark:text-red-400"
              onSelect={() => {
                setDeleteDialogOpen(true);
                setMenuOpen(false);
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete suite
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Render the dialogs outside the dropdown so they stay mounted */}
        <EditSuiteDialog
          suite={suite}
          onSubmit={handleEditSuite}
          isLoading={isUpdating}
          open={editDialogOpen}
          setOpen={setEditDialogOpen}
        />
        <DeleteSuiteDialog
          suite={{ id: suite.id, name: suite.name }}
          onDelete={deleteSuite}
          open={deleteDialogOpen}
          setOpen={setDeleteDialogOpen}
        />
      </TableCell>
    </TableRow>
  );
}
