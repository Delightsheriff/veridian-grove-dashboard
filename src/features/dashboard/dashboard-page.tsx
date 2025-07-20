import DurationChart from "@/features/dashboard/duration-chart";
import SalesChart from "@/features/dashboard/sales-chart";
import StatCard from "@/features/dashboard/stat-card";
import TodayActivity from "@/features/dashboard/today-activity";
import {
  Briefcase,
  Wallet,
  CalendarCheck,
  LineChart,
  Loader2,
} from "lucide-react";
import { useBookings, useRecentStays } from "../bookings/useBookings";

export default function DashboardPage() {
  const { isPending, bookings, count } = useBookings();
  const { confirmedStays, isPending2, numDays } = useRecentStays();

  if (isPending || isPending2) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <div className="absolute inset-0 h-10 w-10 rounded-full border-2 border-muted animate-pulse"></div>
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm font-medium">Fetching Dashboard Data</p>
            <p className="text-xs text-muted-foreground">
              Please wait while we fetch your data
            </p>
          </div>
        </div>
      </div>
    );
  }
  const sales = bookings?.reduce((acc, cur) => acc + cur.total_amount, 0);
  const checkins = confirmedStays?.length;
  const occupation =
    confirmedStays?.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * count);
  console.log(occupation);
  console.log(checkins);
  return (
    <>
      {/* Dashboard Grid */}
      <div className="space-y-4">
        {/* Top Row (Stats) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Bookings"
            value={count.toLocaleString()}
            icon={Briefcase}
            iconColor="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
          />
          <StatCard
            title="Revenue"
            value={`$${sales?.toLocaleString()}`}
            icon={Wallet}
            iconColor="bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
          />
          <StatCard
            title="Check-ins Today"
            value={checkins?.toLocaleString()}
            icon={CalendarCheck}
            iconColor="bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-400"
          />
          <StatCard
            title="Occupancy Rate"
            value={occupation}
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
    </>
  );
}
