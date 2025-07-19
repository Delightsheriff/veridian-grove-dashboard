import DurationChart from "@/features/dashboard/duration-chart";
import SalesChart from "@/features/dashboard/sales-chart";
import StatCard from "@/features/dashboard/stat-card";
import TableOperations from "@/features/dashboard/TableOperations";
import TodayActivity from "@/features/dashboard/today-activity";
import { Briefcase, Wallet, CalendarCheck, LineChart } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <TableOperations />

      {/* Dashboard Grid */}
      <div className="space-y-4">
        {/* Top Row (Stats) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Bookings"
            value="1,234"
            change="+12.5% from last month"
            icon={Briefcase}
            iconColor="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
          />
          <StatCard
            title="Revenue"
            value="$45,231.89"
            change="+20.1% from last month"
            icon={Wallet}
            iconColor="bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
          />
          <StatCard
            title="Check-ins Today"
            value="23"
            change="+5 from yesterday"
            icon={CalendarCheck}
            iconColor="bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-400"
          />
          <StatCard
            title="Occupancy Rate"
            value="87.5%"
            change="+2.3% from last month"
            icon={LineChart}
            iconColor="bg-violet-100 text-violet-600 dark:bg-violet-900 dark:text-violet-400"
          />
        </div>

        {/* Second Row (Charts & Activity) */}
        <div className="grid  grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Today's Activity */}
          <div className="lg:col-span-1">
            <TodayActivity />
          </div>
          {/* Right Column - Duration Chart */}
          <div className="lg:col-span-2">
            <DurationChart />
          </div>
        </div>

        {/* Third Row (Sales Chart) */}
        <div>
          <SalesChart />
        </div>
      </div>
    </div>
  );
}
