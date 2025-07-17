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
