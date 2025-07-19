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
      has_breakfast,
    }: {
      bookingId: string;
      has_breakfast?: boolean;
    }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        is_paid: true,
        has_breakfast,
      }),
    onSuccess: () => {
      toast.success(`Booking  checked in successfully`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] }); // Invalidate the active bookings query
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

    onSuccess: () => {
      toast.success(`Booking successfully checked out`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },

    onError: () => toast.error("There was an error while checking out"),
  });

  return { checkout, isCheckingOut };
}
