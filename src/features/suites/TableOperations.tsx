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
    <div className="flex items-center gap-2">
      {/* Filter */}
      <Select
        value={searchParams.get("filter") || "all"}
        onValueChange={handleFilterChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="with-discount">With Discount</SelectItem>
          <SelectItem value="no-discount">No Discount</SelectItem>
          <SelectItem value="available">Available</SelectItem>
        </SelectContent>
      </Select>

      {/* Sort */}
      <Select
        value={searchParams.get("sort") || "name-asc"}
        onValueChange={handleSortChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name-asc">Sort by name (A-Z)</SelectItem>
          <SelectItem value="name-desc">Sort by name (Z-A)</SelectItem>
          <SelectItem value="price-asc">Sort by price (low-high)</SelectItem>
          <SelectItem value="price-desc">Sort by price (high-low)</SelectItem>
          <SelectItem value="capacity-asc">
            Sort by capacity (low-high)
          </SelectItem>
          <SelectItem value="capacity-desc">
            Sort by capacity (high-low)
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
