import { deleteSuite, getSuites } from "@/lib/services/Suites";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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

export function useDeleteSuite() {
  const queryClient = useQueryClient();

  const { isPending, mutate: deleteSuitefn } = useMutation({
    mutationFn: (suiteId: string) => deleteSuite(suiteId),
    onSuccess: () => {
      toast.success("Suite deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["suites"] });
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error
          ? error.message
          : typeof error === "string"
          ? error
          : "An unknown error occurred";
      toast.error(`Failed to delete suite: ${message}`);
    },
  });
  return {
    isPending,
    deleteSuite: deleteSuitefn,
  };
}
