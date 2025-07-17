import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, getStatusBadge } from "@/lib/helpers";
import {
  BedDouble,
  User,
  DollarSign,
  MessageSquare,
  LogIn,
  Trash2,
  MoveLeft,
} from "lucide-react";

// Mock booking data - in real app this would come from props or API
const mockBooking = {
  id: "34FGE",
  status: "unconfirmed" as const,
  suite: "The Royal Penthouse",
  duration: 7,
  startDate: "August 12, 2024",
  endDate: "August 19, 2024",
  guest: {
    name: "Eleanor Vance",
    email: "eleanor@example.com",
    adults: 4,
    children: 1,
  },
  payment: {
    totalPrice: 2450.0,
    status: "paid" as const,
  },
  observations:
    "Guest has requested a late check-in and is celebrating an anniversary.",
};

export default function BookingDetails() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Booking #{mockBooking.id}</h1>
          {getStatusBadge(mockBooking.status)}
        </div>
        <div className="flex gap-2">
          <Button className="bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 text-white">
            <LogIn className="mr-2 h-4 w-4" />
            Check in
          </Button>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Booking
          </Button>
        </div>
      </div>

      {/* Back Navigation */}
      <Button variant="outline">
        <MoveLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      {/* Booking Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stay Details Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BedDouble className="h-5 w-5" />
              Stay Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              Suite: <span className="font-bold">{mockBooking.suite}</span>
            </div>
            <div>
              Duration:{" "}
              <span className="font-bold">{mockBooking.duration}</span> nights
            </div>
            <div>
              Dates: {mockBooking.startDate} to {mockBooking.endDate}
            </div>
          </CardContent>
        </Card>

        {/* Guest Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Guest Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              Name: <span className="font-bold">{mockBooking.guest.name}</span>
            </div>
            <div>Email: {mockBooking.guest.email}</div>
            <div>
              Guests:{" "}
              <span className="font-bold">{mockBooking.guest.adults}</span>{" "}
              adults,{" "}
              <span className="font-bold">{mockBooking.guest.children}</span>{" "}
              child
            </div>
          </CardContent>
        </Card>

        {/* Payment Details Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Payment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              Total Price:{" "}
              <span className="font-bold">
                {formatCurrency(mockBooking.payment.totalPrice)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              Payment Status:
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800">
                Paid
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Guest Observations Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Guest Observations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {mockBooking.observations || "No special requests."}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
