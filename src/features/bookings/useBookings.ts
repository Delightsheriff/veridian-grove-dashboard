import { ENV } from "@/lib/constants";
import {
  deleteBookingApi,
  getBookings,
  getBookingsAfterDate,
  getStaysAfterDate,
  getStaysTodayActivity,
  type BookingsQueryParams,
} from "@/lib/services/Bookings";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { toast } from "sonner";
import { subDays } from "date-fns";

export function useBookings() {
  const [searchParams] = useSearchParams();

  // Extract query parameters from URL
  const queryParams: BookingsQueryParams = {
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    pageSize: ENV.PAGE_SIZE, // You can make this configurable
    filter:
      (searchParams.get("filter") as BookingsQueryParams["filter"]) || "all",
    sort:
      (searchParams.get("sort") as BookingsQueryParams["sort"]) ||
      "start-date-recent",
  };

  const {
    data,
    isLoading: isPending,
    error,
    isError,
  } = useQuery({
    queryKey: ["bookings", queryParams],
    queryFn: () => getBookings(queryParams),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });

  return {
    bookings: data?.bookings || [],
    count: data?.count || 0,
    totalPages: data?.totalPages || 0,
    currentPage: data?.currentPage || 1,
    isPending,
    error,
    isError,
  };
}

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: (id: number) => deleteBookingApi(id),
    onSuccess: () => {
      toast.success("Booking deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (error) => {
      console.error("Error deleting booking:", error);
      toast.error("Booking could not be deleted");
    },
  });
  return {
    isDeleting,
    deleteBooking,
  };
}

// This hook fetches recent bookings based on the number of days specified in the URL search parameters.
export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDays}`],
  });

  return { isLoading, bookings };
}

// This hook fetches recent stays based on the number of days specified in the URL search parameters.
export function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isPending2, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`],
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { isPending2, stays, confirmedStays, numDays };
}

// This hook fetches today's activity for stays, which includes both checked-in and checked-out stays.
export function useTodayActivity() {
  const { isPending, data: activities } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"],
  });

  return { isPending, activities };
}
