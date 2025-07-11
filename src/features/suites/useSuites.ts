import { getSuites } from "@/lib/services/Suites";
import { useQuery } from "@tanstack/react-query";

// Custom hook to fetch and manage suite data
export function useSuites() {
  const {
    data: suites,
    error,
    isPending,
  } = useQuery({
    queryKey: ["suites"],
    queryFn: getSuites,
  });
  return {
    suites,
    error,
    isPending,
  };
}
