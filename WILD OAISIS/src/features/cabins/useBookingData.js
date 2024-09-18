import { useQuery } from "@tanstack/react-query";
import getCabins from "../../services/apiCabins";
import getbook, { getBooking } from "../../services/apiBookings";

export function useBookingData() {
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["book"],
    queryFn: getbook,
  });

  return { bookings, isLoading, error };
}
