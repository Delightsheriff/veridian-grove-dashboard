import type { SuiteFormValues } from "@/interface/suites";
import { createEditSuite, deleteSuite, getSuites } from "@/lib/services/Suites";
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

export function useCreateEditSuite() {
  const queryClient = useQueryClient();

  const { isPending, mutate: createEditSuitefn } = useMutation({
    mutationFn: ({
      suiteData,
      id,
    }: {
      suiteData: SuiteFormValues;
      id?: string;
    }) => createEditSuite(suiteData, id),
    onSuccess: ({ id }) => {
      const message = id
        ? "Suite updated successfully"
        : "Suite created successfully";
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["suites"] });
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error
          ? error.message
          : typeof error === "string"
          ? error
          : "An unknown error occurred";
      toast.error(`Failed to save suite: ${message}`);
    },
  });

  return {
    isPending,
    createEditSuite: createEditSuitefn,
  };
}
