import type { Bookings } from "@/interface/bookings";
import supabase from "./supabase";

export interface BookingsQueryParams {
  page?: number;
  pageSize?: number;
  filter?: "all" | "unconfirmed" | "checked-in" | "checked-out";
  sort?:
    | "start-date-recent"
    | "start-date-earliest"
    | "amount-high-low"
    | "amount-low-high";
}

// Fetch bookings
export async function getBookings(params: BookingsQueryParams = {}) {
  const {
    page = 1,
    pageSize = 10,
    filter = "all",
    sort = "start-date-recent",
  } = params;

  let query = supabase.from("bookings").select(
    `
      id,
      created_at,
      start_date,
      end_date,
      nights,
      status,
      total_amount,
      guest,
      suites (
        name
      )
    `,
    { count: "exact" }
  );

  // Apply filtering
  if (filter !== "all") {
    query = query.eq("status", filter);
  }

  // Apply sorting
  switch (sort) {
    case "start-date-recent":
      query = query.order("start_date", { ascending: false });
      break;
    case "start-date-earliest":
      query = query.order("start_date", { ascending: true });
      break;
    case "amount-high-low":
      query = query.order("total_amount", { ascending: false });
      break;
    case "amount-low-high":
      query = query.order("total_amount", { ascending: true });
      break;
  }

  // Apply pagination
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  query = query.range(from, to);

  const { data: bookings, count, error } = await query;

  if (error) {
    console.error("Error fetching bookings:", error);
    throw new Error("Failed to fetch bookings");
  }

  return {
    bookings: bookings || [],
    count: count || 0,
    totalPages: Math.ceil((count || 0) / pageSize),
    currentPage: page,
  };
}

// Delete booking
export async function deleteBookingApi(id: number) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}

// Update booking
export async function updateBooking(id: number, obj: Partial<Bookings>) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}
