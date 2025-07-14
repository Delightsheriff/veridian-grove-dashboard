import { useSearchParams } from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TableOperations() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === "all") {
      newParams.delete("filter");
    } else {
      newParams.set("filter", value);
    }
    setSearchParams(newParams);
  };

  const handleSortChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort", value);
    setSearchParams(newParams);
  };

  return (
    <div className="flex items-center gap-1">
      {/* Filter */}
      <Select
        value={searchParams.get("filter") || "all"}
        onValueChange={handleFilterChange}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Filter by..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="unconfirmed">Unconfirmed</SelectItem>
          <SelectItem value="checked-in">Checked-in</SelectItem>
          <SelectItem value="checked-out">Checked-out</SelectItem>
        </SelectContent>
      </Select>

      {/* Sort */}
      <Select
        value={searchParams.get("sort") || "start-date-recent"}
        onValueChange={handleSortChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="start-date-recent">
            Start date (recent first)
          </SelectItem>
          <SelectItem value="start-date-earliest">
            Start date (earliest first)
          </SelectItem>
          <SelectItem value="amount-high-low">Amount (high to low)</SelectItem>
          <SelectItem value="amount-low-high">Amount (low to high)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
