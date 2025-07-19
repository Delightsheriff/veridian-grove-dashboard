import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UpdateUserDataForm() {
  return (
    <Card className="max-w-2xl">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@veridiangrove.com"
              disabled
              className="opacity-50"
            />
          </div>

          {/* Full Name Field */}
          <div className="space-y-2">
            <Label htmlFor="fullname">Full name</Label>
            <Input
              id="fullname"
              placeholder="e.g., John Doe"
              defaultValue="John Doe"
            />
          </div>

          {/* Avatar Field */}
          <div className="space-y-2">
            <Label htmlFor="avatar">Avatar image</Label>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src="/placeholder.svg?height=64&width=64"
                  alt="User avatar"
                />
                <AvatarFallback className="text-lg">JD</AvatarFallback>
              </Avatar>
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-muted file:text-muted-foreground hover:file:bg-muted/80"
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button className="bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 text-white">
          Update account
        </Button>
      </CardFooter>
    </Card>
  );
}
