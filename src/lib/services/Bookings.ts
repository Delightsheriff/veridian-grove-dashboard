import type { Bookings } from "@/interface/bookings";
import supabase from "./supabase";
import { getToday } from "../helpers";

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

export async function getBooking(id: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
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
export async function updateBooking(id: string, obj: Partial<Bookings>) {
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

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
//date is an ISO string
export async function getBookingsAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}
