import { CreateSuiteDialog } from "@/features/suites/suite-dialog";
import SuitesTable from "@/features/suites/SuitesTable";

import TableOperations from "@/features/suites/TableOperations";

export default function Suites() {
  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">All Suites</h1>
          <CreateSuiteDialog />
        </div>

        {/* Table Operations Bar */}
        <TableOperations />

        {/* Table Container */}
        <SuitesTable />
      </div>
    </>
  );
}
