import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "react-router";

const PAGE_SIZE = 10; // You can move this to a constants file

interface PaginationProps {
  count: number;
}

export default function Pagination({ count }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Getting the current page from the searchParams
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  // Calculating the number of pages
  const pageCount = Math.ceil(count / PAGE_SIZE);

  // Function to go to the next page
  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next.toString());
    setSearchParams(searchParams);
  }

  // Function to go to the previous page
  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev.toString());
    setSearchParams(searchParams);
  }

  // Don't render if there's only one page or less
  if (pageCount <= 1) return null;

  const startResult = (currentPage - 1) * PAGE_SIZE + 1;
  const endResult = currentPage === pageCount ? count : currentPage * PAGE_SIZE;

  return (
    <div className="flex items-center justify-between w-full">
      <p className="text-sm text-muted-foreground ml-2">
        Showing <span className="font-semibold">{startResult}</span> to{" "}
        <span className="font-semibold">{endResult}</span> of{" "}
        <span className="font-semibold">{count}</span> results
      </p>

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={prevPage}
          disabled={currentPage === 1}
          className="flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </Button>
        <Button
          variant="outline"
          onClick={nextPage}
          disabled={currentPage === pageCount}
          className="flex items-center gap-1"
        >
          <ChevronRight className="h-4 w-4" />
          <span>Next</span>
        </Button>
      </div>
    </div>
  );
}
