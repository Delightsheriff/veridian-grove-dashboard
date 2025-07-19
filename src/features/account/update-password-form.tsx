import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UpdatePasswordForm() {
  return (
    <Card className="max-w-2xl">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* New Password Field */}
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" />
            <p className="text-sm text-muted-foreground">
              Minimum of 8 characters
            </p>
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm password</Label>
            <Input id="confirm-password" type="password" />
            {/* Error Message Demo */}
            <p className="text-sm text-destructive">Passwords do not match.</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button className="bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 text-white">
          Update password
        </Button>
      </CardFooter>
    </Card>
  );
}
