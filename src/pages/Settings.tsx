import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Settings() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <h1 className="text-3xl font-bold">Hotel Settings</h1>

      {/* Settings Card */}
      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>Update Hotel Rules</CardTitle>
          <CardDescription>
            Manage the global settings for Veridian Grove. Changes are saved
            automatically when you leave a field.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Field 1 */}
            <div className="space-y-2">
              <Label htmlFor="min-nights">Minimum nights/booking</Label>
              <Input
                id="min-nights"
                type="number"
                placeholder="e.g., 3"
                defaultValue="2"
              />
            </div>

            {/* Field 2 */}
            <div className="space-y-2">
              <Label htmlFor="max-nights">Maximum nights/booking</Label>
              <Input
                id="max-nights"
                type="number"
                placeholder="e.g., 90"
                defaultValue="30"
              />
            </div>

            {/* Field 3 */}
            <div className="space-y-2">
              <Label htmlFor="max-guests">Maximum guests/booking</Label>
              <Input
                id="max-guests"
                type="number"
                placeholder="e.g., 8"
                defaultValue="6"
              />
            </div>

            {/* Field 4 - Disabled for demonstration */}
            <div className="space-y-2">
              <Label htmlFor="breakfast-price">Breakfast price</Label>
              <Input
                id="breakfast-price"
                type="number"
                placeholder="e.g., 25.00"
                defaultValue="22.50"
                disabled
                className="opacity-50"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
