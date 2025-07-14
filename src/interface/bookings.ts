export interface Bookings {
  id: string;
  suites: {
    name: string;
  };
  guest: {
    name: string;
    email: string;
  };
  start_date: string;
  end_date: string;
  nights: number;
  status: "unconfirmed" | "checked-in" | "checked-out";
  total_amount: number;
  created_at: string;
}
