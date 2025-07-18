import { Badge } from "@/components/ui/badge";
import type { Bookings } from "@/interface/bookings";

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
type GetTodayOptions = { end?: boolean };

export const getToday = function (options: GetTodayOptions = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const getStatusBadge = (status: Bookings["status"]) => {
  switch (status) {
    case "unconfirmed":
      return (
        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800">
          Unconfirmed
        </Badge>
      );
    case "checked-in":
      return (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800">
          Checked In
        </Badge>
      );
    case "checked-out":
      return (
        <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700">
          Checked Out
        </Badge>
      );
  }
};
