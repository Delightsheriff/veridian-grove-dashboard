export interface Bookings {
  id: string;
  suite: {
    name: string;
    id: string;
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
  extras_price?: number;
  has_breakfast?: boolean;
  observations?: string;
  is_paid?: boolean;
}
