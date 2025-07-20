import DashboardPage from "@/features/dashboard/dashboard-page";
import TableOperations from "@/features/dashboard/TableOperations";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <TableOperations />

      <DashboardPage />
    </div>
  );
}
