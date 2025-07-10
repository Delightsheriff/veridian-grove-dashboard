import { Button } from "@/components/ui/button";
import SuitesTable from "@/features/suites/SuitesTable";

import TableOperations from "@/features/suites/TableOperations";
import { Plus } from "lucide-react";

export default function Suites() {
  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">All Suites</h1>
          <Button className="bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add new suite
          </Button>
        </div>

        {/* Table Operations Bar */}
        <TableOperations />

        {/* Table Container */}
        <SuitesTable />
      </div>
    </>
  );
}
