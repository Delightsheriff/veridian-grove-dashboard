import { updateBooking } from "@/lib/services/Bookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: ({
      bookingId,
      hasBreakfast,
    }: {
      bookingId: string;
      hasBreakfast?: boolean;
    }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        hasBreakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking  #${data.id} checked in successfully`);
      queryClient.invalidateQueries({ queryKey: ["booking", data.id] }); // Invalidate the active bookings query
      navigate("/");
    },
    onError: () => {
      toast.error("Could not check in booking");
    },
  });

  return { checkin, isCheckingIn };
}

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId: string) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ queryKey: ["booking", data.id] });
    },

    onError: () => toast.error("There was an error while checking out"),
  });

  return { checkout, isCheckingOut };
}
