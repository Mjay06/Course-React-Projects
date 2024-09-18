import { useBookingData } from "../features/cabins/useBookingData";
import { getBooking } from "../services/apiBookings";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Bookings() {
  const { bookings } = useBookingData();
  return (
    <Row type="horizontal">
      <Heading as="h1">All bookings</Heading>
      <p>TEST</p>
    </Row>
  );
}

export default Bookings;
