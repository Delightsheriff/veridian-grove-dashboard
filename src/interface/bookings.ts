export interface Bookings {
  id: string;
  suiteName: string;
  guest: {
    name: string;
    email: string;
  };
  startDate: string;
  endDate: string;
  nights: number;
  status: "unconfirmed" | "checked-in" | "checked-out";
  totalAmount: number;
  extrasPrice?: number;
  hasBreakfast?: boolean;
  observations?: string;
  isPaid?: boolean;
}
