import { type LucideIcon, Inbox } from "lucide-react";

interface EmptyResourceProps {
  resourceName?: string;
  icon?: LucideIcon;
  description?: string;
}

export default function EmptyResource({
  resourceName = "items",
  icon: Icon = Inbox,
  description = "There are currently no items to display. Try creating one!",
}: EmptyResourceProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <Icon className="h-16 w-16 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">No {resourceName} found.</h3>
      <p className="text-muted-foreground text-center max-w-md">
        {description}
      </p>
    </div>
  );
}
