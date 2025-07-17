import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { formatCurrency } from "@/lib/helpers";
import { MoveLeft } from "lucide-react";

// Mock booking data - in real app this would come from props or API
const mockBooking = {
  id: "34FGE",
  guest: {
    name: "Eleanor Vance",
  },
  suite: "The Royal Penthouse",
  duration: 7,
  startDate: "Aug 12, 2024",
  endDate: "Aug 19, 2024",
  totalPrice: 2450.0,
};

export default function CheckInPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      {/* Page Header & Navigation */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">
          Check In Booking #{mockBooking.id}
        </h1>
        <Button variant="outline">
          <MoveLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      {/* Booking Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>Guest: {mockBooking.guest.name}</div>
          <div>Suite: {mockBooking.suite}</div>
          <div>
            Stay: {mockBooking.duration} nights ({mockBooking.startDate} to{" "}
            {mockBooking.endDate})
          </div>
        </CardContent>
      </Card>

      {/* Check-in Actions Form */}
      <Card>
        <CardHeader>
          <CardTitle>Confirm Check-in Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Payment Confirmation Checkbox */}
          <div className="flex items-start space-x-2">
            <Checkbox id="payment-confirmation" />
            <Label
              htmlFor="payment-confirmation"
              className="text-sm leading-relaxed"
            >
              I confirm that {mockBooking.guest.name} has paid the total amount
              of {formatCurrency(mockBooking.totalPrice)}.
            </Label>
          </div>

          {/* Optional Upsell */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <Label htmlFor="breakfast-addon" className="text-sm font-medium">
              Add breakfast for the entire stay?
            </Label>
            <Switch id="breakfast-addon" />
          </div>
        </CardContent>
        <CardFooter>
          {/* Disabled button - would be enabled when checkbox is ticked */}
          <Button
            disabled
            className="w-full bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 text-white"
          >
            Check in Booking #{mockBooking.id}
          </Button>
          {/* This button is only enabled when the payment confirmation checkbox is ticked */}
        </CardFooter>
      </Card>
    </div>
  );
}
