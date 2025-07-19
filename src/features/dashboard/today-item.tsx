import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Activity {
  id: string;
  type: "arrival" | "departure";
  guest: {
    name: string;
    initials: string;
  };
  nights: number;
}

interface TodayItemProps {
  activity: Activity;
}

export default function TodayItem({ activity }: TodayItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Badge
          variant="outline"
          className={
            activity.type === "arrival"
              ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-800"
              : "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-800"
          }
        >
          {activity.type === "arrival" ? "Arriving" : "Departing"}
        </Badge>
        <Avatar className="h-8 w-8">
          <AvatarFallback className="text-xs">
            {activity.guest.initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium text-sm">{activity.guest.name}</div>
          <div className="text-xs text-muted-foreground">
            {activity.nights} nights
          </div>
        </div>
      </div>
      <Button variant="outline" size="sm">
        {activity.type === "arrival" ? "Check in" : "Check out"}
      </Button>
    </div>
  );
}
