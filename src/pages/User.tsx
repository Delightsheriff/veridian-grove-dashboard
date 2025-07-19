import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function User() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <h1 className="text-3xl font-bold">Create a New User</h1>

      {/* User Creation Card */}
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>New User Information</CardTitle>
          <CardDescription>
            Fill out the form below to add a new staff member to the dashboard.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {/* Full Name Field */}
            <div className="space-y-2">
              <Label htmlFor="fullname">Full name</Label>
              <Input id="fullname" type="text" placeholder="Enter full name" />
            </div>

            {/* Email Address Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
              />
              <p className="text-sm text-muted-foreground">
                Must be at least 8 characters long.
              </p>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Repeat password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm password"
              />
              {/* Error Message Demo */}
              <p className="text-sm text-destructive">
                Passwords do not match.
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" type="reset">
            Cancel
          </Button>
          {/* Disabled button for demonstration */}
          <Button
            disabled
            className="bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 text-white opacity-50"
          >
            Create new user
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
