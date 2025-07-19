import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TodayItem from "./today-item";

// Mock data for today's activity
const todayActivities = [
  {
    id: "1",
    type: "arrival" as const,
    guest: {
      name: "John Doe",
      initials: "JD",
    },
    nights: 7,
  },
  {
    id: "2",
    type: "departure" as const,
    guest: {
      name: "Sarah Chen",
      initials: "SC",
    },
    nights: 5,
  },
  {
    id: "3",
    type: "arrival" as const,
    guest: {
      name: "Mike Johnson",
      initials: "MJ",
    },
    nights: 3,
  },
];

export default function TodayActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[300px] overflow-y-auto">
          {todayActivities.length > 0 ? (
            todayActivities.map((activity) => (
              <TodayItem key={activity.id} activity={activity} />
            ))
          ) : (
            <div className="text-center text-muted-foreground py-8">
              No arrivals or departures today.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
