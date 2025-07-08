import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Label } from "@radix-ui/react-label";
import { Input } from "./input";
import { Button } from "./button";
import { Eye } from "lucide-react";

export default function LoginForm() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold text-center">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-center">
          Sign in to the Veridian Grove Dashboard.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="staff@veridiangrove.com"
              className="w-full"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              >
                <Eye className="h-4 w-4 text-muted-foreground" />
                {/* <EyeOff className="h-4 w-4 text-muted-foreground" /> */}
                <span className="sr-only">Toggle password visibility</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 text-white">
          Sign In
        </Button>
      </CardFooter>
    </Card>
  );
}
