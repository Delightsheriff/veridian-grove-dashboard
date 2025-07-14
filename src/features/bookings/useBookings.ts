import { ENV } from "@/lib/constants";
import { getBookings, type BookingsQueryParams } from "@/lib/services/Bookings";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
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
