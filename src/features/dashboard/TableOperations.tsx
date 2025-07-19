import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "react-router";

export default function TableOperations() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilter = searchParams.get("days") || "30";

  const handleFilterChange = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("days", value);
    setSearchParams(newSearchParams);
  };

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Select value={currentFilter} onValueChange={handleFilterChange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Last 30 days" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="7">Last 7 days</SelectItem>
          <SelectItem value="30">Last 30 days</SelectItem>
          <SelectItem value="90">Last 90 days</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
